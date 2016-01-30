'use strict';

var dotenv = require('dotenv');
var nodeUtil = require('util');

dotenv.load();

// Declare Contentful entries of what you want to be notified of
module.exports = (function () {
    var model = {
        entryList: [],
        entryString: process.env.ENTRIES
    };

    var action = {
        /**
         * Gets user defined entry list and returns it into an array
         * @param  {string} entries string of entries
         * @return {array}         array of Entries
         */
        getEntries: function () {
            if (action.isEntryDefined()) {
                var formatString = model.entryString.replace(/\040/g, '');
                model.entryList = formatString.split(',');
            } else {
                console.log('No proper entries declared in .env file');
            }

            return model.entryList;
        },

        /**
         * Determines if user has defined .env ENTRIES
         * @return {boolean} [Indication of Entries defined]
         */
        isEntryDefined: function () {
            return (!nodeUtil.isUndefined(model.entryString));
        },

        /**
         * Returns entry string as defined by user
         * @return {string} String containing Entries
         */
        getEntryString: function () {
            if (action.isEntryDefined()) {
                return model.entryString;
            }
        },

        /**
         * Compare incoming hook entry against entry list
         * @param  {string} entryId entryId in question
         * @return {boolean}         return if entry should be notified or not
         */
        checkEntry: function (entryId) {
            var entryList = action.getEntries();

            if (entryList.indexOf(entryId) > -1) {
                return true;
            }

            return false;
        }
    };

    return {
        getEntries: action.getEntries,
        checkEntry: action.checkEntry,
        getEntryString: action.getEntryString,
        isEntryDefined: action.isEntryDefined
    };
})();
