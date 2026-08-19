const logger = require('../config/logger');
const AppError = require('../utils/app-error');

const notFound = (req, res, next) => {
  next(new AppError(404, 'NOT_FOUND', `Not found: ${req.originalUrl}`));
};

function sequelizeStatus(err) {
  if (err.name === 'SequelizeValidationError') return 400;
  if (err.name === 'SequelizeUniqueConstraintError') return 409;
  if (err.name === 'SequelizeForeignKeyConstraintError') return 400;
  return null;
}

const errorHandler = (err, req, res, _next) => {
  const sequelizeCode = sequelizeStatus(err);
  const statusCode = err.statusCode || sequelizeCode || (res.statusCode !== 200 ? res.statusCode : 500);
  const code = err.code || (sequelizeCode === 409 ? 'DUPLICATE_ENTRY' : sequelizeCode === 400 ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR');
  const message = err.isOperational || sequelizeCode
    ? err.message
    : 'An unexpected error occurred. Please try again.';

  if (statusCode >= 500) {
    logger.error({
      err,
      requestId: req.id,
      method: req.method,
      url: req.originalUrl,
      userId: req.user?.id
    }, 'Request error');
  } else {
    logger.warn({
      code,
      message: err.message,
      requestId: req.id,
      method: req.method,
      url: req.originalUrl
    }, 'Client error');
  }

  res.status(statusCode).json({
    error: {
      code,
      message,
      requestId: req.id,
      ...(process.env.NODE_ENV === 'development' && statusCode >= 500 ? { detail: err.message } : {})
    }
  });
};

module.exports = { notFound, errorHandler };
