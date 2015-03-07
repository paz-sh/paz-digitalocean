var usages = {
  global: global
};

module.exports = function usage(command) {
  if (! command) {
    command = 'global';
  }

  usages[command]();
}

function global() {
  console.log('paz-digitalocean [COMMAND]');
  console.log('\ncommands:');
  console.log('\tsetup');
  console.log('\tcluster');
}