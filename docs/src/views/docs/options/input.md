---
title: 'Input'
layout: base
permalink: '/options/input/index.html'
anchors:
  - 'Input'
  - 'CLI'
---

# Input `{ts} { input: string }`

The `input` option defines the source directory containing theme files and must be set to a relative path. It accepts a `string` value type and defaults to `source`. Reverse paths (e.g., `../`) are not allowed to ensure the integrity and security of file referencing. When left `{ts} undefined`, Syncify will automatically fall back to the default `source` directory.

:::: grid row ai-center my-5
::: grid col-4

```treeview
/
├── source/    # input
├── theme/
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

> It is recommended not to set subdirectory paths, as this can complicate project structure. For a detailed guide on how project paths are handled in Syncify, refer to the [Directory Structure](/usage/directory-structure/) documentation.

---

# CLI `{bash} --input, -i`

You can override or redefine the `input` directory value through the command line using the `--input` flag or its shorthand `-i`. Using this flag does not permanently change the input path in the configuration file — it only applies to the current CLI session. For more permanent changes, update the configuration directly. For example, to specify the `src` directory as the input and trigger a theme build:

:::: grid row ai-center my-5
::: grid col

```bash
$ syncify --build --input src
```

:::
::: grid col-auto fs-sm ff-head pt-3 d-none d-sm-flex

OR

:::
::: grid col

```bash
$ sy -b -i src
```

:::
::::

This option is particularly useful for cases where you want to dynamically switch between different project directories without changing the configuration file. However, ensure that the path provided is relative and complies with Syncify’s directory structure guidelines.
