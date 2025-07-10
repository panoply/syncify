import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',
  paths: {
    sections: {
      '[dir]-[name]': [
        '/sections/setting/*.{liquid,json}',
        '/sections/block/*.{liquid,json}',
        '/sections/combined/*.{liquid,json}'
      ]
    },
    schema: 'schema/**/*.{schema,json}'
  },
  transform: {
    liquid: {
      terse: {
        minifySchema: false
      }
    }
  }
});
