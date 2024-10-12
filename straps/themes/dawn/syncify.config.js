import { defineConfig } from '@syncify/cli';

export default defineConfig({
  paths: {
    assets: [
      'assets/image/*',
      'assets/icons/*',
      'assets/scripts/*'
    ],
    snippets: {
      '*': [
        './source/snippets/**/*.liquid'
      ],
      '[dir]-[name]': [
        './source/snippets/product/*',
        './source/snippets/header/*',
        './source/snippets/quick-order/*.liquid',
        './source/snippets/card/product.liquid',
        './source/snippets/card/collection.liquid'
      ]
    },
    sections: {
      '*': [
        'sections/**/*'
      ],
      '[dir]-[name]': [
        './source/sections/cart/*',
        './source/sections/main/*'
      ]
    }
  },
  transform: {
    // add this to paths > assets[] if you do not live in a society
    // and prefer that Shopify minify your code.
    // script: { 'assets/[file]': 'assets/scripts/*.js' },
    style: {
      'assets/[file]': 'assets/styles/*.css',
      'assets/[dir]-[name]': [
        'assets/styles/component/*.css',
        'assets/styles/section/*.css'
      ]
    }
  }
});
