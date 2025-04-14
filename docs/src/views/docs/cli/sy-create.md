---
title: 'CLI - sy create'
layout: base
permalink: '/cli/sy-create/index.html'
---

# `sy create`

The `sy create` command, available in **global** Syncify installations, initiates a project generator prompt for starting new projects. It creates a theme project on your device, providing a foundation for development by automating setup tasks like credential linking and dependency installation. Ideal for bootstrapping new Shopify themes, it streamlines the initial configuration process.

```bash
$ sy create               # Launches prompt for strap or theme import selection
$ sy create <strap>       # Generates project from specified strap, bypassing prompt
```

This create command supports cloning example projects and themes from the [Syncify Straps](https://github.com/SyncifyCLI) repository or importing existing themes from Shopify stores. When run without arguments, it offers an interactive prompt to choose between strap-based creation or theme importation. Specify a strap name to skip the selection and directly generate a project from that strap.

---

# `{bash} sy create <strap>`

The `sy create` command accepts the following positional arguments.

```bash
Themes:
  $ sy create dawn               # Shopify Dawn using Syncify
  $ sy create dusk               # Blank starting point theme using Syncify
  $ sy create silk               # Not yet available

Examples:
  $ sy create using-metafields   # Dusk theme strap showcasing metafield sync usage
  $ sy create using-pages        # Dusk theme strap showcasing page sync usage
  $ sy create using-paths        # Dusk theme strap showcasing custom structures usage
  $ sy create using-rename       # Dusk theme strap showcasing rename paths usage
  $ sy create using-sass         # Dusk theme strap showcasing CSS transforms with SASS
  $ sy create using-schema       # Dusk theme strap showcasing Shared Schema usage
  $ sy create using-tailwind     # Dusk theme strap showcasing CSS transforms with Tailwind
  $ sy create using-terser       # Dusk theme strap showcasing terse distribution
  $ sy create using-typescript   # Dusk theme strap showcasing JavaScript transform of TypeScript
```

> Use the positionals to quickly clone one of the available examples or themes from the [Syncify Straps](https://github.com/SyncifyCLI) repository.

---

# `{bash} sy create --flags`

The `sy create` command accepts one optional flag to modify its behavior. This is particularly useful for understanding functionality, syntax, or troubleshooting without running the command itself.

:::: grid row mt-2 mb-5
::: grid col-12 col-md-11 fs-sm

{% include './flags/--help.md' %}

:::
::::
