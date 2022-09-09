const router = require('express').Router();
const CityModel = require('../models/City')
const citiesController = require('../controllers/CitiesController');

const validateCityId = async (req, res, next) => {
  const city = await CityModel.findByPk(req.params.citiesId);
  if (!city) {
    return res.status(404).json({ error: 'City not found' });
  }
  next();
}

router.get('/cities', citiesController.index);

router.post('/cities', citiesController.create);

router.get('/cities/:citiesId', validateCityId, citiesController.show);

router.put('/cities/:citiesId', validateCityId, citiesController.update);

router.delete('/cities/:citiesId', validateCityId, citiesController.delete);

module.exports = router;
