---
title: 'Options - Processors - ESBuild'
layout: base
permalink: '/options/processors/esbuild/index.html'
anchors:
  - 'ESBuild'
---

# ESBuild

Syncify provides integrated support with ESBuild for processing TypeScript, JavaScript, JSX and TSX file types. ESBuild provides wonderful capabilities like code splitting and tree shaking.

See also [Script Transforms](#).

### Using Config File

ESBuild Configuration files `esbuild.config.js` are not supported for script transforms.

### Using Processors

The `esbuild` property is were ESBuild configuration option defaults can be provided.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
    esbuild: {} // ESBuild Options
  }
})
```
