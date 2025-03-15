---
title: 'Config File'
layout: base.liquid
permalink: '/usage/config-files/index.html'
anchors:
  - 'Config File'
  - 'Supported File Types'
  - 'Default Options'
  - 'Zero Config Setup'
---

# Config Files

Syncify supports `syncify.config.js` and `package.json` configurations. Depending on your preference, either method suffices and no restrictions are imposed. If you are defining options within your projects `package.json` file, runtime will be a little faster and you can assign options to the `syncify → config` property, whereas using a `syncify.config.js` (or `.ts`) file you'll need to apply options on the `export` and runtime will _typically_ take an additional **50**ms - **100**ms extra.

# Supported File Types

Syncify supports JSON, JSONC, JavaScript and TypeScript external configuration files. The TypeScript `syncify.config.ts` type is the recommended configuration file to use along the `defaultConfig` named import because you can more freely structure and leverage options.

1. syncify.config.ts
2. syncify.config.js
3. syncify.config.mjs
4. syncify.config.cjs
5. syncify.config.json

---

# Default Options

The following is the **default** configuration options that Syncify uses. All settings are optional, and in the absence of a `syncify.config` file or `syncify → config` property within `package.json` file, Syncify will automatically resort to these defaults.

> If you have Syncify installed globally, it is advisable to install the [@syncify/config](https://github.com/panoply/syncify/packages/config) on the project-level as it provides the `defineConfig` export wrapper. Refer to the [Installation](/setup/installation/) documentation for more information.

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  clean: true,
  editor: 'vscode',
  input: 'source',
  output: 'theme',
  import: 'import',
  export: 'export',
  config: '.',
  paths: {
    assets: 'assets/*',
    config: 'config/*.json',
    layout: 'layout/*.liquid',
    locales: 'locales/*.json',
    blocks: '',
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
  hot: {
    server: 41001,
    socket: 51001,
    method: 'hot',
    label: true,
    eject: true,
    layouts: ['theme.liquid']
    flags: ['--no-preview-bar'],
  },
  transform: {
    script: {},
    style: {},
    svg: {},
    json: {},
    liquid: {}
  },
  git: {

  },
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  }
});
```

> You might observe that globs provided to `paths` do not include the `dirs → input` prefix from the `source` reference. This is because Syncify automatically resolves all path definitions to the input directory, making it optional to include this prefix.

---

# Zero Config Setup

If you're not planning to use transforms or are content with the default settings that Syncify provides, there's no need to create a `syncify.config` file or to define settings in the `syncify → config` property within `package.json` files. The only things you'll need to specify are the store and theme targets. Syncify offers two methods for providing these target references and includes a convenient command prompt to simplify the process, eliminating the need for you to manually enter or gather this information.

For detailed guidance, see the [targets](/setup/targets/) documentation.
