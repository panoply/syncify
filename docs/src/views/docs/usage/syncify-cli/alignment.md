---
title: 'Alignment'
layout: base.liquid
permalink: '/usage/alignment/index.html'
anchors:
  - 'Alignment'
  - 'Assets'
  - 'Using the align flag --align'
  - 'Others'
  - 'Programmatic Control'
---

# Alignment

In real-world Shopify theme development, merchants often rely on the Shopify theme customizer to tweak settings, update content, and adjust layouts through a web interface. These changes primarily modify JSON-based files in a theme structure, leaving source files like `.liquid` untouched by most merchants.

If your theme is developed using Syncify, it's typically distributed in a terse, optimized format. This approach reduces the size of markup files and helps prevent changes from being applied outside your controlled development workflow. The terse structure in `.liquid` files is intentional, Syncify discourages merchants from directly modifying source files, steering them toward the theme customizer for adjustments instead.

You might wonder why syncify takes this stance. Consider a parallel with a company like Apple: when you buy one of their devices, it’s designed to be sleek and functional, but not easily opened or altered without specialized tools or a technician. Similarly, syncify streamlines theme files to maintain integrity and consistency, ensuring that updates happen in a predictable, developer-managed way rather than through ad-hoc edits that could break functionality or styling.

---

# Using the align flag `{bash} --align`

The `{bash} --align` flag enables targeted synchronization by performing a partial pull on a subset of `.json` files from the Shopify store when used with modes that interface remotely. It aligns your local copies with changes made via the theme customizer, ensuring your local environment matches the remote state for these specific files. Unlike a full pull, which downloads all theme files, `{bash} --align` skips `.liquid` files and works faster by targeting only JSON subsets contained in the following directories:

- `sections/`
- `locales/`
- `templates/`
- `templates/customers/`
- `templates/metaobject/`
- `config/`

Developers should use the `--align` flag when they are certain that source files (e.g., `.liquid` files) have not been modified remotely. Given `Syncify` will distribute terse and inject comments discouraging theme editor use, this is often a reasonable assumption for customizer-only updates. The flag offers a quick, lightweight way to sync JSON data, keeping environments consistent without disrupting your local development work.

> If `.liquid` files are altered remotely, bypassing terse structure or annotations, use `{bash} sy pull` with `{bash} --merge` instead for a full pull that merges all theme files that differ from local versions.

---

# Available Modes

The `--align` flag is available in the following modes. In most cases, you'll apply alignment when invoking watch:

```bash
$ sy watch   --align
$ sy pull    --align
$ sy push    --align
$ sy publish --align
```
