// Check Route
// This route is mainly used for debugging purposes
'use strict';

var express = require('express');
var router = express.Router();

var config = require('../config');
var util = require('../helpers/util');

router.get('/', function (req, res) {
    var css = '<style>h1,h3,p{margin:10px 20px;font-family:sans-serif};table a:link,table a:visited{font-weight:700;text-decoration:none}table td:first-child,table th:first-child{text-align:left;padding-left:20px}table td,table th{border-bottom:1px solid #e0e0e0}table a:link{color:#666}table a:visited{color:#999}table a:active,table a:hover{color:#bd5a35;text-decoration:underline}table{font-family:Arial,Helvetica,sans-serif;color:#666;font-size:12px;text-shadow:1px 1px 0 #fff;background:#eaebec;margin:20px;border:1px solid #ccc;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-moz-box-shadow:0 1px 2px #d1d1d1;-webkit-box-shadow:0 1px 2px #d1d1d1;box-shadow:0 1px 2px #d1d1d1}table th{padding:21px 25px 22px;border-top:1px solid #fafafa;background:#ededed;background:-webkit-gradient(linear,left top,left bottom,from(#ededed),to(#ebebeb));background:-moz-linear-gradient(top,#ededed,#ebebeb)}table tr:first-child th:first-child{-moz-border-radius-topleft:3px;-webkit-border-top-left-radius:3px;border-top-left-radius:3px}table tr:first-child th:last-child{-moz-border-radius-topright:3px;-webkit-border-top-right-radius:3px;border-top-right-radius:3px}table tr{text-align:center;padding-left:20px}table td:first-child{border-left:0}table td{padding:18px;border-top:1px solid #fff;border-left:1px solid #e0e0e0;background:#fafafa;background:-webkit-gradient(linear,left top,left bottom,from(#fbfbfb),to(#fafafa));background:-moz-linear-gradient(top,#fbfbfb,#fafafa)}table tr.even td{background:#f6f6f6;background:-webkit-gradient(linear,left top,left bottom,from(#f8f8f8),to(#f6f6f6));background:-moz-linear-gradient(top,#f8f8f8,#f6f6f6)}table tr:last-child td{border-bottom:0}table tr:last-child td:first-child{-moz-border-radius-bottomleft:3px;-webkit-border-bottom-left-radius:3px;border-bottom-left-radius:3px}table tr:last-child td:last-child{-moz-border-radius-bottomright:3px;-webkit-border-bottom-right-radius:3px;border-bottom-right-radius:3px}table tr:hover td{background:#f2f2f2;background:-webkit-gradient(linear,left top,left bottom,from(#f2f2f2),to(#f0f0f0));background:-moz-linear-gradient(top,#f2f2f2,#f0f0f0)}</style>';

    var htmlString = '';
    var i = 0;

    if (util.allDefined(config)) {
        var configKeys = Object.keys(config);

        htmlString = '<h1>Successful Set-up</h1><h3>Please verify settings below:</h3><table><thead><tr><th>Configuration</th><th>Value</th></tr>';

        for (i; i < configKeys.length; i++) {
            // Do not expose webhook URL for security reasons
            if (configKeys[i] !== 'webhook') {
                htmlString += '<tr><td>' + configKeys[i] + '</td><td>' + config[configKeys[i]] + '</td></tr>';
            }

            if (i === configKeys.length - 1) {
                htmlString += '</tbody></table>';
            }
        }
    } else {
        var undefinedConfigs = util.getUndefinedKeys(config);

        for (i; i < undefinedConfigs.length; i++) {
            undefinedConfigs[i] = '<li>' + undefinedConfigs[i] + '</li>';
        }

        htmlString = '<h1>Opps, please verify the following configs:</h1><ul>' + undefinedConfigs.join('') + '</ul>';
    }

    res.send(css + htmlString);
});

module.exports = router;
