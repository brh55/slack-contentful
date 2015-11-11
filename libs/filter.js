'use strict';

var dotenv = require('dotenv');
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
		 * @param  {[string]} entries [string of entries]
		 * @return {[array]}         [array of Entries]
		 */
		getEntries: function () {
			if (action.isEntryDefined()) {
				var formatString = entryString.replace(' ', '');
				model.entryList = formatString.split(',');
			} else {
				console.log("No proper entries declared in .env file");
			}

			return model.entryList;
		},

		/**
		 * Determines if user has defined .env ENTRIES
		 * @return {Boolean} [Indication of Entries defined]
		 */
		isEntryDefined: function () {
			return (typeof model.entryString !== 'undefined');
		},

		/**
		 * Returns entry string as defined by user
		 * @return {[string]} [String containing Entries]
		 */
		getEntryString: function () {
			if (action.isEntryDefined()) {
				return model.entryString;
			}
		},

		/**
         * Compare incoming hook entry against entry list
         * @param  {[string]} entryId [entryId in question]
         * @return {[boolean]}         [return if entry should be notified or not]
         */
        checkEntry: function (entryId) {
        	var entryList = action.getEntries();

            if (entryList.indexOf(entryId) > 1) {
                return true;
            } else {
                return false;
            }
        }
	};

	return {
		getEntries: action.getEntries,
		checkEntry: action.checkEntry,
		getEntryString: action.getEntryString,
		isEntryDefined: action.isEntryDefined
	};
})();
