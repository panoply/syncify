import { defineConfig } from '@syncify/cli';
import autoprefix from 'autoprefixer';
// import icons from '@syncify/plugin-icons';

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
  hot: {
    label: 'visible',
    method: 'hot',
    inject: true,
    layouts: ['theme.liquid']
  },
  paths: {
    assets: 'assets/images/*',
    config: 'data/settings/*',
    locales: 'data/translations/*',
    metafields: 'data/metafields/**/*',
    layout: 'theme.liquid',
    pages: 'views/pages/*',
    customers: 'views/customer/*',
    templates: 'views/*.liquid',
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
    svg: [
      {
        input: 'icons/social/*',
        type: 'inline',
        rename: 'icon.[file]',
        snippet: true,
        svgo: true
      },
      {
        input: 'icons/sprites/feather/*',
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
      }
    ],
    image: {
      input: 'assets/images/*'
    }
  },
  processors: {
    esbuild: {},
    sprite: {
      svg: {
        dimensionAttributes: true,
        namespaceClassnames: true,
        namespaceIDs: true,
        rootAttributes: {
          id: 'icons',
          class: 'd-none'
        }
      }
    },
    sass: {
      sourcemap: true,
      style: 'compressed',
      includePaths: ['node_modules/']
    },
    postcss: [autoprefix()]
  },
  plugins: []
});
