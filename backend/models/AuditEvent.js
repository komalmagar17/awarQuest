const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AuditEvent = sequelize.define('AuditEvent', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID },
  action: { type: DataTypes.STRING, allowNull: false },
  entity: { type: DataTypes.STRING },
  entityId: { type: DataTypes.UUID },
  details: { type: DataTypes.JSONB, defaultValue: {} },
  ipAddress: { type: DataTypes.STRING }
});

module.exports = AuditEvent;
