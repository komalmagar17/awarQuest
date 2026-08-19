const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AnalyticsEvent = sequelize.define('AnalyticsEvent', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID },
  eventType: { type: DataTypes.STRING, allowNull: false },
  payload: { type: DataTypes.JSONB, defaultValue: {} },
  platform: { type: DataTypes.STRING }
});

module.exports = AnalyticsEvent;
