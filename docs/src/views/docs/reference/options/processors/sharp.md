---
title: 'Options - Processors - Sharp'
layout: base
permalink: '/options/processors/sharp/index.html'
anchors:
  - 'SASS'
---

# Sharp

Syncify provides integrated support for convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions using the Sharp.

See also [Image Transforms](#)

### Config File is not supported

Sharp Configuration files are not supported for Image transforms.

### Using Processors

The `sharp` property accepts Sharp configuration options.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
    sharp: {} // Sharp Options
  }
})
```
