const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PlayerProfile = sequelize.define('PlayerProfile', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  fullName: { type: DataTypes.STRING },
  avatarUrl: { type: DataTypes.STRING },
  bio: { type: DataTypes.TEXT },
  preferences: { type: DataTypes.JSONB, defaultValue: {} }
});

module.exports = PlayerProfile;
