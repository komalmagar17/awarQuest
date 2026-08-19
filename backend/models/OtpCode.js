const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OtpCode = sequelize.define('OtpCode', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  codeHash: { type: DataTypes.STRING, allowNull: false },
  purpose: { type: DataTypes.ENUM('login', 'register'), allowNull: false },
  attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
  maxAttempts: { type: DataTypes.INTEGER, defaultValue: 5 },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  consumedAt: { type: DataTypes.DATE, allowNull: true }
}, {
  indexes: [
    { fields: ['userId', 'purpose'] },
    { fields: ['expiresAt'] }
  ]
});

module.exports = OtpCode;
