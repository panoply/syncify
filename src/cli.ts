#!/usr/bin/env node

import { throws } from './logger/console';
import { run } from '.';
import mm from 'minimist';

run(mm(process.argv.slice(1), {
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
    spawn: 's',
    delete: 'del'
  },
  default: {
    cwd: process.cwd(),
    config: '.',
    input: 'source',
    output: 'theme',
    import: 'import',
    export: 'export',
    cli: true,
    dev: true,
    prod: false,
    hot: false,
    help: false,
    setup: false,
    strap: false,
    silent: false,
    minify: false
  },
  boolean: [
    'vsc',
    'dev',
    'prod',
    'hot',
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
    'push',
    'minify'
  ],
  string: [
    'theme',
    'config',
    'input',
    'output',
    'export',
    'import',
    'strap',
    'filter',
    'spawn',
    'del'
  ]
})).catch(throws);
