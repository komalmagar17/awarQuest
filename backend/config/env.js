const Joi = require('joi');
const path = require('node:path');

require('dotenv').config({ path: path.resolve(process.cwd(), '.env'), quiet: true });

const schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().port().default(5000),
  DATABASE_URL: Joi.string().uri({ scheme: ['postgres', 'postgresql'] }).required(),
  DB_SSL: Joi.boolean().truthy('true').falsy('false').default(false),
  JWT_ACCESS_SECRET: Joi.string().min(48).required(),
  JWT_REFRESH_SECRET: Joi.string().min(48).required().invalid(Joi.ref('JWT_ACCESS_SECRET')),
  JWT_ACCESS_TTL: Joi.string().default('15m'),
  JWT_REFRESH_TTL: Joi.string().default('7d'),
  COOKIE_DOMAIN: Joi.string().allow('').default(''),
  CORS_ORIGINS: Joi.string().default('http://localhost:3000'),
  TRUST_PROXY: Joi.number().integer().min(0).default(1),
  LOG_LEVEL: Joi.string().valid('fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent').default('info'),
  AUTO_SYNC: Joi.boolean().truthy('true').falsy('false').default(false),
  AI_ENABLED: Joi.boolean().truthy('true').falsy('false').default(false),
  AI_SERVICE_URL: Joi.string().uri({ scheme: ['http', 'https'] }).default('http://127.0.0.1:8001'),
  AI_SERVICE_TOKEN: Joi.when('AI_ENABLED', { is: true, then: Joi.string().min(32).required(), otherwise: Joi.string().allow('').default('') }),
  AI_REQUEST_TIMEOUT_MS: Joi.number().integer().min(500).max(10000).default(3500),
  SMTP_HOST: Joi.string().allow('').default(''),
  SMTP_PORT: Joi.number().port().default(587),
  SMTP_SECURE: Joi.boolean().truthy('true').falsy('false').default(false),
  SMTP_USER: Joi.string().allow('').default(''),
  SMTP_PASS: Joi.string().allow('').default(''),
  EMAIL_FROM: Joi.string().email().default('noreply@example.com'),
  GUEST_PLAY_ENABLED: Joi.boolean().truthy('true').falsy('false').default(true)
}).unknown();

const { value: env, error } = schema.validate(process.env, { abortEarly: false });
if (error) throw new Error(`Invalid environment configuration: ${error.details.map(({ message }) => message).join('; ')}`);

env.corsOrigins = env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean);
env.isProduction = env.NODE_ENV === 'production';
module.exports = env;
