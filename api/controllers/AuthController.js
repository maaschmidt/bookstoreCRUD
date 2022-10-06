const UserModel = require('../models/User');
const md5 = require('md5')

class AuthController {

  _data = async (req) => {
    let authorization = req.headers.authorization + ''
    authorization = authorization.replace("Basic ", '');
    let ascii = Buffer.from(authorization, 'base64').toString('ascii');
    let dados = ascii.split(':');
    return dados;
  }
  _authentication = async (dados) => {
    try {
      let email = dados[0];
      let password = dados[1];
      let logado = await UserModel.findOne({ where: { email: email, password: password } });
      return logado;
    } catch (error) {
      return error;
    }
  }

  auth = async (req, res, next) => {
    const data = await this._data(req);
    data[1] = md5(data[1]);
    const auth = await this._authentication(data);
    res.json(auth);
  }

  verify = async (req, res, next) => {
    const data = await this._data(req);
    const verify = (await this._authentication(data));
    res.json(verify);
  }
}

module.exports = new AuthController();
