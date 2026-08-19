const Joi = require('joi');

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;

const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).max(32).pattern(/^[a-zA-Z0-9_]+$/).required(),
  email: Joi.string().trim().email().max(255).required(),
  password: Joi.string().min(8).max(128).pattern(PASSWORD_PATTERN).required()
    .messages({ 'string.pattern.base': 'Password must include uppercase, lowercase, a number, and a special character.' }),
  ageGroup: Joi.string().valid('13-17', '18-24', '25-34', '35+', 'all').default('18-24')
});

const loginSchema = Joi.object({
  identifier: Joi.string().trim().min(3).max(255).required(),
  password: Joi.string().min(8).max(128).pattern(PASSWORD_PATTERN).required()
    .messages({ 'string.pattern.base': 'Password must include uppercase, lowercase, a number, and a special character.' })
});

const verifyOtpSchema = Joi.object({
  otpSessionId: Joi.string().uuid().required(),
  code: Joi.string().trim().length(6).pattern(/^\d{6}$/).required()
});

const resendOtpSchema = Joi.object({
  otpSessionId: Joi.string().uuid().required()
});

module.exports = { registerSchema, loginSchema, verifyOtpSchema, resendOtpSchema };
