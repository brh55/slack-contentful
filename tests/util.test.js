var utilTest = require('nodeunit').testCase;
var util = require('../helpers/util');

var undefMockObj = {
    testProp1: undefined,
    testProp2: true,
    testProp3: false,
    testProp5: undefined,
    testProp6: undefined,
    testProp7: undefined
};

var defMockObj = {
    testProp: 'randomstring',
    testPropFun: function () {
        return;
    },
    testProp2: 'moreString'
};

module.exports = utilTest({
    allDefined: function (test) {
        var expectFalse = util.allDefined(undefMockObj);
        var expectTrue = util.allDefined(defMockObj);

        test.equal(expectFalse, false);
        test.equal(expectTrue, true);
        test.done();
    },
    formatDate: function (test) {
        var mockDate = '2015-08-26T02:59:44.988Z';
        var formattedDate = util.formatDate(mockDate);

        test.equal(formattedDate, '2015-08-26 8:59 AM UTC');
        test.done();
    },
    getUndefinedKeys: function (test) {
        var testList = util.getUndefinedKeys(undefMockObj);

        test.equal(testList[0], 'testProp1');
        test.equal(testList[3], 'testProp7');
        test.done();
    }
});
