---
title: 'Custom Structures'
layout: base.liquid
permalink: '/usage/custom-structures/index.html'
anchors:
  - 'Custom Structures'
---

# Custom Structure

Using the default structure is certainly not the preferred approach when leveraging Syncify and you are encouraged to establish an input (theme) structure which suits your project and adheres to your workflow or tastes. Below is a basic example of how we can architect a **customized structure** using the `paths` option.

:::: grid row ai-center dir-each my-5
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
::: grid px-0 col-auto

{% svg 'arrow-right', 'icon-output'%}

:::
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
::::
