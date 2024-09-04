---
title: 'Directory Structure'
layout: base
permalink: '/usage/directory-structure/index.html'
prev:
  label: 'Targeting'
  uri: '/cli/targeting'
next:
  label: 'Resources'
  uri: '/cli/filtering'
navs:
  - 'Architecture'
  - 'Base Directories'
  - 'Input → Output'
  - 'Default Structure'
  - 'Theme Structures'
  - 'Custom Structures'
---

# Project Structures

Syncify requires you to define custom **base** directory paths that point to theme files. The values you provide will refer to a directory name that is relative to the root of your project. You **cannot** define multi-level directories (e.g: `some/dir`) or reverse paths (e.g: `../dir`). You can pass these references within a syncify configuration file or via the CLI.

### Base Directories

Below is an example of a Syncify theme structure using the defaults. Syncify will assume this base structure when you do not provide any customizations via the CLI or within your syncify config file.

```treeview
/
├── export/             # Theme .zip exports generated using --publish and or --export
├── import/             # Theme downloads imported from stores will be written here
├── source/             # The main directory where all source files are contained
├── theme/              # The distribution directory where source themes are written
└── .env                 # Where store admin api tokens and other secrets exist
```

### Input → Output

Syncify expects projects to have an **input** directory path which contains theme **source** files. Files contained within an input directory are written to your defined **output** directory path. The generated output will be reflective of your online store and in most cases you will add the output directory to your `.gitignore` file (because it can always be rebuilt from input).

```treeview
/
├── source/    # The input directory which contains the theme source files
└── theme/     # The output directory which Syncify generates that shopify understands
```

Single directory structures are not a viable approach when building modern and performant Shopify themes. Client-side (front-end) development is not SaaS specific and thus, with the proper tooling, Shopify theme development does not require one to adhere to the imposed approach of Shopify Dawn (via Shopify CLI). The argument for multi-directory architecture rests upon the millions of projects which isolate source ~ distribution variations and appropriate such logic. If you have become accustomed to working from a single directory structure (i.e: Shopify Dawn) it is important that you understand the difference between the **input** and **output** directory approach.

---

### Default Structure

The `paths` option allows you to define your themes structure. You themes structure is resolved to the defined `input` directory. Syncify does not require you set a development structure required by Shopify and you should begin to decouple from that logic. The `paths` configuration option can be used to customize your development theme structure. Each path key represents a theme directory or resource point which accepts either a `string` or `string[]` array list of glob [anymatch](https://www.npmjs.com/package/anymatch) patterns. All defined references will automatically resolve to the defined `input` directory starting point, so you do not need to include it within your path definitions.

:::: grid row dir-each

::: grid col fs-sm

#### Structure

```treeview
/
└── source/
    ├── assets/
    ├── config/
    ├── files/
    ├── layout/
    ├── locales/
    ├── pages/
    ├── metafields/
    │   └── namespace/
    ├── schema/
    ├── sections/
    ├── snippets/
    └── templates/
        ├── metaobject/
        └── customers/
```

:::

::: grid col-8

#### Configuration

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    assets: 'assets/**',
    config: 'config/*.json',
    locales: 'locales/*.json',
    layout: 'layout/*.liquid',
    metafields: 'metafields/**/*.json',
    sections: 'sections/**/*.liquid',
    snippets: 'snippets/**/*.liquid',
    templates: 'templates/*.{liquid,json}',
    customers: 'templates/customers/*.{liquid,json}',
    schema: 'schema/*.{schema,json}',
    metaobject: 'templates/metaobject/*.{liquid,json}',
    pages: 'pages/*.{md,html}'
  }
})
```

:::

::::

By default, Syncify assumes you are using the above theme architecture and it will use that to build a valid theme **output** structure which Shopify understands. You may notice that the **input** directory is not included within in our `paths` and this is because Syncify applies **input** directory relativity automatically based on the `input` value that was provided. It does not matter whether or not you include **input** prefixes in your `paths`, full resolution will obtained with or without reference.

---

### Custom Structure

Using the default structure is certainly not the preferred approach when leveraging Syncify and you are encouraged to establish an input (theme) structure which suits your project and adheres to your workflow or tastes. Below is a basic example of how we can architect a **customized structure** using the `paths` option.

:::: grid row dir-each

::: grid col fs-sm

#### Structure

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
        ├── snippets/
        ├── templates/
        └── theme.liquid
```

:::

::: grid col-8

#### Configuration

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

#

Below are **2** different **input** structures and an **output** structure. The **default structure** is what Syncify will use (as above) if no `paths` have been defined in your configuration (the tool defaults to this). The **customized structure** is an example of how you _could_ arrange an `input` directory using the Syncify `paths` option. The **output structure** is what Syncify will generated as an **output** which Shopify can digest.

:::: grid row jc-center dir-each

::: grid col fs-sm

#### Default Structure

The structure which syncify will default.

```treeview
/
└── source/
    ├── assets/
    ├── config/
    ├── files/
    ├── layout/
    ├── locales/
    ├── pages/
    ├── metafields/
    │   └── namespace/
    ├── schema/
    ├── sections/
    ├── snippets/
    └── templates/
        ├── metaobject/
        └── customers/
```

:::
::: grid col fs-sm

#### Customized Structure

An example of how you _could_ structure themes.

```treeview
/
└── source/
    ├── assets/
    │   └── icons/
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
        ├── snippets/
        ├── templates/
        └── theme.liquid
```

:::
::: grid col fs-sm

#### Output Structure

The output structure which syncify generates.

```treeview
/
└── output/
    ├── assets/
    ├── config/
    ├── layout/
    ├── locales/
    ├── sections/
    ├── snippets/
    └── templates/
        ├── metaobject/
        └── customers/
```

:::
::::

There is no distributed difference between the **default** and **customized** structures illustrated above. Both would generate an **output** that Shopify understands, requires and reasons with. Only the **input** source locations differ. The **output** Syncify creates will always be written to a standard Shopify theme structure regardless of how you may decide to organize **input** paths. Custom structures give you creative freedom and does not impose a restrictive workflow you may have become behest to working with Dawn and the Shopify CLI.

---

# Paths

The `paths` option allows you to define your theme/projects structure within the defined `input` directory. Syncify does not require you set a development structure required by Shopify and you should begin to decouple from that logic as it is generally flawed and restrictive when building advanced or large scale stores.

Each path key represents a theme directory or resource point. Path options accept either a `string` or `string[]` array list of glob [anymatch](https://www.npmjs.com/package/anymatch) patterns and can point to files contained within sub-directories of infinite depth. All defined references will automatically resolve to the defined `input` directory starting point, so you do not need to include it within your path definitions.

There is no restrictions or limitations imposed on structures other than **input** relativity. Syncify will obtain full resolution and build a valid theme structure that Shopify understands when generating an **output**.

# Config File

By default, Syncify assumes you are using a basic (defaults) structure. This structure is certainly not the preferred format and when leveraging Syncify you are encouraged to establish a structure which suits your project and adheres to your workflow or tastes.

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    assets: 'assets/**',
    config: 'config/*.json',
    locales: 'locales/*.json',
    layout: 'layout/.liquid',
    metafields: 'metafields/**/*.json',
    sections: 'sections/*.liquid',
    snippets: 'snippets/*.liquid',
    templates: 'templates/*.liquid',
    customers: 'templates/customers/*',
    pages: 'pages/*',
    redirects: 'redirects.yaml',
  }
})
```

### Custom Structures

Below are **2** different **input** structures and an **output** structure. The **default structure** is what Syncify will use (as above) if no `paths` have been defined in your configuration (the tool defaults to this). The **customized structure** is an example of how you _could_ arrange an `input` directory using the Syncify `paths` option. The **output structure** is what Syncify will generated as an **output** which Shopify can digest.

<table>
  <thead>
    <tr>
      <th width=330px>Default Structure</th>
      <th width="330px">Customized Structure</th>
      <th width="330px">Output Structure</th>
    </tr>
  </thead>
  <tbody>
<td>

```treeview



  source/
  ├── assets/
  ├── config/
  ├── layout/
  ├── locales/
  ├── pages/
  ├── files/
  ├── metafields
  ├── sections/
  ├── snippets/
  └── templates/
      ├── metaobject/
      └── customers/



```

</td>
<td>

```treeview
  source/
  ├── assets/
  │   ├── files/
  │   └── icons/
  ├── data
  │   ├── config/
  │   ├── locales/
  │   └── metafields/
  ├── styles
  ├── scripts
  └── views
      ├── customers
      ├── metaobject
      ├── sections
      ├── snippets
      ├── templates
      └── theme.liquid
```

</td>
<td>
<pre>
<code>
      ㅤㅤ
      ㅤ
      ㅤ      ㅤ
      ㅤ      ㅤ
      ㅤ      ㅤ
      ㅤ
  output
  └─┐
    ├─ assets
    ├─ config
    ├─ locales
    ├─ layout
    ├─ sections
    ├─ snippets
    └─ template
       ├─ metaobject
       └─ customers ㅤ
       ㅤ
       ㅤ
       ㅤ
       ㅤ
</code>
      </pre>
      </td>
    </tr>
  </tbody>
</table>

There is no distributed difference between the **default** and **customized** structures illustrated above. Both would generate an **output** that Shopify understands, requires and reasons with. Only the **input** source locations differ. The **output** Syncify creates will always be written to a standard Shopify theme structure regardless of how you may decide to organize **input** paths. Custom structures give you creative freedom and does not impose a restrictive workflow you may have become behest to working with Dawn and the Shopify CLI.

Welcome to the better approach, you're welcome.
