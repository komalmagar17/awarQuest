const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../utils/app-error');
const { User, PlayerProfile } = require('../models');

const auth = async (req, res, next) => {
  try {
    let token = req.cookies?.accessToken;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError(401, 'UNAUTHORIZED', 'Authentication required.');
    }

    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
    const user = await User.scope('withAuth').findByPk(decoded.id, {
      include: [{ model: PlayerProfile, as: 'profile', required: false }]
    });

    if (!user || user.tokenVersion !== decoded.version) {
      throw new AppError(401, 'UNAUTHORIZED', 'Session expired or user not found.');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, 'INVALID_TOKEN', 'Invalid authentication token.'));
    } else {
      next(error);
    }
  }
};

module.exports = auth;
