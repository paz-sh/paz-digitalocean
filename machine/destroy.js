var fs = require('fs');
var DO = require('./do');
var conf = require('../conf');
var error = require('../error');
var join = require('path').join;
var clusterDir = join(conf.dir, 'clusters');

module.exports = function(argv) {

  var cluster = argv._.shift();
  if (! cluster) {
    return error('please provide a cluster name');
  }
  var clusterPath = join(clusterDir, cluster);
  var configPath = join(clusterPath, 'userdata');
  if (! fs.existsSync(configPath)) {
    return error('could not find cluster ' + cluster);
  }

  var name = argv._.shift();
  if (! name) {
    return error('please provide a droplet name suffix');
  }

  var token = conf.get('digitalocean_api_token');
  if (! token) {
    return error('please run setup to setup your DO API token');
  }

  var api = DO(token);
  var path = join(clusterPath, 'machines', name + '.json');

  var machine;
  try {
    machine = fs.readFileSync(path);
  } catch(err) {
    // do nothing
  }

  if (machine) {
    machine = JSON.parse(machine);
  }
  else {
    return error('could not find machine ' + name);
  }

  console.log('destroying machine %s-%s (%s)'.yellow, cluster, name, machine.id);

  api.droplet.destroy(machine.id, function(err) {
    if (err) {
      error(err);
    }
    else {
      fs.unlinkSync(path);
      console.log('machine %j removed'.green, name);
    }
  });
}