const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
  bookLesson,
  getAllLessons,
  getLessonById,
  updateLessonById,
  deleteLesson,
} = require('../controllers/lesson');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(authorize('admin', 'student'), bookLesson)
  .get(authorize('admin'), getAllLessons);

router.use(authorize('admin'));

router
  .route('/:lessonId')
  .get(getLessonById)
  .put(updateLessonById)
  .delete(deleteLesson);

module.exports = router;
