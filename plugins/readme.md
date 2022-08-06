# Syncify Plugins

Official plugins for the Shopify theme development tool [Syncify](https://liquify.dev/syncify).

### Plugins

| Name                   | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| [@syncify/sections](#) | Provides sub-directory grouping and custom input structures |
| [@syncify/pages](#)    | Provides markdown support in from Shopify pages             |
| [@syncify/live](#)     | Live reload support using Browser Sync                      |
| [@syncify/terser](#)   | Minifies Liquid (Markup) code using HTML Terser             |
| [@syncify/sass](#)     | SASS to CSS transpilation support using Dart SASS           |
| [@syncify/svgo](#)     | SVG transformations using SVGO with snippet support         |
| [@syncify/sprites](#)  | SVG Sprite generation using SVG Store                       |
| [@syncify/postcss](#)  | PostCSS transpilation support for CSS files                 |
| [@syncify/rollup](#)   | Wrapper around rollup for processing JS files               |
| [@syncify/webpack](#)  | Wrapper around webpack for processing JS files              |
| [@syncify/tsup](#)     | Wrapper around tsup for processing JS files                 |
| [@syncify/esbuild](#)  | Wrapper around esbuild for processing JS files              |
| [@syncify/prettify](#) | Live reload support using Browser Sync                      |
| [@syncify/imagemin](#) | Minifies images using imagemin                              |

### Usage

<!-- prettier-ignore-->
```js
import { syncify, use } from '@liquify/syncify';


export default syncify({
  input: 'src',
  output: 'theme',
  export: 'export',
  import: 'import',
  config: 'config',
  stores: [
    {
      domain: 'syncify',
      themes: {
        dev: 129457717489
      }
    }
  ],
  paths: {
    assets: 'assets/**/*',
    config: 'config/*.json',
    locales: 'locales/*.json',
    layout: 'views/layouts/*.liquid',
    sections: 'views/sections/**/*.liquid',
    metafields: 'metafields/**/*.json',
    customers: 'views/customers/*.json',
    pages: 'pages/*.md',
    templates: 'views/templates/*.json',
    snippets: 'views/snippets/*.liquid'
  },
  transform: {
    views: [
      plugin.sections({
        directoryPrefixing: true,
        onlyPrefixDuplicates: false,
        prefixSeparator: '-',
        global: ['global']
      }),
      plugin.pages({
        importAs: 'markdown',
        liquidWarnings: true,
        fallbackAuthor: '',
        markdown: {
          breaks: true,
          headerIds: true,
          headerPrefix: '',
          mangle: true,
          silent: true,
          smartypants: false
        }
      }),
      plugin.terser()
    ],
    assets: [
      plugin.tsup(),
      plugin.sass(),
      plugin.postcss(),
      plugin.svgo(),
      plugin.sprites(),
      plugin.imagemin()
    ]
  }
});
```

### Writing a Plugin

Syncify exposes a very basic and simple API for building and extending the capabilities for theme development. Plugins are exported as a clu

<!-- prettier-ignore-->
```js
import { transform } from '@syncify/plugin'
import tsup from 'tsup'

export function plugin(settings) {

  const options = Object.assign(defaults, settings)

  return transform({
    name: 'Awesome Plugin',
    transform: 'assets' | 'templates',
    resolve(paths) {

    },
    load(file) {

      return ''

    },
    upload(file) {

      return ''

    },
    download(file) {

      return ''

    }
  });
}
```
