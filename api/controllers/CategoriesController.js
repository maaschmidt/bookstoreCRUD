const { Op } = require('sequelize');
const CategorieModel = require('../models/Category');
const LogsController = require('../controllers/LogsController')

class CategoriesController {

  index = async (req, res, next) => {
    res.json(await CategorieModel.findAll({}));
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const categorie = await CategorieModel.create(data);
      res.json(categorie);
      await LogsController.create({action: "CATEGORY ADD", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const categorie = await CategorieModel.findByPk(req.params.categoriesId);
    res.json(categorie);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.categoriesId;
      const data = await this._validateData(req.body, id);
      await CategorieModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await CategorieModel.findByPk(id));
      await LogsController.create({action: "CATEGORY UPDATE", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await CategorieModel.destroy({
      where: {
        id: req.params.categoriesId
      }
    });
    res.json({});
    await LogsController.create({action: "CATEGORY DELETE", date: new Date()});
  }

  _validateData = async (data, id) => {
    const attributes = ['description'];
    const categorie = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      categorie[attribute] = data[attribute];
    }

    if (await this._checkIfDescriptionExists(categorie.description, id)) {
      throw new Error(`The categorie with description: "${categorie.description}" already exists.`);
    }

    return categorie;
  }

  _checkIfDescriptionExists = async (description, id) => {
    const where = {
      description: description
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await CategorieModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new CategoriesController();
