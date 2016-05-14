'use strict';

var Slack = require('node-slack');
var config = require('../config');
var nodeUtil = require('util');

module.exports = (function () {
    var slack;

    if (nodeUtil.isUndefined(config.webhook)) {
        console.log('Please ensure webhook is properly set up');
    } else {
        slack = new Slack(config.webhook);
    }

    /**
     * Slack Wrapper to send Slack message
     * @param  {object} message object message to be send
     */
    function sendMessage (message) {
        slack.send(message);
    };

    return {
        sendMessage: sendMessage
    };
})();
