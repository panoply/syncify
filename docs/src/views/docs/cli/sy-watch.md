---
title: 'CLI - sy watch'
layout: base
permalink: '/cli/sy-watch/index.html'
---

# `sy watch`

The watch command runs Syncify in **watch** mode. In this mode, Syncify continuously monitors files in the specified **input** directory for changes. When a file is modified, it writes the updated content to the **output** directory and then uploads those changes to a Shopify theme/store or [target](/usage/targeting/). This keeps the output directory and Shopify environment synchronized with you local version throughout the session.

:::: grid row mt-4 mb-5
::: grid col-12 col-md-9 pr-4

```bash
$ sy watch
```

:::
::::

---

# Flags

The `sy watch` command accepts several flags that allow you to customize its behavior in watch mode. Certain flags can alter how Syncify processes file modifications or unlock additional watch mode features, such as enabling [HOT Reloads](/usage/hot-reloding/) for real-time updates in the Shopify environment.

:::: grid row mt-4 mb-5
::: grid col-12 col-md-9 p-4 fs-sm

{% include './flags/--target.md' %}

{% include './flags/--filter.md' %}

{% include './flags/--hot.md' %}

{% include './flags/--align.md' %}

{% include './flags/--bind.md' %}

{% include './flags/--clean.md' %}

:::
::::
