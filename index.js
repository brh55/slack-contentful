'use strict';

// Default Set-up
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// Additional Libs
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json({type: 'application/*'});

app.post('/', jsonParser, function(req, res) {
    if (!req.body) return res.send('nothing in body');
    console.log('received request');
    console.log(req.body);
    console.log(req);
});

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Slack Contentful is listening on http://%s:%s', host, port);
});
