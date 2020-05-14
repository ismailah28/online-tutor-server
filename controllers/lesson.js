const asyncHandler = require('express-async-handler');

const Lesson = require('../models/Lesson');
const User = require('../models/User');
const Subject = require('../models/Subject');
const Category = require('../models/Category');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Book lesson
// @route     POST /api/v1/lesson
// @access    Private/Student
exports.bookLesson = asyncHandler(async (req, res, next) => {
  let { categoryName, studentEmail } = req.body;
  const { subjectName, tutorEmail } = req.body;

  // subjectName = subjectName.toLowerCase();
  categoryName = categoryName.toLowerCase();

  if (
    !(
      categoryName === 'primary' ||
      categoryName === 'jss' ||
      categoryName === 'sss'
    )
  ) {
    return next(
      new ErrorResponse(
        `Category with name ${categoryName} does not exist`,
        400
      )
    );
  }
  const category = await Category.findOne({ name: categoryName });

  const subject = await Subject.findOne({
    category: category._id,
    name: subjectName,
  });

  if (!subject) {
    return next(
      new ErrorResponse(
        `Subject with name: ${subjectName} does not exist or don't belong to category ${categoryName}`,
        404
      )
    );
  }

  // check if request is made by student
  if (req.user.role === 'student') {
    studentEmail = req.user.email;
  }
  const student = await User.findOne({ email: studentEmail });
  const tutor = await User.findOne({ email: tutorEmail });

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

  // check if tutor teaches subject
  const tutorTakesSubject = tutor.subjects.filter((sub) =>
    sub._id.equals(subject._id)
  );

  if (!(tutorTakesSubject.length > 0)) {
    return next(
      new ErrorResponse(
        `Tutor with email '${tutorEmail}' don't take '${subjectName}' subject in '${categoryName}' category`,
        400
      )
    );
  }

  // create lesson
  let lesson = await Lesson.create({
    student: student._id,
    tutor: tutor._id,
    subject: subject._id,
  });

  lesson = await lesson
    .populate('student', 'firstName lastName email')
    .populate('tutor', 'firstName lastName email subjects')
    .populate('subject', 'name')
    .execPopulate();

  res.status(201).json({ success: true, data: lesson });
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
