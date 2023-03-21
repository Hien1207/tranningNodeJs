const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const AppError = require('./utils/appError')
const globalErrorHandle = require('./controllers/errorControllers')
const tourRouter = require('./routers/tourRouter')
const userRouter = require('./routers/userRouter')

app.use(morgan('dev'))

//set security HTTP headers
app.use(helmet())

//Development logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
} 

//limit request from same API
const limiter = rateLimit({
    max: 100,
    windowns: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!'
});
app.use('/api',limiter)

//Body parser, reading data from body into req.body
app.use(express.json({ limit : '10kb'}));

app.use(mongoSanitize())

app.use(xss())

app.use(hpp({
    whitelist: ['duration','ratingsQuantity','ratingsAverage','maxGroupSize','difficulty','price']
}))

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.get('/', (req, res) => {
    res.status(200)
        .json({
            message: "Hello from the server...",
            app: 'hellooo'
        })
})

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server!!!`
    // })
    // const err = new Error(`Can't find ${req.originalUrl} on this server!!`);
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} on this server!!`));
})

app.use(globalErrorHandle)

module.exports = app;