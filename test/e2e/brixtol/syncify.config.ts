import { defineConfig } from '@syncify/cli';
import autoprefix from 'autoprefixer';

export default defineConfig({
  clean: true,
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
    templates: 'views/*',
    snippets: 'views/snippets/*',
    assets: [ 'assets/images/*', 'assets/fonts/*' ],
    sections: [ 'views/layout/*', 'views/sections/**/*' ]
  },
  transforms: {
    script: {
      'assets/bundle.min.js': 'scripts/bundle.ts',
      'snippets/i18n.liquid': 'scripts/vars.js.liquid'
    },
    svg: {
      'snippets/icons.liquid': 'assets/icons/*.svg'
    },
    style: {
      'assets/stylesheet.min.css': {
        input: 'styles/stylesheet.scss',
        sass: true,
        watch: [ 'styles/components/*', 'styles/mixins/*' ]
      },
      'snippets/css.liquid': {
        input: 'styles/vars.css.liquid',
        postcss: false,
        sass: true
      }
    }
  },
  views: {
    sections: {
      prefixDir: true,
      separator: '-',
      global: [ 'index' ]
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
