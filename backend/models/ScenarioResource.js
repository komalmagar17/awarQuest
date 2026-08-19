const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ScenarioResource = sequelize.define('ScenarioResource', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  scenarioId: { type: DataTypes.UUID, allowNull: false },
  resourceId: { type: DataTypes.UUID, allowNull: false }
});

module.exports = ScenarioResource;
