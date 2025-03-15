---
title: 'Directory Structures'
layout: base.liquid
permalink: '/usage/directory-structures/index.html'
anchors:
  - 'Directory Structures'
  - 'Base Directories'
  - 'Input → Output'
  - 'Default Structure'
  - 'Theme Structures'
  - 'Custom Structures'
---

# Directory Structures

Syncify requires you to define custom **base** directory paths that point to theme files. The values you provide will refer to a directory name that is relative to the root of your project. You **cannot** define multi-level directories (e.g: `some/dir`) or reverse paths (e.g: `../dir`). You can pass these references within a syncify configuration file or via the CLI.

# Custom Structure

Using the default structure is certainly not the preferred approach when leveraging Syncify and you are encouraged to establish an input (theme) structure which suits your project and adheres to your workflow or tastes. Below is a basic example of how we can architect a **customized structure** using the `paths` option.

:::: grid row dir-each mb-4
::: grid col fs-sm

```treeview
/
└── source/
    ├── assets/
    │   └── files/
    ├── data/
    │   ├── config/
    │   ├── locales/
    │   └── metafields/
    │      └── namespace/
    ├── pages/
    └── views/
        ├── customers/
        ├── meta/
        ├── sections/
        │   └── schema/
        ├── snippets/
        ├── templates/
        └── theme.liquid
```

:::
::: grid col-8

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    assets: 'assets/**',
    config: 'data/config/*.json',
    locales: 'data/locales/*.json',
    metafields: 'data/metafields/**/*.json',
    layout: '*.liquid',
    sections: 'views/sections/**/*.liquid',
    snippets: 'views/snippets/**/*.liquid',
    templates: 'views/templates/*.{liquid,json}',
    customers: 'views/customers/*.{liquid,json}',
    schema: 'views/sections/**/*.schema',
    metaobject: 'views/meta/*.{liquid,json}',
    pages: 'pages/*.{md,html}'
  }
})
```

:::
::::
