---
title: 'Stash Directories'
layout: base.liquid
permalink: '/usage/stash-directories/index.html'
anchors:
  - 'Stash Directories'
---

# Stash Directories

Syncify’s **input** ➔ **output** framework offers developers flexibility, but complex theme structures can disrupt predictability. Stash directories provide a fallback solution for placing files. Unlike custom path patterns that may complicate [pull](/cli/sy-pull/) operations with guesswork, stash directories hint at locations and double as fallback or override points. This keeps imports in a chosen spot, allowing developers to manage import paths efficiently while maintaining control over output destinations during Syncify's CLI execution.

:::: grid row mb-4 ai-center
::: grid col pr-0

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    snippets: [
      'path/snippets/*',
      'path/examples/*',
      {
        index: 1,  // Target source/path/examples
        stash: '*' // Asterisk signals flat write
      }
    ],
    sections: [
      'path/sections/*',
      {
        stash: 'temp' // Target source/sections/temp
      }
    ]
  }
});
```

:::
::: grid col-5 stash-header fs-sm bd py-3 rd-l pl-0 bl-0

<div class="pl-3 fs-sm">

## `{ts} { stash: '*' }`

Asterisk applies a flat-write of files in path

## `{ts} { stash: true }`

Boolean `true` applies write in directory called `stash`

## `{ts} { stash: number }`

Target a flat-write of files at specific pattern index

## `{ts} { stash: string }`

Write to a sub-directory relative to specific pattern

## `{ts} { index: number; stash: true }`

Target pattern at index and write in directory `stash`

## `{ts} { index: number; stash: string }`

Target pattern at index and write to sub-directory

</div>

:::
::::

---

# Usage Example

You want to pull in changes for a remote theme which a couple of developers have been working on. You are using Syncify, they are using the Shopify CLI. Their projects are novice and elementary, they have flat structures. You, as an adult and professional have custom structures. In the below example, we are using section [rename](/renaming-files/) path patterns. There is nothing inherently wrong with this definition but such an explicit and verbose mapping can actually be problematic when working with collaborators or developers coding in a flat-structure via Shopify CLI.

Stash directories are designed to provide developers a grouping mechinsim for remote files obtained during [pull](/cli/sy-pull/) operations. Stashes are not something most users will need, but When executing [pull](/cli/sy-pull/) operations

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

---

:::: grid row mb-4 ai-center
::: grid col

##### ✅ Input Structure

```treeview
source/
  └── sections/
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
::: grid col-auto pt-5

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col

##### Output Structure

```treeview
theme/
  └── sections/
      ├── annoucement.liquid
      ├── card.liquid
      ├── collage.liquid
      ├── header.liquid
      ├── footer.liquid
      ├── product-details.liquid
      ├── product-images.liquid
      ├── rich-text.liquid
      └── slideshow.liquid

```

:::
::::

One of the developers using the Shopify CLI pushes a new section to a theme. Your project structure is designed in such a way that sections

:::: grid row mb-4 ai-center
::: grid col fill-papyrus

##### Theme Structure

````treeview
sections/
    ├── annoucement.liquid
    ├── card.liquid
    ├── collage.liquid
    ├── header.liquid
    ├── footer.liquid
    ├── product-details.liquid
    ├── product-images.liquid
    ├── rich-text.liquid
    └── slideshow.liquid


:::
::: grid col-auto

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col fill-papyrus

##### Theme Structure

```treeview
sections/
    ├── annoucement.liquid
    ├── card.liquid
    ├── collage.liquid
    ├── header.liquid
    ├── footer.liquid
    ├── product-details.liquid
    ├── product-images.liquid
    ├── rich-text.liquid
    └── slideshow.liquid

````

:::
::::

Stash directories are designed to provide developers a grouping mechinsim for remote files obtained during [pull](/cli/sy-pull/) operations. Stashes are not something most users will need, but When executing [pull](/cli/sy-pull/) operations,

```

```
