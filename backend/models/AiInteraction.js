const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AiInteraction = sequelize.define('AiInteraction', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  scenarioId: { type: DataTypes.UUID, allowNull: false },
  playerMessage: { type: DataTypes.TEXT, allowNull: false },
  assistantMessage: { type: DataTypes.TEXT, allowNull: false },
  decision: { type: DataTypes.JSONB, defaultValue: {} },
  expiresAt: { type: DataTypes.DATE, allowNull: false }
});

module.exports = AiInteraction;
