# Slack Contentful  ![Slack Icon](http://dist.alternativeto.net/icons/slack_59044.png?width=50&height=50&mode=crop&anchor=middlecenter)   ![Contentful Icon](https://lh5.googleusercontent.com/SiTAEkDd09U_7ngpQgCzQq4LXL-1876MnOr0AdCofQ0-l5TCWIUXRGviAQlAABj6h9bB6WLE=s50-h50-e365)

[![GitHub tag](https://img.shields.io/github/tag/brh55/slack-contentful.svg?style=flat-square&labe=version)]()
[![Travis branch](https://img.shields.io/travis/brh55/slack-contentful/master.svg?style=flat-square)](https://travis-ci.org/brh55/slack-contentful) [![devDendencies Status](https://david-dm.org/brh55/slack-contentful/dev-status.svg?style=flat-square)](https://david-dm.org/brh55/slack-contentful#info=Dependencies)

This Slack bot will allow users to set up notifications "on published" changes to specified Contentful entries and assets to a designated Slack channel.

![Example Update](https://cloud.githubusercontent.com/assets/6020066/13190874/ef823788-d72d-11e5-997a-4a88383ccdfd.png)

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
SLACK_CHANNEL | Y |The slack channel to send notifications | N/A 
ENTRIES | Y | A comma seperated list of Contentful Entry IDs you want to be notified of | N/A 
LOCALE | N (but preferred) | Contentful Locale to be tracked, currently only supports up to 1 | en-US 
PORT  | N | The port for the node server to run on | 5000 
UPDATE_COLOR | N  | Hex color for updates posted | #27ae60 
BOT_USERNAME | N | The bot's username | ContentfulUpdates 
BOT_EMOJI | N | The bot's icon | pencil2 
LARGE_PREVIEW | N | Should a large image preview be used for an asset notification  | false

Here's an example, of how your .env would look like.
__.env__
```
SLACK_WEBHOOK = https://hooks.slack.com/services/TA123ka9/A123910a9d8/mkas929199sad83lmk7h
SLACK_CHANNEL = #ContentfulFeed
ENTRIES = 6OFbybzxM4WOCuIO4qo8Qs,6aFz3qcuPe0eA8kwQm0Ume,6a232jal2eA8kwQm0Ume,etc
LOCALE = en-UK
PORT = 5000
UPDATE_COLOR = #27ae60
BOT_USERNAME = ContentfulUpdates
BOT_EMOJI = bomb
LARGE_PREVIEW = true
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

![successful set up](https://cloud.githubusercontent.com/assets/6020066/13191314/d56f7100-d730-11e5-91a9-fc595dc432ad.png)

If set up was unsuccessful, you should get a message to verify your configurations, along with important configurations that the server has set up.

![unsuccessful set up](https://cloud.githubusercontent.com/assets/6020066/13191312/d39a1574-d730-11e5-93f9-78b494319b01.png)

## Contribute
If you would like to contribute to this project, take a look at the [wiki](https://github.com/brh55/slack-contentful/wiki) to get started.

Feel free fork and submit PRs, if applicable reference the issue, or explain the intent of the PR. If it's suitable, I'll go ahead and merge it.
