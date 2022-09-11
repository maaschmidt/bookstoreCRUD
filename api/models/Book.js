const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const Category = require('./Category');
const Publisher = require('./Publisher');

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

module.exports = Book;
