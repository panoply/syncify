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

In real-world Shopify theme development, merchants often rely on the Shopify theme customizer to tweak settings, update content, and adjust layouts through a web interface. These changes primarily modify JSON-based files in a theme structure. The `{bash} --align` flag facilitates **remote** ⥂ **local** merges of JSON files which are subject to auto-generated changes applied from the online store.

{% include 'include/video', video: 'hot-cli-align', height: 450 %}

> In the above screener, It takes Syncify **8 seconds** to perfoms a full alignment + merge and then begin watching with [HOT](/usage/hot-reloading/) enabled. The same operation/s if performed by the Shopify CLI would take close to **60 seconds** complete.

#### Performance Focused

Syncify alignments are more than **4x** faster than the equivalent operation performed by the Shopify CLI. Syncify can efficiently power through the entire alignment process, executing requests, reads, diffs, formats and merges in the same amount of time it takes the Shopify CLI to fumbles through initiating a single fetch.

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
sy watch   --align
sy pull    --align
sy push    --align
sy publish --align
```
