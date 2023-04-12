const AppError = require('../utils/appError');
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const factory = require('./handleFactory')
const multer = require('multer')
const sharp = require('sharp')

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img/users');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//     }
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only image'));
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({
            quality: 90
        })
        .toFile(`public/img/users/${req.file.filename}`);
    next();
});

const filterObj = (obj, ...allowedFileds) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFileds.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.GetAllUsers = factory.getAll(User)

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError(' This route is not for password update. Please use /updateMyPassword', 400))
    }

    const filteredBody = filterObj(req.body, 'name', 'email');
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
})

exports.deleteMe = catchAsync(async (req, res, bext) => {
    await User.findByIdAndUpdate(req.user.id, {
        active: false
    });
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