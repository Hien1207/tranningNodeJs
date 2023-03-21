const AppError = require("../utils/appError")

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400);
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}

const handleJWTError = () => new AppError('Invalid token.Please log in again!', 401)

const handleJWTExpireError = () => new AppError('Your token has expired. Please log in again.', 401)

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        console.log('ERROR', err);
        res.status(500).json({
            status: 'error',
            message: 'Somthing went very wrong'
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV !== 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV !== 'production') {
        let error = {
            ...err
        }
        if (error.name === 'CastError') error = handleCastErrorDB(error)
        if (error.code === 11000) error = handleDuplicateErrorDB(error)
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error)
        if (error.name === 'JsonWebTokenError') error = handleJWTError()
        if (error.name === 'TokenExpiredError') error = handleJWTExpireError()

        sendErrorProd(error, res)
    }
}