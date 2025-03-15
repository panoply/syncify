---
title: 'Options - Processors - SVGO'
layout: base
permalink: '/options/processors/svgo/index.html'
anchors:
  - 'SVGO'
---

# SVGO

Syncify provides integrated support with SVGO for processing SVG file types. If you would like to produce SVG Sprites, then refer to [Sprites](#) section which uses SVGO under the hood.

See also [SVG Transforms](#).

### Using Config File

Provide a `svgo.config.js` file in the root of your project or within the defined `config` path.

### Using Processors

The `svgo` property accepts SVGO configuration options.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
   svgo: {} // SVGO Options
  }
})
```
