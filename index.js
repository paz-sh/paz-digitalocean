#!/usr/bin/env node

require('colors');
var conf = require('./conf');

var argv = require('minimist')(process.argv.slice(2));

var command = argv._.shift();

if (! command) {
  return usage();
}

var commands = {
  setup: require('./setup')
};

command = commands[command];

if (! command) {
  error('unknown command');
  return usage();
}

conf.ensure();

command(argv);

function usage() {
  console.log('paz-digitalocean [COMMAND]');
  console.log('\ncommands:');
  console.log('\setup');
}

function error(err) {
  console.error((err.message || err).red);
}

