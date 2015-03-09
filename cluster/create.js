var mustache = require('mustache');
var mkdirp = require('mkdirp');
var async = require('async');
var conf = require('../conf');
var join = require('path').join;
var clusterDir = join(conf.dir, 'clusters');
var read = require('read');
var fs = require('fs');

var error = require('../error');

var fields = [
  'name',
  'discovery_url',
  'region',
  'size',
  'domain'
];

module.exports = function(argv) {
  async.mapSeries(fields, prompt, prepareFields);
};

function prepareFields(err, results) {
  if (err) {
    error(err);
  }
  else {
    var ret = {};

    fields.forEach(function(field, index) {
      ret[field] = results[index];
    });

    promptKeys(ret);
  }
}

function prompt(question, cb) {
  read({
    prompt: question + ':'
  }, cb);
}

function promptKeys(options) {
  read({
    prompt: 'SSH key fingerprint (empty to end):'
  }, function(err, result) {
    if (err) {
      error(err);
    }
    else {
      if (!options.ssh_keys) {
        options.ssh_keys = [];
      }
      if (result) {
        options.ssh_keys.push(result);
        promptKeys(options);
      }
      else {
        createCluster(options);
      }
    }
  });
}

function createCluster(options) {
  console.log('About to create cluster'.yellow);

  var path = join(clusterDir, options.name);

  if(fs.existsSync(path)) {
    return error('a cluster with that name already exists');
  }

  mkdirp.sync(path);

  Object.keys(options).forEach(function(field) {
    fs.writeFileSync(join(path, field), JSON.stringify(options[field]));
  });

  options.dnsimple_api_key = conf.get('dnsimple_api_key');
  options.dnsimple_email = conf.get('dnsimple_email');

  var userData = generateUserData(options);
  var userDataPath = join(path, 'userdata');

  fs.writeFileSync(userDataPath, userData);

  console.log('Saved user data in %s'.green, userDataPath);
}

function generateUserData(data) {
  var template = fs.readFileSync(
    join(__dirname, 'user_data_template.txt'), {encoding: 'utf8'});

  return mustache.render(template, data);
}
