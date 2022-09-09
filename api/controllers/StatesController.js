const { Op } = require('sequelize');
const StateModel = require('../models/State');
const LogsController = require('../controllers/LogsController');

class StatesController {

  index = async (req, res, next) => {
    res.json(await StateModel.findAll({}));
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const state = await StateModel.create(data);
      res.json(state);
      await LogsController.create({action: "STATE ADD", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const state = await StateModel.findByPk(req.params.statesId);
    res.json(state);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.statesId;
      const data = await this._validateData(req.body, id);
      await StateModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await StateModel.findByPk(id));
      await LogsController.create({action: "STATE UPDATE", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await StateModel.destroy({
      where: {
        id: req.params.statesId
      }
    });
    res.json({});
    await LogsController.create({action: "STATE DELETE", date: new Date()});
  }

  _validateData = async (data, id) => {
    const attributes = ['name', 'province'];
    const state = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      state[attribute] = data[attribute];
    }
    return state;
  }

}

module.exports = new StatesController();
