const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const City = require('./City')

class Publisher extends Model { };

Publisher.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'publishers',
  modelName: 'Publisher'
});

City.hasMany(Publisher, { foreignKey: 'cities_id' })
Publisher.belongsTo(City, { foreignKey: 'cities_id' })

module.exports = Publisher;
