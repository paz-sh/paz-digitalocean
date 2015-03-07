var usage = require('../usage');

var commands = {
  create:  require('./create'),
  destroy: require('./destroy'),
  list: require('./list')
};

module.exports = function(argv) {
  var command = argv._.shift();

  if (! command) {
    return usage('cluster');
  }

  command = commands[command];
  if (! command) {
    return usage('cluster');
  }

  command(argv);
};