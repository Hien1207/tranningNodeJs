"use strict";

var express = require('express');

var fs = require('fs');

var app = express();

var morgan = require('morgan');

var AppError = require('./utils/appError');

var globalErrorHandle = require('./controllers/errorControllers');

var tourRouter = require('./routers/tourRouter');

var userRouter = require('./routers/userRouter');

app.use(morgan('dev'));
app.use(express.json());
app.use(express["static"]("".concat(__dirname, "/public")));
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
});
app.get('/', function (req, res) {
  res.status(200).json({
    message: "Hello from the server...",
    app: 'hellooo'
  });
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', function (req, res, next) {
  // res.status(404).json({
  //     status: 'fail',
  //     message: `Can't find ${req.originalUrl} on this server!!!`
  // })
  // const err = new Error(`Can't find ${req.originalUrl} on this server!!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError("Can't find ".concat(req.originalUrl, " on this server!!")));
});
app.use(globalErrorHandle);
module.exports = app;