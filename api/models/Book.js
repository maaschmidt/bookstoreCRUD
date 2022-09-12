const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const Category = require('./Category');
const Publisher = require('./Publisher');
const Format = require('./Format');

class Book extends Model { };

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publication_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pages: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true //false
  }
}, {
  sequelize: db,
  tableName: 'books',
  modelName: 'Book'
});

Category.hasMany(Book, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 'categories_id' })
Book.belongsTo(Category, { foreignKey: 'categories_id' })

Publisher.hasMany(Book, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 'publishers_id' })
Book.belongsTo(Publisher, { foreignKey: 'publishers_id' })

Format.hasMany(Book, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 'formats_id'})
Book.belongsTo(Format, { foreignKey: 'formats_id' })

module.exports = Book;
