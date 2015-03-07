var rimraf = require('rimraf');
var conf = require('../conf');
var join = require('path').join;
var conf = require('../conf');
var clusterDir = join(conf.dir, 'clusters');
var fs = require('fs');

var error = require('../error');

module.exports = function(argv) {
  var files = fs.readdirSync(clusterDir);
  console.log('found %d clusters', files.length);
  files.forEach(function(cluster) {
    console.log(cluster);
  });
};