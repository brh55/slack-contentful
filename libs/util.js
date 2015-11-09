'use strict';

var config = require('./config');
var settings = require('./settings');

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
    var buildMsg = function (message) {
        var attachment = [];
        var messageObj = {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": "Optional text that appears above the attachment block",
            "author_name": "Bobby Tables",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "http://flickr.com/icons/bobby.jpg",
            "title": "Slack API Documentation",
            "title_link": "https://api.slack.com/",
            "text": "Optional text that appears within the attachment"
        };


        attachment.push(messageObj);
        return attachment;
    }

    /**
     * Compare incoming hook entry against entry list
     * @param  {[string]} entryId [entryId in question]
     * @return {[boolean]}         [return if entry should be notified or not]
     */
    var checkEntry = function (entryId) {
        if (settings.entries.indexOf(entryId) > 1) {
            return true;
        } else {
            return false;
        }
    }

    return {
        formatDate: formatDate,
        buildMsg: buildMsg,
        checkEntry: checkEntry
    }
})();
