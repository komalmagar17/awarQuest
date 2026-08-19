const asyncHandler = require('../utils/async-handler');
const { Op } = require('sequelize');
const { Scenario } = require('../models');
const AppError = require('../utils/app-error');
const { sortMissions } = require('../utils/mission-order');

function publicMissionBrief(scenario) {
  const raw = scenario.toJSON ? scenario.toJSON() : scenario;
  const content = raw.content || {};
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary,
    ageGroup: raw.ageGroup,
    difficulty: raw.difficulty,
    skillTags: raw.skillTags || [],
    version: raw.version,
    estimatedMinutes: content.estimatedMinutes || 8,
    learningObjectives: (content.learningObjectives || []).length
  };
}

function publicGameplay(scenario) {
  const raw = scenario.toJSON ? scenario.toJSON() : scenario;
  const content = raw.content || {};
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary,
    difficulty: raw.difficulty,
    skillTags: raw.skillTags || [],
    presentation: content.presentation || { hook: raw.summary, objective: 'Investigate carefully and choose the safest action.' },
    interactables: content.interactables || [],
    world: content.world || null,
    puzzles: content.puzzles || {},
    learningObjectives: content.learningObjectives || [],
    clues: (content.clues || []).map(({ id, title }) => ({ id, title })),
    options: (content.options || []).map(({ id, text }) => ({ id, text })),
    estimatedMinutes: content.estimatedMinutes || 8
  };
}

function normalizeScenario(scenario) {
  const raw = scenario.toJSON ? scenario.toJSON() : scenario;
  const content = raw.content || {};
  return {
    ...publicGameplay(scenario),
    learningObjectives: content.learningObjectives || [],
    resources: (content.resources || []).filter((r) => r.url && r.isVerified !== false)
  };
}

const list = asyncHandler(async (req, res) => {
  const profileAge = req.user.profile?.preferences?.ageGroup;
  const ageGroup = req.params.ageGroup || profileAge || '18-24';
  const scenarios = sortMissions(await Scenario.findAll({
    where: { isPublished: true, [Op.or]: [{ ageGroup }, { ageGroup: 'all' }] }
  }));
  res.json({ data: scenarios.map(publicMissionBrief), meta: { ageGroup, count: scenarios.length } });
});

const getOne = asyncHandler(async (req, res) => {
  const scenario = await Scenario.findOne({ where: { id: req.params.id, isPublished: true } });
  if (!scenario) throw new AppError(404, 'SCENARIO_NOT_FOUND', 'The requested scenario is not available.');
  res.json({ data: publicGameplay(scenario) });
});

module.exports = { list, getOne, normalizeScenario, publicMissionBrief, publicGameplay };
