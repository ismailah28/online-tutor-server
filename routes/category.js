const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} = require('../controllers/category');

const router = express.Router();

router.use(protect);

router.route('/').post(authorize('admin'), addCategory).get(getCategories);
router
  .route('/:catId')
  .put(authorize('admin'), updateCategory)
  .delete(authorize('admin'), deleteCategory);

module.exports = router;
