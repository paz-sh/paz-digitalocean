var mustache = require('mustache');
var mkdirp = require('mkdirp');
var conf = require('../conf');
var join = require('path').join;
var clusterDir = join(conf.dir, 'clusters');
var read = require('read');
var fs = require('fs');

var error = require('../error');

module.exports = function(argv) {
  console.log('About to create cluster'.yellow);
  read({
    prompt: 'Cluster name: '
  }, function(err, clusterName) {
    if (err) {
      return error(err);
    }

    createCluster(clusterName);
  }
  );
};

function createCluster(clusterName) {

  var path = join(clusterDir, clusterName);

  if(fs.existsSync(path)) {
    return error('a cluster with that name already exists');
  }

  mkdirp.sync(path);

  read({
    prompt: 'Generate a discovery URL by visiting http://discovery.etcd.io/new or getting one:'
  }, function(err, url) {
    var templateData = {
      discovery_url: url
    };

    [
      "digitalocean_api_token",
      "domain",
      "dnsimple_api_key",
      "dnsimple_email"
    ].forEach(function(key) {
      var val = conf.get(key);
      if (! val) {
        return error('need configuration for ' + key);
      }
      templateData[key] = val;
    });

    var userData = generateUserData(templateData);
    var userDataPath = join(path, 'userdata');

    fs.writeFileSync(userDataPath, userData);

    console.log('Saved user data in %s'.green, userDataPath);
  });
}

function generateUserData(data) {
  var template = fs.readFileSync(
    join(__dirname, 'user_data_template.txt'), {encoding: 'utf8'});

  return mustache.render(template, data);
}
