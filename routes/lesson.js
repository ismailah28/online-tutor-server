const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
  bookLessonByAdmin,
  getAllLessons,
  getLessonById,
  updateLessonById,
  deleteLesson,
} = require('../controllers/lesson');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/').post(bookLessonByAdmin).get(getAllLessons);

router
  .route('/:lessonId')
  .get(getLessonById)
  .put(updateLessonById)
  .delete(deleteLesson);

module.exports = router;
