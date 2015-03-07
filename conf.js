var homedir = require('homedir')();
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

var confDir = path.join(homedir, '.paz-digitalocean');


exports.ensure = function() {
  mkdirp.sync(confDir);
};

exports.get = function(key) {
  try {
    return fs.readFileSync(path.join(confDir, key), {encoding: 'utf8'});
  } catch(err) {
    return null;
  }
};

exports.set = function(key, value) {
  return fs.writeFileSync(path.join(confDir, key), value, {
    encoding: 'utf8',
    mode: 0o600
  });
};