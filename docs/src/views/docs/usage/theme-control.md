---
title: 'Usage - Theme Control'
layout: base
permalink: '/usage/theme-control/index.html'
anchors:
  - 'Theme Exports'
prev:
  url: '/usage/prompts/'
  title: 'Prompts'
next:
  url: '/usage/config-files/'
  title: 'Config Files'
---

# Theme Control

Shopify requires themes to be uploaded to stores in a compressed `.zip` file format. The `push` command in Syncify facilitates this by generating a `.zip` archive of your theme, which is useful for manual uploads, backups, or sharing. Theme exports are particularly handy as it gives developers control over when and how their theme is packaged, separate from the automatic export operation which occurs when [publishing themes](/usage/publishing-themes/).

# References

```bash
sy themes
```

---

# Importing

```bash
sy import
```

---

# Exporting

To use this command, type syncify export followed by any optional parameters. You can specify an output directory with -o or --output and a custom name for your zip file with -n or --name. If no options are provided, the file will be saved in the current directory named theme*export*[timestamp].zip.

```bash
sy export
```

---

# Publishing

1. Version Bump
2. Build Theme
3. Export .zip
4. Publish Theme to store
5. Push version .zip to git versions branch

```bash
sy publish
```
