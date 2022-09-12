const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const State = require('./State')

class City extends Model { };

City.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  cep: {
    type: DataTypes.CHAR(9),
    allowNull: true, //false
    // defaultValue: '0000-0000'
  }
}, {
  sequelize: db,
  tableName: 'cities',
  modelName: 'City'
});

State.hasMany(City, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 'state_id' })
City.belongsTo(State, { foreignKey: 'state_id' })

module.exports = City;
