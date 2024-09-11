---
title: 'Transforms - JavaScript'
layout: base
permalink: '/options/transform/javascript/index.html'
prev:
  label: 'Targeting'
  uri: '/cli/targeting'
next:
  label: 'Resources'
  uri: '/cli/filtering'
navs:
  - 'Config File'
  - 'Supported Files'
  - 'Default Options'
---

# JavaScript

Syncify supports JavaScript bundling, tree-shaking, code splitting and minification out of the box. Under the hood, Syncify leverages [ESBuild](https://esbuild.github.io/) and the `script` transform configuration option allows developers to process JavaScript in a fast and effecient manner. Syncify script tranforms apply compatible presets for handling JavaScript files with ESBuild and provides developers distribution control with support for snippet generation.

#### Example

Generate an starting point strap example with JavaScript transforms pre-configured:

```bash
$ pnpx @syncify/cli --strap using-javascript
```

---

### Using jsconfig file

When leveraging Syncify to bundle **JavaScript** files, it is recommended that you include a `jsconfig.json` file within the root of your project. Syncify will automatically detect `jsconfig.json` files and inherit bundle specific settings from within. The JavaScript experience is improved when you have a `jsconfig.json` file in your workspace that defines the project context.

```treeview
/
├── source/                          # The main directory where all source files are contained
├── theme/                           # The distribution directory where source themes are written
├── .env                              # Where store admin api tokens and other secrets exist
├── jsconfig.json             # Where store admin api tokens and other secrets exist
└── syncify.config.js     # Where store admin api tokens and other secrets exist
```

> Using a `jsconfig.json` is optional. Refer to [What is jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig) documentation for more information.

### JavaScript Transform

By default, Syncify will produce **ESM** module formats that output in **ES2016** but you can also generate **IIFE** bundles and even inline code as a snippets.

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    script: [
      {
        input: [],         // Accepts a string or string[] list of .js paths
        format: 'esm',     // Defaults to ESM, but also accepts "iife"
        target: 'es2016',  // Bundle output target, defaults to 2016
        snippet: false,    // Whether or not to out as a snippet
        rename: '',        // Rename the distibuted output bundle
        external: [],      // A list of modules to be marked as external
        watch: [],         // A glob list of paths which should trigger rebuild
        esbuild: {}        // Optionally provide ESBuild options to override.
      }
    ]
  }
})
```

You may prefer to use rename (entry point) structures instead. When we are using rename entry points the prefix path expects either `snippets/` or `assets/` be provided. When passing `snippets/` then a snippet will be generated, whereas `assets/` will generate a `.js` file.

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    script: {
      // Producing 2 inline snippet <script> bundles
      // Output will be slideshow.js.liquid and search-form.js.liquid
      'snippets/[file].[ext]': [
        'scripts/sections/slideshow.ts',
        'scripts/sections/search-form.ts'
      ]
      // Producing an IIFE script as an asset
      // The return value is accessible via window.Foo
      'assets/foo.min.js': {
        input: 'scripts/index.ts',
        format: 'iife',
        globalName: 'window.Foo,
      }
    }
  }
})
```

---

# TypeScript

Syncify supports TypeScript bundling, tree-shaking, code splitting and minification out of the box. Under the hood, Syncify leverages [ESBuild](https://esbuild.github.io/) and the `script` transform configuration option allows developers to process JavaScript in a fast and effecient manner. Syncify script tranforms apply compatible presets for handling JavaScript files with ESBuild and provides developers distribution control with support for snippet generation.

#### Example

Generate an starting point strap example with JavaScript transforms pre-configured:

```bash
$ pnpx @syncify/cli --strap using-typescript
```

---

### Using tsconfig file

When leveraging Syncify to bundle **TypeScript** files, it is recommended that you include a `jsconfig.json` file within the root of your project. Syncify will automatically detect `jsconfig.json` files and inherit bundle specific settings from within. The JavaScript experience is improved when you have a `jsconfig.json` file in your workspace that defines the project context.

```treeview
/
├── source/                          # The main directory where all source files are contained
├── theme/                           # The distribution directory where source themes are written
├── .env                              # Where store admin api tokens and other secrets exist
├── tsconfig.json             # Where store admin api tokens and other secrets exist
└── syncify.config.js     # Where store admin api tokens and other secrets exist
```

> Using a `jsconfig.json` is optional. Refer to [What is jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig) documentation for more information.

### TypeScript Transform

By default, Syncify will produce **ESM** module formats that output in **ES2016** but you can also generate **IIFE** bundles and even inline code as a snippets.

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    script: [
      {
        input: [],         // Accepts a string or string[] list of .js paths
        format: 'esm',     // Defaults to ESM, but also accepts "iife"
        target: 'es2016',  // Bundle output target, defaults to 2016
        snippet: false,    // Whether or not to out as a snippet
        rename: '',        // Rename the distibuted output bundle
        external: [],      // A list of modules to be marked as external
        watch: [],         // A glob list of paths which should trigger rebuild
        esbuild: {}        // Optionally provide ESBuild options to override.
      }
    ]
  }
})
```

You may prefer to use rename (entry point) structures instead. When we are using rename entry points the prefix path expects either `snippets/` or `assets/` be provided. When passing `snippets/` then a snippet will be generated, whereas `assets/` will generate a `.js` file.

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    script: {
      // Producing 2 inline snippet <script> bundles
      // Output will be slideshow.js.liquid and search-form.js.liquid
      'snippets/[file].[ext]': [
        'scripts/sections/slideshow.ts',
        'scripts/sections/search-form.ts'
      ]
      // Producing an IIFE script as an asset
      // The return value is accessible via window.Foo
      'assets/foo.min.js': {
        input: 'scripts/index.ts',
        format: 'iife',
        globalName: 'window.Foo,
      }
    }
  }
})
```

---
