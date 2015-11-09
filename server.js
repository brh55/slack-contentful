'use strict';

// Default Set-up
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// Additional Libs
var bodyParser = require('body-parser');
var nodeCache = require('node-cache');
var Promise = require("bluebird");

var jsonParser = bodyParser.json({type: 'application/*'});
var messageController = require('./libs/messageController');
var appCache = new nodeCache({checkperiod: 0});

app.post('/', jsonParser, function(req, res) {
    var currentField = req.body.fields;
    var prevField = appCache.get('fields');

    // if request doesn't contain body, respond with 400 error.
    if (!req.body) return res.sendStatus(400);

    // check for publish notifications
    if (req.rawHeaders.indexOf('ContentManagement.Entry.publish') > 1
            && req.body.sys.id === "6aFz3qcuPe0eA8kwQm0Ume") {

        if (typeof prevField === 'undefined') {
            appCache.set('fields', currentField);
        }
        messageController.parseResponse(req.body);
    }
});

app.listen(port, function() {
    console.log('Slack Contentful is listening on ', port);
});
