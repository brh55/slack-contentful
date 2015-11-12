'use strict';

var Slack = require('node-slack');
var config = require('./config');

module.exports = (function () {
    var slack;

    if (typeof config.webhook !== 'undefined') {
        slack = new Slack(config.webhook);
    } else {
        console.log("Please ensure webhook is properly set up");
    }

    /**
     * Slack Wrapper to send Slack message
     * @param  {[object]} message [object message to be send]
     */
    var sendMessage = function (message) {
        slack.send(message);
    };

    return {
        sendMessage: sendMessage
    };
})();
