---
title: 'Requirements'
layout: base.liquid
permalink: '/reference/overview/index.html'
anchors:
  - 'Overview'
  - 'Runtimes'
  - 'Operating Systems'
  - 'Language Support'
  - 'Package Managers'
---

# Overview

Syncify is a lightweight tool overall, that is written in [TypeScript](https://typescriptlang.org) and transpiled to [ECMAScript 6](https://262.ecma-international.org/6.0/). It has a total of **23** dependencies, with **11** of these being dormant (loaded on-demand only when explicitly required). Dormant dependencies remain inactive and are not loaded into the runtime cache unless specific project features necessitate their use, at which point they are dynamically imported.

The core distribution size of Syncify is approximately `{js} 400kb` (excluding dependencies), with an average runtime of under `{js} 100ms`, depending on the operation, with runtime starts for operations where request tasks (i.e, interfacing with the Shopify API) concluding in `{js} 300ms` to `{js} 900ms` but this is subjective and speculative. For optimal performance, it is recommended that Syncify is installed globally as outlined in the [Installation](/setup/installation/) Guide and using [pnpm](https://pnpm.js.org/en/cli/install) as the package manager. Below you'll find compatibility and version requirements. This information is subject to change, and it is encouraged that users report any incompatibility or support issues via the [Github Repository](https://github.com/panoply/syncify/issues)

# Runtimes

<div class="col-12 mt-3 bd rd-2 px-4 mb-5">

:: row
:: col pr-5 br ll-check pt-4

#### Node

Compatible v20^

::
:: col pr-5 br ll-check pt-4

#### Bun

Compatible v1^

::
:: col pr-5 ll-check pt-4

#### Deno

Uncompatible

::
::

</div>

# Operating Systems

<div class="col-12 mt-3 bd rd-2 px-4 mb-5">

:: row
:: col pr-5 br ll-check pt-4

#### MacOS

Fully supported.

::
:: col pr-5 br ll-check pt-4

#### Windows

Partial support.

::
:: col pr-5 ll-check pt-4

#### Linux

Partial support.

::
::

</div>

# Language Support

<div class="col-12 mt-3 bd rd-2 px-4 mb-5">

:: row
:: col pr-5 br ll-check pt-4

#### JavaScript

Fully supported.

::
:: col pr-5 br ll-check pt-4

#### TypeScript

Fully supported.

::
:: col pr-5 ll-check pt-4

#### ESM + CJS

Fully supported.

::
::

</div>

# Package Managers

<div class="col-12 mt-3 bd rd-2 px-4 mb-5">

:: row
:: col pr-5 br ll-check pt-4

#### PNPM

Fully supported v8^

::
:: col pr-5 br ll-check pt-4

#### NPM

Fully supported v8^

::
:: col pr-5 ll-check pt-4

#### Yarn

Fully supported v1^

::
::

</div>

---
