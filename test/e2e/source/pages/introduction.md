---
title: Introduction
handle: introduction
template_suffix: null
author: Shopify API
---
Syncify is a blazing fast, extensible and superior alternative Shopify [theme kit](https://shopify.github.io/themekit/) tool. Syncify applies an intuitive approach for theme development that extends upon your existing build tools. It ships with a powerful and informative CLI that can spawn child processes (compiler coupling). Supports multiple storefront theme synchronization with watch, upload, download and metafield capabilities included.

**Syncify exists as part of the [Liquify](https://liquify.dev) project**

```html

{{ foo }}

```

### Key Features

*   Upload, download and watch multiple storefronts and/or themes.
*   Clear, concise and informative CLI logging.
*   Supports HTML + Liquid and JSON minification.
*   An elegant directory based metafields sync approach using JSON files.
*   Built-in support for SCSS and CSS transpilation using SASS Dart and [PostCSS](https://postcss.org/).
*   SVG Sprite and inlined SVG snippet generation using [SVGO](https://github.com/svg/svgo).
*   Intelligent path mapping capabilities for custom theme directory structures.
*   Digests existing build tool configurations for asset transformations.
*   Prompt based CLI/TUI and exposed module API for script usage.

### Why?

I have been working on the Shopify platform for last several years and nothing the Shopify team maintain or have produced has actually helped in my productivity. Theme Kit and other tools in this nexus fail to achieve fluidity. Syncify is how I handle theme creation, development and maintenance, it's fast, flexible, extensible, scalable and will not lock you into some restrictive workflow and setup apparatus.

Install
=======

Install as development dependency in your project. Syncify will run a script on post-install which writes default configuration options to your package.json file.

**PNPM**

```cli
pnpm add @liquify/syncify -D
```

**NPM**

```cli
npm i @liquify/syncify --save-dev
```

**Yarn**

```cli
yarn add @liquify/syncify --dev
```

```typescript
import { shopifysync as sync } from '@liquify/syncify';

// Backward compatible, ie: shopify-sync
sync(mode: string, options: {}, function() {})
```
