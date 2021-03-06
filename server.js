const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
require('colors');

// Load environment variables
require('dotenv').config();

// route files
const indexRouter = require('./routes');
const auth = require('./routes/auth');
const category = require('./routes/category');
const subject = require('./routes/subject');
const user = require('./routes/user');
const lesson = require('./routes/lesson');

const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Enable CORS
app.use(cors());

// mount routers
app.use('/', indexRouter);
app.use('/api/v1/auth', auth);
app.use('/api/v1/categories', category);
app.use('/api/v1/subject', subject);
app.use('/api/v1/users', user);
app.use('/api/v1/lesson', lesson);

// central error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandle promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
