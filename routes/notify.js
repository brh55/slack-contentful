// Default/Notify Route
// This route serves as the main route for notifying through Slack
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var filter = require('../helpers/filter');
var config = require('../config');
var messageCtrl = require('../controllers/message');
var slackService = require('../services/slack');

var jsonParser = bodyParser.json({type: 'application/*'});

router.post('/', jsonParser, function (req, res) {
    // If request doesn't contain body, respond with 400 error.
    if (!req.body) {
        return res.sendStatus(400);
    }

    var correctEntry = filter.checkEntry(req.body.sys.id);
    var message = '';

    // Specific management can be managed through the Contentful webhook settings
    if (config.trackAll) {
        // If all entries want to be tracked and notified
        message = messageCtrl.buildMessage(req.body, req.headers['x-contentful-topic']);
    } else if (correctEntry) {
        // Filter out only desired entries
        message = messageCtrl.buildMessage(req.body, req.headers['x-contentful-topic']);
    }

    if (message !== '') {
        slackService.sendMessage(message);
    }

    res.sendStatus(200);
});

module.exports = router;
