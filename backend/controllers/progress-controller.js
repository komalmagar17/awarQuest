const asyncHandler = require('../utils/async-handler');
const { PlayerProgress, Scenario, PlayerSkill, GameSession } = require('../models');
const AppError = require('../utils/app-error');

const submit = asyncHandler(async (req, res) => {
  const { sessionId, scenarioId, status, evidence } = req.body;

  const scenario = await Scenario.findOne({ where: { id: scenarioId, isPublished: true } });
  if (!scenario) throw new AppError(404, 'SCENARIO_NOT_FOUND', 'Scenario not found.');

  const session = await GameSession.findOne({ where: { id: sessionId, userId: req.user.id, scenarioId } });
  if (!session) throw new AppError(404, 'SESSION_NOT_FOUND', 'Game session not found.');
  if (!session.completedAt && status === 'completed') {
    throw new AppError(409, 'SESSION_INCOMPLETE', 'Complete the mission in-game before submitting progress.');
  }

  const sessionState = session.state || {};
  const option = (scenario.content?.options || []).find((item) => item.id === sessionState.selectedOptionId);
  const awardedStars = status === 'completed'
    ? Math.max(0, Math.min(3, Number(sessionState.stars ?? option?.stars ?? 0)))
    : 0;
  const safeScore = status === 'completed'
    ? Math.max(0, Math.min(1000, Number(sessionState.score ?? option?.score ?? awardedStars * 300)))
    : 0;

  const [progress, created] = await PlayerProgress.findOrCreate({
    where: { userId: req.user.id, scenarioId },
    defaults: {
      status,
      bestStars: awardedStars,
      attempts: 1,
      lastEvidence: { ...(evidence || {}), sessionId, selectedOptionId: sessionState.selectedOptionId, score: safeScore }
    }
  });

  if (!created) {
    progress.attempts += 1;
    progress.status = status;
    progress.bestStars = Math.max(progress.bestStars || 0, awardedStars);
    progress.lastEvidence = {
      ...(progress.lastEvidence || {}),
      ...(evidence || {}),
      sessionId,
      selectedOptionId: sessionState.selectedOptionId,
      score: safeScore
    };
    await progress.save();
  }

  const skill = scenario.skillTags?.[0];
  if (skill && status === 'completed') {
    const [skillRow] = await PlayerSkill.findOrCreate({
      where: { userId: req.user.id, skill },
      defaults: { indicator: 0, level: 1 }
    });
    skillRow.indicator = Math.min(100, (skillRow.indicator || 0) + awardedStars * 5);
    skillRow.level = Math.min(10, Math.floor(skillRow.indicator / 10) + 1);
    await skillRow.save();
  }

  res.status(created ? 201 : 200).json({
    data: {
      scenarioId,
      status,
      stars: awardedStars,
      score: safeScore,
      attempts: progress.attempts,
      bestStars: progress.bestStars
    }
  });
});

const list = asyncHandler(async (req, res) => {
  const rows = await PlayerProgress.findAll({ where: { userId: req.user.id }, order: [['updatedAt', 'DESC']] });
  res.json({ data: rows });
});

module.exports = { submit, list };
