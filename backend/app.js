const express = require('express');
const path = require('node:path');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pinoHttp = require('pino-http');
const env = require('./config/env');
const logger = require('./config/logger');
const { requestId, rejectUnsafeInput, jsonLimit, writeLimiter } = require('./middleware/security');
const { notFound, errorHandler } = require('./middleware/error-handler');
const AppError = require('./utils/app-error');
const asyncHandler = require('./utils/async-handler');
const { sequelize } = require('./config/db');

const app = express();
app.set('trust proxy', env.TRUST_PROXY);
app.disable('x-powered-by');
app.use(requestId);
app.use(pinoHttp({ logger, genReqId: (req) => req.id, redact: ['req.headers.authorization', 'req.headers.cookie'] }));
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || env.corsOrigins.includes(origin)) return callback(null, true);
    return callback(new AppError(403, 'CORS_ORIGIN_DENIED', 'This origin is not allowed to access the API.'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Client-Platform', 'X-Request-Id']
}));
app.use(express.json({ limit: jsonLimit, strict: true }));
app.use(cookieParser());
app.use(rejectUnsafeInput);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok', service: 'awarquest-api', requestId: req.id }));
app.get('/health/ready', asyncHandler(async (req, res) => {
  await sequelize.authenticate();
  res.status(200).json({ status: 'ready', service: 'awarquest-api', requestId: req.id });
}));
app.use('/api/v1/auth', require('./routes/auth-routes'));
app.use('/api/v1/profile', require('./routes/profile-routes'));
app.use('/api/v1/scenarios', writeLimiter, require('./routes/scenario-routes'));
app.use('/api/v1/progress', writeLimiter, require('./routes/progress-routes'));
app.use('/api/v1/scores', require('./routes/score-routes'));
app.use('/api/v1/skills', require('./routes/skill-routes'));
app.use('/api/v1/resources', require('./routes/resource-routes'));
app.use('/api/v1/lifeguide', require('./routes/lifeguide-routes'));
app.use('/api/v1/game', require('./routes/game-routes'));
app.use('/api/v1/analytics', writeLimiter, require('./routes/analytics-routes'));
app.use('/api/v1/admin', require('./routes/admin-routes'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.use(notFound);
app.use(errorHandler);
module.exports = app;
