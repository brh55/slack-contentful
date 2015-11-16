'use strict';

var dotenv = require('dotenv');

dotenv.load();

module.exports = {
    webhook: process.env.SLACK_WEBHOOK,
    port: Number(process.env.PORT) || 5000,
    emoji: process.env.BOT_EMOJI || 'pencil2',
    username: process.env.BOT_USERNAME || 'Contentful Update',
    channel: '#' + process.env.SLACK_CHANNEL || '#contentful-updates',
    updateColor: process.env.UPDATE_COLOR || '#27ae60'
};
