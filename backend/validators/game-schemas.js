const Joi = require('joi');

const startGameSchema = Joi.object({
  scenarioId: Joi.string().uuid().required()
});

const gameActionSchema = Joi.object({
  sessionId: Joi.string().uuid().required(),
  type: Joi.string().valid('collect_clue', 'choose_option', 'complete').required(),
  clueId: Joi.string().when('type', { is: 'collect_clue', then: Joi.required(), otherwise: Joi.forbidden() }),
  optionId: Joi.string().when('type', { is: 'choose_option', then: Joi.required(), otherwise: Joi.forbidden() })
});

const chatSchema = Joi.object({
  sessionId: Joi.string().uuid().required(),
  message: Joi.string().trim().min(1).max(500).required()
});

const progressSubmitSchema = Joi.object({
  sessionId: Joi.string().uuid().required(),
  scenarioId: Joi.string().uuid().required(),
  status: Joi.string().valid('started', 'completed', 'failed').required(),
  evidence: Joi.object().default({})
});

module.exports = { startGameSchema, gameActionSchema, chatSchema, progressSubmitSchema };
