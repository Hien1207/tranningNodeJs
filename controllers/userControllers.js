const AppError = require('../utils/appError');
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')

const filterObj = ( obj, ...allowedFileds) => {
    const newObj = {};
    Object.keys(obj).forEach(el =>{
        if(allowedFileds.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.GetAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
})

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

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this router is not found'
    })
}
exports.getUserbyId = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this router is not found'
    })
}

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this router is not found'
    })
}