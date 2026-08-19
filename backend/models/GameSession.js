const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const GameSession = sequelize.define('GameSession', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  scenarioId: { type: DataTypes.UUID, allowNull: false },
  state: { type: DataTypes.JSONB, defaultValue: {} },
  history: { type: DataTypes.JSONB, defaultValue: [] },
  completedAt: { type: DataTypes.DATE },
  expiresAt: { type: DataTypes.DATE, allowNull: false }
});

module.exports = GameSession;
