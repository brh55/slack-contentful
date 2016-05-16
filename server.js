'use strict';

// Default Set-up
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// Routes
var notifyRoute = require('./routes/notify');
var debugRoute = require('./routes/debug');

app.use('/', notifyRoute);
app.use('/debug', debugRoute);

app.listen(port, function () {
    console.log('Slack Contentful is listening on PORT:', port);
});
