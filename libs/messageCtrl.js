'use strict';

var util = require('./util');
var config = require('./config');
var nodeUtil = require('util');

module.exports = (function () {
    var model = {
        message: {
            text: 'Contentful Entry Changes:',
            channel: config.channel,
            username: config.username,
            icon_emoji: config.emoji,
            attachments: [],
            unfurl_links: true,
            link_names: 1
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

            // TODO: See if particular field changes are given in the payload,
            // if so, narrow the displayed results to something more meaningful.
            var keys = Object.keys(reqBody.fields);
            var keyString = keys.toString();
            keyString = keyString.replace(/,/g, ', ');

            var firstFieldText = reqBody.fields[keys[1]]['en-US'];
            attachmentObj.text = reqBody.sys.type;

            var fieldsField = action.buildField("Fields", keyString, false);
            var dateField = action.buildDateField(reqBody.sys.updatedAt);
            var entryField = action.buildEntryField(reqBody.sys.contentType.sys.type);

            attachmentObj.fields.push(fieldsField);
            attachmentObj.fields.push(dateField);
            attachmentObj.fields.push(entryField);

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
         * @param  {[string]} ISODate [ISO Format of date]
         * @return {[object]}      [Short field declaring date of update]
         */
        buildDateField: function (ISODate) {
            var dateField = nodeUtil._extend({}, model.shortField);

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
            var entryField = nodeUtil._extend({}, model.shortField);

            entryField.title = "Type"
            entryField.value = entryType;

            return entryField;
        },

        /**
         * Build a generic field short or long
         * @param  {[string]} title     [The title of the short field]
         * @param  {[string]} value     [value with the shortField]
         * @param  {[boolean]} shortBool [shortField boolean]
         * @return {[type]}           [description]
         */
        buildField: function (title, value, shortBool) {
            var field = nodeUtil._extend({}, model.shortField);

            field.short = (shortBool === true) ? true : false;
            field.title = title;
            field.value = value;

            return field;
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
    };
})();
