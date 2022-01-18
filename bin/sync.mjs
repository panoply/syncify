#!/usr/bin/env node

import main from '../package/index';
import args from 'minimist';

const argv = args(process.argv.slice(1), {
  default: {
    cli: true,
    interactive: false,
    cwd: process.cwd(),
    dev: true,
    prod: false
  },
  boolean: [
    'dev',
    'prod'
  ],
  string: [
    's',
    't',
    'o',
    'e'
  ],
  alias: {
    store: 's',
    theme: 't',
    output: 'o'
  }
});

main(argv);
