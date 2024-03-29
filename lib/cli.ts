import { argv } from 'node:process';
import { log } from 'syncify:log';
import { run } from '.';
import mm from 'minimist';

run(mm(argv.slice(1), {
  alias: {

    /* DIRECTORIES -------------------------------- */

    config: 'c',
    input: 'i',
    output: 'o',

    /* MODES -------------------------------------- */

    build: 'b',
    watch: 'w',
    upload: 'u',

    /* RESOURCE ----------------------------------- */

    theme: 't',
    help: 'h',
    spawn: 's',

    /* OPERATIONS --------------------------------- */

    resource: 'r',
    filter: 'f',
    delete: 'd'

  },
  default: {

    cwd: process.cwd(),

    /* DIRECTORIES -------------------------------- */

    config: '.',
    input: 'source',

    /* ENV ---------------------------------------- */

    cli: true,
    dev: true,
    prod: false,

    /* MODES -------------------------------------- */

    import: false,
    export: false,
    build: false,
    watch: false,
    upload: false,
    terse: false,
    hot: false,
    help: false,
    interactive: false,

    /* TRANSFORMS --------------------------------- */

    views: false,
    script: false,
    style: false,
    svg: false,
    image: false,

    /* RESOURCES ---------------------------------- */

    metafields: false,
    pages: false,
    redirects: false,

    /* OPERATIONS --------------------------------- */

    clean: false,
    silent: false,
    force: false,

    /* VERSIONING -------------------------------- */

    bump: null,

    /* TODO --------------------------------------- */

    setup: false,
    strap: false
  },
  boolean: [

    /* MODES -------------------------------------- */

    'build',
    'watch',
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

    'strap',

    /* TRANSFORMS --------------------------------- */

    'views',
    'script',
    'style',
    'svg',
    'image'
  ],
  string: [

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

    'resource'
    // --resource
    // --resource theme | -r theme
    // --resource metafields | -r metafields
    ,

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
