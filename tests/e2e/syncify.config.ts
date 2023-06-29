import { defineConfig } from 'syncify-cli';

export default defineConfig(
  {
    input: 'src',
    output: 'theme',
    export: 'export',
    import: 'import',
    config: 'config',
    spawn: {
      build: {
        rollup: 'rollup -c config/rollup.config.js'
      },
      watch: {
        rollup: 'rollup -c config/rollup.config.js -w',
        webpack: 'webpack --watch --color --config config/webpack.config.js',
        esbuild: 'esbuild src/scripts/ts/index.ts --outfile=theme/assets/esbuild-bundle.js --bundle --watch --color=true'
      }
    },
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
    views: {
      sections: {
        global: [
          'global'
        ]
      },
      pages: {
        language: 'markdown',
        author: ''
      }
    },
    transforms: {
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
            style: 'compressed'

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
    }
  }
);
