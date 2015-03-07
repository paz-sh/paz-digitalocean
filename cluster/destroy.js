var rimraf = require('rimraf');
var join = require('path').join;
var conf = require('../conf');
var clusterDir = join(conf.dir, 'clusters');
var read = require('read');
var fs = require('fs');

var error = require('../error');

module.exports = function(argv) {
  var name = argv._.shift();

  if (! name) {
    read({
      prompt: 'Cluster name: '
    }, haveClusterName);
  }
  else {
    haveClusterName(null, name);
  }

};

function haveClusterName(err, clusterName) {
  if (err) {
    return error(err);
  }

  console.log('About to delete cluster %s locally'.yellow, clusterName);

  destroyCluster(clusterName);
}


function destroyCluster(clusterName) {

  var path = join(clusterDir, clusterName);

  if(!fs.existsSync(path)) {
    return error('cluster does not exist');
  }

  rimraf.sync(path);

  console.log('Successfully removed cluster %s'.green, clusterName);
}
