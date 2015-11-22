var utilTest = require('nodeunit').testCase;
var filter = require('../libs/filter');

// Using example.env as env for testing environment

module.exports = utilTest({
    checkEntry: function (test) {
        var testTruth = filter.checkEntry('6OFbybzxM4WOCuIO4qo8Qs');
        var testFalse = filter.checkEntry('notarealentry');

        test.strictEqual(testTruth, true);
        test.strictEqual(testFalse, false);

        test.done();
    },
    isEntryDefined: function (test) {
        var defineState = filter.isEntryDefined();

        test.strictEqual(defineState, true);
        test.done();
    },
    getEntryString: function (test) {
        var entryString = filter.getEntryString();
        var expectedString = '6OFbybzxM4WOCuIO4qo8Qs,6aFz3qcuPe0eA8kwQm0Ume,entryID3,etc';

        test.strictEqual(entryString, expectedString);

        test.done();
    },
    getEntries: function (test) {
        var entryArray = filter.getEntries();
        var expectedEntries = ['6OFbybzxM4WOCuIO4qo8Qs', '6aFz3qcuPe0eA8kwQm0Ume', 'entryID3', 'etc'];

        // Pretty unreliable, will probably redo to loop
        test.equal(entryArray.toString(), expectedEntries.toString());
        test.done();
    }
});
