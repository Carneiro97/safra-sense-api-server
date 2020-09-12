const express = require('express');
const app = express();
const morgan = require('morgan'); // our terminal log package
const bodyParser = require('body-parser'); // our data parsing helper package
const mongoose = require('mongoose'); // our database helper package

const empresaRoutes = require('./api/routes/empresas');
const sentimentoRoutes = require('./api/routes/sentimento');

// mongoose.connect(
//     'mongodb+srv://safra-sense:' +
//     process.env.MONGO_ATLAS_PW +
//     '@safra-sense.amxfu.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })

    mongoose.connect(
        'mongodb+srv://safra-sense:pass@safra-sense.amxfu.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.headers('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/empresas', empresaRoutes)
app.use('/sentimento', sentimentoRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// any type of errors handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;