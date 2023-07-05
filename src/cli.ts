#!/usr/bin/env node

/* eslint key-spacing: ["error", {
  "multiLine": {
    "beforeColon": true,
    "afterColon":true
  },
  "align": {
      "beforeColon": true,
      "afterColon": true,
      "on": "colon"
  }
}] */

import { argv } from 'node:process';
import { log } from '~log';
import { run } from '.';
import mm from 'minimist';

run(mm(argv.slice(1), {
  alias : {

    /* DIRECTORIES -------------------------------- */

    config : 'c',
    input  : 'i',
    output : 'o',

    /* MODES -------------------------------------- */

    build    : 'b',
    watch    : 'w',
    upload   : 'u',
    download : 'd',

    /* RESOURCE ----------------------------------- */

    theme : 't',
    help  : 'h',
    spawn : 's',

    /* OPERATIONS --------------------------------- */

    filter : 'f',
    delete : 'del'

  },
  default : {

    cwd : process.cwd(),

    /* DIRECTORIES -------------------------------- */

    config : '.',
    input  : 'source',

    /* ENV ---------------------------------------- */

    cli  : true,
    dev  : true,
    prod : false,

    /* MODES -------------------------------------- */

    import      : false,
    export      : false,
    build       : false,
    watch       : false,
    upload      : false,
    download    : false,
    terse       : false,
    hot         : false,
    help        : false,
    interactive : false,

    /* TRANSFORMS --------------------------------- */

    script : false,
    style  : false,
    svg    : false,
    image  : false,

    /* RESOURCES ---------------------------------- */

    metafields : false,
    pages      : false,
    redirects  : false,

    /* OPERATIONS --------------------------------- */
    clean  : false,
    silent : false,
    force  : false,

    /* TODO --------------------------------------- */

    setup : false,
    strap : false
  },
  boolean : [

    /* MODES -------------------------------------- */

    'build',
    'watch',
    'download',
    'upload',
    'import',
    'export',
    'hot',
    'terse',
    'help',
    'interactive',

    /* ENV ---------------------------------------- */

    'dev',
    'prod',

    /* RESOURCE ----------------------------------- */

    'metafields',
    'pages',
    'redirects',

    /* OPERATIONS --------------------------------- */

    'clean',
    'silent',
    'pull',
    'force',
    'test',

    /* GENERATORS --------------------------------- */

    'vsc',
    'strap',

    /* TRANSFORMS --------------------------------- */

    'script',
    'style',
    'svg',
    'image'
  ],
  string : [

    /* DIRECTORIES -------------------------------- */

    'input'
    , // --input ./path/dir | -i ./path/dir
    'output'
    , // --output ./path/dir | -o ./path/dir
    'config'
    , // --config ./path/dir | -c ./path/dir

    /* MODES -------------------------------------- */

    'theme'
    , // --theme foo | -t foo | (comma lists: foo,bar,baz)
    'spawn'
    , // --spawn foo | (comma lists: foo,bar,baz)
    'del'
    , // --delete file.liquid | --del file.ext | (comma lists: foo,bar,baz)

    /* OPERATIONS --------------------------------- */

    'bump'
    , // --bump major | --bump minor | --bump patch

    /* FILTERING ---------------------------------- */

    'filter'
    // --filter snippets | -f sections
    // --filter templates/theme.liquid
    // --filter /**/* | -f /**/*
    ,
    /* TODO --------------------------------------- */

    'strap'
    // --strap silk | --strap dawn
  ]
})).catch(log.throws);
