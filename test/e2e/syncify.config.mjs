
/** @type {import('@syncify/cli').Config} */
export default {
  input: 'src',
  output: 'theme',
  export: 'export',
  import: 'import',
  config: 'config',
  stores: [
    {
      domain: 'syncify',
      themes: {
        dev: 129457717489,
        prod: 129457717489,
        stage: 129457717489,
        test: 129457717489
      }
    },
    {
      domain: 'boefje',
      themes: {
        dev: 43989205050,
        prod: 43989205050
      }
    }
  ],
  live: {
    localhost: 3000,
    websocket: 8089,
    labels: true,
    preserveScroll: true
  },
  paths: {
    assets: 'assets/**/*',
    config: 'config/*.json',
    locales: 'locales/*.json',
    layout: [
      'views/theme.liquid',
      'views/layouts/*.liquid'
    ],
    sections: [
      'views/sections/**/*.liquid'
    ],
    metafields: 'metafields/**/*.json',
    customers: [
      'views/customers/*.json',
      'views/customers/*.liquid'
    ],
    pages: [
      'pages/*.md',
      'pages/*.html'
    ],
    templates: [
      'views/templates/*.json',
      'views/templates/*.liquid'
    ],
    snippets: [
      'views/snippets/*.liquid',
      'styles/snippet.css.liquid' // LETS TEST AN EXTERNAL LINKED FILE
    ]
  },
  spawn: {
    build: {
      rollup: 'rollup -c config/rollup.config.js'
    },
    watch: {
      rollup: 'rollup -c config/rollup.config.js -w',
      // webpack: 'webpack --watch --color --config config/webpack.config.js',
      esbuild: 'esbuild src/scripts/ts/index.ts --outfile=theme/assets/esbuild-bundle.js --bundle --watch --color=true'
    }
  },
  views: {
    sections: {
      directoryPrefixing: true,
      onlyPrefixDuplicates: false,
      prefixSeparator: '-',
      global: [
        'global'
      ]
    },
    pages: {
      language: 'markdown',
      author: ''
    },
    icons: {
      useCustomTag: false,
      tagName: 'icon',
      tagVoid: true,
      vscodeCustomData: false
    }
  },
  transforms: {
    json: {
      indent: 2,
      useTab: false,
      crlf: false,
      exclude: []
    },
    svg: [
      {
        input: [ 'icons/inlined/*.svg' ],
        rename: 'icon.[file]',
        snippet: true,
        svgo: true
      },
      {
        input: 'icons/sprites/feather/*.svg',
        rename: 'icons.liquid',
        svgo: false,
        snippet: true,
        sprite: {
          dimensionAttributes: true,
          namespaceClassnames: true,
          namespaceIDS: false,
          rootAttributes: {
            id: 'foo'
          }
        }
      },
      {
        input: 'icons/sprites/social/*.svg',
        rename: 'social-icons.liquid',
        svgo: false,
        snippet: true,
        sprite: {
          dimensionAttributes: true,
          namespaceClassnames: true,
          namespaceIDS: false,
          rootAttributes: {
            id: 'foo'
          }
        }
      }
    ],
    style: [
      {
        input: 'styles/scss/snippet.scss',
        snippet: true,
        rename: '[file]-[dir].min.css', // TEST dir RENAME
        postcss: true,
        sass: {
          warnings: false, // NO WARNINGS
          sourcemap: true,
          style: 'compressed'
        }
      },
      {
        input: 'styles/scss/index.scss',
        snippet: false,
        rename: 'main.min.css',
        watch: [
          '!scss/bootstrap.scss', // EXCLUDE TEST
          'styles/scss/dir/*.scss' // COMPILE ON CHANGES IN dir FOLDER
        ]
      },
      {
        input: 'styles/scss/bootstrap.scss', // BOOTSTRAP FRAMEWORK
        snippet: false,
        sass: {
          warnings: true,
          sourcemap: true,
          style: 'compressed',
          includePaths: [
            'node_modules/'
          ]
        }
      },
      {
        input: 'styles/css/snippet.css', // COMPILE THIS FILE ONLY
        rename: 'example-[file].[ext]', // RENAME TEST
        snippet: true // WE WILL GENERATE A SNIPPET
      },
      {
        input: [
          'styles/css/*.css', // COMPILES base.css AND stylesheet.css
          '!styles/css/snippet.css' // EXCLUDE TEST
        ],
        rename: '[dir]-[file]'
      }
    ]
  },
  minify: {
    json: {
      assets: true,
      config: true,
      jsonld: true,
      locales: true,
      metafields: true,
      schema: true,
      templates: true,
      exclude: []
    },
    script: {
      legalComments: 'none',
      mangleCache: {},
      mangleProps: null,
      mangleQuoted: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true
    },
    liquid: {
      removeNewlineAttributes: true,
      removeComments: true,
      removeSchemaRefs: true,
      minifySchemaTag: true,
      stripAttributesNewlines: true,
      stripInnerTagWhitespace: false,
      stripWhitespaceDashes: true,
      ignoreTags: null,
      ignoreObjects: null,
      stripAttributeNewlines: true,
      exclude: null
    },
    html: {
      minifyJS: false,
      minifyCSS: false,
      caseSensitive: false,
      collapseBooleanAttributes: false,
      collapseInlineTagWhitespace: false,
      conservativeCollapse: false,
      keepClosingSlash: false,
      noNewlinesBeforeTagClose: false,
      preventAttributesEscaping: false,
      removeEmptyAttributes: false,
      removeEmptyElements: false,
      removeOptionalTags: false,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      sortAttributes: false,
      sortClassName: false,
      useShortDoctype: true,
      collapseWhitespace: true,
      continueOnParseError: true,
      removeComments: true,
      trimCustomFragments: true,
      ignoreCustomFragments: [
        /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,
        /<style[\s\S]*?<\/style>/,
        /{%[\s\S]*?%}/,
        /{{[\s\S]*?}}/
      ]
    }
  }
};
