
export default {
  input: 'source',
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
  paths: {
    assets: 'assets/**/*',
    config: 'json/config/*.json',
    locales: 'json/locales/*.json',
    layout: 'views/theme.liquid',
    sections: 'views/sections/**/*.liquid',
    metafields: 'metafields/**/*.json',
    customers: [
      'views/templates/customers/*.json',
      'views/templates/customers/*.liquid'
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
      'scripts/vars.js.liquid',
      'styles/vars.css.liquid'
    ]
  },
  spawn: {
    build: {
      rollup: 'rollup -c config/rollup.config.js'

    },
    watch: {
      rollup: 'rollup -c config/rollup.config.js -w',
      webpack: 'webpack --watch --color --config config/webpack.config.js',
      esbuild: 'esbuild source/js/dir/foo.js --outfile=theme/assets/out.js --bundle --watch --color=true'
    }
  },
  transforms: {
    json: {
      indent: 2,
      useTabs: false,
      exclude: []
    },
    sections: {
      directoryPrefixing: true,
      onlyPrefixDuplicates: false,
      prefixSeparator: '-',
      global: [
        'global'
      ]
    },
    pages: {
      importAs: 'markdown',
      liquidWarnings: true,
      fallbackAuthor: '',
      markdown: {
        breaks: true,
        headerIds: true,
        headerPrefix: '',
        mangle: true,
        silent: true,
        smartypants: false
      }
    },
    icons: {
      replacer: true,
      replacerTag: 'i',
      vscodeCustomData: false,
      inlined: [
        {
          input: [ 'svg/inline/*.svg' ],
          rename: 'icon.{file}',
          snippet: true,
          svgo: true
        }
      ],
      sprites: [
        {
          input: 'svg/sprite/*.svg',
          rename: 'icons.liquid',
          svgo: true,
          snippet: true,
          options: {
            dimensionAttributes: true,
            namespaceClassnames: true,
            namespaceIDS: false,
            rootAttributes: {
              id: 'foo'
            }
          }
        }
      ]
    },
    styles: [
      {
        input: 'styles/stylesheet.scss',
        snippet: false,
        rename: '{file}.min.css',
        postcss: true,
        watch: [
          'styles/**/*.scss'
        ],
        sass: {
          warnings: false,
          sourcemap: true,
          style: 'compressed',
          include: [
            'node_modules/'
          ]
        }
      },
      {
        input: 'scss/index.scss',
        snippet: false,
        rename: 'main.min.css',
        watch: [
          '!scss/bootstrap.scss',
          'scss/dir/*.scss'
        ]
      },
      {
        input: 'scss/bootstrap.scss',
        snippet: false,
        sass: {
          warnings: false,
          sourcemap: true,
          style: 'compressed',
          include: [
            'node_modules/'
          ]
        }
      },
      {
        input: 'css/styles/one.css',
        rename: 'example.{ext}',
        snippet: false,
        watch: [
          'css/**/*.css'
        ]
      },
      {
        input: [
          'scss/base/*.scss',
          'scss/independent/*.scss'
        ],
        rename: '{dir}-{file}'
      }
    ]
  },
  terser: {
    json: 'prod',
    html: 'prod',
    pages: 'prod',
    rules: {
      minifyJS: false,
      minifyCSS: true,
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
      sortAttributes: true,
      sortClassName: false,
      useShortDoctype: true,
      collapseWhitespace: true,
      continueOnParseError: true,
      removeComments: true,
      trimCustomFragments: true,
      minifyLiquidSectionSchema: true,
      removeLiquidComments: true,
      stripInnerTagWhitespace: false,
      stripAttributesContainingNewlines: true,
      stripRedundantWhitespaceDashes: true,
      ignoreLiquidTags: [],
      ignoreLiquidObjects: [],
      ignoreCustomFragments: []
    }
  }
};
