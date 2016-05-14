'use strict';

// Default Set-up
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// Libs
var util = require('./helpers/util');
var config = require('./config');
var slackService = require('./services/slack');
var messageCtrl = require('./controllers/message');
var filter = require('./helpers/filter');

// Routes
var notifyRoute = require('./routes/notify');
var debugRoute = require('./routes/debug');

app.use('/', notifyRoute);
app.use('/debug', debugRoute);

app.listen(port, function () {
    console.log('Slack Contentful is listening on PORT:', port);
});
