#!/usr/bin/env node

const fn = require('../package/index.js').default;
const argv = require('minimist')(process.argv.slice(1), {
  default: {
    cli: true,
    dev: true,
    prompt: false,
    build: false,
    prod: false,
    watch: false,
    clean: false,
    upload: false,
    download: false,
    metafields: false,
    pull: false,
    merge: false,
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
    'help',
    'pull',
    'merge'
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
    help: 'h',
    metafields: 'm'
  }
});

fn(argv);
