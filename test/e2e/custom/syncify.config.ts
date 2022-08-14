import { defineConfig } from '@syncify/cli';
import autoprefix from 'autoprefixer';
// import icons from '@syncify/plugin-icons';

export default defineConfig({
  input: 'src',
  output: 'dist',
  stores: {
    domain: 'syncify',
    themes: { custom: 129457717489 }
  },
  hot: { hidePreview: true },
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
    sections: [
      'views/layout/*',
      'views/sections/**/*'
    ]
  },
  spawn: {
    watch: {
      esbuild: 'esbuild src/scripts/bundle.ts --outfile=dist/assets/esbuild-bundle.js --bundle --watch --color=true'
    }
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
    pages: {
      language: 'markdown',
      author: 'Syncify'
    }
  },
  processor: {
    style: {
      sass: {
        warnings: false,
        sourcemap: true,
        style: 'expanded'
      },
      postcss: [
        autoprefix()
      ]
    },
    svg: {
      svgo: {
      },
      sprite: {
      }
    }
  },
  transforms: {
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
    },
    style: [
      {
        input: 'styles/stylesheet.scss',
        snippet: false,
        rename: '[file].min.css',
        postcss: true,
        watch: [ 'styles/**', '!styles/vars.css.liquid' ],
        sass: {
          warnings: false,
          sourcemap: true,
          style: 'compressed',
          includePaths: [ 'node_modules' ]
        }
      },
      {
        input: 'styles/vars.css.liquid',
        snippet: true,
        postcss: false,
        sass: false
      }
    ]
  },
  plugins: [

  ]
});
