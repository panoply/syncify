import { defineConfig } from '@syncify/cli';

export default defineConfig({
  paths: {
    config: 'data/settings/*',
    customers: 'views/templates/customers/*',
    locales: 'data/locales/*',
    layout: 'views/*.liquid',
    schema: 'views/schema/*',
    sections: 'views/sections/**/*.liquid',
    snippets: 'views/snippets/**/*.liquid',
    templates: 'views/templates/*.json',
    metaobject: 'views/templates/metaobject/**/*'
  },
  views: {
    sections: {
      prefixDir: true,
      global: [
        'shared',
        'layout'
      ]
    },
    pages: {
      importLanguage: 'markdown'
    }
  },
  transform: {
    script: {
      'assets/[file]': 'scripts/bundle.ts',
      'assets/lazy.min.js': 'scripts/modules/lazysizes.ts'
    },
    style: {
      'assets/stylesheet': {
        input: 'styles/base.css',
        tailwind: true
      }
    },
    svg: {
      'snippets/icon.[file]': {
        input: 'assets/icons/inline/*',
        snippet: true,
        format: 'file'
      },
      'snippets/sprite.liquid': {
        input: 'assets/icons/sprite/*',
        format: 'sprite'
      }
    }
  }
});
