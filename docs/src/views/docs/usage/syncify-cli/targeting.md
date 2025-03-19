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

```bash
Modes:
  $ sy setup                    # Interactive helper for setting up Syncify
  $ sy watch                    # Watches theme for changes and builds theme from source
  $ sy pull                     # Pull prompt, sync remote versions with local (optional glob accepted)
  $ sy push                     # Uploads theme file/s to online store, use together with filter
  $ sy delete                   # Delete theme file/s on online store, use together with filter
  $ sy publish                  # Changes a theme role to main making it the live theme on a store
```

> For a detailed explanation and overview of Syncify targets, you can refer to the [targets](/setup/targets/) documentation section.

---

# Reference

When using the `{bash} -T` (or `{bash} --target`) flag, the provided argument values correspond directly to entries defined within a reference file, typically stored in `package.json`. This file holds a structured configuration that Syncify uses to identify specific stores and their associated themes, allowing you to target them precisely during operations. Each entry links a store name to one or more themes, with each theme tied to a unique theme ID.

##### Targets `package.json`

```json
{
  "syncify": {
    "stores": {
      "shop-1": {
        "dev": 123456789, // Represents the "dev" theme for "shop-1" (default target)
        "prod": 123456789 // Represents the "prod" theme for "shop-1"
      },
      "shop-2": {
        "dev": 1122334455 // Represents the "dev" theme for "shop-2"
      }
    }
  }
}
```

> This structure allows Syncify to recognize `shop-1` and `shop-2` as distinct stores, each with specific themes (`dev` and `prod`) identified by their numeric theme IDs.

# Expressions

Target arguments rely on special characters to define their scope clearly and efficiently. The colon `:` serves as a separator with two key uses: it can appear at the end of a store name to introduce a specific theme name, or it can stand alone before a theme name to target that theme across all stores. Here are detailed examples:

```bash
$ sy <mode> --target shop-1:dev    # Targets the "dev" theme specifically within "shop-1", using its associated theme ID
$ sy <mode> --target :dev          # Targets the "dev" theme across all defined stores (e.g., "shop-1" and "shop-2")
```

When a theme name is prefixed with a colon by itself (e.g., `:dev`), Syncify interprets this as a command to apply the operation to every store containing a theme named "dev". Additionally, commas `,` allow you to specify multiple targets, but this applies exclusively to theme names, not store names. This enables flexible targeting within a single store or across multiple stores. Examples include:

```bash
$ sy <mode> --target shop-1:dev,prod    # Targets both the "dev" and "prod" themes within "shop-1"
$ sy <mode> --target shop-1,shop-2      # Targets all themes defined under "shop-1" and "shop-2"
$ sy <mode> --target :dev,prod          # Targets the "dev" and "prod" themes across all stores where present
```

These expressions provide a concise yet powerful way to direct Syncify’s operations to specific stores, themes, or combinations thereof, leveraging the reference file’s structure.
