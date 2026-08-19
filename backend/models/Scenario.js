const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Scenario = sequelize.define('Scenario', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  slug: { type: DataTypes.STRING, unique: true, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  summary: { type: DataTypes.TEXT },
  ageGroup: { type: DataTypes.STRING, allowNull: false },
  difficulty: { type: DataTypes.INTEGER, defaultValue: 1 },
  content: { type: DataTypes.JSONB, defaultValue: {} },
  skillTags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  isPublished: { type: DataTypes.BOOLEAN, defaultValue: false },
  version: { type: DataTypes.INTEGER, defaultValue: 1 }
});

module.exports = Scenario;
