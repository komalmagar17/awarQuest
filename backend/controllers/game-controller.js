const asyncHandler = require('../utils/async-handler');
const { GameSession, Scenario } = require('../models');
const AppError = require('../utils/app-error');
const engine = require('../services/game-engine');
const { publicMissionBrief, publicGameplay } = require('./scenario-controller');
const { sortMissions } = require('../utils/mission-order');

function assertActive(session) {
  if (!session || session.completedAt || new Date(session.expiresAt) < new Date()) {
    throw new AppError(404, 'SESSION_NOT_FOUND', 'No active game session was found.');
  }
}

function mergeState(session) {
  return { ...engine.INITIAL_STATE, ...(session.state || {}) };
}

const start = asyncHandler(async (req, res) => {
  const session = await engine.startGame(req.user.id, req.body.scenarioId);
  const scenario = await Scenario.findByPk(req.body.scenarioId);
  res.status(201).json({
    data: {
      sessionId: session.id,
      challenge: publicGameplay(scenario),
      state: mergeState(session)
    }
  });
});

const state = asyncHandler(async (req, res) => {
  const session = await GameSession.findOne({
    where: { id: req.query.sessionId || req.headers['x-session-id'], userId: req.user.id }
  });
  assertActive(session);
  const scenario = await Scenario.findByPk(session.scenarioId);
  const gameState = mergeState(session);
  const content = engine.scenarioContent(scenario);
  const revealedClues = (content.clues || []).filter((c) => gameState.collectedClueIds.includes(c.id));

  res.json({
    data: {
      sessionId: session.id,
      challenge: publicGameplay(scenario),
      state: gameState,
      revealedClues,
      history: session.history || [],
      expiresAt: session.expiresAt
    }
  });
});

const action = asyncHandler(async (req, res) => {
  const { sessionId, type, clueId, optionId } = req.body;
  const session = await GameSession.findOne({ where: { id: sessionId, userId: req.user.id } });
  assertActive(session);

  const scenario = await Scenario.findByPk(session.scenarioId);
  const content = engine.scenarioContent(scenario);
  const gameState = mergeState(session);
  const history = [...(session.history || [])];
  let revealedClue = null;

  if (type === 'collect_clue') {
    if (gameState.phase === 'reveal' || gameState.selectedOptionId) {
      throw new AppError(409, 'ALREADY_DECIDED', 'You have already made your decision.');
    }
    const clue = (content.clues || []).find((item) => item.id === clueId);
    if (!clue) throw new AppError(400, 'INVALID_CLUE', 'That clue is not available in this scenario.');
    if (gameState.collectedClueIds.includes(clueId)) {
      throw new AppError(409, 'CLUE_ALREADY_COLLECTED', 'This clue was already collected.');
    }
    gameState.collectedClueIds = [...gameState.collectedClueIds, clueId];
    gameState.phase = 'exploration';
    revealedClue = clue;
    history.push({ type, clueId, at: new Date().toISOString() });
  } else if (type === 'choose_option') {
    if (gameState.selectedOptionId) {
      throw new AppError(409, 'ALREADY_DECIDED', 'You have already chosen an action.');
    }
    const totalClues = (content.clues || []).length;
    if (totalClues > 0 && gameState.collectedClueIds.length < totalClues) {
      throw new AppError(409, 'CLUES_REQUIRED', `Collect all ${totalClues} clues before choosing an action.`);
    }
    const option = (content.options || []).find((item) => item.id === optionId);
    if (!option) throw new AppError(400, 'INVALID_OPTION', 'That decision is not available in this scenario.');
    gameState.selectedOptionId = optionId;
    gameState.phase = 'reveal';
    gameState.score = Math.max(0, Math.min(1000, Number(option.score || 0)));
    gameState.stars = Math.max(0, Math.min(3, Number(option.stars || 0)));
    gameState.outcome = option.outcome || 'Decision recorded.';
    history.push({ type, optionId, at: new Date().toISOString() });
  } else if (type === 'complete') {
    if (!gameState.selectedOptionId) {
      throw new AppError(409, 'DECISION_REQUIRED', 'Choose an action before completing the scenario.');
    }
    gameState.phase = 'completed';
    session.completedAt = new Date();
    history.push({ type, at: new Date().toISOString() });
  } else {
    throw new AppError(400, 'INVALID_ACTION', 'Unsupported game action.');
  }

  session.state = gameState;
  session.history = history;
  await session.save();

  res.json({
    data: {
      sessionId: session.id,
      state: gameState,
      revealedClue,
      history: session.history,
      completedAt: session.completedAt
    }
  });
});

const chat = asyncHandler(async (req, res) => {
  res.json({ data: await engine.chat(req) });
});

const challenges = asyncHandler(async (req, res) => {
  const rows = sortMissions(await Scenario.findAll({ where: { isPublished: true } }));
  res.json({ data: rows.map(publicMissionBrief) });
});

module.exports = { start, state, action, chat, challenges };
