from __future__ import print_function

import boto3
import json
import string
import urllib
import feedparser as fp

# Source: http://www.cbc.ca/radio/podcasts/
# for the most part we can guess podcast rss names by stripping out all the
# spaces and lowercasing everything ...
# http://www.cbc.ca/podcasting/includes/ontariotoday.xml
# http://www.cbc.ca/podcasting/includes/asithappens.xml

# ... but there are always exceptions...
exceptions = {
    'q': 'qpodcast',
    'ottawaallinaday': 'ottallinaday',
    'mainstreethalifax': 'mainstreetns',
    'albertaatnoon': 'calgwildrose', # ??? FUCK YOU TOO FRIEND.
}

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }

def guess_name(title):
    name = str(title).lower().translate(None, string.punctuation).translate(None, string.whitespace)
    print("guessed name: %s" % name)
    return name

def get_feed(title):
    gn = guess_name(title)
    url = "http://www.cbc.ca/podcasting/includes/%s.xml" % (exceptions[gn] if gn in exceptions.keys() else gn)
    print("guessed url: %s" % url)
    return fp.parse(url)

def format_items(rss):
    return [{'title': e.title, 'url': e.id,'published': e.published} for e in rss.entries]

def get_podcast(title):
    return format_items(get_feed(title))

def unquote_dict(d):
    return {urllib.unquote_plus(k): urllib.unquote_plus(v) for k,v in d.iteritems()}

def handler(event, context):

    print(event)

    payload = {}
    if 'pathParameters' in event.keys() and event['pathParameters']:
        payload.update(unquote_dict(event['pathParameters']))
    if 'queryStringParameters' in event.keys() and event['queryStringParameters']:
        payload.update(unquote_dict(event['queryStringParameters']))
    if 'body' in event.keys() and event['body']:
        payload.update(json.loads(event['body']))

    print(payload)

    if 'title' not in payload.keys():
        return respond(ValueError('No title supplied!'))

    return respond(None, get_podcast(payload['title']))
