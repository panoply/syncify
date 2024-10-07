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

:::: grid row ai-center my-5
::: grid col-4

```treeview
/
├── source/
├── theme/    # output
├── package.json
└── syncify.config.ts
```

:::
::: grid col

```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme' // default output directory
});
```

:::
::::

> For best results, avoid setting subdirectory paths to prevent structural issues. Refer to the [Directory Structure](/usage/directory-structure/) documentation for detailed guidance on managing project paths in Syncify.

---

# CLI `{bash} --output, -o`

You can override or redefine the `output` directory via the command line using the `--output` flag or its shorthand `-o`. This flag allows you to specify a custom output directory for the generated theme without permanently modifying the configuration file—it only applies to the current CLI session. To make changes permanent, update the configuration file directly.

For example, to set the `dist` directory as the output and trigger a theme build:

:::: grid row ai-center my-5
::: grid col

```bash
$ syncify --build --output dist
```

:::
::: grid col-auto fs-sm ff-head pt-3 d-none d-sm-flex

OR

:::
::: grid col

```bash
$ sy -b -o dist
```

:::
::::

This option is useful when you need to dynamically change the output directory for specific builds. Ensure the provided path is valid and follows Syncify’s directory structure guidelines to avoid complications during file syncing.
