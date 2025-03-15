---
title: 'Options - Processors - SASS'
layout: base
permalink: '/options/processors/sass/index.html'
anchors:
  - 'SASS'
---

# SASS

Syncify provides integrated support with SASS Dart for processing SASS/SCSS file types. Syncify implements its own handling when for usage with SASS and allows you to use it together with [PostCSS](#postcss).

See also [Style Transforms](#).

### Config File is not supported

SASS Configuration files are not supported for style transforms.

### Using Processors

The `sass` property is were SASS configuration option defaults can be provided.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
    sass: {} // SASS Options
  }
})
```
