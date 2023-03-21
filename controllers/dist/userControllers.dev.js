"use strict";

var User = require('./../models/userModel');

var catchAsync = require('./../utils/catchAsync');

exports.GetAllUsers = catchAsync(function _callee(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          users = _context.sent;
          res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
              users: users
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});

exports.createUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this router is not found'
  });
};

exports.updateUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this router is not found'
  });
};

exports.getUserbyId = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this router is not found'
  });
};

exports.deleteUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this router is not found'
  });
};