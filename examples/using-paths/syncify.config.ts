import { defineConfig } from '@syncify/cli';

export default defineConfig(
  {
    input: 'src',
    paths: {
      config: 'data/settings/*',
      locales: 'data/locales/*',
      templates: 'views/templates/*',
      customers: 'views/customers/*',
      sections: 'views/sections/**/*',
      snippets: 'views/snippets/**/*',
      schema: 'views/sections/**/*.schema',
      layout: [
        'views/theme.liquid',
        'views/layouts/*.liquid'
      ]
    },
    transform: {
      script: {
        input: 'src/scripts/bundle.ts',
        rename: '[file].min'
      },
      style: {
        input: 'src/styles/base.css',
        rename: '[file].min'
      },
      svg: {
        input: 'src/assets/icons/*.svg',
        snippet: true,
        rename: 'icon.[file]',
        format: 'file'
      }
    },
    processors: {
      postcss: [
        require('autoprefixer')
      ]
    }
  }
);
