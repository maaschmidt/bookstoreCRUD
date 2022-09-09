const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const states = require('./states');
const cities = require('./cities');
const categories = require('./categories');
const publishers = require('./publishers');
const books = require('./books');
const logs = require('./logs');
const login = require('./login')

router.use(cors());

router.use(users);
router.use(states);
router.use(cities);
router.use(categories);
router.use(publishers);
router.use(books);
router.use(logs);
router.use(login);

module.exports = router;
