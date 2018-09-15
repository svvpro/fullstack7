const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');

const carRouter = require('./routes/car');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');

app.use('/uploads', express.static('uploads'));

mongoose.connect(keys.mongoUrl, { useNewUrlParser: true })
    .then(() => console.log('Mongodb is connected...'))
    .catch((error) => console.error(error));


// app.use(require('cors'));
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('/api/cars', carRouter);
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);


module.exports = app;