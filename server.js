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
var messageCtrl = require('./libs/messageCtrl')
var filter = require('./libs/filter');

var jsonParser = bodyParser.json({type: 'application/*'});

// TODO: Implement Caching to only submit 1 update or find better method
//var nodeCache = require('node-cache');
//var appCache = new nodeCache({checkperiod: 0});

app.post('/', jsonParser, function(req, res) {
    var currentField = req.body.fields;
    //var prevField = appCache.get('fields');

    // if request doesn't contain body, respond with 400 error.
    if (!req.body) return res.sendStatus(400);

    var correctEntry = filter.checkEntry(req.body.sys.id);
    // check for publish notifications
    if (req.rawHeaders.indexOf('ContentManagement.Entry.publish') > -1
            && correctEntry) {

        var message = messageCtrl.buildMessage(req.body);
        console.log(message);
        slackService.sendMessage(message);
        // if (typeof prevField === 'undefined') {
        //     appCache.set('fields', currentField);
        // }
    }
});

app.get('/check', function(req, res) {
    if (!util.allDefined(config)) {
        var undefConfigs = util.getUndefinedKeys(config, ', ');
        // TODO: List out non-sensitive configs for better debugging
        res.send("<h1>Please verify the following configs:</h1>" + undefConfigs);
    } else {
        var entries = filter.getEntryString();
        var htmlString = "<h1>Successful Set-up</h1><h3>Please verify settings below</h3>";
        htmlString += "<table><tr><td>Channel</td><td>Bot Username</td><td>Entries Tracked</td></tr><tr><td>" + config.channel + "</td><td>" + config.username + "</td><td>" + entries + "</td></tr></table>";
        res.send(htmlString);
    }
});


app.listen(port, function() {
    console.log('Slack Contentful is listening on PORT:', port);
});
