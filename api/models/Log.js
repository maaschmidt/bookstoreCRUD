const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Log extends Model { };

Log.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize: db,
  createdAt: false,
  updatedAt: false,
  tableName: 'logs',
  modelName: 'Log'
});

module.exports = Log;
