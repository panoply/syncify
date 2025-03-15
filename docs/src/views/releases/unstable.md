---
permalink: '/releases/unstable/index.html'
layout: base.liquid
title: 'Syncify Next'
navbar: 'releases'
---

# Unstable

Beyond the **stable** and **next** releases, Syncify also maintains an unstable release on the [NPM registry](#). This version is primarily for collaborators and is used to test proof-of-concept features. It's not recommended for general use due to its inherent instability; in fact, it will likely not work at all in most scenarios. Sticking with the **latest** or **next** versions is advisable unless reasoning requires otherwise.

:::: grid row mt-5
::: grid col-12 col-md-6 pr-4 mb-5

#### Development Dependency

```bash
$ pnpm add @syncify/cli@unstable -g
```

:::
::: grid col-12 col-md-6 pl-4 mb-5

#### Global Dependency

```bash
$ pnpm add @syncify/cli@unstable --save-dev
```

:::
::::

---
