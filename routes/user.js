const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
  getTutorByFirstName,
  getAllTutors,
  getTutorById,
  deactivateTutor,
  getAllTutorSubjects,
  makeTutorAdmin,
  makeAdminTutor,
} = require('../controllers/user');

const router = express.Router();

router.use(protect);

router.route('/').get(getTutorByFirstName);

router.route('/tutors').get(authorize('admin'), getAllTutors);
router.route('/tutors/subjects').get(authorize('tutor'), getAllTutorSubjects);

router
  .route('/tutors/:tutId')
  .get(authorize('admin'), getTutorById)
  .put(authorize('admin'), deactivateTutor);

router
  .route('/tutors/:tutId/make-admin')
  .put(authorize('admin'), makeTutorAdmin);

router.route('/make-tutor').put(authorize('admin'), makeAdminTutor);

module.exports = router;
