"use strict";

var express = require('express');

var tourController = require('./../controllers/tourControllers');

var authController = require('./../controllers/authControllers');

var router = express.Router(); // router.param('id',tourController.checkID)

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.GetAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router.route('/').get(authController.protect, tourController.GetAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTourbyId).patch(tourController.updateTour)["delete"](tourController.deleteTour);
module.exports = router;