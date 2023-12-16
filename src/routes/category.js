const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/:id', categoryController.getCategoryById);
router.post('/new', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.get('/', categoryController.getAllCategories);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
