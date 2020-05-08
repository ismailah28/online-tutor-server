const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const Subject = require('../models/Subject');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Create subject
// @route     POST /api/v1/categories/:catId/subjects
// @access    Private/Admin
exports.addSubject = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  const cat = await Category.findById(req.params.catId);
  if (!cat) return next(new ErrorResponse('Invalid category provided', 404));

  // Create subject
  const subject = await Subject.create({
    name,
    description,
    category: req.params.catId,
  });

  res.status(201).json({ success: true, data: subject });
});

// @desc      Get all subjects in a category by id
// @route     GET /api/v1/categories/:catId/subjects
// @access    Private
exports.getSubjects = asyncHandler(async (req, res, next) => {
  const subjects = await Subject.find({ category: req.params.catId });

  res.status(200).json({ success: true, data: subjects });
});

// @desc      Get subject in a category by id
// @route     GET /api/v1/categories/:catId/subjects/:subId
// @access    Private
exports.getSubject = asyncHandler(async (req, res, next) => {
  const subject = await Subject.findOne({
    _id: req.params.subId,
    category: req.params.catId,
  });

  res.status(200).json({ succes: true, data: subject });
});

// @desc      Update subject in a category by id
// @route     PUT /api/v1/categories/:catId/subjects/:subId
// @access    Private Admin
exports.updateSubject = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  const cat = await Category.findById(req.params.catId);
  if (!cat) return next(new ErrorResponse('Invalid category provided', 404));

  const fieldToUpdate = {
    name,
    description,
  };
  const subject = await Subject.findByIdAndUpdate(
    req.params.subId,
    fieldToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({ success: true, data: subject });
});

// @desc      Delete subject in a category by id
// @route     Delete /api/v1/categories/:catId/subjects/:subId
// @access    Private
exports.deleteSubject = asyncHandler(async (req, res, next) => {
  const cat = await Category.findById(req.params.catId);
  if (!cat) return next(new ErrorResponse('Invalid category provided', 404));

  await Subject.findByIdAndDelete(req.params.subId);

  res.status(200).json({ success: true, data: {} });
});

// @desc      Search subject in a category by name
// @route     Get /api/v1/subject?name=name
// @access    Private
exports.getSubjectsByName = asyncHandler(async (req, res, next) => {
  const { name } = req.query;
  const subjects = await Subject.find({ $text: { $search: name } }).sort({
    name: 1,
  });

  res.status(200).json({ success: true, data: subjects });
});
