require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const classesRouter = require('./components/classes');
const userClassRouter = require('./components/userclass');
const usersRouter = require('./components/users');
const adminRouter = require('./components/admins');
const authRouter = require('./components/auth');
const authenticate = require('./middlewares/authentication');
const app = express();
const connectDb = require('./config/connectDb');
connectDb();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var whitelist = [
  'http://localhost:3001',
  'https://admin-classroom.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(authenticate);
app.use('/api/classes', classesRouter);
app.use('/api/userclass', userClassRouter);
app.use('/api/users', usersRouter);
app.use('/api/admins', adminRouter);
app.use('/api', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 400);
  res.json({
    isSuccess: false,
    message: err.message
  });
});

module.exports = app;
