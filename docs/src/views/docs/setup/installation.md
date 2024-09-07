---
title: 'Installation'
layout: base.liquid
permalink: '/setup/installation/index.html'
anchors:
  - 'Installation'
  - 'Schema Stores'
  - 'VSCode Usage'
---

# Installation

Syncify is distributed as both an ESM and CJS module. It is recommended that you install as a development dependency in your project opposed to installing globally. Please consider choosing and adopting [pnpm](https://pnpm.js.org/en/cli/install) as your package manager for most optimal usage.

:::: grid row mt-5
::: grid col-12 col-md-6 pr-4 mb-5

#### PNPM

```bash
$ pnpm add @syncify/cli -D
```

:::
::: grid col-12 col-md-6 pl-4 mb-5

#### NPM

```bash
$ npm i @syncify/cli --save-dev
```

:::
::: grid col-12 col-md-6 pr-4

#### YARN

```bash
$ yarn add @syncify/cli --dev
```

:::
::: grid col-12 col-md-6 pl-4

#### BUN

```bash
$ bun add @syncify/cli --dev
```

:::
::::

---

# Schema Stores

Syncify provides JSON Schema Store references for usage in JSON files that contain a `$schema` property or within text editors like [VSCode](https://code.visualstudio.com/) which support external schema store association. The JSON Schema store is helpful for users who prefer `.json` configurations or are setting config options within their `package.json` file via the `syncify` config key.

```bash
# Usage within env.syncify.json
https://unpkg.com/@syncify/schema/env.json

# Usage within package.json
https://unpkg.com/@syncify/schema/pkg.json

# Usage within syncify.config.json
https://unpkg.com/@syncify/schema/config.json

# Usage within *.schema files
https://unpkg.com/@syncify/schema/sections.json
```

### VSCode Usage

Developers using the **VSCode** text editor can enable the JSON Schema within the projects workspace or global settings. If you are using the [vscode-liquid](https://github.com/panoply/vscode-liquid) extension these references are automatically applied for you, however for the animals using Shopify theme check, you'll need to extend.

<!-- prettier-ignore -->
```json
{
  "json.schemas": [
    {
      "fileMatch": ["**/package.json"],
      "url": "https://unpkg.com/@syncify/schema/pkg.json"
    },
    {
      "fileMatch": ["syncify.env.json"],
      "url": "https://unpkg.com/@syncify/schema/env.json"
    },
    {
      "fileMatch": ["syncify.env.json"],
      "url": "https://unpkg.com/@syncify/schema/config.json"
    },
    {
      "fileMatch": ["**/*.schema"],
      "url": "https://unpkg.com/@syncify/schema/sections.json"
    }
  ]
}
```
