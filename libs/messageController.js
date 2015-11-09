'use strict';

var util = require('./util');

/**
 * Parses contentful response
 * @param  {object} entryJSON the JSON body response
 * @return {object}           filtered data based on response
 */

module.exports = (function () {
    var parseResponse = function (entryJSON) {
        var sys = entryJSON.sys;
        var entry = entryJSON.fields;
        var data = {
            updatedOn: date
        }
    };

    return {
        parseResponse: parseResponse
    };
})();
