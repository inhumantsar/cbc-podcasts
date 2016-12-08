var constants = require('./constants');
var request = require('request');

module.exports = function(title, callback) {
    console.log('getListing: got title: ' + title);
    var url = 'https://' + constants.listingService.host + '/' + constants.listingService.pathPrefix + '/title/' + encodeURIComponent(title);
    console.log('getListing: built url: ' + url);

    request({url: url, json: true}, function(err, res, json){
      if (err) { throw err; }
      console.log('getListing: got response status code: '+ res.statusCode);
      console.log('getListing: got json: ' + json);
      callback(json);
    });
}
