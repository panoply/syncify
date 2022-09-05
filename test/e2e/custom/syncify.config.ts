import { defineConfig } from '@syncify/cli';
import autoprefix from 'autoprefixer';


export default defineConfig({
  clean: false,
  input: 'src',
  output: 'dist',
  stores: {
    domain: 'syncify',
    themes: {
      custom: 129457717489
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
    snippets: 'views/include/*',
    sections: ['views/layout/*', 'views/sections/**/*']
  },
  views: {
    sections: {
      prefixDir: true,
      separator: '-',
      global: ['layout', 'collection', 'product', 'index']
    },
    pages: {
      language: 'markdown',
      author: 'Syncify'
    }
  },
  transforms: {
    script: {
      'assets/bundle.min.js': 'scripts/bundle.ts',
      'assets/lazysizes.min.js': 'scripts/modules/lazysizes.ts',
      'snippets/[dir]-[file]': ['scripts/globs/*.ts'],
      'assets/globs.min.js': {
        input: 'scripts/globs.ts',
        format: 'iife'
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
    esbuild: {},
    sprite: {},
    sass: {
      sourcemap: true,
      style: 'compressed',
      include: ['node_modules/']
    },
    postcss: [autoprefix()]
  },
  minify: {},
  plugins: []
});
