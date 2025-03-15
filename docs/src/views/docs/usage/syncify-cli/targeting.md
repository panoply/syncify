---
title: 'CLI Targeting'
layout: base
permalink: '/usage/targeting/index.html'
prev:
  url: '/usage/modes/'
  title: 'Modes'
next:
  url: '/usage/filtering/'
  title: 'Filtering'
---

# Targeting `{bash} -T, --target`

Most projects target a single Shopify theme, but Syncify supports multiple themes and stores using the `{bash} -T` or verbose alias of `{bash} --target` flag in certain modes. You can apply it multiple times per command to specify stores, themes, or both. By default, Syncify will select first-occurence entries when no target flag is provided.

> For a detailed explanation and overview of Syncify targets, you can refer to the [targets](/setup/targets/) documentation section.

# Modes

Target flags are available to modes that perform remote interfacing.

```bash
$ sy watch
$ sy push
$ sy pull
$ sy publish
$ sy delete
$ sy setup
```

# Expressions

Target arguments use special characters for separation. The colon `:` appears either at the end of a store name before a theme name or before a theme name alone. For example:

```bash
$ sy <mode> --target shop-1:dev        # end of store name and before theme name
$ sy <mode> --target :dev              # before theme name in isolation
```

When a theme name is prefixed with a colon by itself, Syncify targets all stores with that theme. Commas `,` allow targeting multiple themes within a store or across stores, as shown below, but this applies only to theme names:

```bash
$ sy <mode> --target shop-1:dev,prod    # end of store name and before theme name
$ sy <mode> --target shop-1,shop-2      # all themes in both shop-1 and shop-2
$ sy <mode> --target :dev,prod          # before theme name in isolation
```
