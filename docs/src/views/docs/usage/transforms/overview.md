---
title: 'Transforms'
layout: base.liquid
permalink: '/usage/transforms/index.html'
anchors:
  - 'Transforms'
  - 'Supported Files'
  - 'Default Options'
---

# Transforms

Syncify provides pre-processor capabilities for managing standard theme file types, such as `.liquid` and `.json`, along with files related to the asset pipeline. The `transform` feature supports compiling TypeScript, bundling JavaScript, and processing CSS, images, and SVG file types using modern developer tools, like PostCSS, Tailwind, SASS, SVGO and ESBuild.

The `transform` object available within `syncify.config` files offers wrapper configuration models for managing different file types across various tools. The option simplifies third-party tool integration and usage within Shopify themes, serving as a unified control point for developers.

> This page will outline the **transform** capabilities and go beyond surface level usage guidance. As with most tools, the best way to understand features is by experimenting with them firsthand.

# Options

There are **5** available transform options in Syncify. Options are either categorized by the type of file they process which is the case for `liquid`, `json` and `svg` transforms or in the case of `script` and `style` by their respective asset type.

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    script: {},  // .ts .tsx, .js .jsx
    style: {},   // .css .scss .sass
    json: {},    // .json
    liquid: {},  // .liquid
    svg: {}      // .svg
  }
})
```

To better understand how to leverage transforms in Syncify, let's consider a scenario where you required all the functionalities that transforms offer. Though it is unlikely that you'll need such a setup in practice, assuming you did will better help with understanding usage and appropriation.

---

# Script Example

Syncify can compile TypeScript, JavaScript, TSX and JSX file types. It supports terse minification, source maps, code chunking and will align with settings defined in `tsconfig.json` or `jsconfig.json` files. The advantage of using the `script` transform feature is that you don't need to manage the complexities of JavaScript processing, because Syncify comes pre-configured to create streamlined JavaScript output that work seamlessly in both development and production environments of Shopify Themes.

> Syncify uses [ESBuild](https://esbuild.github.io/) under the hood which is the same transpiler used by JavaScript bundlers like [vite](https://vitejs.dev/) and [tsup](https://tsup.egoist.dev).

Script transforms support several different configuration structures. We will focus on the most basic in this example, but its important to consider that there is no one-size, fits-all approach and developers are encourage to use their preferred model.

:::: grid row dir-each my-4
::: grid col-7

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    script: {
      input: ['./source/assets/scripts/index.js'],
      format: 'iife',
      target: 'es2016',
      rename: 'bundle.min.js',
    }
  }
});
```

:::
::: grid col fs-sm

```treeview
source/
│   └── assets/
│       └── scripts/
│           ├── a.js
│           ├── b.js
│           ├── c.js
│           └── index.js
├── theme/
├── .env
├── package.json
└── jsconfig.json
```

:::
::::

---

# Style Transform

:::: grid row dir-each my-4
::: grid col-7

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  transform: {
    style: {
      input: ['./source/assets/styles/*.css'],
      postcss: [
        autoprefixer()
      ]
    }
  }
});
```

:::
::: grid col fs-sm

```treeview
source/
│   └── assets/
│       └── css/
│           ├── homepage.css
│           ├── cart.css
│           ├── collections.css
│           ├── product.css
│           ├── search.css
│           └── styles.css
├── theme/
├── .env
└── package.json
```

:::
::::

---

# SVG Transform

:::: grid row dir-each my-4
::: grid col-7

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  transform: {
    style: {
      input: ['./source/assets/styles/*.css'],
      postcss: [
        autoprefixer()
      ]
    }
  }
});
```

:::
::: grid col fs-sm

```treeview
source/
│   └── assets/
│       └── css/
│           ├── homepage.css
│           ├── cart.css
│           ├── collections.css
│           ├── product.css
│           ├── search.css
│           └── styles.css
├── theme/
├── .env
└── package.json
```

:::
::::

---

# JSON Transform

:::: grid row dir-each my-4
::: grid col-7

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  transform: {
    style: {
      input: ['./source/assets/styles/*.css'],
      postcss: [
        autoprefixer()
      ]
    }
  }
});
```

:::
::: grid col fs-sm

```treeview
source/
│   └── assets/
│       └── css/
│           ├── homepage.css
│           ├── cart.css
│           ├── collections.css
│           ├── product.css
│           ├── search.css
│           └── styles.css
├── theme/
├── .env
└── package.json
```

:::
::::

---

# Liquid Transform

:::: grid row dir-each my-4
::: grid col-7

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  transform: {
    style: {
      input: ['./source/assets/styles/*.css'],
      postcss: [
        autoprefixer()
      ]
    }
  }
});
```

:::
::: grid col fs-sm

```treeview
source/
│   └── assets/
│       └── css/
│           ├── homepage.css
│           ├── cart.css
│           ├── collections.css
│           ├── product.css
│           ├── search.css
│           └── styles.css
├── theme/
├── .env
└── package.json
```

:::
::::
