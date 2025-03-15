---
title: 'Quickstart'
layout: base.liquid
permalink: '/quickstart/index.html'
anchors:
  - 'Quickstart'
  - 'Key Features'
  - 'Developer Driven Innovation'
  - 'Rationale'
---

# Quickstart

For experienced developers or those who prefer to jump right in, getting started with a Syncify powered project takes only a few straightforward steps. While it is strongly encouraged that you review the documentation for a more in-depth understanding, Syncify is designed to be intuitive and developer-friendly. Whether you're tackling a new project or integrating Syncify into an existing workflow, the API and extensive type definitions make it easy to adapt and evolve without a steep learning barrier.

# Pre-requisites

Before going ahead with the quickstart, please ensure you have all the following tooling installed on your system:

1. **[Git](https://git-scm.com/) v2.2**
2. **[Node](https://nodejs.org/) v20^**
3. **[Pnpm](https://pnpm.io/) v9.1^**

> The preferred package manager to use with Syncify is [pnpm](https://pnpm.io/) however it is not strictly imposed. Syncify will work with [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) and [bun](https://bun.sh/) but best usage please use and consider pnpm for all projects.

<br>

# Installation

If you haven't already installed Syncify, proceed with a global installation. Although installing Syncify on a per-project basis is an option, global installation is generally preferred. This approach avoids the need to prefix the binary with your package manager each time you use them. For the purpose of this quickstart guide, we will install Syncify globally:

:::: grid row mt-5
::: grid col-12 col-md-5 fs-sm

```bash
$ pnpm add @syncify/cli@latest -g
```

:::
::::

---

# Authorize

Syncify needs access to your Shopify store(s). You can grant this access either on a per-project basis using a `.env` file, or through the [Syncify Keychain](/usage/keychain/). If you wish to set up store access at a later stage, you can skip ahead to the [Initialize](#initialize) step below. For this quickstart walkthrough, we'll use the keychain approach. This method securely stores and encrypts access tokens for your stores on your device, allowing reuse across multiple projects.

:::: grid row mt-3
::: grid col-12 col-md-5 fs-sm

#### CLI

```bash
$ sy keychain
```

:::
::::

> The [authentication](/setup/authentication/) guide can assist you in obtaining an API Token from Shopify. The interactive prompt will check these tokens and report back if a connection cannot be established.

---

# Initialize

#### Cli

:::: grid row mt-3
::: grid col-12 col-md-5 fs-sm

```bash
$ sy init
```

:::
::::

# Generate

Syncify can generate projects using one of the available starting-point [straps](https://github.com/syncifycli/). These straps provide pre-configured themes and usage examples that help developers kickstart their development with Syncify. To generate a new project, we'll use the bare-bones [Dusk Theme](https://github.com/syncifycli/) strap. Run the `create` command along with `"dusk"` and Syncify will create a project based on that strap:

:::: grid row mt-3
::: grid col-12 col-md-5 fs-sm

#### Cli

```bash
$ sy create "dusk"
```

:::
::::

> Omitting the strap target name (i.e, `"dusk"`) and running `{bash} $ sy create` will provide you with a list of usage examples and themes to select from. All straps are open source and available on [github](https://github.com/syncifycli/).

---

# Publish

If you've provided Syncify with store access, the `create` command would have offered you the option to publish the generated theme directly to your Shopify store. If the theme has already been published, you can proceed with development. However, if you haven't provided store access or published the theme, you'll need to do so before development can start. Use the `publish` command, which will verify store access and guide you through setting up authorization if needed, before moving forward.

:::: grid row mt-3
::: grid col-12 col-md-5 fs-sm

#### Cli

```bash
$ sy publish
```

:::
::::

> When prompted to specify the theme role, select `development` to prevent creating an additional theme or overwriting an existing live theme. For more information and a detailed overview, see the [publishing](/usage/publishing) (usage) guide.

---

# Developing

If you've followed the above steps, you can start developing, but before we begin let's quickly go over the theme, some basic commands and usage. The first thing you'll notice in Syncify is that themes do not use flat directory structures and for developers migrating from the Shopify CLI this might feel disorientating, but have some faith compadre.

#### Dusk Theme

When developing, you will edit files contained in the `source` directory. The `theme` directory is where source files will be written and it reflects the remote version available in your store. Dusk defaults to using a familiar structure that mimics the standard (flat) theme structure, with the only different being that you'll find files within the `source` directory.

```treeview
/
├── source/                              # The main directory where all source files are contained
├── theme/                               # The distribution directory where source themes are written
├── .gitignore                      # Ignored files for git, includes theme directory and node_modules
├── package.json                  # The package.json file for node modules and friends
└── syncify.config.ts         # The configuration file for Syncify
```

#### Basic Commands

Syncify provides an extensive list of commands, all of which you will likely use at some point or another, but the main two are the **build** and **watch** commands.

```bash
$ sy watch  # Watches for changes and syncs them to store
$ sy build  # Build the entire theme from source
```
