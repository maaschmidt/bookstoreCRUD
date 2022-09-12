const { Op } = require('sequelize');
const CityModel = require('../models/City');
const StateModel = require('../models/State');
const LogsController = require('../controllers/LogsController');
const axios = require('axios');

class CitiesController {

  index = async (req, res, next) => {
    const cities = await CityModel.findAll({
      include: [{
        model: StateModel,
        required: false,
        attributes: ['name', 'province']
      }]
    });
    res.json(cities);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const citie = await CityModel.create(data);
      res.json(citie);
      await LogsController.create({ action: "CITY ADD", date: new Date() });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const citie = await CityModel.findByPk(req.params.citiesId);
    res.json(citie);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.citiesId;
      const data = await this._validateData(req.body, id);
      await CityModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await CityModel.findByPk(id));
      await LogsController.create({ action: "CITY UPDATE", date: new Date() });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await CityModel.destroy({
      where: {
        id: req.params.citiesId
      }
    });
    res.json({});
    await LogsController.create({ action: "CITY DELETE", date: new Date() });
  }

  _validateData = async (data, id) => {
    const attributes = ['name', 'cep', 'state_id'];
    const citie = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      citie[attribute] = data[attribute];
    }

    if (await this._checkIfCityExists(citie.name, citie.state_id, id)) {
      throw new Error(`"${citie.name}" already exists in this state.`);
    }

    if (await this._checkIfCEPValid(citie.cep)) {
      throw new Error(`CEP: "${citie.cep}" does not exist.`);
    }

    if (await this._checkIfCEPExist(citie.cep, id)) {
      throw new Error(`CEP: "${citie.cep}" is already in use.`);
    }

    return citie;
  }

  _checkIfCityExists = async (name, state_id, id) => {
    const where = {
      name: name,
      state_id: state_id
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await CityModel.count({
      where: where
    });

    return count > 0;
  }

  _checkIfCEPValid = async (cep) => {
    cep = cep.replace(/\D/g, "");
    const consultaCep = await axios(`https://viacep.com.br/ws/${cep}/json/`);
    if (consultaCep.data.erro === 'true'){
      return true;
    } else {
      return false;
    }
  }

  _checkIfCEPExist = async (cep, id) => {
    const where = {
      cep: cep,
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await CityModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new CitiesController();
