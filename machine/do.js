var request = require('request');

module.exports = function(token) {
  return {
    droplet: {
      create: createDroplet,
      get: getDroplet,
      destroy: destroyDroplet
    }
  };

  function createDroplet(options, cb) {
    request.post({
      url: 'https://api.digitalocean.com/v2/droplets',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: options
    }, replied);

    function replied(err, res, body) {
      if (! err && res.statusCode != 202) {
        var message = 'Reply code was ' + res.statusCode + '.';
        if (body && body.message) {
          message = ' ' + body.message;
        }
        err = new Error(message);
      }
      cb(err, body);
    }
  }

  function getDroplet(id, cb) {
    request.get({
      url: 'https://api.digitalocean.com/v2/droplets/' + id,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    }, function(err, res, body) {
      if (!err && res.statusCode != 200) {
        var message = 'Reply code was ' + res.statusCode + '.';
        if (body && body.message) {
          message = ' ' + body.message;
        }
        err = new Error(message);
      }
      cb(err, body);
    });
  }

  function destroyDroplet(id, cb) {
    request({
      url: 'https://api.digitalocean.com/v2/droplets/' + id,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    }, function(err, res, body) {
      if (!err && res.statusCode != 204) {
        var message = 'Reply code was ' + res.statusCode + '.';
        if (body && body.message) {
          message = ' ' + body.message;
        }
        err = new Error(message);
      }
      cb(err, body);
    });
  }

};