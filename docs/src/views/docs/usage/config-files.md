---
title: 'Config File'
layout: base.liquid
permalink: '/usage/config-files/index.html'
anchors:
  - 'Config File'
  - 'Supported File Types'
  - 'Zero Config Setup'
  - 'Default Options'
---

# Config Files

Syncify supports `syncify.config.js` and `package.json` configurations. Depending on your preference, either method suffices and no restrictions are imposed. If you are defining options within your projects `package.json` file, runtime will be a little faster and you can assign options to the `syncify → config` property, whereas using a `syncify.config.js` (or `.ts`) file you'll need to apply options on the `export` and runtime will _typically_ take an additional **50**ms - **100**ms extra.

> If you're not planning to use transforms or are content with the default settings that Syncify provides, there's no need to create a config file. Syncify requires only [targets](/setup/targets/) be defined.

# Supported File Types

Syncify supports JSON, JSONC, JavaScript and TypeScript external configuration files. The TypeScript `syncify.config.ts` type is the recommended configuration file to use along the `defaultConfig` named import because you can more freely structure and leverage options.

1. syncify.config.ts
2. syncify.config.js
3. syncify.config.mjs
4. syncify.config.cjs
5. syncify.config.json

---

# Default Options

The following is the **default** configuration options that Syncify uses. All settings are optional, and in the absence of a `syncify.config` file or `syncify → config` property within `package.json` file, Syncify will automatically resort to these defaults. For a detailed overview of all options, reference to their respective documentation pages.

> If you have Syncify installed globally, it is advisable to install the [@syncify/config](https://github.com/panoply/syncify/packages/config) on the project-level as it provides the `defineConfig` export wrapper. Refer to the [Installation](/setup/installation/) documentation for more information.

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  clean: true,
  editor: 'vscode',
  input: 'source',
  output: 'theme',
  config: '.',
  paths: {
    assets: 'source/assets/*',
    config: 'source/config/*.json',
    layout: 'source/layout/*.liquid',
    locales: 'source/locales/*.json',
    blocks: 'source/blocks/**/*.json',
    metafields: 'source/metafields/**/*.json',
    redirects: 'source/redirects.yaml',
    schema: 'source/schema/*.{schema,json}',
    templates: 'source/templates/*',
    customers: 'source/templates/customers/*',
    metaobject: 'source/templates/metaobject/*',
    pages: 'source/pages/*',
    snippets: 'source/snippets/**/*.liquid',
    sections: 'source/sections/**/*.{liquid,json}'
  },
  hot: {
    label: true,
    eject: true,
    server: 41001,
    socket: 51001,
    method: 'hot',
    layouts: ['theme.liquid']
    flags: ['--no-preview-bar'],
  },
  transform: {
    script: {},
    style: {},
    svg: {},
    liquid: {
      terse: false
    },
    json: {
      crlf: false,
      indent: 2,
      useTab: false,
      stripComments: false,
      sortArrays: false,
      sortObjects: false,
      noSortList: [],
      terse: false
    }
  },
  vc: {
    minorLimit: 10,
    patchLimit: 10,
    references: [
      'package.json',
      'settings_schema.json'
    ]
  },
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  }
});
```

---
