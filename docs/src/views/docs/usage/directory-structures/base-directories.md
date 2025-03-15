---
title: 'Directory Structures'
layout: base.liquid
permalink: '/usage/base-directories/index.html'
anchors:
  - 'Base Directories'
  - 'Input → Output'
  - 'Default Structure'
---

# Base Directories

Below is an example of a Syncify theme structure using the defaults. Syncify will assume this base structure when you do not provide any customizations via the CLI or within your syncify config file.

```treeview
/
├── export/             # Theme .zip exports generated using --publish and or --export
├── import/             # Theme downloads imported from stores will be written here
├── source/             # The main directory where all source files are contained
├── theme/              # The distribution directory where source themes are written
└── .env                 # Where store admin api tokens and other secrets exist
```

---

# Input → Output

Syncify expects projects to have an **input** directory path which contains theme **source** files. Files contained within an input directory are written to your defined **output** directory path. The generated output will be reflective of your online store and in most cases you will add the output directory to your `.gitignore` file (because it can always be rebuilt from input).

```treeview
/
├── source/    # The input directory which contains the theme source files
└── theme/     # The output directory which Syncify generates that shopify understands
```

Single directory structures are not a viable approach when building modern and performant Shopify themes. Client-side (front-end) development is not SaaS specific and thus, with the proper tooling, Shopify theme development does not require one to adhere to the imposed approach of Shopify Dawn (via Shopify CLI). The argument for multi-directory architecture rests upon the millions of projects which isolate source ~ distribution variations and appropriate such logic. If you have become accustomed to working from a single directory structure (i.e: Shopify Dawn) it is important that you understand the difference between the **input** and **output** directory approach.

---
