//@ts-nocheck
import { defineConfig } from '@syncify/cli';



export default defineConfig({
  clean: false,
  input: 'src',
  output: 'dist',
  hot: {

  },
  stores: {
    domain: 'syncify',
    themes: {
      custom: 136656060657
    }
  },
  logger: {
    warnings: false,
    clear: true,
    silent: false,
    stats: true
  },
  paths: {
    assets: 'assets/images/*',
    config: 'data/settings/*',
    locales: 'data/translations/*',
    metafields: 'data/metafields/**/*',
    layout: 'theme.liquid',
    pages: 'views/pages/*',
    customers: 'views/customer/*',
    templates: 'views/*.json',
    snippets: 'views/include/**/*',
    sections: ['views/sections/**/*']
  },
  views: {
    sections: {
      prefixDir: true,
      separator: '-',
      global: [
        'layout',
        'collection',
        'product',
        'index'
      ]
    },
    snippets: {
      global: [],
      prefixDir: true,
      separator: '-'
    },
    pages: {
      language: 'markdown',
      author: 'Syncify'
    }
  },
  transforms: {
    script: {
      'assets/output-[file]': [
        'scripts/components/test.ts',
        'scripts/modules/lazysizes.ts'
      ],
      'assets/bundle.min.js': 'scripts/bundle.ts',
//      'assets/lazysizes.min.js': 'scripts/modules/lazysizes.ts',
//      'snippets/[dir]-[file]': 'scripts/globs/*.ts',
      'snippets/foo-snippet': {
        input: 'scripts/snippet.ts',
        format: 'esm',
        snippet: false,
        target: 'es2016',
        external: [],
        watch: [],
        esbuild: {

        }
      }
    },
    style: {
      'assets/stylesheet.min.css': {
        input: 'styles/stylesheet.scss',
        watch: ['styles/sections/*'],
        postcss: true,
        sass: true
      },
      'snippets/css.liquid': {
        input: 'styles/vars.css.liquid',
        postcss: true,
        sass: true
      },
      'snippets/testing.css': {
        input: 'styles/snippet.css',
        postcss: true,
        sass: false
      }
    },
    svg: {
      'snippets/icon.[file]': {
        input: 'assets/icons/social/*',
        format: 'file'
      },
      'snippets/sprite.liquid': {
        input: 'assets/icons/feather/*',
        sprite: {
          svg: {
            dimensionAttributes: true,
            namespaceClassnames: true,
            namespaceIDs: false
          }
        }
      },
      'snippets/social.liquid': {
        format: 'sprite',
        input: [
          'assets/icons/social/facebook.svg',
          'assets/icons/social/instagram.svg',
        ],
      }
    },
  },
  processors: {
    esbuild: {
      bundle: true,
      sourcemap: false,
    },
    sass: {
      sourcemap: true,
      style: 'compressed',
      include: ['node_modules/'],
    },
    postcss: []
  },
  minify: {
    script: {

      keepNames: false,
      legalComments: "inline",
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      mangleQuoted: true,
      exclude: []
    },
    json: {
      assets: true,
      config: true,
      locales: true,
      metafields: true,
      templates: true,
      exclude: []

    },
    style: {

    },
    views: {
      collapseWhitespace: true,
      minifySchema: true,
      minifyScript: true,
      minifyStyle: true,
      removeComments: true,
      stripDashes: true,
      exclude: []
    }
  },
  plugins: []
});
