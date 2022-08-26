import { defineConfig } from '@syncify/cli';
import autoprefix from 'autoprefixer';

export default defineConfig({
  hot: true,
  input: 'src',
  output: 'theme',
  stores: {
    domain: 'syncify',
    themes: {
      custom: 129457717489
    }
  },
  paths: {
    config: 'data/settings/*',
    locales: 'data/translations/*',
    metafields: 'data/metafields/**/*',
    layout: 'theme.liquid',
    pages: 'views/pages/*',
    customers: 'views/customer/*',
    templates: 'views/*',
    snippets: 'views/snippets/*',
    assets: [
      'assets/images/*',
      'assets/fonts/*'
    ],
    sections: [
      'views/layout/*',
      'views/sections/**/*'
    ]
  },
  transforms: {
    script: {
      'assets/bundle.min.js': 'script/bundle.ts',
      'snippets/i18n.liquid': 'script/i18n.ts'
    },
    svg: {
      'snippets/icons.liquid': 'assets/icons/*.svg'
    },
    style: {
      'assets/stylesheet.min.css': {
        input: 'styles/stylesheet.scss',
        postcss: true,
        sass: true,
        watch: [
          'styles/components/*',
          'styles/mixins/*'
        ]
      },
      'snippets/css.liquid': {
        input: 'styles/vars.css.liquid',
        postcss: false,
        sass: false
      }
    }
  },
  views: {
    sections: {
      prefixDir: true,
      separator: '-',
      global: [
        'index'
      ]
    },
    pages: {
      language: 'markdown',
      suffixDir: false
    }
  },
  processors: {
    tsup: {
      platform: 'browser',
      splitting: false,
      treeshake: 'smallest',
      format: [
        'esm'
      ]
    },
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
      includePaths: [
        'node_modules'
      ]
    },
    postcss: [
      autoprefix()
    ]
  }
});
