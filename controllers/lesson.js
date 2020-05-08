const asyncHandler = require('express-async-handler');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Book lesson
// @route     POST /api/v1/lesson
// @access    Private/Student
exports.bookLessonByAdmin = asyncHandler(async (req, res, next) => {
  const student = await User.findOne({ email: req.body.studentEmail });
  const tutor = await User.findOne({ email: req.body.tutorEmail });

  if (!student) {
    return next(
      new ErrorResponse(
        `Student with email: ${req.body.studentEmail} does not exist!`,
        404
      )
    );
  }
  if (!tutor) {
    return next(
      new ErrorResponse(
        `Tutor with email: ${req.body.tutorEmail} does not exist!`,
        404
      )
    );
  }

  const lesson = await Lesson.create({
    student: student._id,
    tutor: tutor._id,
  });

  res.status(201).json({ success: true, data: lesson });
});

// @desc      Book lesson
// @route     POST /api/v1/user/tutor/:tutId/book
// @access    Private/Student
exports.bookLessonByStudent = asyncHandler(async (req, res, next) => {
  const tutor = await User.findById(req.params.tutId);

  // check if tutor exists
  if (!tutor._id) {
    return next(
      new ErrorResponse(`Tutor with id:${req.params.tutId} does not exit!`, 404)
    );
  }

  // check if tutor is active
  if (!tutor.isActive) {
    return next(
      new ErrorResponse(`Tutor with id:${req.params.tutId} is not active`, 404)
    );
  }

  // proceed and book lesson
  const student = await Lesson.create({
    tutor: req.params.tutId,
    student: req.user._id,
  });

  res.status(201).json({ success: true, data: student });
});

// @desc      Get all lessons
// @route     POST /api/v1/lesson
// @access    Private/Admin
exports.getAllLessons = asyncHandler(async (req, res, next) => {
  const lessons = await Lesson.find({});

  res.status(200).json({ success: true, data: lessons });
});

// @desc      Get lesson by Id
// @route     POST /api/v1/lesson/:lessonId
// @access    Private/Admin
exports.getLessonById = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.find({ _id: req.params.lessonId });

  res.status(200).json({ success: true, data: lesson });
});

// @desc      Update lesson by Id
// @route     Put /api/v1/lesson/:lessonId
// @access    Private/Admin
exports.updateLessonById = asyncHandler(async (req, res, next) => {
  const { studentEmail, tutorEmail } = req.body;

  const student = await User.findOne({ email: studentEmail });
  const tutor = await User.findOne({ email: tutorEmail });

  let lesson = await Lesson.findById(req.params.lessonId);

  if (!lesson)
    return next(
      new ErrorResponse(`Lesson with id ${req.params.lessonId} does not exist.`)
    );

  const fieldToUpdate = {
    student: student._id,
    tutor: tutor._id,
  };
  lesson = await Lesson.findByIdAndUpdate(req.params.lessonId, fieldToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: lesson });
});

// @desc      Delete lesson by Id
// @route     Put /api/v1/lesson/:lessonId
// @access    Private/Admin
exports.deleteLesson = asyncHandler(async (req, res, next) => {
  await Lesson.findByIdAndDelete(req.params.lessonId);

  res.status(200).json({ success: true, data: {} });
});
