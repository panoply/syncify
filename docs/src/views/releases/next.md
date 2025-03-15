---
permalink: '/releases/next/index.html'
layout: base.liquid
title: 'Syncify Next'
navbar: 'releases'
---

# Next

For developers eager to experiment with upcoming features before they reach stable status, Syncify offers **Nightly** releases tagged as `@next` on the [NPM Registry](#). This version might include pre-release features or critical bug fixes not yet available in the **stable** release. The `@next` releases are based on the [next](https://github.com/panoply/syncify/tree/next) branch in the Syncify GitHub repository, where you can track code changes and commit history.

:::: grid row mt-5
::: grid col-12 col-md-6 pr-4 mb-5

#### Development Dependency

```bash
$ pnpm add @syncify/cli@next -g
```

:::
::: grid col-12 col-md-6 pl-4 mb-5

#### Global Dependency

```bash
$ pnpm add @syncify/cli@next --save-dev
```

:::
::::

> These nightly builds available via `@next` are meant for those who want to stay ahead with development but the release is not considered stable, and caution is advised before usage. This version will undergo frequent changes, which might include undocumented breaking changes, so please consider adoption carefully.

---
