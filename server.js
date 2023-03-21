const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 3000;

dotenv.config({
    path: './.env'
})

mongoose.connect(process.env.MONGODB_URL, {
    //   useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`App running on port ${port}...`)
    })
});