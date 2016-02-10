# Slack Contentful  ![Slack Icon](http://dist.alternativeto.net/icons/slack_59044.png?width=50&height=50&mode=crop&anchor=middlecenter)   ![Contentful Icon](https://lh5.googleusercontent.com/SiTAEkDd09U_7ngpQgCzQq4LXL-1876MnOr0AdCofQ0-l5TCWIUXRGviAQlAABj6h9bB6WLE=s50-h50-e365)

![Version 0.2.0](https://img.shields.io/badge/version-0.2.0-blue.svg)
[![Build Status](https://travis-ci.org/brh55/slack-contentful.svg?branch=master)](https://travis-ci.org/brh55/slack-contentful) [![devDendencies Status](https://david-dm.org/brh55/slack-contentful/dev-status.svg)](https://david-dm.org/brh55/slack-contentful#info=Dependencies) [![Coverage Status](https://coveralls.io/repos/brh55/slack-contentful/badge.svg?branch=master&service=github)](https://coveralls.io/github/brh55/slack-contentful?branch=master) [![Support via Gratipay](http://img.shields.io/gratipay/brh55.svg?style=flat-square)](https://gratipay.com/brh55)

This Slack bot will allow users to set up notifications "on published" changes to specified Contentful entries and assets to a designated Slack channel.

### Entry Update
![Example Entry Update](http://s28.postimg.org/oycfdlzz1/Screen_Shot_2015_11_16_at_8_14_10_AM.png)

### Asset Update
![Example Asset Update](https://cloud.githubusercontent.com/assets/6020066/12939831/c7da36c0-cf91-11e5-8bb8-a6f8cc5f04a6.png)

## Requirements

  * [Slack](http://slack.com/) Privileages to integrate Incoming Webhooks
  * [Node.js](http://nodejs.org/)
  * [Contentful](http://contentful.com) Access to add outgoing hooks

## Automated Set Up With Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

At minimum you need to configure your Slack webhook and tracked entries. It's preferred to set your locale, and leave your bot's emojis and username blank as these can be edit through the "Incoming Hooks" page by other team members.

## Manual Set Up

### Configuration
The configuration of the bot are set with environment variables using an `.env` file. Please look at the `example.env` file of possible configurations, and create an updated `.env` file before you deploy.

**Available Configuration Options:**
 
 ENV Variable | Required | Description | Default Value 
------------ | ------------- | ------------- | -------------
SLACK_WEBHOOK | Y |The webhook Url provided by the incoming hooks | N/A 
SLACK_CHANNEL | Y |The slack channel to send notifications (without #) | contentful-updates 
ENTRIES | Y | A comma seperated list of Contentful Entry IDs you want to be notified of | Empty 
LOCALE | N (but preferred) | Contentful Locale to be tracked, currently only supports up to 1 | en-US 
PORT  | N | The port for the node server to run on | 5000 
UPDATE_COLOR | N  | Hex color for updates posted | #27ae60 
BOT_USERNAME | N | The bot's username | Contentful Updates 
BOT_EMOJI | N | The bot's icon | pencil2 

Here's an example, of how your .env would look like.
__.env__
```
SLACK_WEBHOOK = https://hooks.slack.com/services/TA123ka9/A123910a9d8/mkas929199sad83lmk7h
SLACK_CHANNEL = ContentfulFeed
ENTRIES = 6OFbybzxM4WOCuIO4qo8Qs, 6aFz3qcuPe0eA8kwQm0Ume, 6a232jal2eA8kwQm0Ume, etc
LOCALE = en-UK
PORT = 5000
UPDATE_COLOR = #27ae60
BOT_USERNAME = ContentfulUpdates
BOT_EMOJI = bomb
```

## Deploying Steps

1. Set up the address of your server to configure where Contentful outgoing hooks should be sent to. (ex: myapp.heroku.com, botcontentful.mycompany.com)
2. Clone or download/unzip this repo to your serer
3. Adjust your `.env` file as outlined above
4. Install [Node.js](http://nodejs.org/) on your server if not done so already
5. Install repo dependencies
  
  ```bash
  $ cd to/repo
  $ npm install
  ```
6. Start the server

  ```bash
  $ npm start
  ```

## Contentful Configuration

1. Go to [Contentful](https://contentful.com).
2. Login with your credentials.
3. Locate the cog icon labeled settings, and click on 'webhooks'.
4. Hit 'New Webhook', and enter your server address in the URL bar.
5. Click 'Create Webhook'.

## Post Deployment - Test & Debugging
After your app has deployed, go to your server url and go to the `/check` endpoint to verify your settings, and help with debugging any potential issues.

Example:
```
http://myherokuapp.heroku.com/check
```

If you've successfully deployed, you should get a successful message stating *Successful Set-up* along with a table of configurations to verify against as depicted below.

![check page](https://cloud.githubusercontent.com/assets/6020066/12940014/3539a25e-cf93-11e5-8ad2-804c00fe3d95.png)

If set up was unsuccessful, you should get a message to verify your configurations, along with important configurations that the server has set up.

## Contribute
Open to all PRs, just make a PR and reference the issue if applicable, or explain your in the PR. If it's suitable, I'll go ahead and merge it.
