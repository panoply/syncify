---
title: 'Options - Processors - Sprite'
layout: base
permalink: '/options/processors/sprite/index.html'
anchors:
  - 'Sprite'
---

# Sprite

Syncify provides integrated support for creating SVG Sprites using [SVG Sprites](#). SVG Sprite is a low level module that optimizes SVGs and bakes them into sprites that Syncify can inline and output.

See also [SVG Transforms](#).

### Config File is not supported

SVG Sprites Configuration files are not supported for Sprite transforms.

### Using Processors

The `sprite` property accepts SVG Sprite configuration options.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
    sprite: {} // SVG Sprite Options
  }
})
```
