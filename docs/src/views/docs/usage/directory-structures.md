---
title: 'Directory Structures'
layout: base.liquid
permalink: '/usage/directory-structures/index.html'
anchors:
  - 'Base Directories'
  - 'Input → Output'
  - 'Path Defintions'
  - 'Custom Structures'
  - 'Renaming Files'
  - 'Stash Directories'
---

# Directory Structures

Syncify requires you to define custom **base** directory paths that point to theme files. The values you provide will refer to a directory name that is relative to the root of your project. You **cannot** define multi-level directories (e.g: `some/dir`) or reverse paths (e.g: `../dir`). You can pass these references within a syncify configuration file or via the CLI.

```treeview
/
├── source/             # The main directory where all source files are contained
├── theme/              # The distribution directory where source themes are written
└── .env                 # Where store admin api tokens and other secrets exist
```

---

# Input → Output

Syncify expects projects to have an **input** directory path which contains theme **source** files. Files contained within an input directory are written to your defined **output** directory path. The generated output will be reflective of your online store and in most cases you will add the output directory to your `.gitignore` file because it can always be rebuilt from input. If you are coming from the Shopify CLI, it is important to understand that flat structures are not viable.

```treeview
/
├── source/    # The input directory which contains the theme source files
└── theme/     # The output directory which Syncify generates that shopify understands
```

Single directory structures are not a viable approach when building modern and performant Shopify themes. Client-side (front-end) development is not SaaS specific and thus, with the proper tooling, Shopify theme development does not require one to adhere to the imposed approach of Shopify Dawn (via Shopify CLI). The argument for multi-directory architecture rests upon the millions of projects which isolate source → distribution variations and appropriate such logic.

> If you have become accustomed to working from a single directory structure (i.e: Shopify CLI) it is important that you understand the difference between the **input** and **output** directory approach.

---

# Path Definitions

The `paths` option lets you customize your theme structure, resolved relative to the `input` directory. Syncify doesn’t enforce Shopify’s theme structure, freeing you to break from its constraints. Use this option to tailor your development theme layout. Each path key represents a theme directory or resource point, accepting a single string or an array of strings for glob patterns (via [anymatch](https://www.npmjs.com/package/anymatch)). Exceptions are `snippets` and `sections`, which also support [rename paths](/renaming-files/) for deeper sub-directory control.

> All paths will auto-resolve to the `input` directory defined, so you don't need to specify it in path definitions.

##### Default Defintions:

:::: grid row ai-center dir-each mb-5
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

---

# Custom Structures

Sticking to the default structure isn’t ideal with Syncify. Instead, you’re encouraged to craft an input (theme) structure that fits your project, aligns with your workflow, and reflects your preferences. The `paths` option empowers you to define a tailored setup, giving you control over how your theme is organized. Below is a basic example of how to create a customized structure using `paths`, showcasing the flexibility to adapt the layout to your specific needs.

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

---

# Renaming Files

The `paths` option in Syncify lets developers customize output filenames for specific theme files. For sections and snippets, path references can optionally use an object rename value type. This rename object allows you to adjust filenames before they’re written to the output directory, enhancing control over the final structure. Consider a project where `snippets` and `sections` are organized into sub-directories.

Below are examples of **input** and **output** structures to demonstrate this. The **input** includes a `sections` directory with three sub-directories: blocks, product, layouts and a snippets directory with a cards sub-directory plus two unnested snippet files. The **output** illustrates the resulting structure when using the rename object feature to shape themes.

:::: grid row mb-4 ai-center
::: grid col fill-papyrus

##### Input Structure: `{js} { input: 'source' }`

```treeview
source/
    ├── sections/
    │   ├── blocks/
    │   │   ├── slideshow.liquid
    │   │   └── rich-text.liquid
    │   ├── product/
    │   │   ├── details.liquid
    │   │   └── images.liquid
    │   └── layouts/
    │       ├── header.liquid
    │       └── footer.liquid
    └── snippets/
        ├── all-cards/
        │   ├── collection.liquid
        │   ├── drawer.liquid
        │   └── product.liquid
        ├── share-button.liquid
        └── social-icons.liquid
```

:::
::: grid col-auto

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col

##### Output Structure `{js} { output: 'theme' }`

```treeview
theme/
    ├── assets/
    ├── config/
    ├── layout/
    ├── locales/
    ├── sections/
    │   ├── header.liquid
    │   ├── footer.liquid
    │   ├── product-details.liquid
    │   ├── product-images.liquid
    │   ├── rich-text.liquid
    │   └── slideshow.liquid
    ├── snippets/
    │   ├── card-collection.liquid
    │   ├── card-drawer.liquid
    │   ├── card-product.liquid
    │   └── social-icons.liquid
    └── templates/
```

:::
::::

> This rename object pairs rename patterns with glob patterns, all are resolved relative to the **input** directory.

Let's explore how to create the above **output** structure using a rename object in a config. For both `sections` and `snippets`, we define an object within the `paths` option. Each key in the object specifies a glob pattern to match files, while its value defines the renaming logic - such as altering filenames, flattening sub-directories, or preserving specific parts of the path before writing to the output directory.

##### Configuration `syncify.config.ts`

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    sections: {
      '*': 'sections/**/*',                // Wildcard global
      '[dir]-[name]': 'sections/product/*' // Directory and Filename rename
    },
    snippets: {
      '[name]': 'snippets/**/*',            // Wildcard global
      'card.[name]': 'snippets/all-cards/*' // Directory and Filename rename
    }
  }
});
```

### Sections Wildcard

The `'*'` wildcard pattern matches all files within the `sections` directory and its subdirectories. The wildcard acts like fallback reference and the glob pattern `sections/**/*` will ensure that it targets every file, regardless of extension, within `sections` and its nested folders. Using a wildcard pattern like this allows files to **pass through** without renaming, ensuring their original names are preserved.

### Sections Rename

The `[dir]-[name]` pattern dynamically renames files by replacing `[dir]` with the subdirectory name and `[name]` with the original file name. The glob pattern `sections/product/*`, applies the rename to all files found in that location. The **output** result will be file names renamed with the subdirectory name as a prefix, and suffixed with the source name.

### Snippets Wildcard

The `[name]` pattern, when used without any prefix or suffix, functions like a wildcard `'*'` **pass-through** pattern, ensuring that all files in the `snippets` directory and its subdirectories are included. The glob pattern `snippets/**/*'` targets every file, regardless of extension, within `snippets` and its nested folders. This allows files to pass through without renaming, preserving their original names.

### Sections Rename

The pattern `'card-[name]'` dynamically renames files by adding the prefix `card` and a dot `.` separator character to the base name of each snippet file. The associated glob pattern `snippets/all-cards/*` specifically targets all files located in the `all-card/` subdirectory.

---

# Stash Directories

Syncify’s **input** ➔ **output** framework offers developers flexibility, but complex theme structures can disrupt predictability. Stash directories provide a fallback solution for placing files. Unlike custom path patterns that may complicate [pull](/cli/sy-pull/) operations with guesswork, stash directories hint at locations and double as fallback or override points. This keeps imports in a chosen spot, allowing developers to manage import paths efficiently while maintaining control over output destinations during Syncify's CLI execution.

##### Configuration `syncify.config.ts`

:::: grid row mb-4 ac-center
::: grid col pr-0 stash-height

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    // ...
    snippets: [
      'path/snippets/*',
      'path/examples/*',
      { index: 1, stash: '*' }
    ],
    sections: [
      'path/sections/*',
      { stash: 'temp' }
    ]
  }
});
```

:::
::: grid col-auto pl-0 stash-header fs-sm stash-height

<div class="pl-4 pr-3 pt-3 fs-sm bd stash-bd ">

## `{ts} { stash: '*' }`

Asterisk applies a flat-write of files in path

## `{ts} { stash: true }`

Boolean `true` applies write in directory called stash

## `{ts} { stash: number }`

Target a flat-write of files at specific pattern index

## `{ts} { stash: string }`

Write to a sub-directory relative to pattern

## `{ts} { index: number; stash: true }`

Target pattern at index and write in directory stash

## `{ts} { index: number; stash: string }`

Target pattern at index and write to sub-directory

</div>

:::
::::

> Stash directories are designed to provide developers a grouping mechinsim for remote files obtained during [pull](/cli/sy-pull/) operations. We will wlak through a common use-case situation where you'll need stash references

### Real-world scenario

Let’s examine a real-world scenario requiring stash references. Imagine you need to integrate changes from a remote theme edited by multiple developers. You’re using Syncify with custom structures, while they use the Shopify CLI with basic, flat structures. Their setups are simple and beginner-level, lacking sub-directories, whereas your professional approach leverages tailored layouts. In this example, we use section [rename](/renaming-files/) path patterns. While this explicit, verbose mapping isn’t inherently flawed, it can create issues when collaborating with developers or syncing with flat-structure projects built via Shopify CLI.

:::: grid row mb-4 ai-center
::: grid col

<!--prettier-ignore-->
```js
export default defineConfig({
  input: 'source',
  paths: {
    sections: {
      '[name]': [
        'sections/**',
        { stash: '+' }
      ],
      '[dir]-[name]': [
        'sections/product/*'
      ]
    }
  }
});
```

:::
::: grid col-auto pt-5 stash-next

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col

```treeview
source/
  └── sections/
      ├── +/    # write stash files here
      ├── blocks/
      │   ├── slideshow.liquid
      │   └── rich-text.liquid
      ├── product/
      │   ├── details.liquid
      │   └── images.liquid
      └── layouts/
          ├── header.liquid
          └── footer.liquid

```

:::
::::

# TODO

---
