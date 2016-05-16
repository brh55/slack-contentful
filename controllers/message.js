'use strict';
/* eslint camelcase:0 */

var util = require('../helpers/util');
var nodeUtil = require('util');
var config = require('../config');
var model = require('../models/slackMessage');

module.exports = (function () {
   /**
     * Build message attachment to provide to slack
     * @param  {string} message string
     * @return {array}         attachment array containing message
     */
    function buildAttachment(reqBody, updateType) {
        var attachment = [];
        var attachmentObj = nodeUtil._extend({}, model.attachmentObj);
        // Clear array from object
        attachmentObj.fields.length = 0;
        var contentfulType = reqBody.sys.type;

        var updateTitle;
        var keys;
        var keyString;

        switch (contentfulType) {
            // TODO: Make content type updates a bit more meaningful
            case 'ContentType':
                updateTitle = reqBody.name;

                keys = [];
                for (var i = 0; i < reqBody.fields.length - 1; i++) {
                    keys.push(reqBody.fields[i].name);
                }

                keyString = keys.toString()
                                .replace(/,/g, ', ');
                break;

            default:
                updateTitle = (nodeUtil.isUndefined(reqBody.fields.name)) ?
                    reqBody.fields.title[config.locale] :
                    reqBody.fields.name[config.locale];

                keys = Object.keys(reqBody.fields);
                keyString = keys.toString()
                                .replace(/,/g, ', ');
                break;
        }

        attachmentObj.fallback = 'Changes done to entry: ' + updateTitle;
        attachmentObj.title = updateTitle;
        attachmentObj.title_link = buildEntryUrl(reqBody.sys.space.sys.id, reqBody.sys.id);

        // TODO: See if particular field changes are given in the payload,
        // if so, narrow the displayed results to something more meaningful.
        attachmentObj.text = '';

        var fieldsField = buildField('Updated Fields', keyString, false);
        var dateField = buildDateField(reqBody.sys.updatedAt);
        var entryField = buildEntryField(reqBody.sys.type);
        var updateTypeField = buildField('Action', normalizeType(updateType), false);

        attachmentObj.fields.push(fieldsField);
        attachmentObj.fields.push(updateTypeField);
        attachmentObj.fields.push(dateField);
        attachmentObj.fields.push(entryField);

        if (reqBody.sys.type === 'Asset') {
            // Set large preview if set
            if (config.largePreview) {
                attachmentObj.image_url = buildImgUrl(reqBody);
            } else {
                attachmentObj.thumb_url = buildImgUrl(reqBody);
            }

            var imgSize = formatSizeUnit(reqBody.fields.file[config.locale].details.size);

            var sizeField = buildField('Size', imgSize, true);
            var imgType = buildField('Asset Type', reqBody.fields.file[config.locale].contentType, true);

            attachmentObj.fields.push(imgType);
            attachmentObj.fields.push(sizeField);
        }

        attachment.push(attachmentObj);

        return attachment;
    }

    function formatSizeUnit(size) {
        var units = ' Bytes';

        if (size >= 1000000) {
            size /= 1000000;
            units = ' MBs';
        } else if (size >= 1000) {
            size /= 1000;
            units = ' KBs';
        }

        return size + units;
    }

    /**
     * Builds the necessary image url to display a preview on a Slack message
     * @param  {object} reqBody The request body of message
     * @return {string}         The image url of the asset
     */
    function buildImgUrl(reqBody) {
        var imgUrl = 'http:' + reqBody.fields.file[config.locale].url;

        return imgUrl;
    }

    /**
     * Build associated contentful Url for Entry
     * @param  {string} spaceId Id of Contentful Space
     * @param  {string} entryId Id of Contentful Entry
     * @return {string}         Url of Entry
     */
    function buildEntryUrl(spaceId, entryId) {
        return 'https://app.contentful.com/spaces/' + spaceId + '/entries/' + entryId;
    }

    /**
     * Builds a Date Short Field Object
     * @param  {string} ISODate ISO Format of date
     * @return {object}      Short field declaring date of update
     */
    function buildDateField(ISODate) {
        var dateField = nodeUtil._extend({}, model.shortField);

        dateField.title = 'Updated At';
        dateField.value = util.formatDate(ISODate);

        return dateField;
    }

    /**
     * Builds a Entry Short Field Object
     * @param  {string} entryType Type of Contentful Entry
     * @return {object}           Short field declaring type of entry
     */
    function buildEntryField(entryType) {
        var entryField = nodeUtil._extend({}, model.shortField);

        entryField.title = 'Type';
        entryField.value = entryType;

        return entryField;
    }

    /**
     * Build a generic field short or long
     * @param  {string} title     The title of the short field
     * @param  {string} value     value with the shortField
     * @param  {boolean} shortBool shortField boolean
     * @return {type}           description
     */
    function buildField(title, value, shortBool) {
        var field = nodeUtil._extend({}, model.shortField);

        field.short = (shortBool === true);
        field.title = title;
        field.value = value;

        return field;
    }

    /**
     * Builds Payload to be sent to Slack hook
     * @param  {object} reqBody JSON of request body
     * @return {object}         prase message based on JSON request body
     */
    function buildMessage(reqBody, updateType) {
        var attachment = buildAttachment(reqBody, updateType);
        var message = model.message;

        message.attachments = attachment;
        return message;
    }

    function normalizeType(updateType) {
        var tempList = updateType.split('.');
        var type = tempList[tempList.length - 1];

        type.replace(/_/g, ' ');
        return type;
    }

    return {
        buildMessage: buildMessage
    };
})();
