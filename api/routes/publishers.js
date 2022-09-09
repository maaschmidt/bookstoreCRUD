const router = require('express').Router();
const PublisherModel = require('../models/Publisher');
const publishersController = require('../controllers/PublishersController');

const validatePublisherId = async (req, res, next) => {
  const publisher = await PublisherModel.findByPk(req.params.publishersId);
  if (!publisher) {
    return res.status(404).json({ error: 'Publisher not found' });
  }
  next();
}

router.get('/publishers', publishersController.index);

router.post('/publishers', publishersController.create);

router.get('/publishers/:publishersId', validatePublisherId, publishersController.show);

router.put('/publishers/:publishersId', validatePublisherId, publishersController.update);

router.delete('/publishers/:publishersId', validatePublisherId, publishersController.delete);

module.exports = router;
