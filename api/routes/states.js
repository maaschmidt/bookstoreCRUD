const router = require('express').Router();
const StateModel = require('../models/State');
const statesController = require('../controllers/StatesController');

const validateStateId = async (req, res, next) => {
  const state = await StateModel.findByPk(req.params.statesId);
  if (!state) {
    return res.status(404).json({ error: 'State not found' });
  }
  next();
}

router.get('/states', statesController.index);

router.post('/states', statesController.create);

router.get('/states/:statesId', validateStateId, statesController.show);

router.put('/states/:statesId', validateStateId, statesController.update);

router.delete('/states/:statesId', validateStateId, statesController.delete);

module.exports = router;
