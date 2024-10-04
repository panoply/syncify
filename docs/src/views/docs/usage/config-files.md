---
title: 'Config File'
layout: base.liquid
permalink: '/usage/config-files/index.html'
anchors:
  - 'Config File'
  - 'Supported Files'
  - 'Default Options'
---

# Config Files

Syncify supports `syncify.config.ts` and `package.json` configurations. Depending on your preference, either method suffices and no restrictions are imposed. If you are defining options within your projects `package.json` file you can assign options to the `syncify → config` property, whereas using a `syncify.config.js` or `syncify.config.ts` file you'll need to apply options on the export.

# Supported File Types

Syncify supports JSON, JSONC, JavaScript and TypeScript external configuration files. The TypeScript `syncify.config.ts` type is the recommended configuration file to use along the `defaultConfig` named import.

1. syncify.config.ts
2. syncify.config.js
3. syncify.config.mjs
4. syncify.config.cjs
5. syncify.config.json

---

# Default Configuration

Below are the **default** configurations. Options commented out within [transforms](#transform), [processors](#processors) and [terser](#terser) require peer dependencies to be installed for usage.

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme',
  import: 'import',
  export: 'export',
  config: '.',
  hot: false,
  clean: true,
  paths: {
    assets: 'assets/*',
    config: 'config/*.json',
    layout: 'layout/*.liquid',
    locales: 'locales/*.json',
    metafields: 'metafields/**/*.json',
    redirects: 'redirects.yaml',
    schema: 'schema/*.{schema,json}',
    templates: 'templates/*',
    customers: 'templates/customers/*',
    metaobject: 'templates/metaobject/*',
    pages: 'pages/*',
    snippets: 'snippets/**/*.liquid',
    sections: 'sections/**/*.{liquid,json}'
  },
  transform: {
    svg: {},
    style: {},
    script: {},
    json: {},
    liquid: {}
  },
  spawn: {
    watch: {},
    build: {}
  },
  publish: {
    bindVersion: false,
    publishRole: 'unpublished',
    themeLimit: 3,
    tunnelPort: 80
  },
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  }
});
```
