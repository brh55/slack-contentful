'use strict';

var util = require('./util');
var config = require('./config');

module.exports = (function () {
    var model = {
        message: {
            channel: config.channel,
            username: config.username,
            icon_emoji: config.emoji,
            attachments: []
        },
        attachmentObj: {
            "fallback": "",
            "color": config.updateColor,
            "title": "",
            "title_link": "",
            "text": "",
            "fields": []
        },
        shortField: {
            "title": "",
            "value": "",
            "short": true
        }
    };

    var action = {
       /**
         * Build message attachment to provide to slack
         * @param  {[string]} message [string]
         * @return {[array]}         [attachment array containing message]
         */
        buildAttachment: function (reqBody) {
            var attachment = [];
            var attachmentObj = model.attachmentObj;

            attachmentObj.fallback = "Changes done to entry: " + reqBody.fields.name['en-US'];
            attachmentObj.title = reqBody.fields.name['en-US'];
            attachmentObj.title_link = action.buildEntryUrl(reqBody.sys.space.sys.id, reqBody.sys.id);
            attachmentObj.text = reqBody.fields.content['en-US'];

            var dateField = action.buildDateField(reqBody.sys.createdAt);
            var entryField = action.buildEntryField(reqBody.sys.type);

            attachmentObj.fields.push(dateField, entryField);
            attachment.push(attachmentObj);

            return attachment;
        },

        /**
         * Build associated contentful Url for Entry
         * @param  {[string]} spaceId [Id of Contentful Space]
         * @param  {[string]} entryId [Id of Contentful Entry]
         * @return {[string]}         [Url of Entry]
         */
        buildEntryUrl: function (spaceId, entryId) {
            return 'https://app.contentful.com/spaces/' + spaceId + '/entries/' + entryId;
        },

        /**
         * Builds a Date Short Field Object
         * @param  {[string]} date [ISO Format of date]
         * @return {[object]}      [Short field declaring date of update]
         */
        buildDateField: function (ISOdate) {
            var dateField = model.shortField;

            dateField.title = "Updated At";
            dateField.value = util.formatDate(ISODate);

            return dateField;
        },

        /**
         * Builds a Entry Short Field Object
         * @param  {[string]} entryType [Type of Contentful Entry]
         * @return {[object]}           [Short field declaring type of entry]
         */
        buildEntryField: function (entryType) {
            var entryField = model.shortField;

            entryField.title = "Type"
            entryField.value = entryType;

            return entryField;
        },

        /**
         * Builds Payload to be sent to Slack hook
         * @param  {[object]} reqBody [JSON of request body]
         * @return {[object]}         [prase message based on JSON request body]
         */
        buildMessage: function (reqBody) {
            var attachment = action.buildAttachment(reqBody);
            var message = model.message;

            message.attachments = attachment;

            return message;
        }
    };

    return {
        buildMessage: action.buildMessage
    }
})();
