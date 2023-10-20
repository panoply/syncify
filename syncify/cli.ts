import { argv } from 'node:process';
import mm from 'minimist';
import { run } from '.';

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
    publish: 'p',

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
    interactive: false,
    publish: false,
    release: false,

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

    doctor: false,
    clean: false,
    silent: false,
    force: false,
    cache: false,

    /* VERSIONING -------------------------------- */

    bump: null,

    /* HELP --------------------------------------- */

    help: null,

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
    'cache',
    'doctor',

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
    'release'
    , // --release patch | --release minor | --release major

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

    /* HELP --------------------------------------- */
    'help'
    // --help examples
    // -h examples
    ,
    /* TODO --------------------------------------- */

    'strap'
    // --strap silk | --strap dawn
  ]
})).catch(console.error);
