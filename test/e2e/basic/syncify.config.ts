import { defineConfig } from '@syncify/cli';
import autoprefix from 'autoprefixer';

export default defineConfig({
  clean: false,
  input: 'src',
  output: 'theme',
  stores: {
    domain: 'syncify',
    themes: {
      dev: 129457717489
    }
  },
  paths: {
    config: 'data/settings/*',
    locales: 'data/translations/*',
    metafields: 'data/metafields/**/*',
    layout: 'views/*.liquid',
    pages: 'views/pages/*',
    customers: 'views/customer/*',
    templates: 'views/templates/**/*',
    snippets: 'views/snippets/*',
    assets: [
      'assets/images/*',
      'assets/fonts/*'
    ],
    sections: [
      'views/sections/**/*'
    ]
  },
  transforms: {
    script: {
      'assets/bundle.min.js': 'assets/scripts/bundle.ts'
    },
    svg: {
      'snippets/icons.liquid': {
        input: 'assets/icons/sprite/*.svg',
        format: 'sprite'
      },
      'snippets/check.icon.liquid': {
        format: 'file',
        input: 'assets/pictograms/man.svg',
        snippet: true
      }
    },
    style: {
      'assets/stylesheet.min.css': {
        input: 'assets/styles/stylesheet.scss',
        sass: true,
        watch: [ 'assets/styles/base/*' ]
      }
    }
  },
  views: {
    sections: {
      prefixDir: true,
      separator: '-',
      global: []
    },
    pages: {
      language: 'markdown',
      suffixDir: false
    }
  },
  processors: {
    esbuild: {
      format: 'esm',
      bundle: true,
      sourcemap: true
    },
    sprite: {
      svg: {
        dimensionAttributes: true,
        namespaceIDs: true,
        rootAttributes: {
          class: 'd-none'
        }
      }
    },
    sass: {
      sourcemap: true,
      style: 'compressed',
      include: [ 'node_modules' ]
    },
    postcss: [
      autoprefix()
    ]
  }
});
