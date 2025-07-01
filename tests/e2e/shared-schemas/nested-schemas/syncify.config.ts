import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',
  paths: {
    sections: {
      '[dir]-[name]': [
        '/sections/default-setting/*.{liquid,json}',
        '/sections/nested-setting/*.{liquid,json}',
        '/sections/default-block/*.{liquid,json}',
        '/sections/nested-block/*.{liquid,json}'
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
