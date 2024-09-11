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

Live reloading (otherwise known as **HOT Reloads** ) is supported in watch mode. Syncify leverages websocket's, XHR and statically served endpoints to provide this capability with zero configuration or the need to install or setup additional tooling. No extensions and no complexities. Syncify will listen for messages sent via websocket on the client and carry out HOT replacements of Assets, Sections, Snippets, Layouts and Templates without triggering full-page refreshes. HOT Reloads can be enabled by passing the `--hot` flag via the CLI. The Syncify HOT reload tends to be considerably faster than using the Shopify CLI.

### Assets

SASS/CSS, TypeScript/JavaScript and SVG asset file types are HOT reloaded by swapping out the URL's or containing source with localhost equivalents served statically by Syncify.

### Section

Dynamic sections, static sections of a combination of both are fetched via the Ajax [Section rendering API](https://shopify.dev/docs/api/section-rendering). Replacements are applied to fragments in real-time and surrounding nodes are left intact.

### Others

In order to provide HOT replacements Syncify employs a mild form of DOM hydration. Snippets, templates and Liquid/JSON layout files will reflect changes near instantly and upto 10x faster than invoking a hard-refresh.

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
  ...
  hot: {
    strategy: 'replace',
    inject: true,
    label: 'visible',
    layouts: ['theme.liquid'],
    method: 'hot',
    scroll: 'preserved',
    server: 3000,
    socket: 8089
  },
  ...
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
