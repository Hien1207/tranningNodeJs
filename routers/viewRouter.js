const express = require('express')
const viewController = require('../controllers/viewsControllers');
const router = express.Router();

router.get('/', viewController.getOverview)

router.get('/tour', viewController.getTour)

module.exports = router