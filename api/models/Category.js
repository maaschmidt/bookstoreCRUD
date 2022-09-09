const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Categorie extends Model { };

Categorie.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'categories',
  modelName: 'Category'
});

module.exports = Categorie;
