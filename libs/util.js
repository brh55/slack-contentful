'use strict';

//var config = require('./config');
var filter = require('./filter');

module.exports = (function () {
    /**
     * Format date of ISO Date
     * @param  {[string]} ISODate [ISODate format]
     * @return {[string]}         [returns in format of: MonthDate, Hour:Mins PM / AM]
     */
    var formatDate = function(ISODate) {
        var tempDate = ISODate.replace(/T/, ' ').replace(/\..+/, '');
        var dateSplit = tempDate.split(' ');

        var monthDate = dateSplit[0];
        var time = dateSplit[1];
        var timeSplit = time.split(':');

        var hour = timeSplit[0];
        var mins = timeSplit[1];
        var seconds = timeSplit[2];

        // Format into 12 hour format
        var hours = ((hour + 11) % 12 + 1);
        var suffix = (hours >= 12) ? 'PM' : 'AM';

        var formattedDate = monthDate + ' ' + hours + ':' + mins + ' ' + suffix;

        return formattedDate;
    };

    var objectLoop = function(object) {
        for (var key in object) {
           if (object.hasOwnProperty(key)) {
                var obj = object[key];
                for (var prop in obj) {
                    if(obj.hasOwnProperty(prop)) {

                    }
               }
            }
        }
    };

    /**
     * Build message attachment to provide to slack
     * @param  {[string]} message [string]
     * @return {[array]}         [attachment array containing message]
     */
    var buildAttachment = function (reqBody) {
        var attachment = [];
        var messageObj = {
            "fallback": "",
            "color": "#27ae60",
            "title": "",
            "title_link": "",
            "text": "",
            "fields": []
        };

        messageObj.fallback = "Changes done to entry: " + reqBody.fields.name['en-US'];
        messageObj.title = reqBody.fields.name['en-US'];
        messageObj.title_link = 'https://app.contentful.com/spaces/' + reqBody.sys.space.sys.id + '/entries/' + reqBody.sys.id;
        messageObj.text = reqBody.fields.content['en-US'];

        // TODO Wrap into Methods
        var dateField = {
            "title": "Updated At",
            "value": "",
            "short": true
        }

        var entryField = {
            "title": "Type",
            "value": "",
            "short": true
        }

        dateField.value = formatDate(reqBody.sys.createdAt);
        entryField.value = reqBody.sys.type;

        messageObj.fields.push(dateField, entryField);
        attachment.push(messageObj);

        return attachment;
    }

    var buildMessage = function (reqBody) {
        var attachment = buildAttachment(reqBody);

        var message = {
            text: 'Howdy!',
            channel: '#foo',
            username: 'Bot',
            attachments: []
        };

        message.attachments = attachment;

        return message;
    };

    /**
     * Compare incoming hook entry against entry list
     * @param  {[string]} entryId [entryId in question]
     * @return {[boolean]}         [return if entry should be notified or not]
     */
    var checkEntry = function (entryId) {
        if (filter.entries.indexOf(entryId) > 1) {
            return true;
        } else {
            return false;
        }
    }

    return {
        formatDate: formatDate,
        buildMessage: buildMessage,
        checkEntry: checkEntry
    }
})();
