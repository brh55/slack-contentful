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

// TODO: Implement Caching to only submit 1 update or find better method
var nodeCache = require('node-cache');
var entryCache = new nodeCache({checkperiod: 0});

app.post('/', jsonParser, function (req, res) {
    // if request doesn't contain body, respond with 400 error.
    if (!req.body) {
        return res.sendStatus(400);
    }

    var correctEntry = filter.checkEntry(req.body.sys.id);

    // check for publish notifications
    if (req.rawHeaders.indexOf('ContentManagement.Entry.publish') > -1 ||
            req.rawHeaders.indexOf('ContentManagement.Asset.publish') > -1 &&
            correctEntry) {
        var key = req.body.sys.id;

        if (entryCache.get(key) !== true) {
            var message = messageCtrl.buildMessage(req.body);
            slackService.sendMessage(message);
            // Store Entries in ID-Revison#: true -- for 10 Minutes
            entryCache.set(key, true, 600);
        }
    }
});

app.get('/check', function (req, res) {
    if (util.allDefined(config)) {
        var entries = filter.getEntryString();
        var htmlString = '<h1>Successful Set-up</h1><h3>Please verify settings below</h3>';
        htmlString += '<table style="border: 1px solid; font-family: arial;"><tr style="background: #92cbdc"><td style="padding: 10px;">Channel</td><td style="padding: 10px;">Bot Username</td><td style="padding: 10px;">Entries Tracked</td><td style="padding: 10px;">Contentful Locale</td></tr><tr><td style="padding: 10px;">' + config.channel + '</td><td style="padding: 10px;">' + config.username + '</td><td style="padding: 10px;">' + entries + '</td><td style="padding: 10px;">' + config.locale + '</td></tr></table>';
        res.send(htmlString);
    } else {
        var undefConfigs = util.getUndefinedKeys(config, ', ');
        // TODO: List out non-sensitive configs for better debugging
        res.send('<h1>Please verify the following configs:</h1>' + undefConfigs);
    }
});

app.listen(port, function () {
    console.log('Slack Contentful is listening on PORT:', port);
});

module.exports = process.env.SLACK_CONTENTFUL_COVERAGE
  ? require('./libs-cov/filter')
  : require('./libs-cov/filter')

