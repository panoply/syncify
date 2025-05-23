---
title: 'Output'
layout: base
permalink: '/options/output/index.html'
anchors:
  - 'Input'
  - 'CLI'
---

# Output `{ts} { output: string }`

The `output` option specifies where the generated Shopify theme will be written. This directory serves as the active representation of the theme, and all files placed here will be synced to your remote store. The option accepts a `string` value and defaults to `theme`. To ensure file integrity and security, reverse paths (e.g., `../`) are not permitted.

When the `output` option is `{ts} undefined`, Syncify automatically defaults to the `theme` directory. You are discouraged from using subdirectories, as this can complicate project organization and potentially cause build issues.

:: row ai-center my-5
:: col-4

```treeview
/
├── source/
├── theme/    # output
├── package.json
└── syncify.config.ts
```

::
:: col

```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme' // default output directory
});
```

::
::

> For best results, avoid setting subdirectory paths to prevent structural issues. Refer to the [Directory Structure](/usage/directory-structure/) documentation for detailed guidance on managing project paths in Syncify.
