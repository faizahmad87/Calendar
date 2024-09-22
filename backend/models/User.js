const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
 id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
  allowNull: false
 },
 email: {
  type: DataTypes.STRING,
  unique: true,
  allowNull: false
 },
 password: {
  type: DataTypes.STRING,
  allowNull: false
 }
 //  firebaseUid: {
 //   type: DataTypes.STRING,
 //   allowNull: false
 //  }
});

module.exports = User;
