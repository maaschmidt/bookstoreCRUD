const router = require('express').Router();
const CategorieModel = require('../models/Category');
const categoriesController = require('../controllers/CategoriesController');

const validateCategorieId = async (req, res, next) => {
  const categorie = await CategorieModel.findByPk(req.params.categoriesId);
  if (!categorie) {
    return res.status(404).json({ error: 'Categorie not found' });
  }
  next();
}

router.get('/categories', categoriesController.index);

router.post('/categories', categoriesController.create);

router.get('/categories/:categoriesId', validateCategorieId, categoriesController.show);

router.put('/categories/:categoriesId', validateCategorieId, categoriesController.update);

router.delete('/categories/:categoriesId', validateCategorieId, categoriesController.delete);

module.exports = router;
