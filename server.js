'use strict';

// Default Set-up
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// Libs
var bodyParser = require('body-parser');
var util = require('./libs/util');
var config = require('./libs/config');
var slackService = require('./libs/slackService');
var messageCtrl = require('./libs/messageCtrl');
var filter = require('./libs/filter');

var jsonParser = bodyParser.json({type: 'application/*'});

// Routes
var notifyRoute = require('/routes/notify');
var debugRoute = require('/routes/debug');

app.use('/', notifyRoute);
app.use('/debug', debugRoute);

app.listen(port, function () {
    console.log('Slack Contentful is listening on PORT:', port);
});
