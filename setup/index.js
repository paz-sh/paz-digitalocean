var async = require('async');
var read = require('read');
var conf = require('../conf');
var error = require('../error');

var fields = [
  "digitalocean_api_token",
  "dnsimple_api_key",
  "dnsimple_email"
];

module.exports = function login(argv) {
  async.mapSeries(fields, promptAndSave, function(err) {
    if (err) {
      error(err);
    }
    else {
      console.log('Saved'.green);
    }
  });
};

function promptAndSave(q, cb) {
  var value = conf.get(q);
  read({
    prompt: q + ' :',
    default: value || ''
  }, function(err, value) {
    conf.set(q, value);
    cb(err, value);
  });
};