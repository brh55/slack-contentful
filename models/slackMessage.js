// Slack Message Model
'use strict';
var config = require('../config');

var model = {
    message: {
        text: 'Contentful Update',
        channel: config.channel,
        username: config.username,
        icon_emoji: config.emoji,
        attachments: [],
        unfurl_links: true,
        link_names: 1
    },
    attachmentObj: {
        fallback: '',
        color: config.updateColor,
        title: '',
        title_link: '',
        text: '',
        fields: []
    },
    shortField: {
        title: '',
        value: '',
        short: true
    }
};

module.exports = model;
