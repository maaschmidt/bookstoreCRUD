const router = require('express').Router();
const CategoryModel = require('../models/Category');
const categoriesController = require('../controllers/CategoriesController');

const validateCategoryId = async (req, res, next) => {
  const category = await CategoryModel.findByPk(req.params.categoriesId);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  next();
}

router.get('/categories', categoriesController.index);

router.post('/categories', categoriesController.create);

router.get('/categories/:categoriesId', validateCategoryId, categoriesController.show);

router.put('/categories/:categoriesId', validateCategoryId, categoriesController.update);

router.delete('/categories/:categoriesId', validateCategoryId, categoriesController.delete);

module.exports = router;
