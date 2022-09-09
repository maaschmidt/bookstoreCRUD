const md5 = require('md5');
const LogsController = require('../controllers/LogsController');

class LoginsController {

  validate = async (req, res, next) => {
    req.body.password = md5(req.body.password);
    let flag = true;
    for (const user of req.body.data) {
      if (user.password === req.body.password && user.email === req.body.email) {
        flag = false;
        res.send();
        await LogsController.create({action: `${user.email} LOGGED`, date: new Date()});
      } else {
        next()
      }
    }
    if (flag) {
      res.status(404);
    }
  }
}

module.exports = new LoginsController();
