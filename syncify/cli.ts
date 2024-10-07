import { argv } from 'node:process';
import { cmd } from 'syncify:cli/args';
import { run } from '.';

run(
  cmd(argv, {

    /* PATHS -------------------------------------- */

    config: {
      type: 'string',
      short: 'c'
    },
    input: {
      type: 'string',
      short: 'i'
    },
    output: {
      type: 'string',
      short: 'o'
    },

    /* TARGETS ------------------------------------ */

    theme: {
      type: 'string',
      short: 't'
    },
    spawn: {
      type: 'string',
      short: 's'
    },
    delete: {
      type: 'string',
      short: 'd'
    },
    filter: {
      type: 'string',
      short: 'f'
    },
    help: {
      type: 'string',
      short: 'h',
    },

    /* VERSION CONTROL ---------------------------- */

    publish: {
      type: 'boolean',
      default: false
    },
    release: {
      type: 'string'
    },
    bump: {
      type: 'string'
    },

    /* HELPERS ------------------------------------ */

    // strap: {
    //   type: 'string',
    //   default: null

    // },
    setup: {
      type: 'boolean',
      default: false
    },

    /* ENVIRONMENTS ------------------------------- */

    dev: {
      type: 'boolean',
      default: true
    },
    prod: {
      type: 'boolean',
      default: false
    },

    /* MODES -------------------------------------- */

    import: {
      type: 'boolean',
      default: false
    },
    export: {
      type: 'boolean',
      default: false
    },
    build: {
      type: 'boolean',
      short: 'b',
      default: false
    },
    watch: {
      type: 'boolean',
      short: 'w',
      default: false
    },
    upload: {
      type: 'boolean',
      short: 'u',
      default: false
    },
    terse: {
      type: 'boolean',
      default: false
    },
    hot: {
      type: 'boolean',
      default: false
    },
    interactive: {
      type: 'boolean',
      default: false
    },

    /* TRANSFORMS --------------------------------- */

    script: {
      type: 'boolean',
      default: false
    },
    style: {
      type: 'boolean',
      default: false
    },
    svg: {
      type: 'boolean',
      default: false
    },
    image: {
      type: 'boolean',
      default: false
    },

    /* RESOURCES ---------------------------------- */

    metafields: {
      type: 'boolean',
      default: false
    },
    pages: {
      type: 'boolean',
      default: false
    },
    redirects: {
      type: 'boolean',
      default: false
    },

    /* OPERATIONS --------------------------------- */

    doctor: {
      type: 'boolean',
      default: false
    },
    clean: {
      type: 'boolean',
      default: false
    },
    silent: {
      type: 'boolean',
      default: false
    },
    force: {
      type: 'boolean',
      default: false
    },
    cache: {
      type: 'boolean',
      default: false
    }

  })
).catch(console.error);
