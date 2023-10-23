import type { Config } from 'types';

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
  publish: {
    bindVersion: false,
    publishRole: 'unpublished',
    themeLimit: 3,
    tunnelPort: 80
  },
  spawn: {
    build: null,
    watch: null
  },
  log: {
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
    metafields: 'metafields/**/*.json',
    redirects: 'redirects.yaml',
    schema: 'schema/*.json',
    snippets: 'snippets/**/*.liquid',
    metaobject: 'templates/metaobject/*',
    sections: [
      'sections/**/*.json',
      'sections/**/*.liquid'
    ],
    pages: 'pages/*',
    templates: 'templates/*',
    customers: 'templates/customers/*'
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
      safeSync: true,
      language: 'html',
      suffixDir: false,
      global: []
    }
  },
  transform: {
    svg: null,
    style: null,
    script: null
  },
  terser: {
    json: false,
    markup: false,
    liquid: false,
    script: false
  }
});
