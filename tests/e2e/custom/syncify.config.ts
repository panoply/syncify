import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',
  editor: 'vscode',
  hot: {
    method: 'hot',
    label: true,
    eject: true,
    layouts: [
      'theme.liquid'
    ],
    flags: [
      '--no-preview-bar',
      '--no-web-pixels-manager',
      '--no-checkout-preloads',
      '--no-shopify-features',
      '--no-trekkie',
      '--no-perfkit'
    ]
  },
  vc: {
    minorLimit: 10,
    patchLimit: 10,
    references: [
      'package.json',
      'settings_schema.json'
    ]
  },
  paths: {

    config: [
      'source/data/settings/*'
    ],
    locales: [
      'source/data/translations/*'
    ],
    templates: [
      'source/views/templates/*'
    ],
    customers: [
      'source/views/customers/*'
    ],
    sections: {
      '[dir]-[name]': [
        'source/views/sections/**'
      ],
      '[name]': [
        'source/views/sections/blocks/**',
        'source/views/sections/drawer/**',
        'source/views/sections/layout/**'
      ]
    },
    snippets: [
      'source/views/snippets/**/*',
      'source/views/adxx/*'
    ],
    schema: [
      'source/views/**/*.schema',
      'source/schema/**/*.schema'
    ],
    layout: [
      'source/views/theme.liquid',
      'source/views/layouts/*.liquid'
    ]
  },
  transform: {
    json: {
      useTab: false,
      stripComments: false
    },
    script: {
      input: './source/scripts/bundle.ts',
      rename: '[file].min'
    },
    style: [
      {
        input: './source/styles/base.css',
        rename: '[file].min',
        tailwind: true
      }
    ],
    svg: {
      input: 'source/assets/icons/*.svg',
      snippet: true,
      rename: 'icon.[file]',
      format: 'sprite'
    },
    liquid: {
      terse: false
    }
  },
  processor: {
    postcss: [
      require('autoprefixer'),
      require('@tailwindcss/postcss')
    ]
  }
});
