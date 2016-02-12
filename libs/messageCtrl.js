'use strict';
/* eslint camelcase:0 */

var util = require('./util');
var nodeUtil = require('util');
var config = require('./config');

module.exports = (function () {
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

    var action = {
       /**
         * Build message attachment to provide to slack
         * @param  {string} message string
         * @return {array}         attachment array containing message
         */
        buildAttachment: function (reqBody) {
            var attachment = [];
            var attachmentObj = model.attachmentObj;
            // Clear array from object
            attachmentObj.fields.length = 0;

            // TODO: Add localization
            var updateTitle = (nodeUtil.isUndefined(reqBody.fields.name)) ?
                reqBody.fields.title[config.locale] : reqBody.fields.name[config.locale];

            attachmentObj.fallback = 'Changes done to entry: ' + updateTitle;
            attachmentObj.title = updateTitle;
            attachmentObj.title_link = action.buildEntryUrl(reqBody.sys.space.sys.id, reqBody.sys.id);

            // TODO: See if particular field changes are given in the payload,
            // if so, narrow the displayed results to something more meaningful.
            var keys = Object.keys(reqBody.fields);
            var keyString = keys.toString();
            keyString = keyString.replace(/,/g, ', ');

            attachmentObj.text = '';

            var fieldsField = action.buildField('Fields', keyString, false);
            var dateField = action.buildDateField(reqBody.sys.updatedAt);
            var entryField = action.buildEntryField(reqBody.sys.type);

            attachmentObj.fields.push(fieldsField);
            attachmentObj.fields.push(dateField);
            attachmentObj.fields.push(entryField);

            if (reqBody.sys.type === 'Asset') {
                // Set large preview if set
                if (config.largePreview) {
                    attachmentObj.image_Url = action.buildImgUrl(reqBody);
                } else {
                    attachmentObj.thumb_url = action.buildImgUrl(reqBody);
                }

                var imgSize = action.formatSizeUnit(reqBody.fields.file[config.locale].details.size);

                var sizeField = action.buildField('Size', imgSize, true);
                var imgType = action.buildField('Asset Type', reqBody.fields.file[config.locale].contentType, true);

                attachmentObj.fields.push(imgType);
                attachmentObj.fields.push(sizeField);
            }

            attachment.push(attachmentObj);

            return attachment;
        },

        formatSizeUnit: function (size) {
            var units = ' Bytes';

            if (size >= 1000000) {
                size /= 1000000;
                units = ' MBs';
            } else if (size >= 1000) {
                size /= 1000;
                units = ' KBs';
            }

            return size + units;
        },

        /**
         * Builds the necessary image url to display a preview on a Slack message
         * @param  {object} reqBody The request body of message
         * @return {string}         The image url of the asset
         */
        buildImgUrl: function (reqBody) {
            var imgUrl = 'http:' + reqBody.fields.file[config.locale].url;

            return imgUrl;
        },

        /**
         * Build associated contentful Url for Entry
         * @param  {string} spaceId Id of Contentful Space
         * @param  {string} entryId Id of Contentful Entry
         * @return {string}         Url of Entry
         */
        buildEntryUrl: function (spaceId, entryId) {
            return 'https://app.contentful.com/spaces/' + spaceId + '/entries/' + entryId;
        },

        /**
         * Builds a Date Short Field Object
         * @param  {string} ISODate ISO Format of date
         * @return {object}      Short field declaring date of update
         */
        buildDateField: function (ISODate) {
            var dateField = nodeUtil._extend({}, model.shortField);

            dateField.title = 'Updated At';
            dateField.value = util.formatDate(ISODate);

            return dateField;
        },

        /**
         * Builds a Entry Short Field Object
         * @param  {string} entryType Type of Contentful Entry
         * @return {object}           Short field declaring type of entry
         */
        buildEntryField: function (entryType) {
            var entryField = nodeUtil._extend({}, model.shortField);

            entryField.title = 'Type';
            entryField.value = entryType;

            return entryField;
        },

        /**
         * Build a generic field short or long
         * @param  {string} title     The title of the short field
         * @param  {string} value     value with the shortField
         * @param  {boolean} shortBool shortField boolean
         * @return {type}           description
         */
        buildField: function (title, value, shortBool) {
            var field = nodeUtil._extend({}, model.shortField);

            field.short = (shortBool === true);
            field.title = title;
            field.value = value;

            return field;
        },

        /**
         * Builds Payload to be sent to Slack hook
         * @param  {object} reqBody JSON of request body
         * @return {object}         prase message based on JSON request body
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
