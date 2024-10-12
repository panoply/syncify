---
title: 'Usage - Metafields'
layout: base
permalink: '/usage/metafields/index.html'
anchors:
  - 'Modes'
---

# Metafields

The `metafields` directory `path` reference is where you can provide **global** JSON metafield files that can be synced to your Shopify store. Metafield sync capabilities provided by Syncify use a simple **directory** > **file** based approach. The sub-directory names represent a metafield `namespace` value and JSON file names contained within represent metafield `key` values.

> Syncify will keep your remote and local metafield references aligned with one another and warn you when local versions do not match remote versions. This will help prevent you from overwriting changes that may have been applied by third-party apps or online within your store.

### Pull Metafields

Syncify provides you with simple interactive prompt based approach for importing pre-existing metafields from your online store. You can optionally choose which metafields you'd like to maintain. Use the `-m` or `--metafields` flag together with the `--pull` flag on the command line to download metafields:

```bash
$ sy --metafields --pull
```

### Merge Metafields

Working with metafields from your local machine may have result in unexpected overwrites if changes were made to remote versions that conflict with local versions. In order to combat this Syncify support **merge** capabilities which can be used to merge changes when metafield modification timestamps differ. Use the `-m` or `--metafields` flag together with the `--merge` flag on the command line perform local and remote alignments.

```bash
$ sy --metafields --merge
```

### Structure

In order to best illustrate how the metafield sync capabilities work it is important that you understand the structure logic. The directory based approach and naming conventions employed are imperative and strict. Syncify wants to prevent irreversible overwrites or deletions from occurring, so please be mindful and wary when using this feature.

1. Metafields will be published to the global `shop` object.
2. Syncify will use the sub-directory names as the metafield
3. `namespace` and the JSON file names contained within each namespace directory are used as the metafield `key` name.

:::: grid row mb-4 ai-center
::: grid col fill-papyrus

##### Input Structure: `{js} { input: 'source' }`

{% raw %}

```liquid
{{ shop.metafields.garment.fits.value }}
{{ shop.metafields.garment.sizes.value }}
{{ shop.metafields.garment.fabrics.value }}
{{ shop.metafields.details.colors.value }}
{{ shop.metafields.details.weight.value }}
```

{% endraw %}

:::
::: grid col-auto

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col

##### Output Structure `{js} { output: 'theme' }`

```treeview
source/
    └── metafields/
        ├── garment/
        │   ├── fits.json
        │   ├── sizes.json
        │   └── fabrics.json
        └── details/
            ├── colors.json
            └── weight.json
```

:::
::::
