const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const tableRouter = require('./routers/tables.js');

const initApp = async () => {
    const app = express();

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(cors({
        origin: process.env.CORS_ORIGIN
    }));
    app.use(morgan('dev'));


    app.use('/', tableRouter);

    app.listen(process.env.port, () => {
        console.log(`Listening on port ${process.env.port}`);
    });

    module.exports = app;
};

initApp().catch(err => {
    console.log(err);
});