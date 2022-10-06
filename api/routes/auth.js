const router = require('express').Router();
const AuthController = require('../controllers/AuthController');

router.get('/auth', AuthController.auth);

router.get('/verify', AuthController.verify);

module.exports = router;
