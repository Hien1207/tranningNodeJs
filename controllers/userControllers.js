const AppError = require('../utils/appError');
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const factory = require('./handleFactory')

const filterObj = ( obj, ...allowedFileds) => {
    const newObj = {};
    Object.keys(obj).forEach(el =>{
        if(allowedFileds.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.GetAllUsers = factory.getAll(User)

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.updateMe = catchAsync( async (req, res, next) => {
    if(req.body.password || req.body.passwordConfirm){
        return next( new AppError(' This route is not for password update. Please use /updateMyPassword', 400))
    }

    const filteredBody = filterObj(req.body, 'name','email');
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new : true,
        runValidators: true,
    })

    res.status(200).json({
        status: 'success',
        data: {
            user : updatedUser
        }
    })
})

exports.deleteMe = catchAsync( async (req, res, bext) => {
    await User.findByIdAndUpdate(req.user.id, { active: false});
    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this router is not found'
    })
}
exports.getUserbyId = factory.getOne(User)
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)