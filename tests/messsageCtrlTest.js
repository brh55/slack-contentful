var messageCtrlTest = require('nodeunit').testCase;
var messageCtrl = require('../libs/messageCtrl');

var mockEntry = {
    sys:
      {space: {
          sys: {
              id: 'test'
          }
      },
        type: 'Entry',
        contentType: {
            sys: {
                type: 'Link',
                linkType: 'ContentType',
                id: '5SAPoBZF5Y0OuuEGaumi0m0'
            }
        },
        id: '6aFz3qcuPe0eA8kwQm0U-test',
        revision: 189,
        createdAt: '2015-08-26T02:59:44.988Z',
        updatedAt: '2015-11-14T20:41:49.493Z'},
    fields: {
        name: {
            'en-US': 'Test Title'
        },
        sections: [Object],
        morefield: [Object],
        moorestuff: [Object],
        moreRandomFields: []
    },
    length: undefined,
    read: [Function]
};

var mockAsset = {
    fields: {
        file: {
            'en-US': {
                fileName: 'Screen Shot 2016-01-05 at 9.13.31 PM.png',
                contentType: 'image/png',
                details: {
                    image: {
                        width: 395,
                        height: 193
                    },
                    size: 20178
                },
                url: '//images.contentful.com/blah/test'
            }
        },
        title: {
            'en-US': 'Asset Unit Test'
        },
        description: {
            'en-US': 'Updating a field'
        }
    },
    sys: {
        space: {
            sys: [Object]
        },
        type: 'Asset',
        id: '5hqGi8CXfGkO6q8EmaCoWk',
        revision: 119,
        createdAt: '2016-02-10T04:10:59.610Z',
        updatedAt: '2016-02-12T16:44:22.502Z'
    }
};

module.exports = messageCtrlTest({
    testEntry: function (test) {
        var message = messageCtrl.buildMessage(mockEntry);

        test.equal(typeof message, 'object');
        test.equal(message.channel, '#Contentful-Updates');

        // Subject to change, but expect 3
        test.equal(message.attachments[0].fields.length, 3);
        test.equal(message.attachments[0].fields[0].value, 'name, sections, morefield, moorestuff, moreRandomFields');
        test.equal(message.attachments[0].fields[1].value, '2015-11-14 8:41 AM UTC');
        test.equal(message.attachments[0].fields[2].value, 'Entry');
        test.equal(message.attachments[0].title_link, 'https://app.contentful.com/spaces/test/entries/6aFz3qcuPe0eA8kwQm0U-test');
        test.equal(message.attachments[0].title, 'Test Title');
        test.done();
    },
    testAsset: function (test) {
        var message = messageCtrl.buildMessage(mockAsset);

        var contentfulTypeField = message.attachments[0].fields[2];
        var assetTypeField = message.attachments[0].fields[3];
        var sizeField = message.attachments[0].fields[4];

        test.equal(message.attachments[0].thumb_url, 'http://images.contentful.com/blah/test');
        test.equal(assetTypeField.value, 'image/png');
        test.equal(contentfulTypeField.value, 'Asset');
        test.equal(sizeField.value, '20.178 KBs');
        test.done();
    },
    testSize: function (test) {
        mockAsset.fields.file['en-US'].details.size = 1000000;

        var msgAsset = messageCtrl.buildMessage(mockAsset);
        test.equal(msgAsset.attachments[0].fields[4].value, '1 MBs');
        test.done();
    }
});
