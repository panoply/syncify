---
title: 'Input'
layout: base
permalink: '/options/input/index.html'
---

# Input `{ts} { input: string }`

The `input` option defines the source directory containing theme files and must be set to a relative path. It accepts a `string` value type and defaults to `source`. Reverse paths (e.g., `../`) are not allowed to ensure the integrity and security of file referencing. When left `{ts} undefined`, Syncify will automatically fall back to the default `source` directory.

:: row ai-center my-5
:: col

```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme' // default output directory
});
```

::
:: col-4

```treeview
/
├── source/    # input
├── theme/
├── package.json
└── syncify.config.ts
```

::
::

> It is recommended not to set subdirectory paths, as this can complicate project structure. For a detailed guide on how project paths are handled in Syncify, refer to the [Directory Structure](/usage/directory-structure/) documentation.

---

### Modes

The `input` option can be used to override source directory paths on the command line in the follow modes:

- [`{bash} sy watch`](/cli/sy-watch/)
- [`{bash} sy build`](/cli/sy-build/)

---

### Related

1. [Directory Structures](/usage/directory-structures/)
2. [CLI Commands --input](/cli/--input/)

---
