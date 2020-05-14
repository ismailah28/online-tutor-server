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

router.use(authorize('admin'));

router.route('/tutors/:tutId').get(getTutorById).put(deactivateTutor);

router.route('/tutors/:tutId/make-admin').put(makeTutorAdmin);

router.route('/make-tutor').put(makeAdminTutor);

module.exports = router;
