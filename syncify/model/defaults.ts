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
 * **MODEL IS IMMUTABLE**
 *
 * This model is merged with the users config file settings and options.
 * This is reflective of the `syncify.config.js` or `syncify.json` file.
 *
 * **Notes:**
 *
 * This model will assert defaults to be merged with the `$`, `transform` and `terser` models.
 * The defined settings will hold reference to the user defined options.
 */
export const defaults = (): Config => ({
  input: 'source',
  output: 'theme',
  config: '.',
  editor: null,
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
    sections: 'sections/**/*.{liquid,json}',
    blocks: 'blocks/*.liquid'
  },
  transform: {
    svg: null,
    style: null,
    script: null,
    json: {
      crlf: false,
      indent: 2,
      useTab: false,
      stripComments: false,
      sortArrays: false,
      sortObjects: false,
      noSortList: [],
      terse: false
    },
    liquid: {
      terse: false
    }
  },
  hot: {
    server: 41001,
    socket: 51001,
    method: 'hot',
    client: 'inject',
    label: true,
    eject: true,
    layouts: [
      'theme.liquid'
    ],
    flags: [
      '--no-preview-bar'
    ]
  },
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  }
});
