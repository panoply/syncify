---
permalink: '/releases/latest/index.html'
layout: base.liquid
title: 'Syncify Releases'
navbar: 'releases'
---

# v0.0.1-rc.1

Syncify adheres to the principles of [Semantic Versioning](https://semver.org/), which ensures that version numbers clearly indicate the nature of changes in each release. Syncify's journey started with an initial release candidate at `v0.0.1-rc.1`, marking the beginning of official releases while considering all prior beta versions as both incompatible and highly unstable. When you install Syncify from the [NPM Registry](https://www.npmjs.com/package/@syncify/cli), you're automatically using the latest version, which represents the most stable release suitable for general use.

:: row mt-5
:: col-12 col-md-6 pr-4 mb-5 fs-sm

#### Global (recommended)

Install Syncify as a global dependency for optimal usage.

```bash
$ pnpm add @syncify/cli@latest -g
```

::
:: col-12 col-md-6 pl-4 mb-5 fs-sm

#### Per-Project

Optionally install as a development depdendency if you prefer.

```bash
$ pnpm add @syncify/cli@latest --save-dev
```

::
::

---
