var usage = require('../usage');

var commands = {
  create: require('./create'),
  destroy: require('./destroy')
};

module.exports = function(argv) {
  var command = argv._.shift();

  if (! command) {
    return usage('machine');
  }

  command = commands[command];
  if (! command) {
    return usage('machine');
  }
  command(argv);

};