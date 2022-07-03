#!/usr/bin/env node

import syncify from '../package/index';
import args from 'minimist';

syncify(args(process.argv.slice(1), {
  alias: {
    config: 'c',
    build: 'b',
    watch: 'w',
    upload: 'u',
    download: 'd',
    theme: 't',
    input: 'i',
    output: 'o',
    help: 'h',
    metafields: 'm',
    pages: 'p',
    redirects: 'r',
    filter: 'f',
    spawn: 's'
  },
  default: {
    cli: true,
    dev: true,
    build: true,
    prod: false,
    prompt: false,
    watch: false,
    clean: false,
    upload: false,
    download: false,
    metafields: false,
    pages: false,
    redirects: false,
    pull: false,
    push: false,
    help: false,
    vsc: false,
    setup: false,
    strap: false,
    silent: false,
    server: false,
    cwd: process.cwd(),
    config: '.',
    input: 'source',
    output: 'theme'
  },
  boolean: [
    'vsc',
    'dev',
    'prod',
    'build',
    'prompt',
    'watch',
    'upload',
    'setup',
    'server',
    'metafields',
    'pages',
    'redirects',
    'download',
    'clean',
    'silent',
    'help',
    'pull',
    'push'
  ],
  string: [
    'theme',
    'config',
    'input',
    'output',
    'strap',
    'filter',
    'spawn'
  ]
}));
