import { defineConfig } from '../dist/index.mjs';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    assets: 'assets/**',
    blocks: 'blocks/*.liquid',
    config: 'config/*.json',
    locales: 'locales/*.json',
    layout: 'layout/*.liquid',
    sections: 'sections/**/*.{liquid,json}',
    snippets: 'snippets/**/*.liquid',
    metaobject: 'templates/metaobject/*.{liquid,json}',
    customers: 'templates/customers/*.{liquid,json}',
    templates: 'templates/*.{liquid,json}',
    blogs: '+/blogs/**/*.{md,html}',
    files: '+/files/**',
    metafields: '+/meta/**/*.json',
    navigation: '+/menus/**/*.json',
    pages: '+/pages/*.{md,html}',
    policies: '+/policies/*.{md,html}',
    schema: '+/schema/*.{schema,json}',
    roots: {
      assets: 'assets/import',
      snippets: 'snippets/import',
      sections: 'sections/import',
      groups: 'sections/groups',
      blocks: 'blocks/import',
      templates: 'templates',
      metaobject: 'templates/metaobject',
      customers: 'templates/customers',
      layout: 'layout',
      config: 'config',
      locales: 'locales'
    }
  },
  clean: true,
  editor: 'vscode',
  transform: {
    script: [
      {
        input: 'scripts/input.ts',
        attrs: [],
        external: [],
        format: 'esm',
        rename: '[name]',
        snippet: false,
        target: 'es6',
        watch: [],
        esbuild: {
          globalName: 'xxx'
        }
      }
    ],
    style: [
      {
        input: [ 'style/foo.css' ],
        attrs: [],
        postcss: true,
        rename: '[name]',
        snippet: false,
        tailwind: false,
        terse: {},
        watch: [],
        sass: {
          include: [],
          quietDeps: false,
          sourcemap: true,
          style: 'compressed',
          warnings: false
        }
      }
    ],
    liquid: {
      terse: {
        collapseWhitespace: true,
        exclude: [],
        minifyCSS: true,
        minifyJS: true,
        minifySchema: true,
        removeComments: true,
        stripTrims: false
      }
    },
    json: {
      crlf: false,
      exclude: [],
      indent: 2,
      noSortList: [],
      sortArrays: false,
      sortObjects: [],
      stripComments: false,
      useTab: false,
      terse: {
        assets: true,
        config: true,
        groups: true,
        locales: true,
        metafields: true,
        metaobject: true,
        templates: true,
        exclude: []
      }
    },
    svg: [
      {
        format: 'file',
        input: '',
        rename: '',
        snippet: false,
        svgo: {}
      },
      {
        format: 'sprite',
        input: '',
        rename: '',
        snippet: false,
        svgo: {},
        sprite: {
          attrs: [],
          symbols: {
            id: '',
            xmlns: true
          }
        }
      }
    ]
  },
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  },
  processor: {
    esbuild: {},
    markdown: {},
    postcss: [],
    sass: {},
    svgo: {},
    tailwind: []
  },
  git: {
    branch: 'main',
    default: 'master',
    force: [],
    mirror: {}
  },
  vc: {
    minorLimit: 10,
    patchLimit: 10,
    references: [
      'package.json',
      'settings_schema.json'
    ]
  },
  hot: {
    eject: true,
    label: true,
    method: 'hot',
    server: 41001,
    socket: 51001,
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
  }
});
