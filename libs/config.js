'use strict';

var dotenv = require('dotenv');

dotenv.load();

module.exports = {
    webhook: process.env.SLACK_WEBHOOK,
    entries: process.env.ENTRIES,
    channel: process.env.SLACK_CHANNEL,
    port: Number(process.env.PORT) || 5000,
    emoji: process.env.BOT_EMOJI || 'pencil2',
    username: process.env.BOT_USERNAME || 'Contentful Update',
    updateColor: process.env.UPDATE_COLOR || '#27ae60',
    locale: process.env.LOCALE || 'en-US',
    largePreview: process.env.LARGE_PREVIEW || false
};
