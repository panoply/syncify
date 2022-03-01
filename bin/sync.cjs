#!/usr/bin/env node

require('../package/index.js').default(require('minimist')(process.argv.slice(1), {
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
    cli: true,
    dev: true,
    prod: false,
    help: false,
    setup: false,
    strap: false,
    silent: false,
    server: false
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
    'del',
    'config',
    'input',
    'output',
    'strap',
    'filter',
    'spawn'
  ]

}));
