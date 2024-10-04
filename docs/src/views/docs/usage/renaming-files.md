---
title: 'Renaming Files'
layout: base.liquid
permalink: '/usage/renaming-files/index.html'
anchors:
  - 'Renaming Files'
---

# Renaming Files

The Syncify `paths` option allows developers to further customize the output names of certain files in their theme. Path references of `sections` and `snippets` optionally accept an `object` rename value type. The rename object can be used to configure and change filenames before they are written to your output directory.

---

# Usage

Let's assume in a project, we organize `snippets` and `sections` files within sub-directories. Below are the **input** and **output** structures for illustration. The **input** example includes a `sections` directory with three sub-directories: blocks, product, and layouts. The `snippets` directory contains one sub-directory, cards, and a 2 snippet files not nested within any sub-directories. The **output** shows the structure that will be generated when leveraging the rename object feature.

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

Now, let’s see how to achieve the above **output** structure using a rename object. In the `syncify.config` file, we define an `object` for both `{ts} paths: { sections }` and `{ts} paths: { snippets }`. The rename object maps rename patterns to glob patterns relative to the **input** directory.

```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    sections: {
      '*': 'sections/**/*',
      '[dir]-[name]': 'sections/product/*'
    },
    snippets: {
      '[name]': 'snippets/**/*',
      'card.[name]': 'snippets/all-cards/*'
    }
  }
});
```

> Even though our `sections` and `snippets` reside within the `source` directory, we can omit it from glob patterns. Syncify will automatically resolve the `input`, so specifying it is optional.

# `{js} sections: { '*': 'sections/**/*' }`

The `'*'` wildcard pattern matches all files within the `sections` directory and its subdirectories. The wildcard acts like fallback reference and the glob pattern `sections/**/*` will ensure that it targets every file, regardless of extension, within `sections` and its nested folders. Using a wildcard pattern like this allows files to **pass through** without renaming, ensuring their original names are preserved.

# `{js} sections: { '[dir]-[name]': 'sections/product/*' }`

The `[dir]-[name]` pattern dynamically renames files by replacing `[dir]` with the subdirectory name and `[name]` with the original file name. The glob pattern `sections/product/*`, applies the rename to all files found in that location. The **output** result will be file names renamed with the subdirectory name as a prefix, and suffixed with the source name.

# `{js} snippets: { '[name]': 'snippets/**/*' }`

The `[name]` pattern, when used without any prefix or suffix, functions like a wildcard `'*'` **pass-through** pattern, ensuring that all files in the `snippets` directory and its subdirectories are included. The glob pattern `snippets/**/*'` targets every file, regardless of extension, within `snippets` and its nested folders. This allows files to pass through without renaming, preserving their original names.

# `{js} snippets: { 'card.[name]': 'snippets/all-cards/*' }`

The pattern `'card-[name]'` dynamically renames files by adding the prefix `card` and a dot `.` separator character to the base name of each snippet file. The associated glob pattern `snippets/all-cards/*` specifically targets all files located in the `all-card/` subdirectory.
