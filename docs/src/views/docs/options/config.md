---
title: 'Config'
layout: base
permalink: '/options/config/index.html'
anchors:
  - 'Config'
  - 'CLI'
---

# Config `{ts} { config: string }`

The `config` option allows you to specify a sub-directory in your project that contains all configuration files. By default, Syncify assumes config files are located in the project root. This option accepts a `string` value and defaults to the root directory path if left undefined.

Using a dedicated `config` directory is especially helpful when working with external configuration files required by [transforms](/usage/transforms/) or [processors](/usage/processors), such as `tailwind.config.js` or `postcss.config.js`. If you prefer to keep these configuration files isolated from the root, you can define a sub-directory for them using this option.

> Organizing your config files in a separate directory can help maintain a cleaner project structure. For more details, refer to the [Transforms](/usage/transforms/) and [Processors](/usage/processors) documentation.

---

# CLI `{bash} --config, -c`

TODO
