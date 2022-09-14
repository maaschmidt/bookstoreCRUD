const { Op } = require('sequelize');
const CategoryModel = require('../models/Category');
const LogsController = require('../controllers/LogsController')

class CategoriesController {

  index = async (req, res, next) => {
    res.json(await CategoryModel.findAll({}));
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const category = await CategoryModel.create(data);
      res.json(category);
      await LogsController.create({action: "CATEGORY ADD", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const category = await CategoriModel.findByPk(req.params.categoriesId);
    res.json(category);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.categoriesId;
      const data = await this._validateData(req.body, id);
      await CategoryModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await CategoryModel.findByPk(id));
      await LogsController.create({action: "CATEGORY UPDATE", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    try {
      await CategoryModel.destroy({
        where: {
          id: req.params.categoriesId
        }
      });
      res.json({});
      await LogsController.create({action: "CATEGORY DELETE", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  _validateData = async (data, id) => {
    const attributes = ['description'];
    const category = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      category[attribute] = data[attribute];
    }

    if (await this._checkIfDescriptionExists(category.description, id)) {
      throw new Error(`The category with description: "${category.description}" already exists.`);
    }

    return category;
  }

  _checkIfDescriptionExists = async (description, id) => {
    const where = {
      description: description
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await CategoryModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new CategoriesController();
