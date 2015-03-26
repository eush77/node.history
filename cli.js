#!/usr/bin/env node
'use strict';

var replHistory = require('repl.history');

var Repl = require('repl'),
    spawnSync = require('child_process').spawnSync;


if (process.argv.length == 2) {
  var repl = Repl.start('> ');
  replHistory(repl, process.env.HOME + '/.node_history');
}
else {
  spawnSync(process.execPath, process.argv.slice(2), {
    stdio: 'inherit'
  });
}