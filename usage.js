var usages = {
  global: global,
  cluster: cluster,
  machine: machine
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
  console.log('\tmachine');
}

function cluster() {
  console.log('paz-digitalocean cluster [COMMAND]');
  console.log('\ncommands:');
  console.log('\tcreate');
  console.log('\tlist');
  console.log('\tdestroy');
}

function machine() {
  console.log('paz-digitalocean machine [COMMAND]');
  console.log('\ncommands:');
  console.log('\tcreate [cluster] [machine name]');
  console.log('\tdestroy [cluster] [machine name]');
}