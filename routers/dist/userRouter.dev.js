"use strict";

var express = require('express');

var userController = require('./../controllers/userControllers');

var authController = require('./../controllers/authControllers');

var router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.route('/').get(userController.GetAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUserbyId).patch(userController.updateUser)["delete"](userController.deleteUser);
module.exports = router;