---
title: 'Remote Bindings'
layout: base.liquid
permalink: '/usage/remote-bindings/index.html'
anchors:
  - 'Remote Bindings'
---

# Remote Bindings

When attempting to carry-out a sync operation, discrepancies can arise between remote and your local versions. These mismatches often occur due to changes made through the Theme Customizer, which modifies `.json` files in your theme, or other customizations within the store and in situations where a local version is not aligned, this can result in unexpected overwrites ocurring.

To address this, **Remote Bindings** help maintain alignment between local and remote theme and store-related files. If a remote theme resource is newer or differs from your local version, Syncify will prompt you before proceeding with any overwrites when performing sync operations to ensure changes are managed carefully.

# Usage

There are a couple of different methods you can leverage to achieve alignment with remote versions. We can execute remote binding operations pre-emptively before we begin developing in watch mode or preparing to publish/sync to a store.

```bash


```

First, let's look at how we'd carry out the remote binding operations in a controlled state using the `--pull` flag. This is _typically_ going to be the safest approach to local alignment.

- Templates
- Settings
- Locales
- Metaobjects
- Pages
- Metafields
- Redirects
