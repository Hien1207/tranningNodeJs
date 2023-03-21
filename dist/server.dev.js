"use strict";

var app = require('./app');

var mongoose = require('mongoose');

var dotenv = require('dotenv');

var port = 3000;
dotenv.config({
  path: './.env'
});
mongoose.connect(process.env.MONGODB_URL, {
  //   useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('Connected to MongoDB');
  app.listen(port, function () {
    console.log("App running on port ".concat(port, "..."));
  });
});