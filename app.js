var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//load environment variables from .env (.env is the default file)
require("dotenv").config();


var { mongooseConnect } = require('./mongoose.js');
mongooseConnect();
//register routes.
//NOTE: notice how there is .js after index, this is because
// we exported the module as index. 
var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//set up logger and cookie parser 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//allows use to load static files from public 
app.use(express.static(path.join(__dirname, 'public')));


//register routes 
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

// //if bin file missing:
// //add this at the top:
// const PORT = process.env.PORT || 5002;
// //And this here:
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// })

module.exports = app;