import { defineConfig } from '@syncify/cli';
// COMMENTED OUT OPTIONS ARE NOT YET AVAILABLE
// BUT WILL BE MADE POSSIBLE IN FUTURE VERSIONS
// ALL CONFIG OPTIONS ARE TYPED AND WELL ANNOTATED

export default defineConfig({

  clean: true,
  input: 'src',
  config: 'scripts',
  output: 'theme',
  log: {
    clear: true
  },
  paths: {

    // metafields: 'metafields/**/*',
    // redirects: 'redirects.yaml'

    pages: 'pages/*',
    assets: [
      'assets/images/*'
      // 'scripts/vendor/**/*.js'
    ],
    schema: [
      'views/schema/*.schema'
    ],
    config: 'data/settings/*',
    locales: 'data/translations/*',
    snippets: {
      '[dir]-[name]': [
        'views/snippets/header/*',
        'views/snippets/product/*'
      ],
      '*': [
        'views/snippets/_/**',
        'views/sections/misc/**'
      ]
    },
    sections: {
      '[dir]-[name]': [
        'views/sections/cart/*',
        'views/sections/featured/*',
        'views/sections/groups/*',
        'views/sections/header/*',
        'views/sections/main/*'
      ],
      '*': [
        'views/sections/_/**',
        'views/sections/layout/**',
        'views/sections/blocks/**'
      ]
    },
    customers: [
      'views/customers/*'
    ],
    metaobject: [
      'views/templates/meta/*'
    ],
    templates: [
      'views/templates/json/*',
      'views/templates/liquid/*'
    ],
    layout: 'views/*'
  },

  // ADD YOUR STORE/S + THEME/S

  // stores: [
  //   {
  //     domain: 'syncify',
  //     themes: {
  //       custom: 136656060657,
  //     }
  //   },
  //   {
  //     domain: 'boefje',
  //     themes: {
  //       dev: 43989205050,
  //       prod: 43989205050
  //     }
  //   }
  // ],

  spawn: {
    build: {
      // rollup: 'rollup -c scripts/rollup.config.js',
      // tailwind: 'pnpm tailwindcss -i ./src/assets/styles/base.css -o ./src/assets/styles/tailwind.css --watch',
    },
    watch: {
      // tailwind: 'tailwindcss -i ./src/styles/tailwind/base.css -o ./src/styles/tailwind/tailwind.css --watch',
      // rollup:  'rollup -c scripts/rollup.config.js -w --bundleConfigAsCjs',
      // webpack: 'webpack --watch --color --config scripts/webpack.config.js',
      // esbuild: 'esbuild src/scripts/ts/index.ts --outfile=theme/assets/esbuild-bundle.js --bundle --watch --color=true'
    }
  },
  transform: {

    script: {

      // DAWN JS
      'assets/[file]': 'scripts/dawn/*.js',

      // EXAMPLE: BELOW IS AN EXAMPLE OF TS/JS
      'assets/bundle.min.js': 'scripts/bundle.ts',

      // EXAMPLE: MULTIPLE FILES WITH RENAME
      // EXAMPLE: GENERATING A SNIPPET
      'snippets/foo-snippet': {
        input: 'scripts/snippet.ts',
        format: 'esm',
        snippet: false,
        target: 'es2016',
        external: [],
        watch: [],
        esbuild: {}
      }
    },

    style: {
      // DAWN CSS
      'assets/[file]': {
        input: 'styles/dawn/*.css',
        postcss: true,
        sass: false
      },
      // EXAMPLE: BUNDLING BOOTSTRAP
      'assets/example.min.css': {
        input: 'styles/example.scss',
        watch: [ 'styles/example/*' ],
        postcss: true,
        sass: true
      },
      // EXAMPLE: GENERATING A SNIPPET
      'snippets/example.css.liquid': {
        input: 'styles/snippet.scss',
        postcss: true,
        sass: true
      },
      // EXAMPLE: GENERATING A SNIPPET
      'assets/tailwind-[file]': {
        input: 'styles/tailwind/base.css',
        postcss: [
          require('autoprefixer'),
          require('tailwindcss')
        ],
        sass: false
      }
    },

    svg: {
      // DAWN ICONS
      'snippets/icon.[file]': {
        input: 'assets/icons/dawn/*',
        snippet: true,
        format: 'file'
      },
      // EXAMPLE: BUILDING A SPRITE FROM FEATHER ICONS
      'snippets/sprite.liquid': {
        input: 'assets/icons/feather/*',
        format: 'sprite',
        sprite: {
          svg: {
            dimensionAttributes: true,
            namespaceClassnames: true,
            namespaceIDs: false
          }
        }
      }
    }
  },
  processors: {
    esbuild: {
      bundle: true,
      sourcemap: true
    },
    sass: {
      sourcemap: true,
      style: 'compressed',
      include: [ 'node_modules/' ]
    },
    postcss: [
      require('autoprefixer')
    ]
  }
});
