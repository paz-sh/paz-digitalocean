var fs = require('fs');
var mkdirp = require('mkdirp');

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

  var options = {
    name: [cluster, '-', name].join(''),
    region: JSON.parse(
      fs.readFileSync(join(clusterPath, 'region'), {encoding: 'utf8'})),
    image: 'coreos-beta',
    size: JSON.parse(
      fs.readFileSync(join(clusterPath, 'size'), {encoding: 'utf8'})),
    private_networking: true,
    user_data: fs.readFileSync(join(clusterPath, 'userdata'), {encoding: 'utf8'}),
    ssh_keys: JSON.parse(
      fs.readFileSync(join(clusterPath, 'ssh_keys'), {encoding: 'utf8'})),
  };

  // quick hack to make the machine name available as fleet metadata
  options.user_data.replace('paz=wow', 'machine-name=' + options.name);

  console.log('creating droplet...'.yellow);

  api.droplet.create(options, function(err, result) {
    if (err) {
      return error(err);
    }

    var machinesPath = join(clusterPath, 'machines');
    mkdirp.sync(machinesPath);
    var machinePath = join(machinesPath, name + '.json');
    fs.writeFileSync(machinePath, JSON.stringify(result.droplet));

    console.log('created droplet %j.'.green, result.droplet.id);
    console.log('polling until active...'.yellow);
    startPollingDroplet(result.droplet);

    function startPollingDroplet(droplet) {
      setTimeout(pollDroplet, 5e3, droplet);
    }

    function pollDroplet(droplet) {
      api.droplet.get(droplet.id, function(err, result) {
        if (err) {
          error(err);
        }

        if (result && result.droplet) {
          fs.writeFileSync(machinePath, JSON.stringify(result.droplet));
        }
        if (result && result.droplet && result.droplet.status == 'active') {
          console.log('Droplet %j is active'.green, result.droplet.id);
          console.log('IP addresses:', result.droplet.networks.v4);
        }
        else {
          startPollingDroplet(droplet);
        }
      });
    }
  });
}
