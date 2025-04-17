---
title: 'Quickstart'
layout: base.liquid
permalink: '/quickstart/index.html'
anchors:
  - 'Quickstart'
  - 'Installation'
  - 'Initialize'
  - 'Generating'
  - 'Publishing'
  - 'Development'
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
::: grid col-12 col-md-6 pr-4 mb-5

#### PNPM

```bash
$ pnpm add @syncify/cli -g
```

:::
::: grid col-12 col-md-6 pl-4 mb-5

#### NPM

```bash
$ npm i @syncify/cli -g
```

:::
::: grid col-12 col-md-6 pr-4

#### YARN

```bash
$ yarn add @syncify/cli -g
```

:::
::: grid col-12 col-md-6 pl-4

#### BUN

```bash
$ bun add @syncify/cli -g
```

:::
::::

---

# Initialize

After installing Syncify, use the `sy init` command to initialize a new project. This command analyzes the current directory and guides you through an interactive setup prompt. It's typically used to set up Syncify in existing projects or when migrating from the Shopify CLI. For starting a new project from scratch, use the `sy create` command, detailed below.

:::: grid row mt-5
::: grid col-12 col-md-6 fs-sm pr-5

#### Global Binary 👍

```bash
$ sy init
```

:::
::: grid col-12 col-md-6 fs-sm

#### Local Binary 👎

```bash
$ pnpm sy init
```

:::
::::

> If you execute `sy init` inside an existing theme project that is determined to be using a flat-directory structure, Syncify will complain due to the enforced [hierarchical](/usage/directory-structures/) structure it imposes.

---

# Generating

If you're looking to test things out, you can use Syncify to generate projects from one of the available starting-point [straps](https://github.com/syncifycli/). These straps provide pre-configured themes and usage examples that help developers kickstart their development with Syncify. To generate a new project, we'll use the bare-bones [Dusk Theme](https://github.com/syncifycli/dusk) strap. Run the `create` command along with `"dusk"` and Syncify will create a project based on that strap:

:::: grid row mt-5
::: grid col-12 col-md-6 fs-sm pr-5

#### Global Binary 👍

```bash
$ sy create "dusk"
```

:::
::: grid col-12 col-md-6 fs-sm

#### Local Binary 👎

```bash
$ pnpm sy create "dusk"
```

:::
::::

> Omitting the strap target name (i.e, `"dusk"`) and running `{bash} $ sy create` will provide you with a list of usage examples and themes to select from. All straps are open source and available on [github](https://github.com/syncifycli/).

---

# Publishing

If you've provided Syncify with store access, the `sy create` command would have offered you the option to publish the generated theme directly to your Shopify store. If the theme has already been published, you can proceed with development. However, if you haven't provided store access or published the theme, you'll need to do so before development can start. Use the `publish` command, which will verify store access and guide you through setting up authorization if needed, before moving forward.

:::: grid row mt-5
::: grid col-12 col-md-6 fs-sm pr-5

#### Global Binary 👍

```bash
$ sy publish
```

:::
::: grid col-12 col-md-6 fs-sm

#### Local Binary 👎

```bash
$ pnpm sy publish
```

:::
::::

> When prompted to specify the theme role, select `development` to prevent creating an additional theme or overwriting an existing live theme. For more information and a detailed overview, see the [publishing](/usage/publishing) (usage) guide.

---

# Development

If you've followed the above steps, you can start developing. Depending on how you have set things up, at this point you should have an input directory and output directory located in the root of your project. When developing, you will edit files contained in the `source` directory. The `theme` directory is where source files will be written and it reflects the remote version available in your store.

```treeview
/
├── source/                    # The main directory where all source files are contained
├── theme/                    # The distribution directory where source themes are written
├── .gitignore                # Ignored files for git, includes theme directory and node_modules
├── package.json              # The package.json file for node modules and friends
└── syncify.config.ts         # The configuration file for Syncify
```

#### Basic Commands

Syncify provides an extensive list of commands, all of which you will likely use at some point or another, but the main two are the **build** and **watch** commands.

```bash
$ sy watch     # Watches for changes and syncs them to store
$ sy build     # Build the entire theme from source
```
