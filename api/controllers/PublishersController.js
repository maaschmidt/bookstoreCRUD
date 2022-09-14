const { Op } = require('sequelize');
const PublisherModel = require('../models/Publisher');
const CityModel = require('../models/City');
const LogsController = require('../controllers/LogsController')

class PublishersController {

  index = async (req, res, next) => {
    const publishers = await PublisherModel.findAll({
      include: [{
        model: CityModel,
        required: false,
        attributes: ['name']
      }]
    });
    res.json(publishers);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const publisher = await PublisherModel.create(data);
      res.json(publisher);
      await LogsController.create({action: "PUBLISHER ADD", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const publisher = await PublisherModel.findByPk(req.params.publishersId);
    res.json(publisher);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.publishersId;
      const data = await this._validateData(req.body, id);
      await PublisherModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await PublisherModel.findByPk(id));
      await LogsController.create({action: "PUBLISHER UPDATE", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    try {
      await PublisherModel.destroy({
        where: {
          id: req.params.publishersId
        }
      });
      res.json({});
      await LogsController.create({action: "PUBLISHER DELETE", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  _validateData = async (data, id) => {
    const attributes = ['name', 'cities_id'];
    const publisher = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      publisher[attribute] = data[attribute];
    }
    
    return publisher;
  }

}

module.exports = new PublishersController();
