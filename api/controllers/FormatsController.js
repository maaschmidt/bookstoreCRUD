const { Op } = require('sequelize');
const FormatModel = require('../models/Format');
const LogsController = require('./LogsController')

class FormatsController {

  index = async (req, res, next) => {
    res.json(await FormatModel.findAll({}));
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const format = await FormatModel.create(data);
      res.json(format);
      await LogsController.create({action: "FORMAT ADD", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const format = await FormatModel.findByPk(req.params.formatsId);
    res.json(format);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.formatsId;
      const data = await this._validateData(req.body, id);
      await FormatModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await FormatModel.findByPk(id));
      await LogsController.create({action: "FORMAT UPDATE", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    try {
      await FormatModel.destroy({
        where: {
          id: req.params.formatsId
        }
      });
      res.json({});
      await LogsController.create({action: "FORMAT DELETE", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  _validateData = async (data, id) => {
    const attributes = ['description'];
    const format = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      format[attribute] = data[attribute];
    }

    if (await this._checkIfDescriptionExists(format.description, id)) {
      throw new Error(`The format with description: "${format.description}" already exists.`);
    }

    return format;
  }

  _checkIfDescriptionExists = async (description, id) => {
    const where = {
      description: description
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await FormatModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new FormatsController();
