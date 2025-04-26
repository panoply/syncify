---
title: 'Options - Processors - PostCSS'
layout: base
permalink: '/options/processors/postcss/index.html'
anchors:
  - 'PostCSS'
---

# PostCSS

Syncify provides integrated support with PostCSS for processing CSS file types. You can leverage PostCSS together with the SASS processor for CSS files.

See also [Style Transforms](#).

### Using Config File

Provide a `postcss.config.js` file in the root of your project or within the defined `config` path.

### Using Processors

The `postcss` property accepts an array list of PostCSS plugins.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
    postCSS: [] // PostCSS Plugins
  }
})
```
