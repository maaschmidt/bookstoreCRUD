const router = require('express').Router();
const loginController = require('../controllers/LoginsController');

router.post('/', loginController.validate);

module.exports = router;
