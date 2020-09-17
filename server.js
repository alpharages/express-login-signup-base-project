const http = require('http');
const express = require('express');
var cors = require('cors');
require('dotenv').config();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const port = process.env.PORT;


// creating connection and connecting to db
let connectionString = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});


// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// routes
app.use('/', routes);


// Error handling for the unmatched route requests
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: true,
        message: error.message
    });
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


module.exports = app;
