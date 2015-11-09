'use strict';

var Slack = require('node-slack');
//var config = require('./config');
var util = require('./util');

module.exports = (function () {
    var slack = new Slack('');

    /**
     * send Slack message
     * @param  {[string]} message [string of message to be send]
     */
    var sendMessage = function (message) {
        console.log(message);
        slack.send(message);
    };

    return {
        sendMessage: sendMessage
    };
})();
