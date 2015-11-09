'use strict';

module.exports = (function () {
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

    return {
        formatDate: formatDate
    }
})();
