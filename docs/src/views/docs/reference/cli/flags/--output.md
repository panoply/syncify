---
title: 'CLI --output, -o'
layout: base
permalink: '/cli/flags/output/index.html'
---

# Output `{bash} --output, -o`

You can override or redefine the `output` directory via the command line using the `--output` flag or its shorthand `-o`. This flag allows you to specify a custom output directory for the generated theme without permanently modifying the configuration file—it only applies to the current CLI session. To make changes permanent, update the configuration file directly.

For example, to set the `dist` directory as the output and trigger a theme build:

:: row ai-center my-5
:: col

```bash
syncify --build --output dist
```

::
:: col-auto fs-sm ff-head pt-3 d-none d-sm-flex

OR

::
:: col

```bash
sy -b -o dist
```

::
::

This option is useful when you need to dynamically change the output directory for specific builds. Ensure the provided path is valid and follows Syncify’s directory structure guidelines to avoid complications during file syncing.
