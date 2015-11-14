# Slack Contentful
![Contentful Icon](https://lh5.googleusercontent.com/SiTAEkDd09U_7ngpQgCzQq4LXL-1876MnOr0AdCofQ0-l5TCWIUXRGviAQlAABj6h9bB6WLE=s50-h50-e365) ![Slack Icon](http://dist.alternativeto.net/icons/slack_59044.png?width=50&height=50&mode=crop&anchor=middlecenter)  

[![Build Status](https://travis-ci.org/brh55/slack-contentful.svg?branch=master)](https://travis-ci.org/brh55/slack-contentful)
[![devDendencies Status](https://david-dm.org/brh55/slack-contentful/dev-status.svg)](https://david-dm.org/brh55/slack-contentful#info=Dependencies)
[![Coverage Status](https://coveralls.io/repos/brh55/slack-contentful/badge.svg?branch=master&service=github)](https://coveralls.io/github/brh55/slack-contentful?branch=master)
[![Support via Gratipay](http://img.shields.io/gratipay/brh55.svg?style=flat-square)](https://gratipay.com/brh55)


This node instance allow users to set up notifications "on published" changes to specified Contentful entries to a designated Slack channel.

## Requirements

  * [Slack](http://slack.com/) Privileages to integrate Incoming Webhooks
  * [Node.js](http://nodejs.org/)
  * [Contentful](http://contentful.com) Access to add outgoing hooks

## Automated Set Up with Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

At minimum you need to configure your Slack webhook and tracked entries.

## Manual Set Up

### Configuration
The configuration of the bot are set with environment variables using an `.env` file. Please look at the `example.env` file of possible configurations, and create an updated `.env` file before you deploy.

Current possible configurations:

__example.env__
```
#REQUIRED VALUE, HOOK is available on Slack Integration Page
SLACK_WEBHOOK = https://hooks.slack.com/services/.../.../...
SLACK_CHANNEL = ChannelHere

#ENTRIES, list all entries to be tracked in a comma seperated format
ENTRIES= entryID1, entryID2, etc, etc

#The following values are optional, but the app will take the defaults as specified below
PORT = 5000
BOT_USERNAME = ContentfulUpdates

#Emoji is used for an Bot's user icon, you can upload one on your team's channel and declare it here
BOT_EMOJI = pencil2

#HEX Color of update notification
UPDATE_COLOR = "#27ae60"
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

## Contentful Set Up

1. Go to [Contentful](https://contentful.com).
2. Login with your credentials.
3. Locate the cog icon labeled settings, and click on 'webhooks'
4. Hit "New Webhook", and enter your server address in the URL bar
5. Click Create Webhook

And you're all set!

## Post Deployment - Test

After your app has deployed, go to your server url and go to the `/check` endpoint.

Example:
```
http://myherokuapp.heroku.com/check
```

If you've successfully deployed, you should get a successful message stating *Successful Set-up* and important configurations you have set up.

If not you should get a message to verify your following configs, and a list of potential errors that may need to be set up properly.

## Contribute
Currently the project is not at the best possible shape, and can be refactor quite a bit. You are more than welcome to submit any issues and feature request to issues section of the repo. I'm no means a expert in Node, so feel free to submit PR for refactors, typos, features, README clarity, etc.


