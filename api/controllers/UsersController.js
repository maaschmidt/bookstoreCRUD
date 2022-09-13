const { Op } = require('sequelize');
const md5 = require('md5')
const UserModel = require('../models/User');
const LogsController = require('../controllers/LogsController');

class UsersController {

  index = async (req, res, next) => {
    const params = req.query;
    const limit = params.limit || 10;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    const sort = params.sort || 'id';
    const order = params.order || 'ASC';
    const where = {};

    if (params.name) {
      where.name = {
        [Op.iLike]: `%${params.name}%`
      }
    }

    const users = await UserModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]]
    });
    res.json(users);
  }

  create = async (req, res, next) => {
    try {
      req.body.password = md5(req.body.password);
      const data = await this._validateData(req.body);
      const user = await UserModel.create(data);
      await LogsController.create({action: "USER ADD", date: new Date()});
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const user = await UserModel.findByPk(req.params.userId);
    res.json(user);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.userId;
      const data = await this._validateData(req.body, id);
      await UserModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await UserModel.findByPk(id));
      await LogsController.create({action: "USER UPDATE", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await UserModel.destroy({
      where: {
        id: req.params.userId
      }
    });
    res.json({});
    await LogsController.create({action: "USER DELETE", date: new Date()});
  }

  _validateData = async (data, id) => {
    const attributes = ['name', 'age', 'sex', 'email', 'password'];
    const user = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      user[attribute] = data[attribute];
    }

    if (await this._checkIfEmailExists(user.email, id)) {
      throw new Error(`The user with mail address "${user.email}" already exists.`);
    }

    return user;
  }

  _checkIfEmailExists = async (email, id) => {
    const where = {
      email: email
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await UserModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new UsersController();
