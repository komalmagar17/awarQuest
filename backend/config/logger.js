const pino = require('pino');
const prettyAvailable = (() => {
  try { require.resolve('pino-pretty'); return true; } catch { return false; }
})();
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production' && prettyAvailable ? {
    target: 'pino-pretty',
    options: { colorize: true }
  } : undefined
});
module.exports = logger;
