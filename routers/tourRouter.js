const express = require('express');
const tourController = require('./../controllers/tourControllers');
const authController = require('./../controllers/authControllers');
const router = express.Router();

// router.param('id',tourController.checkID)
router.route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.GetAllTours)

router.route('/tour-stats').get(tourController.getTourStats)
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan)

router.route('/')
    .get( authController.protect ,tourController.GetAllTours)
    .post(tourController.createTour)

router.route('/:id')
    .get(tourController.getTourbyId)
    .patch(tourController.updateTour)
    .delete(
        authController.protect, 
        authController.restrictTo('admin','lead-guide'),
        tourController.deleteTour)

module.exports = router