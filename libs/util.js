'use strict';

var nodeUtil = require('util');

module.exports = (function () {
    var action = {
        /**
         * Format date of ISO Date
         * @param  {string} ISODate ISODate format
         * @return {string}         returns in format of: MonthDate, Hour:Mins PM / AM
         */
        formatDate: function (ISODate) {
            var tempDate = ISODate.replace(/T/, ' ').replace(/\..+/, '');
            var dateSplit = tempDate.split(' ');

            var monthDate = dateSplit[0];
            var time = dateSplit[1];
            var timeSplit = time.split(':');

            var hour = timeSplit[0];
            var mins = timeSplit[1];

            // Format into 12 hour format
            var hours = ((hour + 11) % 12 + 1);
            var suffix = (hours >= 12) ? 'PM' : 'AM';

            var formattedDate = monthDate + ' ' + hours + ':' + mins + ' ' + suffix + ' UTC';

            return formattedDate;
        },

        /**
         * Checks if all keys do not have undefined values string values
         * @param  {object} object object in question
         * @return {boolean}        return if object contains undefined string values
         */
        allDefined: function (object) {
            for (var key in object) {
                if (nodeUtil.isUndefined(object[key])) {
                    return false;
                }
            }
            return true;
        },

        /**
         * Return undefined keys of object
         * @param  {object} object object in question
         * @return {array}        array of undefined valued keys
         */
        getUndefinedKeys: function (object) {
            var undefinedKeys = [];

            for (var key in object) {
                if (nodeUtil.isUndefined(object[key])) {
                    undefinedKeys.push(key);
                }
            }

            return undefinedKeys;
        }
    };

    return {
        formatDate: action.formatDate,
        allDefined: action.allDefined,
        getUndefinedKeys: action.getUndefinedKeys
    };
})();
