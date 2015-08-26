'use strict';

var express = require('express');
var app = express();

app.get('/', function(req, res) {
    console.log(req);
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Slack Contentful is listening on http://%s:%s', host, port);
});
