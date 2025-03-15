---
title: 'Path Definitions'
layout: base.liquid
permalink: '/usage/path-definitions/index.html'
anchors:
  - 'Directory Structures'
  - 'Base Directories'
  - 'Input → Output'
  - 'Default Structure'
  - 'Theme Structures'
  - 'Custom Structures'
---

# Path Definitions

The `paths` option provides the flexibility to define the structure of your themes. This structure is resolved relative to the specified `input` directory. Syncify does not mandate following the theme structure required by Shopify, allowing you to begin decoupling from such constraints. The paths configuration option enables customization of your development theme structure.

Each path key signifies a theme directory or a resource point and can accept either a single string or an `array` of `string[]` for glob patterns, using [anymatch](https://www.npmjs.com/package/anymatch). However, `snippets` and `sections`are exceptions as they also support [rename paths](/renaming-files/) for further sub-directory organization. All references you define will automatically resolve to the input directory you've set, eliminating the need to include this path in your definitions.

:::: grid row ai-center dir-each my-5
::: grid col-8

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    assets: 'assets/**',
    config: 'config/*.json',
    locales: 'locales/*.json',
    layout: 'layout/*.liquid',
    metafields: 'metafields/**/*.json',
    schema: 'schema/*.{schema,json}',
    blocks: 'blocks/*.liquid',
    sections: 'sections/**/*.{liquid,json}',
    snippets: 'snippets/**/*.liquid',
    templates: 'templates/*.{liquid,json}',
    customers: 'templates/customers/*.{liquid,json}',
    metaobject: 'templates/metaobject/*.{liquid,json}',
    pages: 'pages/*.{md,html}',
    redirects: 'redirects.yaml'
  }
})
```

:::
::: grid px-0 col-auto stash-next

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col fs-sm

```treeview
/
├── source/
│   ├── assets/
│   ├── blocks/
│   ├── config/
│   ├── files/
│   ├── layout/
│   ├── locales/
│   ├── pages/
│   ├── metafields/
│   │   └── namespace/
│   ├── schema/
│   ├── sections/
│   ├── snippets/
│   └── templates/
│       ├── metaobject/
│       └── customers/
├── theme/
├── .env
└── package.json
```

:::
::::
