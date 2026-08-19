const AppError = require('../utils/app-error');

const requireAdmin = (req, _res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError(403, 'FORBIDDEN', 'Administrator access required.'));
  }
  next();
};

module.exports = requireAdmin;
