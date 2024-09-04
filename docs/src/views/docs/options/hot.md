---
title: 'HOT'
layout: base
permalink: '/configure/hot/index.html'
prev:
  label: 'Targeting'
  uri: '/cli/targeting'
next:
  label: 'Resources'
  uri: '/cli/filtering'
options:
  - 'server'
  - 'socket'
  - 'layouts'
  - 'method'
  - 'label'
  - 'scroll'
  - 'inject'
  - 'strategy'
---

# Options

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

### Server

The static server for assets - This will be written in the HOT snippet

---

### Socket

Websocket port - This will be written in the HOT snippet

---

### layouts

A string list of Liquid template layout names used in your theme which should have the hot snippet injected.

---

### Inject

Whether or not Syncify should inject the required HOT snippet at runtime layout/s. When false you will need to manually place the hot.js.liquid snippet into your theme. By default when running `--hot` Syncify will check your layout/s for the hot snippet and if it's not present then syncify will inject it and invoke an upload of the layouts.

---

### method

Which live reload method should Syncify use. Setting this to `hot` will apply **HOT** reloading to assets and views with automatic refresh upon changes. Using the `refresh` option will invokes a full page refresh after changes have been applied

---

### strategy

The HOT strategy to use. Syncify supports 2 different replacement strategies and you will need choose which one to use depending on your project type. The `hydrate` strategy will execute morph replacements. This is what Syncify will default to, however it is not always perfect and in cases where you leverage frameworks that use DOM Mutation observers, it probably better to use replace.

When using the `replace` strategy will execute fragment swaps use replaceWith instead of morphs when executing HOT reloads. It works almost identical to hydrate but respects DOM mutations. If you are leveraging a framework like Stimulus or Alpine, then choose this strategy.

---

### scroll

Scroll position between reloads. Defaults to `preserve` but can also be set to `top`. When using `top` scroll position will move to the top of page between refreshes.
