const express = require('express');
const index = require('../controllers');

const indexRouter = express.Router();

indexRouter.get('/', index);

module.exports = indexRouter;
