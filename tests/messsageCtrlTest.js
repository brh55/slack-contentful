var messageCtrlTest = require('nodeunit').testCase;
var messageCtrl = require('../libs/messageCtrl');

var mockBody = {
    sys:
      { space: {
            sys: {
                id: "test"
            }
        },
        type: 'Entry',
        contentType: {
            type: 'Link',
            linkType: 'ContentType',
            id: '5SAPoBZF5Y0OuuEGaumi0m0'
        },
        id: '6aFz3qcuPe0eA8kwQm0U-test',
        revision: 189,
        createdAt: '2015-08-26T02:59:44.988Z',
        updatedAt: '2015-11-14T20:41:49.493Z' },
     fields: {
        name: {
            'en-US': "Test Title"
        },
        sections: [Object],
        morefield: [Object],
        moorestuff: [Object]
    },
    length: undefined,
    read: [Function]
};

module.exports = messageCtrlTest({
    "buildMessage": function (test) {
        var message = messageCtrl.buildMessage(mockBody);

        test.equal(typeof message, "object");
        test.equal(message.channel, "#bot-testing");

        // Subject to change, but expect 3
        test.equal(message.attachments[0].fields.length, 3);

        test.equal(message.attachments[0].title_link, "https://app.contentful.com/spaces/test/entries/6aFz3qcuPe0eA8kwQm0U-test");
        test.equal(message.attachments[0].title, "Test Title");
        test.done();
    }
});
