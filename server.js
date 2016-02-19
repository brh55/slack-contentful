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
    var css = "<style>h1,h3,p{margin:10px 20px;font-family:sans-serif};table a:link,table a:visited{font-weight:700;text-decoration:none}table td:first-child,table th:first-child{text-align:left;padding-left:20px}table td,table th{border-bottom:1px solid #e0e0e0}table a:link{color:#666}table a:visited{color:#999}table a:active,table a:hover{color:#bd5a35;text-decoration:underline}table{font-family:Arial,Helvetica,sans-serif;color:#666;font-size:12px;text-shadow:1px 1px 0 #fff;background:#eaebec;margin:20px;border:1px solid #ccc;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-moz-box-shadow:0 1px 2px #d1d1d1;-webkit-box-shadow:0 1px 2px #d1d1d1;box-shadow:0 1px 2px #d1d1d1}table th{padding:21px 25px 22px;border-top:1px solid #fafafa;background:#ededed;background:-webkit-gradient(linear,left top,left bottom,from(#ededed),to(#ebebeb));background:-moz-linear-gradient(top,#ededed,#ebebeb)}table tr:first-child th:first-child{-moz-border-radius-topleft:3px;-webkit-border-top-left-radius:3px;border-top-left-radius:3px}table tr:first-child th:last-child{-moz-border-radius-topright:3px;-webkit-border-top-right-radius:3px;border-top-right-radius:3px}table tr{text-align:center;padding-left:20px}table td:first-child{border-left:0}table td{padding:18px;border-top:1px solid #fff;border-left:1px solid #e0e0e0;background:#fafafa;background:-webkit-gradient(linear,left top,left bottom,from(#fbfbfb),to(#fafafa));background:-moz-linear-gradient(top,#fbfbfb,#fafafa)}table tr.even td{background:#f6f6f6;background:-webkit-gradient(linear,left top,left bottom,from(#f8f8f8),to(#f6f6f6));background:-moz-linear-gradient(top,#f8f8f8,#f6f6f6)}table tr:last-child td{border-bottom:0}table tr:last-child td:first-child{-moz-border-radius-bottomleft:3px;-webkit-border-bottom-left-radius:3px;border-bottom-left-radius:3px}table tr:last-child td:last-child{-moz-border-radius-bottomright:3px;-webkit-border-bottom-right-radius:3px;border-bottom-right-radius:3px}table tr:hover td{background:#f2f2f2;background:-webkit-gradient(linear,left top,left bottom,from(#f2f2f2),to(#f0f0f0));background:-moz-linear-gradient(top,#f2f2f2,#f0f0f0)}</style>"

    if (util.allDefined(config)) {
        var entries = filter.getEntryString();
        var htmlString = '<h1>Successful Set-up</h1><h3>Please verify settings below:</h3>';
        htmlString += '<table><thead><tr><th>Channel</th><th>Bot Username</th><th>Entries Tracked</th><th>Contentful Locale</th></tr></thead><tbody><tr><td>' + config.channel + '</td><td>' + config.username + '</td><td>' + entries + '</td><td>' + config.locale + '</td></tr></tbody></table>';
        res.send(css + htmlString);
    } else {
        var undefConfigs = util.getUndefinedKeys(config, ', ');
        res.send(css + '<h1>Opps, please verify the following configs:</h1><p>' + undefConfigs + '</p>');
    }
});

app.listen(port, function () {
    console.log('Slack Contentful is listening on PORT:', port);
});
