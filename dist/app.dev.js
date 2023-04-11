"use strict";

var path = require('path');

var express = require('express');

var fs = require('fs');

var app = express();

var morgan = require('morgan');

var rateLimit = require('express-rate-limit');

var helmet = require('helmet');

var mongoSanitize = require('express-mongo-sanitize');

var xss = require('xss-clean');

var hpp = require('hpp');

var cookieParser = require('cookie-parser');

var cors = require('cors');

var AppError = require('./utils/appError');

var globalErrorHandle = require('./controllers/errorControllers');

var tourRouter = require('./routers/tourRouter');

var userRouter = require('./routers/userRouter');

var reviewRouter = require('./routers/reviewRouter');

var viewRouter = require('./routers/viewRouter');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.options('*', cors());
app.use(express["static"](path.join(__dirname, 'public')));
app.use(morgan('dev')); //set security HTTP headers

app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: {
    allowOrigins: ['*']
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['*'],
      scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"]
    }
  }
})); //Development logging

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} //limit request from same API


var limiter = rateLimit({
  max: 100,
  windowns: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!'
});
app.use('/api', limiter); //Body parser, reading data from body into req.body

app.use(express.json({
  limit: '10kb'
}));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({
  whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}));
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  console.log('hiiiii');
  next();
}); // app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the server...',
//     app: 'hellooo',
//   });
// });

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
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