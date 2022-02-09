#!/usr/bin/env node

const fn = require('../package/index.js').default;
const argv = require('minimist')(process.argv.slice(1), {
  default: {
    cli: true,
    dev: true,
    prompt: true,
    build: false,
    prod: false,
    watch: false,
    clean: false,
    upload: false,
    download: false,
    help: false,
    env: 'dev',
    cwd: process.cwd()
  },
  boolean: [
    'vsc',
    'dev',
    'prod',
    'build',
    'watch',
    'upload',
    'download',
    'help'
  ],
  string: [
    'store',
    'theme',
    'output',
    'env'
  ],
  alias: {
    build: 'b',
    watch: 'w',
    clean: 'c',
    upload: 'u',
    download: 'd',
    store: 's',
    theme: 't',
    output: 'o',
    help: 'h'
  }
});

fn(argv);
