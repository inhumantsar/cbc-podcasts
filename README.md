# CBC Podcasts

There are two AWS Lambda functions here: a Python function that finds and reads the CBC podcast RSS feeds, the other is a NodeJS-based podcast player skill for Alexa based on the [sample Alexa audio player project](https://github.com/alexa/skill-sample-nodejs-audio-player).

## Deployment

Uses Gordon to take care of all the heavy lifting. Deployment should work out of
the box using `gordon build && gordon apply`.

One bit of snowflaking needs to happen first though, since gordon doesn't support the Alexa Skills Kit yet. The template in `cloudformation/` will fix that. It takes one parameter: the generated Lambda function name for the Player.

Something funky with the ASK: DynamoDB CreateTable() permissions will be refused unless the function is called from an actual/simulated Alexa device hooked up to an Amazon account. The test function in Lambda itself stops being useful once you start getting responses like the one below.

    {
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "SSML",
          "ssml": "<speak> Sorry, this skill is not supported on this device </speak>"
        },
        "shouldEndSession": true
      },
      "sessionAttributes": {}
    }
