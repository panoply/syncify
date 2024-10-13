import type { Config } from 'types';

// const c = {
//   workflow: {
//     prod: 'production',
//     track: [],
//     force: [],
//     branches: {
//       staging: [
//         'pre-release'
//       ],
//       development: [
//         'production',
//         'development'
//       ]
//     }
//   }
// };

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
  spawn: {
    build: null,
    watch: null
  },
  hot: {
    server: 3000,
    socket: 8089,
    method: 'hot',
    strategy: 'hydrate',
    label: 'visible',
    previewBar: false,
    loadEventJS: '',
    chromeFlags: [
      '--restore-last-session',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--disable-sync',
      '--disable-password-manager',
      '--disable-save-password-bubble',
      '--disable-translate',
      '--disable-features=TranslateUI',
      '--disable-infobars',
      '--disable-web-security',
      '--test-type'
    ]
  },
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  }
});
