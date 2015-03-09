#!/usr/bin/env node

require('colors');
var usage = require('./usage');
var conf = require('./conf');

var argv = require('minimist')(process.argv.slice(2));

var command = argv._.shift();

if (! command) {
  return usage();
}

var commands = {
  setup: require('./setup'),
  cluster: require('./cluster'),
  machine: require('./machine')
};

command = commands[command];

if (! command) {
  error('unknown command');
  return usage();
}

conf.ensure();

command(argv);

function error(err) {
  console.error((err.message || err).red);
}

