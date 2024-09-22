const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
 id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
  allowNull: false
 },
 title: {
  type: DataTypes.STRING,
  allowNull: false
 },
 description: {
  type: DataTypes.STRING,
  allowNull: false
 },
 date: {
  type: DataTypes.DATE,
  allowNull: false
 },
 userId: {
  type: DataTypes.UUID,
  allowNull: false
 }
});

module.exports = Event;
