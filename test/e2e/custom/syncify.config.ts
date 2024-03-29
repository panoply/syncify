import { defineConfig } from '@syncify/cli';

// COMMENTED OUT OPTIONS ARE NOT YET AVAILABLE
// BUT WILL BE MADE POSSIBLE IN FUTURE VERSIONS
// ALL CONFIG OPTIONS ARE TYPED AND WELL ANNOTATED

export default defineConfig({

  clean: true,
  input: 'src',
  output: 'theme',
  hot: {
    strategy: 'replace',
  },
  paths: {

    // metafields: 'metafields/**/*',
    // redirects: 'redirects.yaml'

    pages: 'pages/*',
    assets: [
      'assets/images/*',
      'scripts/vendor/**/*.js'
    ],
    config: 'data/settings/*',
    locales: 'data/translations/*',
    snippets: [
      'views/snippets/**/*'
    ],
    sections: [
      'views/sections/**/*'
    ],
    customers: [
      'views/customers/*'
    ],
    metaobject: [
      'views/templates/meta/*'
    ],
    templates: [
      'views/templates/json/*',
      'views/templates/liquid/*',
    ],
    layout: 'views/*',
  },

  // ADD YOUR STORE/S + THEME/S

  stores: [
    {
      domain: 'syncify',
      themes: {
        custom: 136656060657,
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

  views: {

    // EXAMPLE: SUB-DIRECTORY SECTION SUPPORT

    sections: {
      prefixDir: true,
      separator: '_',
      global: [
        '_',
        'layout',
        'blocks'
      ]
    },

    // EXAMPLE: SUB-DIRECTORY SNIPPET SUPPORT

    snippets: {
      prefixDir: true,
      separator: '_',
      global: [
        '_',
        'example',
        'misc'
      ]
    },


    pages: {
      safeSync: true,
      importLanguage: 'markdown'
    }
  },
  spawn: {

  },
  transforms: {

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
        sass: false,
      },
      // EXAMPLE: BUNDLING BOOTSTRAP
      'assets/example.min.css': {
        input: 'styles/example.scss',
        watch: ['styles/example/*'],
        postcss: true,
        sass: true
      },
      // EXAMPLE: GENERATING A SNIPPET
      'snippets/example.css.liquid': {
        input: 'styles/snippet.scss',
        postcss: true,
        sass: true,
      }
    },

    svg: {
      // DAWN ICONS
      'snippets/icon.[file]': {
        input: 'assets/icons/dawn/*',
        snippet: true,
        format: 'file',
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
    },
  },
  processors: {
    esbuild: {
      bundle: true,
      sourcemap: true,
    },
    sass: {
      sourcemap: true,
      style: 'compressed',
      include: ['node_modules/'],
    },
    postcss: []
  },
  terser: {
    json: {
      assets: true,
      config: true,
      locales: true,
      metafields: true,
      templates: true,
      groups: true,
      exclude: []
    },
    script: {
      keepNames: false,
      legalComments: "inline",
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      mangleQuoted: true,
      exclude: []
    },
    liquid: {
      removeComments: true,
      collapseInner: false,
      collapseWhitespace: true,
      minifyJavascript: false,
      minifySchema: false,
      minifyStyle: false,
      minifyStylesheet: false,
      stripDashes: true,
      exclude: []
    },
    markup: {
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      removeComments: true,
      exclude: []
    }
  }
});
