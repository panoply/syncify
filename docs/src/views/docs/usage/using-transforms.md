---
title: 'Transforms'
layout: base
permalink: '/usage/transforms/index.html'
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

# Transforms

In Syncify, asset files can be transformed before being written to the defined `output` directory and uploaded to your Shopify store. The `transform` option provides users with control of the "asset pipeline" and Syncify exposes configuration wrappers for handling files together with modern developer tooling.

#### Motivation

---

### Script

Syncify exposes a `script` transform option which supports TypeScript (`.ts` and `.tsx`) and/or JavaScript (`.js` and `.jsx`) bundling using [ESBuild](https://esbuild.github.io/). Script transforms use a pre-defined set of processing configurations and will produce lean JavaScript bundles designed to work seamlessly in development mode or when leveraging HOT reloads. Syncify will also apply refinements to distribution bundles focused on performance when generating production builds for your Shopify theme.

> ESBuild is the same bundler used under the hood by tools like [vite](https://vitejs.dev/) and [tsup](https://tsup.egoist.sh). If you are using existing tools like Webpack or Rollup, consider adopting ESBuild as its a far superior option.

### Bundling TypeScript

The **script** transform option aims to make bundling easy but also extensible for more advanced use cases. Syncify will automatically detect `tsconfig.json` (or `jsconfig.json`) files located in your workspace and respect processing options defined within. By default, Syncify will produce **ESM** module formats that output in **ES2016** but you can also generate **IIFE** bundles and even inline code as a snippets within `<script></script>` tags.

The `script` options accepts several different structures and it is up to you how you wish to provide settings. The below code sample depicts the default configuration structure:

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    script: [
      {
        input: [],
        format: 'esm',
        target: 'es2016',
        snippet: false,
        rename: '',
        external: [],
        watch: [],
        esbuild: {}
      }
    ]
  }
})
```

You may prefer to use rename (entry point) structures instead. When we are using rename entry points the prefix path expects either `snippets/` or `assets/` be provided. When passing `snippets/` then a snippet will be generated, whereas `assets/` will generate a `.js` file.

> Rename entry points accept `[file]`, `[dir]` and `[ext]` placeholders.

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    script: {

      // Producing 2 inline snippet <script> bundles
      // Output will be slideshow.js.liquid and search-form.js.liquid
      'snippets/[file][ext]': [
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

### Styles

###### TAILWIND IS NOT YET SUPPORT

Syncify exposes a `style` transform option which can be used for CSS (`.css`) and SCSS/SASS (`.scss` or `.sass`) bundling. Style transform support is made possible by using compilers like [Dart SASS](#), [PostCSS](#) and/or [Tailwind](#). The `style` option provides developers with replicated configuration control but you may also prefer to use standard config files (e.g: `postcss.config.js`) which Syncify also supports.

Style transforms help alleviate the complexities sometimes involved in setting up these tools so you can easily process asset specific stylesheets or generate output as a **snippet** within `<style></style>` tags.

### SASS Support

Syncify provides SCSS/SASS transform support for `.scss` and `.sass` file types using [Dart SASS](#). Using SASS required you to install the Dart module as a development dependency in your project. Syncify will complain if you try to use SASS transforms without Dart SASS installed.

```bash
pnpm add sass -D
```

### Tailwind Support ~ COMING SOON

Syncify supports TailwindCSS for CSS processing. If you require transform support for Tailwind, you need to install the TailwindCSS module as a development dependency in your project. Syncify will ignore Tailwind class name occurrences without the module installed.

```bash
pnpm add tailwindcss -D
```

> Tailwind is not yet available in the beta.

### PostCSS Support

In addition to SASS transformation, Syncify also support CSS (post)-processing using [PostCSS](#). If you wish have Syncify handle CSS transforms then you need to install **PostCSS** as a development dependency. Syncify will complain if you try to use PostCSS transforms without PostCSS installed.

> Provide PostCSS plugins and any specific settings within the `postcss.config.js` file.

```bash
pnpm add postcss -D
```

**Please note:** If you are using Syncify to compile SASS files, then by default the transformed CSS will be passed to PostCSS.

### Usage

In the below example we are generating multiple stylesheets and compiling both SCSS and CSS file types. The example illustrates how one can leverage Syncify together with [Dart SASS](#), [PostCSS](#) and additional node modules like the Bootstrap framework.

> **Please Note** You will need to remove the comments from the code example if you are copy and pasting it into your `package.json` file. JSON with Comments is not supported in `package.json` files.

<!-- prettier-ignore-->
```js
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  transform: {
    style: {
      'assets/stylesheet.min.css': {
        input: 'styles/stylesheet.scss',
        watch: ['styles/sections/*'],
        postcss: true,
        sass: true
      },
      'snippets/css.liquid': {
        input: 'styles/vars.css.liquid',
        postcss: true,
        sass: true
      },
      'assets/bootstrap.min.scss': {
        input: 'styles/vendors/bootstrap.scss',
        style: 'expanded',
        includePaths: ['node_modules/bootstrap']
      }
    }
  }
})
```
