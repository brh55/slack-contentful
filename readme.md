# Slack Contentful  ![Slack Icon](http://dist.alternativeto.net/icons/slack_59044.png?width=50&height=50&mode=crop&anchor=middlecenter)   ![Contentful Icon](https://lh5.googleusercontent.com/SiTAEkDd09U_7ngpQgCzQq4LXL-1876MnOr0AdCofQ0-l5TCWIUXRGviAQlAABj6h9bB6WLE=s50-h50-e365)

[![GitHub tag](https://img.shields.io/github/tag/brh55/slack-contentful.svg?style=flat-square&label=version)]()
[![Travis branch](https://img.shields.io/travis/brh55/slack-contentful/master.svg?style=flat-square)](https://travis-ci.org/brh55/slack-contentful) [![Dependency Status](https://david-dm.org/brh55/slack-contentful.svg?style=flat-square)](https://david-dm.org/brh55/slack-contentful)

Slack-contentful allows users to recieve push notifications on specified Contentful updates to a designated Slack channel. Updates are based on the following events: create, save, auto save, archive, unarchive, publish, unpublish, and delete.

![Example Update](https://cloud.githubusercontent.com/assets/6020066/13190874/ef823788-d72d-11e5-997a-4a88383ccdfd.png)

## Requirements

  * [Slack](http://slack.com/) Privileages to integrate Incoming Webhooks
  * [Node.js](http://nodejs.org/)
  * [Contentful](http://contentful.com) Access to add outgoing hooks

## Automated Set Up w/ Heroku
Allow for incoming hooks to your team's Slack

[![Add to Slack](https://platform.slack-edge.com/img/add_to_slack.png)](https://slack.com/oauth/authorize?scope=incoming-webhook&client_id=7804118849.22604448065)

Deploy the server to your own Heroku instance, and set `SLACK_WEBHOOK` to the incoming hook url from the integration above

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

It's preferred to set your locale, and leave your bot's emojis and username blank as these can be edit through the "Incoming Hooks" page by other team members.

## Manual Set Up

### Configuration
The configuration of the bot are set with environment variables using an `.env` file. Please look at the `example.env` file of possible configurations, and create an updated `.env` file before you deploy.

**Available Configuration Options:**
 
 ENV Variable | Required | Description | Default Value 
------------ | ------------- | ------------- | -------------
SLACK_WEBHOOK | Y |The webhook Url provided by the incoming hooks | N/A 
SLACK_CHANNEL | Y |The slack channel to send notifications | N/A 
ENTRIES | N | A comma seperated list of Contentful Entry IDs you want to be notified of | N/A 
TRACK_ALL | N | Set this to true if all Contentful updates should be notified, this will override tracked entries | false
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
6. The notifications can be customized based on particular events. __examine below__

[grainularity of updates](https://cloud.githubusercontent.com/assets/6020066/15280632/9f83b0e2-1b00-11e6-8d80-e34e552c06d8.png)

__NOTE: AUTO_SAVE event will be triggered after PUBLISH events.__

## Post Deployment - Test & Debugging
After your app has deployed, go to your server url and go to the `/debug` endpoint to verify your settings, and help with debugging any potential issues.

Example:
```
http://myherokuapp.heroku.com/debug
```

If you've successfully deployed, you should get a successful message stating *Successful Set-up* along with a table of configurations to verify against as depicted below.

![successful set up](https://cloud.githubusercontent.com/assets/6020066/15281068/c6170a38-1b05-11e6-82bc-9d7ddfdaf861.png)

If set up was unsuccessful, you should get a message to verify your configurations, along with important configurations that the server has set up.

![unsuccessful set up](https://cloud.githubusercontent.com/assets/6020066/15281069/c61df7da-1b05-11e6-90db-466194ac0841.png)

## Contribute
If you would like to contribute to this project, take a look at the [wiki](https://github.com/brh55/slack-contentful/wiki) to get started.

Feel free fork and submit PRs, if applicable reference the issue, or explain the intent of the PR. If it's suitable, I'll go ahead and merge it.
