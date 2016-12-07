'use strict';

// Full list of podcasts: http://www.cbc.ca/radio/podcasts/
var audioData = [
    {
        'title' : 'Episode 140',
        'url' : 'https://feeds.soundcloud.com/stream/275202399-amazon-web-services-306355661-amazon-web-services.mp3'
    },
    {
        'title' : 'Episode 139',
        'url' : 'https://feeds.soundcloud.com/stream/274166909-amazon-web-services-306355661-aws-podcast-episode-139.mp3'
    },
    {
        'title' : 'Episode 138',
        'url' : 'https://feeds.soundcloud.com/stream/273105224-amazon-web-services-306355661-aws-podcast-episode-138.mp3'
    },
    {
        'title' : 'Episode 137',
        'url' : 'https://feeds.soundcloud.com/stream/272089501-amazon-web-services-306355661-aws-podcast-episode-137.mp3'
    },
    {
        'title' : 'Episode 136',
        'url' : 'https://feeds.soundcloud.com/stream/271026549-amazon-web-services-306355661-aws-podcast-episode-136.mp3'
    },
    {
        'title' : 'Episode 135',
        'url' : 'https://feeds.soundcloud.com/stream/270241244-amazon-web-services-306355661-aws-podcast-episode-135.mp3'
    }
];

function done(result) {
  if (!result) {
    console.log('Returning with no result.');
    return false;
  }
  return result;
}

function getParams(str) {
  var params = str.split(';').reduce(function (params, param) {
    var parts = param.split('=').map(function (part) { return part.trim(); });
    if (parts.length === 2) {
      params[parts[0]] = parts[1];
    }
    return params;
  }, {});
  return params;
}


module.exports = audioData;
