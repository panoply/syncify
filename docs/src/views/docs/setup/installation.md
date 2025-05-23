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

Syncify is distributed as a CommonJS (CJS) module but is compatible with ECMAScript Module (ESM) environments since it operates as a CLI binary-based tool. You have the option to install Syncify either on a per-project basis or globally, with global installation being the recommended and preferred method.

Syncify requires users to have both [Node](https://nodejs.org/) (v20 or higher) and [Git](https://git-scm.com/) (v2.2 or higher) installed on their system. While Syncify is compatible with various package managers, for the optimal experience, it's advisable to consider using [pnpm](https://pnpm.js.org/en/cli/install).

:: row mt-5
:: col-12 col-md-6 pr-4 mb-5

#### PNPM

```bash
pnpm add @syncify/cli -g
```

::
:: col-12 col-md-6 pl-4 mb-5

#### NPM

```bash
npm i @syncify/cli -g
```

::
:: col-12 col-md-6 pr-4

#### YARN

```bash
yarn add @syncify/cli -g
```

::
:: col-12 col-md-6 pl-4

#### BUN

```bash
bun add @syncify/cli -g
```

::
::

---

# Schema Stores

Syncify provides JSON Schema Store references for usage in JSON files that contain a `$schema` property or within text editors like [VSCode](https://code.visualstudio.com/) which support external schema store association. The JSON Schema store is helpful for users who prefer `.json` configurations or are setting config options within their `package.json` file via the `syncify` config key.

##### Package `package.json`

```bash
https://unpkg.com/@syncify/schema/pkg.json
```

##### Config File `syncify.config.json`

```bash
https://unpkg.com/@syncify/schema/config.json
```

##### Sections `*.schema`

```bash
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
      "fileMatch": ["**/*.schema"],
      "url": "https://unpkg.com/@syncify/schema/sections.json"
    }
  ]
}
```
