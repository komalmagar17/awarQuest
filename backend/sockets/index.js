const logger = require('../config/logger');

const initializeSockets = (io) => {
  io.on('connection', (socket) => {
    logger.info({ socketId: socket.id }, 'New socket connection');

    socket.on('join_game', (gameId) => {
      socket.join(`game_${gameId}`);
      logger.info({ socketId: socket.id, gameId }, 'User joined game room');
    });

    socket.on('disconnect', () => {
      logger.info({ socketId: socket.id }, 'Socket disconnected');
    });
  });
};

module.exports = { initializeSockets };
