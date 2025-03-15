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

Syncify provides **HOT Reloading** capabilities during watch mode operations. This feature enables real-time, incremental updates to your theme's assets, sections, snippets, layouts or templates without requiring full page refreshes. Through intelligent DOM diffing and morphing, changes are seamlessly applied to remote store/s while preserving page state and scroll position.

Hot reloading can be activated by passing the `--hot` flag during initialization, and for developers requiring programmatic control, Syncify exposes an interface API to manage the reloading process via `{js} window.syncify`. This approach significantly accelerates the development workflow by eliminating the latency typically associated with full page reloads and CDN propagation delays.

---

# Syncify Approach

Syncify's HOT Reloading functionality is enabled through the integration of [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js) and its dedicated [@syncify/hot](https://github.com/panoply/syncify/packages/hot) JavaScript client. When hot mode is enabled, Syncify injects its client-side module directly into theme layout/s and establishes a WebSocket connection between your development environment and the remote store.

> [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js) is the fastest standards compliant web server solution available and makes up the core components of Bun. It performs at least **10x** that of socket.io, **8.5x** that of Fastify.

This injection approach enables real-time, incremental updates by simulating a localhost environment within your remote store. External assets like stylesheets and scripts that would normally be served through the themes assets CDN (referenced via `{html} <script src="">` and `{html} <link rel="">` tags) are instead routed through **uWebSockets**. This direct serving from your local environment ensures instantaneous updates while maintaining the context of your remote store, effectively bridging the gap between local development and remote deployment.

:::: grid row my-5
::: grid col-6 fs-sm

#### Before Injection

The HOT Snippet will be injected after `{html} <head>` element.

{% raw %}

<!-- prettier-ignore -->
```liquid
<html>
  <head>
    {% # hot snippet injection %}
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

{% endraw %}

:::
::: grid col-6 fs-sm

#### After Injection

The layout file has injected {% raw %}`{liquid} {% render %}`{% endraw %} snippet.

{% raw %}

<!-- prettier-ignore -->
```liquid
<html>
  <head>
    {%- render "hot" -%}
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

{% endraw %}
:::
::::

---

# Syncify HOT VS Shopify CLI HOT

Syncify outperforms the Shopify CLI by a factor of **3x** to **4x** in HOT Reloading speed, primarily because it facilitates **Real HOT Reloading**. This means Syncify can update all theme content types in-place without disrupting the user's session. In contrast, while Shopify CLI can manage HOT Section Reloads, it resorts to **Live Reloading** for other content, necessitating hard refreshes that slow down the development cycle and disrupt user experience.

The architectural approaches of Syncify and Shopify CLI differ substantially in how they achieve hot reloading capabilities. Shopify CLI routes all changes through a proxy server, triggering reloads via pass-through interception. While functional, this proxy-based architecture creates inherent overhead and cannot efficiently perform incremental replacements. In contrast, Syncify employs a server-socket-morph driven architecture that avoids proxy overhead entirely. Rather than proxying localhost, it creates a simulated localhost environment within remotely served stores while maintaining parallel processes for file synchronization to the theme CDN.

{% include 'comparison/hot-reloading'%}

Both approaches have their trade-offs. While Syncify's method requires DOM injection and carries more technical complexity, it achieves superior performance through direct socket communication and granular updates. Shopify CLI's proxy-based approach, though simpler and less invasive, results in slower performance and higher resource consumption due to its architectural limitations.

---

# CLI Usage

```bash
$ syncify dev -w --hot
```

### Default Options

<!--prettier-ignore-->
```js
import { definedConfig } from '@syncify/cli';

export default defineConfig({
  hot: {
    server: 41001,
    socket: 51001,
    label: true,
    method: 'hot',
    roles: {
      published: false,
      unpublished: true,
      development: true
    }
    layouts: [
      'theme.liquid'
    ],
    flags: [
      '--no-preview-bar',
      '--no-web-pixels-manager',
      '--no-checkout-preloads',
      '--no-shopify-features',
      '--no-trekkie',
      '--no-perfkit'
    ]
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
