'use strict';

var nodeUtil = require('util');
var config = require('../config');

// Declare Contentful entries of what you want to be notified of
module.exports = (function () {
    var model = {
        entryList: [],
        entryString: config.entries
    };

    /**
     * Gets user defined entry list and returns it into an array
     * @param  {string} entries string of entries
     * @return {array}         array of Entries
     */
    function getEntries() {
        if (isEntryDefined()) {
            var formatString = model.entryString.replace(/\040/g, '');
            model.entryList = formatString.split(',');
        } else {
            console.log('No proper entries declared in .env file');
        }

        return model.entryList;
    }

    /**
     * Determines if user has defined .env ENTRIES
     * @return {boolean} [Indication of Entries defined]
     */
    function isEntryDefined() {
        return (!nodeUtil.isUndefined(model.entryString));
    }

    /**
     * Returns entry string as defined by user
     * @return {string} String containing Entries, empty string if empty
     */
    function getEntryString() {
        return (isEntryDefined()) ?
            model.entryString : '';
    }

    /**
     * Compare incoming hook entry against entry list
     * @param  {string} entryId entryId in question
     * @return {boolean}         return if entry should be notified or not
     */
    function checkEntry(entryId) {
        var entryList = getEntries();
        return (entryList.indexOf(entryId) > -1);
    }

    return {
        getEntries: getEntries,
        checkEntry: checkEntry,
        getEntryString: getEntryString,
        isEntryDefined: isEntryDefined
    };
})();
