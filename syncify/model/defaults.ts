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
  paths: {
    assets: 'assets/*',
    config: 'config/*.json',
    layout: 'layout/*.liquid',
    locales: 'locales/*.json',
    metafields: 'metafields/**/*.json',
    redirects: 'redirects.yaml',
    schema: 'schema/*.{schema,json}',
    templates: 'templates/*',
    customers: 'templates/customers/*',
    metaobject: 'templates/metaobject/*',
    pages: 'pages/*',
    snippets: 'snippets/**/*.liquid',
    sections: 'sections/**/*.{liquid,json}'
  },
  transform: {
    svg: null,
    style: null,
    script: null,
    json: {
      indent: 2,
      useTab: false,
      crlf: false,
      comments: true,
      exclude: [],
      terse: false
    },
    liquid: {
      terse: false
    }
  },
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
  hot: false,
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  }
});
