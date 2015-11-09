'use strict';

// Default Set-up
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// Additional Libs
var bodyParser = require('body-parser');
var nodeCache = require('node-cache');
var Promise = require("bluebird");
var util = require('./libs/util');
var slackService = require('./libs/slackService');

var jsonParser = bodyParser.json({type: 'application/*'});
var messageController = require('./libs/messageController');
var appCache = new nodeCache({checkperiod: 0});

app.post('/', jsonParser, function(req, res) {
    var currentField = req.body.fields;
    var prevField = appCache.get('fields');

    // if request doesn't contain body, respond with 400 error.
    if (!req.body) return res.sendStatus(400);

    var message = util.buildMessage(req.body);
    slackService.sendMessage(message);

    var correctEntry = util.checkEntry(req.body.sys.id);

    // check for publish notifications
    if (req.rawHeaders.indexOf('ContentManagement.Entry.publish') > 1
            && correctEntry) {

        var message = util.buildMessage(req.body);
        slackService.sendMessage(message);
        // if (typeof prevField === 'undefined') {
        //     appCache.set('fields', currentField);
        // }

        // messageController.parseResponse(req.body);
    }
});

// app.post('/', jsonParser, function(req, res) {
//     console.log(req.body.sys.space);
// });

app.listen(port, function() {
    console.log('Slack Contentful is listening on ', port);
});
