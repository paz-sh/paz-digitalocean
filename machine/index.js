var commands = {
  create: require('./create'),
  destroy: require('./destroy')
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