var usages = {
  global: global,
  cluster: cluster
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

function cluster() {
  console.log('paz-digitalocean cluster [COMMAND]');
  console.log('\ncommands:');
  console.log('\tcreate');
  console.log('\tlist');
  console.log('\tdestroy');
}