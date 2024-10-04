---
title: 'HOT Reloading'
layout: base.liquid
permalink: '/usage/hot-reloading/index.html'
anchors:
  - 'HOT Reloading'
  - 'Assets'
  - 'Sections'
  - 'Others'
  - 'Programmatic Control'
---

# HOT Reloading

Syncify supports **HOT Reloads**, also known as Live Reloading, which operates in watch mode. This feature facilitates real-time, in-place updates of various components such as assets, sections, snippets, layouts, and templates without necessitating full-page refreshes. To activate HOT Reloading, simply use the `--hot` flag during initialization. Additionally, an interface API is provided for those seeking programmatic control over the reloading process.

The functionality of HOT Reloading in Syncify is powered by the robust [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js) module. When HOT mode is engaged, Syncify injects temporary scripts into your theme. These scripts utilize XHR for communication, DOM Diffs for identifying changes, Morphs for applying updates, and a static server setup to manage and execute operations during a watch session.

HOT Reloads perform on average 5x - 7x faster than HOT Reload by the Shopify CLI. This is largely due to Syncify's capability to carry out **Real HOT Reloads** with support for in-place replacement of all theme content types. While the Shopify CLI can manage HOT Section Reloads, it falls short in handling in-place updates for other content types, and instead it will triggers hard refreshes, i.e, **Fake HOT Reloads**.

#### HOT Assets

SASS/CSS, TypeScript/JavaScript and SVG asset file types are HOT reloaded by swapping out the URL's or containing source with localhost equivalents served statically by Syncify.

#### HOT Sections

Dynamic sections, static sections of a combination of both are fetched via the Ajax [Section rendering API](https://shopify.dev/docs/api/section-rendering). Replacements are applied to fragments in real-time and surrounding nodes are left intact.

#### HOT Snippets

SASS/CSS, TypeScript/JavaScript and SVG asset file types are HOT reloaded by swapping out the URL's or containing source with localhost equivalents served statically by Syncify.

#### HOT Templates

SASS/CSS, TypeScript/JavaScript and SVG asset file types are HOT reloaded by swapping out the URL's or containing source with localhost equivalents served statically by Syncify.

---

### CLI Usage

```bash
$ syncify dev -w --hot
```

---

# Default Options

```js
import { definedConfig } from '@syncify/cli';

export default defineConfig({
  hot: {
    strategy: 'replace',
    inject: true,
    label: 'visible',
    method: 'hot',
    scroll: 'preserved',
    server: 3000,
    socket: 8089,
    layouts: ['theme.liquid']
  }
});
```

---

# Programmatic Control

Running in HOT mode will result in Syncify injecting a snippet into layouts. The snippet is the socket receiver that is responsible for executing replacements/morphs and exposes programmatic control for developers who can to customize or hook into the HOT reload rendering cycles.

```js
// STATUS
//
window.syncify.ready: boolean
window.syncify.connected: boolean;

// RELOADS
//
window.syncify.assets(): void;
window.syncify.reload(): void;
window.syncify.refresh(): void

// SECTIONS
//
window.syncify.sections.get()
window.syncify.sections.list()
window.syncify.sections.load()

// LABEL
//
window.syncify.style.parent({ /* CSS */ });
window.syncify.style.label({ /* CSS */ });
```
