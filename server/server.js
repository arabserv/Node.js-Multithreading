//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

'use strict';
require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var { mongoose } = require('./db/mongoose');
var { routerApi } = require('./routes/api');
var { csrf, csrf_Error_Handler } = require('./middleware/csrf');
var { CROS } = require('./middleware/CROS');
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;
    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // Code to run if we're in a worker process
} else {
    const port = process.env.PORT;
    var app = express();

    // --------------------------------------
    /* Start - Top Level Middlewares */
    app.use(bodyParser.json());
    /* End - Top Level Middlewares */
    // --------------------------------------
    /* Start - API Middlewares */
    app.use('/api', CROS);
    app.use('/api', routerApi);
    /* End - API Middlewares */
    // --------------------------------------
    /* Start - Website Middlewares */
    app.use(cookieParser());
    app.use(csrf({ cookie: true }));
    app.use(csrf_Error_Handler);
    /* End - Website Middlewares */
    // --------------------------------------

    app.use('/', express.static(__dirname + '/public/dist/Mawso3ahDashboard'));
    app.use('/*', express.static(__dirname + '/public/dist/Mawso3ahDashboard'));
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/dist/Mawso3ahDashboard/index.html'));
    });
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/dist/Mawso3ahDashboard/index.html'));
    });

    app.listen(port, () => {
        console.log(`Started up at port ${port}`);
    });

    module.exports = { app };
}

// Listen for dying workers
cluster.on('exit', function (worker) {
    console.log('Worker %d died :(', worker.id);
    cluster.fork();
});

