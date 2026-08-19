const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PlayerProgress = sequelize.define('PlayerProgress', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  scenarioId: { type: DataTypes.UUID, allowNull: false },
  status: { type: DataTypes.ENUM('started', 'completed', 'failed'), defaultValue: 'started' },
  bestStars: { type: DataTypes.INTEGER, defaultValue: 0 },
  attempts: { type: DataTypes.INTEGER, defaultValue: 1 },
  lastEvidence: { type: DataTypes.JSONB, defaultValue: {} }
}, {
  indexes: [{ unique: true, fields: ['userId', 'scenarioId'] }]
});

module.exports = PlayerProgress;
