---
title: 'CLI --input, -i'
layout: base
permalink: '/cli/flags/input/index.html'
---

# Input `{bash} --input, -i`

You can override or redefine the `input` directory value through the command line using the `--input` flag or its shorthand `-i`. Using this flag does not permanently change the input path in the configuration file — it only applies to the current CLI session. For more permanent chwanges, update the configuration directly. For example, to specify the `src` directory as the input and trigger a theme build:

:::: grid row ai-center my-5
::: grid col

```bash
syncify --build --input src
```

:::
::: grid col-auto fs-sm ff-head pt-3 d-none d-sm-flex

OR

:::
::: grid col

```bash
sy -b -i src
```

:::
::::

This option is particularly useful for cases where you want to dynamically switch between different project directories without changing the configuration file. However, ensure that the path provided is relative and complies with Syncify’s directory structure guidelines.
