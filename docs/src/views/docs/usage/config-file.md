---
title: 'Config File'
layout: base
permalink: '/usage/config-file/index.html'
anchors:
  - 'Config File'
  - 'Supported Files'
  - 'Default Options'
---

# Config File

Syncify supports `syncify.config.ts` and `package.json` configurations. Depending on your preference, either method suffices and no restrictions are imposed. If you are defining options within your projects `package.json` file you can assign options to the `syncify.config` property, whereas using a `syncify.config` you'll need to apply options on the export.

# Supported File Types

Syncify supports JSON, JSONC, JavaScript and TypeScript external configuration files. The TypeScript `syncify.config.ts` type is the recommended configuration file to use along the `defaultConfig` export.

- syncify.config.ts
- syncify.config.js
- syncify.config.mjs
- syncify.config.cjs
- syncify.config.json

# Default Configuration

Below are the **default** configurations. Options commented out within [transforms](#transform), [processors](#processors) and [terser](#terser) require peer dependencies to be installed for usage.

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme',
  export: 'export',
  import: 'import',
  config: '.',
  clean: true,
  hot: {},
  log: {},
  paths: {},
  spawn: {},
  publish: {},
  transforms: {
    script: {},
    style: {},
    svg: {},
    image: {}
  },
  processors: {},
  terser: {
    json: {},
    liquid: {},
    markup: {},
    script: {},
    style: {},
  }
});
```
