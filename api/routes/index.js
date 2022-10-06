const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const states = require('./states');
const cities = require('./cities');
const categories = require('./categories');
const publishers = require('./publishers');
const books = require('./books');
const login = require('./login');
const format = require('./formats');
const auth = require('./auth');

router.use(cors());

router.use(users);
router.use(states);
router.use(cities);
router.use(categories);
router.use(publishers);
router.use(books);
router.use(login);
router.use(format);
router.use(auth);

module.exports = router;
