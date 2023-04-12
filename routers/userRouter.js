const express = require('express');
const userController = require('./../controllers/userControllers');
const authController = require('./../controllers/authControllers');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get('/me', userController.getMe, userController.getUserbyId);
router.patch('/updateMe', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'))

router
  .route('/')
  .get(userController.GetAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUserbyId)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;