const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Category = require('../models/Category');
const Subject = require('../models/Subject');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Search tutor by first name
// @route     POST /api/v1/tutors?name=name
// @access    Private/Admin
exports.getTutorByFirstName = asyncHandler(async (req, res, next) => {
  const { name } = req.query;

  const tutors = await User.find({
    firstName: { $regex: new RegExp(`^${name.trim()}`), $options: 'i' },
    role: 'tutor',
  }).sort({
    firstName: 1,
  });
  res.status(200).json({ success: true, data: tutors });
});

// @desc      Get all tutors
// @route     POST /api/v1/users/tutors
// @access    Private/Admin
exports.getAllTutors = asyncHandler(async (req, res, next) => {
  const tutors = await User.find({ role: 'tutor' });

  res.status(200).json({ success: true, data: tutors });
});

// @desc      Get tutor by Id
// @route     GET /api/v1/user/tutor/:tutId
// @access    Private/Admin
exports.getTutorById = asyncHandler(async (req, res, next) => {
  const tutor = await User.findById(req.params.tutId);

  // check if tutor exists
  if (!tutor) {
    return next(
      new ErrorResponse(`Tutor with id ${req.params.tutId} does not exit!`, 400)
    );
  }

  // check if user is a tutor
  if (tutor.role !== 'tutor')
    return next(new ErrorResponse('user is not a tutor', 400));

  res.status(200).json({ success: true, data: tutor });
});

// @desc      Put deactivate tutor
// @route     PUT /api/v1/user/tutor/:tutId
// @access    Private/Admin
exports.deactivateTutor = asyncHandler(async (req, res, next) => {
  let tutor = await User.findOne({ _id: req.params.tutId, role: 'tutor' });
  if (!tutor) {
    return next(
      new ErrorResponse(`Tutor with Id: ${req.params.tutId} does not exist`)
    );
  }

  tutor = await User.findOneAndUpdate(
    { _id: req.params.tutId, role: 'tutor' },
    { isActive: false },
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true, data: tutor });
});

// @desc      Put register tutor to take a subject
// @route     PUT /api/v1/category/:catId/subject/:subId/register
// @access    Private/Admin, Tutor
exports.tutorRegisterSubject = asyncHandler(async (req, res, next) => {
  // check if user is admin and a tutor
  if (req.user.isAdmin && !req.user.role === 'tutor') {
    return next(
      ErrorResponse('Admin needs to be a tutor to take a course', 400)
    );
  }

  const category = await Category.findById(req.params.catId);
  if (!category)
    return next(
      new ErrorResponse(
        `Category with Id: ${req.params.catId} does not exist!`,
        404
      )
    );

  let subject = await Subject.findById(req.params.subId);

  if (!subject) {
    return next(
      new ErrorResponse(
        `Subject with Id: ${req.params.subId} does not exist!`,
        404
      )
    );
  }

  subject = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { subjects: req.params.subId },
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true, data: subject });
});

// @desc      Get all subjects tutor takes
// @route     GET /api/v1/users/tutors/subjects
// @access    Private/Tutor
exports.getAllTutorSubjects = asyncHandler(async (req, res, next) => {
  const subjects = await User.find({ _id: req.user._id });

  res.status(200).json({ success: true, data: subjects[0].subjects });
});

// @desc      Put Delete registered subject tutor
// @route     PUT /api/v1/category/:catId/subject/:subId/delete
// @access    Private/Tutor
exports.deleteRegisteredSubject = asyncHandler(async (req, res, next) => {
  // check if tutor takes subject
  const tut = await User.findOne({
    _id: req.user._id,
    subjects: { $in: [req.params.subId] },
  });

  if (!tut) {
    return next(
      new ErrorResponse(
        `Subject with Id: ${req.params.subId} not taken by tutor`
      )
    );
  }

  const subjects = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { subjects: req.params.subId },
    },
    { new: true }
  );

  res.status(200).json({ success: true, data: subjects });
});

// @desc      Make tutor admin
// @route     PUT /api/v1/users/tutors/:tutId/make-admin
// @access    Private/Admin
exports.makeTutorAdmin = asyncHandler(async (req, res, next) => {
  let tutor = await User.findOne({ _id: req.params.tutId, role: 'tutor' });

  if (!(tutor && tutor.isActive))
    return next(
      new ErrorResponse(
        `Tutor with id ${req.params.tutId} does'nt exist or is not active.`,
        404
      )
    );

  tutor = await User.findOneAndUpdate(
    { _id: req.params.tutId, role: 'tutor' },
    { isAdmin: true },
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true, data: tutor });
});

// @desc      Admin can become tutor
// @route     PUT /api/v1/users/tutors/make-tutor
// @access    Private/Tutor
exports.makeAdminTutor = asyncHandler(async (req, res, next) => {
  const admin = await User.findOneAndUpdate(
    { _id: req.user._id, isAdmin: true },
    { role: 'tutor' },
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true, data: admin });
});
