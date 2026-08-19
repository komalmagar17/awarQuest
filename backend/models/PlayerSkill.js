const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PlayerSkill = sequelize.define('PlayerSkill', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  skill: { type: DataTypes.STRING, allowNull: false },
  level: { type: DataTypes.INTEGER, defaultValue: 1 },
  indicator: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  indexes: [{ unique: true, fields: ['userId', 'skill'] }]
});

module.exports = PlayerSkill;
