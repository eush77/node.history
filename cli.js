#!/usr/bin/env node
'use strict';

var replHistory = require('repl.history');

var Repl = require('repl'),
    spawn = require('child_process').spawn;


if (process.argv.length == 2) {
  var repl = Repl.start('> ');
  replHistory(repl, process.env.HOME + '/.node_history');
}
else {
  spawn(process.execPath, process.argv.slice(2), {
    stdio: 'inherit'
  }).on('exit', function (code, signal) {
    if (signal) {
      process.kill(process.pid, signal);
    }
    process.exit(code);
  });
}
