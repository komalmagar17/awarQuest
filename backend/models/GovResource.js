const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const GovResource = sequelize.define('GovResource', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  slug: { type: DataTypes.STRING, unique: true },
  title: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  organisationType: { type: DataTypes.STRING, defaultValue: 'GOVERNMENT' },
  stateCodes: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ['ALL'] },
  professionTags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  accessModel: { type: DataTypes.STRING, defaultValue: 'FREE' },
  verificationSource: { type: DataTypes.STRING },
  verificationStatus: { type: DataTypes.STRING, defaultValue: 'PENDING_REVIEW' },
  lastVerifiedAt: { type: DataTypes.DATE },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = GovResource;
