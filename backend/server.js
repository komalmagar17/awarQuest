const http = require('node:http');
const { Server } = require('socket.io');
const app = require('./app');
const env = require('./config/env');
const logger = require('./config/logger');
const { connectDatabase, sequelize } = require('./config/db');
const { initializeSockets } = require('./sockets');

async function start() {
  try {
    await connectDatabase();
    const server = http.createServer(app);
    const io = new Server(server, { 
      cors: { 
        origin: env.corsOrigins, 
        credentials: true 
      }, 
      transports: ['websocket', 'polling'] 
    });
    
    initializeSockets(io);
    
    server.listen(env.PORT, () => {
      logger.info({ port: env.PORT, env: env.NODE_ENV }, 'API server listening');
    });

    const shutdown = async (signal) => {
      logger.info({ signal }, 'Graceful shutdown started');
      io.close();
      server.close(async () => {
        await sequelize.close();
        logger.info('Graceful shutdown complete');
        process.exit(0);
      });
      setTimeout(() => process.exit(1), 10000).unref();
    };

    process.once('SIGTERM', () => shutdown('SIGTERM'));
    process.once('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.fatal({ err: error }, 'Server failed to start');
    process.exit(1);
  }
}

start();
