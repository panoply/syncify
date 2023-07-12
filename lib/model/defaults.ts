import { Config } from 'types';

/**
 * Default Configuration
 *
 * This model is merged with the users config file settings and options.
 * This is reflective of the `syncify.config.js` or `syncify.json` file.
 *
 * **Notes:**
 *
 * This model will assert defaults to be merged with the `$`, `transform` and `terser` models.
 * The defined settings will hold reference to the user defined options, the model is immutable.
 */
export const defaults = (): Config => ({
  input: 'source',
  output: 'theme',
  import: 'import',
  export: 'export',
  config: '.',
  hot: false,
  stores: null,
  spawn: {
    build: null,
    watch: null
  },
  logger: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  },
  paths: {
    assets: 'assets/*',
    config: 'config/*.json',
    layout: 'layout/*.liquid',
    locales: 'locales/*.json',
    snippets: 'snippets/*.liquid',
    metafields: 'metafields/**/*.json',
    redirects: 'redirects.yaml',
    sections: [
      'sections/**/*.json',
      'sections/**/*.liquid'
    ],
    pages: [
      'pages/*.html',
      'pages/*.md'
    ],
    templates: [
      'templates/customers/*.liquid',
      'templates/customers/*.json'
    ],
    customers: [
      'templates/customers/*.liquid',
      'templates/customers/*.json'
    ]
  },
  views: {
    sections: {
      prefixDir: false,
      separator: '-',
      global: []
    },
    snippets: {
      prefixDir: false,
      separator: '-',
      global: []
    },
    pages: {
      author: '',
      language: 'html',
      global: [],
      suffixDir: false
    }
  },
  transforms: {
    svg: null,
    style: null,
    script: null
  },
  terser: {
    json: false,
    views: false,
    script: false
  }
});
