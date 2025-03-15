---
title: 'HOT'
layout: base
permalink: '/options/hot/index.html'
anchors:
  - 'server'
  - 'socket'
  - 'layouts'
  - 'method'
  - 'label'
  - 'scroll'
  - 'inject'
  - 'strategy'
---

# HOT

This option accepts an object containing configuration settings for HOT Reloading. You can enable it via the CLI when running in `{bash} --watch` mode using the `{bash} --hot` flag. If no custom settings are defined, the default options will apply.

# CLI

HOT Reloading required command line invocation and will only run in watch mode.

```bash
$ --watch --hot
```

# Options

```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  hot: {
    server: 3000,
    socket: 8089,
    method: 'hot',
    strategy: 'hydrate',
    label: 'visible',
    previewBar: false,
    loadEventJS: '',
    chromeFlags: []
  }
});
```

# `{ts} { server?: number }`

The static server for assets - This will be written in the HOT snippet

# `{ts} { socket?: number }`

Websocket port - This will be written in the HOT snippet

# `{ts} { method?: string }`

A string list of Liquid template layout names used in your theme which should have the hot snippet injected.

# `{ts} { label?: string }`

Whether or not Syncify should inject the required HOT snippet at runtime layout/s. When false you will need to manually place the hot.js.liquid snippet into your theme. By default when running `--hot` Syncify will check your layout/s for the hot snippet and if it's not present then syncify will inject it and invoke an upload of the layouts.

# `{ts} { previewBar?: boolean }`

Which live reload method should Syncify use. Setting this to `hot` will apply **HOT** reloading to assets and views with automatic refresh upon changes. Using the `refresh` option will invokes a full page refresh after changes have been applied

# `{ts} { strategy?: string }`

The HOT strategy to use. Syncify supports 2 different replacement strategies and you will need choose which one to use depending on your project type. The `hydrate` strategy will execute morph replacements. This is what Syncify will default to, however it is not always perfect and in cases where you leverage frameworks that use DOM Mutation observers, it probably better to use replace.

When using the `replace` strategy will execute fragment swaps use replaceWith instead of morphs when executing HOT reloads. It works almost identical to hydrate but respects DOM mutations. If you are leveraging a framework like Stimulus or Alpine, then choose this strategy.

# `{ts} { loadEventJS?: string }`

Scroll position between reloads. Defaults to `preserve` but can also be set to `top`. When using `top` scroll position will move to the top of page between refreshes.
