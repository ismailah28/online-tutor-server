const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} = require('../controllers/category');

const {
  addSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
} = require('../controllers/subject');

const {
  deleteRegisteredSubject,
  tutorRegisterSubject,
} = require('../controllers/user');

const router = express.Router();

router.use(protect);

router.route('/').post(authorize('admin'), addCategory).get(getCategories);
router
  .route('/:catId')
  .put(authorize('admin'), updateCategory)
  .delete(authorize('admin'), deleteCategory);

router
  .route('/:catId/subjects')
  .post(authorize('admin'), addSubject)
  .get(getSubjects);

router
  .route('/:catId/subjects/:subId')
  .get(getSubject)
  .put(authorize('admin'), updateSubject)
  .delete(authorize('admin'), deleteSubject);

router
  .route('/:catId/subjects/:subId/register')
  .put(authorize('tutor'), tutorRegisterSubject);
router
  .route('/:catId/subjects/:subId/delete')
  .put(authorize('tutor'), deleteRegisteredSubject);

module.exports = router;
