const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all categories
// @route     GET /api/v1/categories
// @access    Private
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({});

  res.status(200).json({ success: true, data: categories });
});

// @desc      Create category
// @route     POST /api/v1/categories
// @access    Private/Admin
exports.addCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  // Create category
  const category = await Category.create({ name, description });

  res.status(201).json({ success: true, data: category });
});

// @desc      Update category details
// @route     PUT /api/v1/categories/:catId
// @access    Private/Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    description: req.body.description,
  };

  const category = await Category.findByIdAndUpdate(
    req.params.catId,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: category });
});

// @desc      Delete category
// @route     DELETE /api/v1/categories/:id
// @access    Private/Admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.catId);

  if (!category)
    return next(
      new ErrorResponse(`Category with id ${req.params.catId} not found!`, 404)
    );

  await category.remove();

  res.status(200).json({ success: true, data: {} });
});
