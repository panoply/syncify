---
title: 'CLI - sy build'
layout: base
permalink: '/cli/sy-build/index.html'
---

# `sy build`

The build command runs Syncify in **build** mode. In this mode, Syncify processes files from the specified **input** directory and generates an organised theme structure in the **output** directory, formatted to comply with Shopify’s requirements. This command is designed for creating a complete, deployable theme package from your source files, ensuring compatibility with Shopify’s theme ecosystem.

```bash
$ sy build                       # Run build mode
$ sy build --flags               # Flags are optional
$ sy build <transform>           # Run transform specific build
$ sy build <transform> --flags   # Run transform specific build with flags
```

---

# `{bash} -b, --build`

In some instances you may require pre-build functionality. Say, for example you want to upload your local theme to a store. This can be done by first running `sy build` and then `sy push` but you may prefer that such an operation be carried out in a single command line argument. The `--build` (or `-b`) flag is available to the following modes:

```bash
$ sy watch    --build           # Available in watch mode
$ sy push     --build           # Available in push mode
$ sy pack     --build           # Available in pack mode
$ sy publish  --build           # Available in publish mode
```

---

# `{bash} sy build <transform>`

You can provide [Transform](/usage/transforms/) targets to `sy build` and have Syncify perform build operations on a specific file type.

```bash
$ sy build script             # Run build on JavaScript/TypeScript
$ sy build style              # Run build on CSS/SASS or Tailwind
$ sy build svg                # Run build on SVG/Sprites transform
$ sy build json               # Run build on JSON specific files
$ sy build liquid             # Run build on Liquid files
```

---

# `{bash} sy build --flags`

The `sy build` command accepts several flags that allow you to customize its behavior in **build** mode. Certain flags can alter how Syncify processes file modifications.

:::: grid row mt-2 mb-5
::: grid col-12 col-md-9 fs-sm

{% include './flags/--target.md' %}

{% include './flags/--filter.md' %}

{% include './flags/--clean.md' %}

:::
::::
