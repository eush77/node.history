#!/usr/bin/env node
'use strict';

var replHistory = require('repl.history'),
    home = require('home-dir'),
    kexec;

if (process.platform != 'win32') {
  try { kexec = require('kexec') }
  catch (e) {}
}

var Repl = require('repl'),
    spawn = require('child_process').spawn;


if (process.argv.length == 2) {
  var repl = Repl.start({
    prompt: '> ',
    useGlobal: true
  });
  replHistory(repl, home('.node_history'));
}
else {
  var argv = process.argv.slice(2);
  if (kexec) {
    kexec(process.execPath, argv);
    throw new Error('execvp(3) failed (unreachable)');
  }
  spawn(process.execPath, argv, {
    stdio: 'inherit'
  }).on('exit', function (code, signal) {
    if (signal) {
      process.kill(process.pid, signal);
    }
    process.exit(code);
  });
}
