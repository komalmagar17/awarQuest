const fs = require('node:fs');
const path = require('node:path');
const { Sequelize } = require('sequelize');
const env = require('./env');
const logger = require('./logger');

const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  logging: (message) => logger.debug({ message }, 'database query'),
  dialectOptions: env.DB_SSL ? { ssl: { require: true, rejectUnauthorized: false } } : undefined,
  pool: { max: 20, min: 2, acquire: 30000, idle: 10000, evict: 1000 },
  retry: { max: 3 }
});

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    logger.info('PostgreSQL connection established');
    if (env.AUTO_SYNC) {
      if (env.isProduction) throw new Error('AUTO_SYNC must never be enabled in production. Use migrations.');
      await sequelize.sync({ alter: false });
      await runPendingSqlMigrations();
      logger.warn('Database schema synchronized because AUTO_SYNC is enabled');
    }
  } catch (error) {
    logger.error({ err: error }, 'Failed to connect to database');
    throw error;
  }
}

async function runPendingSqlMigrations() {
  const root = path.resolve(__dirname, '..');
  const files = fs.readdirSync(root)
    .filter((name) => name.startsWith('migrations-') && name.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(root, file), 'utf8');
    await sequelize.query(sql);
    logger.info({ file }, 'Applied SQL migration');
  }
}

module.exports = { sequelize, connectDatabase };
