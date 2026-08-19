const { Scenario, GameSession, PlayerProgress, PlayerSkill, AiInteraction, PlayerProfile } = require('../models');
const AppError = require('../utils/app-error');
const { makeGameDecision } = require('./ai-service');

const INITIAL_STATE = {
  phase: 'presentation',
  collectedClueIds: [],
  selectedOptionId: null,
  score: 0,
  stars: 0
};

function difficultyLabel(value) {
  if (value <= 2) return 'easy';
  if (value >= 4) return 'hard';
  return 'medium';
}

function safeText(value, fallback) {
  const text = typeof value === 'string' ? value.trim() : '';
  return text || fallback;
}

function normalizeAlerts(alerts = []) {
  return alerts.map((alert, index) => ({
    type: String(alert.type || 'SAFETY').toUpperCase().replace(/[^A-Z_]/g, '_') || 'SAFETY',
    priority: alert.priority || (index === 0 ? 'HIGH' : 'MEDIUM')
  }));
}

function scenarioContent(scenario) {
  return scenario?.content && typeof scenario.content === 'object' ? scenario.content : {};
}

async function playerMetrics(userId, scenario) {
  const completed = await PlayerProgress.findAll({ where: { userId, status: 'completed' } });
  const attempts = completed.reduce((sum, entry) => sum + entry.attempts, 0);
  const totalStars = completed.reduce((sum, entry) => sum + entry.bestStars, 0);
  const skillTag = scenario.skillTags?.[0] || 'general_awareness';
  const skill = await PlayerSkill.findOne({ where: { userId, skill: skillTag } });
  const progress = await PlayerProgress.findOne({ where: { userId, scenarioId: scenario.id } });

  return {
    accuracy: attempts ? totalStars / (attempts * 3) : 0,
    mistakeRate: Number(progress?.lastEvidence?.mistakesForTopic || 0),
    topicMastery: (skill?.indicator || 0) / 100,
    challengeStreak: completed.length
  };
}

async function startGame(userId, scenarioId) {
  const scenario = await Scenario.findOne({ where: { id: scenarioId, isPublished: true } });
  if (!scenario) throw new AppError(404, 'SCENARIO_NOT_FOUND', 'The requested scenario is not available.');

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await GameSession.create({
    userId,
    scenarioId,
    expiresAt,
    state: { ...INITIAL_STATE, startTime: new Date().toISOString() }
  });

  return session;
}

async function chat(req) {
  const userId = req.user.id;
  const { message, sessionId } = req.body;

  const session = await GameSession.findOne({ where: { id: sessionId, userId, completedAt: null } });
  if (!session) throw new AppError(404, 'SESSION_NOT_FOUND', 'No active session found.');

  const scenario = await Scenario.findByPk(session.scenarioId);
  if (!scenario) throw new AppError(404, 'SCENARIO_NOT_FOUND', 'Scenario not found.');

  const content = scenarioContent(scenario);
  const metrics = await playerMetrics(userId, scenario);
  const ageGroup = req.user.profile?.preferences?.ageGroup || '18-24';

  const context = {
    interaction_type: 'chat',
    player: {
      age_group: ageGroup,
      current_challenge_id: String(scenario.id),
      topic: scenario.skillTags?.[0] || 'general_awareness',
      mistakes_for_topic: Math.round(metrics.mistakeRate),
      topic_mastery: metrics.topicMastery,
      challenge_streak: metrics.challengeStreak
    },
    challenge: {
      id: String(scenario.id),
      title: scenario.title,
      scenario: safeText(content.scenario, scenario.summary),
      verified_explanation: safeText(content.explanation, 'Review the clues and choose the safest verified action.'),
      safe_hint: safeText(content.safeHint, 'Collect all clues before deciding.'),
      allowed_answer_ids: (content.options || []).map((o) => o.id),
      verified_alerts: normalizeAlerts(content.verifiedAlerts)
    },
    player_message: message,
    allowed_actions: ['NPC_REPLY', 'GIVE_HINT', 'SHOW_ALERT']
  };

  const result = await makeGameDecision(context);
  const decision = result.decision || {};
  const assistantMessage = safeText(decision.message, content.safeHint || 'Keep investigating the clues.');

  await AiInteraction.create({
    userId,
    scenarioId: scenario.id,
    playerMessage: message,
    assistantMessage,
    decision,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return {
    message: assistantMessage,
    action: decision.action || 'NPC_REPLY',
    alert: decision.alert || null
  };
}

module.exports = { startGame, chat, playerMetrics, INITIAL_STATE, scenarioContent, normalizeAlerts };
