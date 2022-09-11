const router = require('express').Router();
const FormatModel = require('../models/Format');
const formatsController = require('../controllers/FormatsController');

const validateFormatId = async (req, res, next) => {
  const format = await FormatModel.findByPk(req.params.formatsId);
  if (!format) {
    return res.status(404).json({ error: 'Format not found' });
  }
  next();
}

router.get('/formats', formatsController.index);

router.post('/formats', formatsController.create);

router.get('/formats/:formatsId', validateFormatId, formatsController.show);

router.put('/formats/:formatsId', validateFormatId, formatsController.update);

router.delete('/formats/:formatsId', validateFormatId, formatsController.delete);

module.exports = router;
