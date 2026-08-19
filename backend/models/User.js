const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('player', 'admin'), defaultValue: 'player' },
  emailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  tokenVersion: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  defaultScope: { attributes: { exclude: ['passwordHash', 'tokenVersion'] } },
  scopes: { withAuth: { attributes: { include: ['passwordHash', 'tokenVersion'] } } }
});

User.prototype.comparePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = User;
