<br>
<p align="center">
<a href="https://syncify.sh">
<img src="https://raw.githubusercontent.com/panoply/syncify/3b7839da26b4355943c94ddf93f81e2f41a6a2bf/assets/logo-text.svg"
width="270px">
</a>
</p>
<h1></h1>

Syncify is a specialized tool designed for Shopify theme development. It offers an array of features that significantly enhance productivity, integration and workflow on the Shopify platform. Created to address the mediocrity of OSS (theme dev) offerings from the Shopify team, Syncify delivers a sophisticated, high-performance, and customizable toolkit that streamlines workflows and integrates with modern tooling.

<h4>
  Read Documentation&nbsp;&nbsp;➠&nbsp;&nbsp;https://syncify.sh
</h4>

### Why Use Syncify?

If you are seeking a tool that has considered requirement factors across the modern Shopify Theme Development ecosystem, and would like a solution that produces performance-focused optimizations at the development process level with features designed for the complexities of modern e-commerce, see the below core capabilities offerred by Syncify:

<i><strong>✓&nbsp;&nbsp;<samp>Custom input → output directory structures.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>Supports TypeScript, JavaScript, TSX, and JSX.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>Tailwind, PostCSS, and SASS stylesheet support.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>Terse minification of Markup and Liquid.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>Static pages with Markdown → Markup transformation.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>Metafield, Redirects, and Navigation data management.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>Version Controlled theme distribution and traceability.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>Shared Schemas as a superset implementation.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>Frontmatter controlled liquid level configuration.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>SVG transform and sprite generation processing.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>Multistore and theme parallel synchronization.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>Websocket HOT Reloads with CFH control and morphing.</samp></strong></i><br>
<i><strong>✓&nbsp;&nbsp;<samp>Git-based automations with CI baked integrations.</samp></strong></i><br>

<h1></h1>

### Examples / Themes

The [Syncify Straps](https://github.com/SyncifyCLI) github organization provides a collection of usage examples and starting point themes using Syncify. You can use the command line to generate new projects with the available straps.

### Editor Intergration

For an integrated development experience in your text editor, please consider using the [VSCode Liquid](https://github.com/panoply/vscode-liquid) extension which has built-in support for Syncify. VSCode Liquid is an independent alternative to the Shopify backed extension.

### Getting Help?

Join the [Shopify Developers Discord](https://discord.gg/shopify-developers-597504637167468564) and ask your questions in the **`# syncify`** channel under the **`projects`** tab. Connect with other developers, maintainers, and contributors already using Syncify in their projects or within their agency.

# Installation

You can install Syncify as a development dependency or globally. There are a couple of different versions available, all of which can be consumed via the NPM Registry. Please consider using [pnpm](https://pnpm.js.org/en/cli/install) as your package manager for a faster and better experience with Syncify and NodeJS development. For all releases and available versions refer to **[syncify.sh/releases](https://syncify.sh/releases)** page.

<samp align="center">
<strong>
<br>
<table><tr><td>

  <h3> GLOBAL INSTALL&nbsp;&nbsp;⮂&nbsp;&nbsp;SY CLI BINARY </h3>

Install Syncify globally to make the CLI binary available system-wide so you can use commands anywhere on your computer. The <a href="https://github.com/panoply/syncify/tree/next/packages/config/packages/config">@syncify/config</a> package can be leveraged on a per-project basis along side global installations for configuration file TypeScript support.

<br>
</td></tr></table>
</strong>
</samp>

## Stable Release

The most stable and latest version of Syncify is available for consumption via the [NPM Registry](https://www.npmjs.com/package/@syncify/cli).

```bash
pnpm add @syncify/cli --global
```

## Nightly Release

The nightly releases of Syncify can be installed using the `@next` version tag via NPM, code is on [next](https://github.com/panoply/syncify/tree/next) branch.

```bash
pnpm add @syncify/cli@next --global
```

## Unstable Release

The unstable releases of Syncify can be installed using the `@unstable` version tag via NPM, code is on [unstable](https://github.com/panoply/syncify/tree/unstable) branch.

```bash
pnpm add @syncify/cli@unstable --global
```

# Packages

This repository hosts a collection of sub-packages available for download through the NPM Registry. Each package includes a detailed **readme** that provides comprehensive insights into its specific use cases, functionality, and implementation details. All packages can be used standalone, independently of the Syncify CLI.

- [@syncify/acquire](https://github.com/panoply/syncify/tree/next/packages/acquire)
- [@syncify/ansi](https://github.com/panoply/syncify/tree/next/packages/ansi)
- [@syncify/codeframe](https://github.com/panoply/syncify/tree/next/packages/codeframe)
- [@syncify/codegen](https://github.com/panoply/syncify/tree/next/packages/codegen)
- [@syncify/config](https://github.com/panoply/syncify/tree/next/packages/config)
- [@syncify/glue](https://github.com/panoply/syncify/tree/next/packages/glue)
- [@syncify/hot](https://github.com/panoply/syncify/tree/next/packages/hot)
- [@syncify/json](https://github.com/panoply/syncify/tree/next/packages/json)
- [@syncify/kill](https://github.com/panoply/syncify/tree/next/packages/kill)
- [@syncify/schema](https://github.com/panoply/syncify/tree/next/packages/schema)
- [@syncify/tests](https://github.com/panoply/syncify/tree/next/packages/tests)
- [@syncify/timer](https://github.com/panoply/syncify/tree/next/packages/timer)
- [@syncify/turndown](https://github.com/panoply/syncify/tree/next/packages/turndown)
- [@syncify/types](https://github.com/panoply/syncify/tree/next/packages/types)
- [@syncify/update](https://github.com/panoply/syncify/tree/next/packages/update)
- [@syncify/uws](https://github.com/panoply/syncify/tree/next/packages/uws)

<details>
<summary>
  Config Packages
</summary>
<p>

- [@syncify/eslint-config](https://github.com/panoply/syncify/tree/next/configs/eslint-config)
- [@syncify/prettier-config](https://github.com/panoply/syncify/tree/next/configs/prettier-config)
- [@syncify/stylelint-config](https://github.com/panoply/syncify/tree/next/configs/stylelint-config)
- [@syncify/tsconfig](https://github.com/panoply/syncify/tree/next/configs/tsconfig)

</p>
</details>

# Contributing

Contributions are welcome! This project is a monorepo managed with [pnpm](https://pnpm.js.org/) and [changesets](https://github.com/changesets). Dependencies follow the [workspace protocol](https://pnpm.io/workspaces#workspace-protocol-workspace), ensuring a symlinked structure with pnpm managing NPM registry versions. The [packages](/packages/) directory contains modules consumed by the core [syncify](/syncify/) module. To contribute bug fixes or enhancements, you'll need to fork or clone the entire project. Development is designed for use with [VS Code](https://code.visualstudio.com/), and maintaining consistency within this setup is encouraged.

<details>
<summary>
  Pre-requisites
</summary>
<p>

- [Git](https://git-scm.com/)
- [Node v20^](https://nodejs.org/)
- [Pnpm v9^](https://pnpm.js.org/)
- [VSCode](https://code.visualstudio.com/)

> _The `.vscode` workspace settings include all the necessary configurations for the project, ensuring a seamless development environment. It also provides tailored extension recommendations to enhance productivity and maintain consistency._

</p>
</details>

<details>
<summary>
  Third Parties (optional)
</summary>

<p>

- [Potion Theme](https://marketplace.visualstudio.com/items?itemName=sissel.material-potion)
- [Github Desktop](https://desktop.github.com/)
- [iTerm2](https://iterm2.com/)

> _While not required, if you wish to recreate the environment in which this project is developed then you can install and leverage the above additional third-party tooling._

</p>
</details>

<details>
<summary>
  Installation
</summary>
<p>

- Ensure [pnpm](https://pnpm.js.org/) is installed globally `npm i pnpm -g`
- Leverage `pnpm env` if you need to align node versions.
- Clone this repository `git clone https://github.com/panoply/syncify.git`
- Run `pnpm i` in the root directory
- Run `pnpm build` which will bundle all packages

</p>
</details>

## Development Guide

All packages are compiled using [ESBuild](https://esbuild.github.io/) through [tsup](https://tsup.egoist.sh). You can either cd into any package directory to run commands, or from the workspace root, you can execute pnpm dev. The pnpm dev command initializes development in watch mode and concurrently compiles both the core [syncify](/syncify/) package and the [docs](/docs/). Keep in mind that Syncify is distributed as CommonJS (CJS) but is compatible with ES modules (ESM) as it exports as a CLI Binary.

### Per Package

```bash
pnpm dev                    # Watch and build modes
pnpm build                  # Build mode only (production)
```

> [!NOTE]
> Almost all packages will expose the above commands via `package.json` script, with some exceptions depending on module. The `pnpm build` command however is available within all modules.

### Recursive (Workspace Root)

```bash
pnpm build                  #  Build production bundles for all modules and packages
```

### Targeting (Workspace Root)

```bash
pnpm @docs     <cmd>        # Targets the documentation SSG directory
pnpm @acquire  <cmd>        # Targets the @syncify/acquire acquire config bundle
pnpm @ansi     <cmd>        # Targets the @syncify/ansi CLI enhancement package
pnpm @config   <cmd>        # Targets the @syncify/config configuration package
pnpm @glue     <cmd>        # Targets the @syncify/glue Glue utility package
pnpm @codframe <cmd>        # Targets the @syncify/codeframe Codeframe CLI package
pnpm @codegen  <cmd>        # Targets the @syncify/codegen Codegen generator helper
pnpm @hot      <cmd>        # Targets the @syncify/hot HOT Reloading client
pnpm @json     <cmd>        # Targets the @syncify/json JSON parser and differ
pnpm @kill     <cmd>        # Targets the @syncify/kill process kill package
pnpm @turndown <cmd>        # Targets the @syncify/turndown reversed markdown parser
pnpm @timer    <cmd>        # Targets the @syncify/timer timing utility
pnpm @tests    <cmd>        # Targets the @syncify/tests internal test utility
pnpm @update   <cmd>        # Targets the @syncify/update version check utility
pnpm @uws      <cmd>        # Targets the @syncify/uws uWebsockets repackage
pnpm @cli      <cmd>        # Targets the @syncify/cli package (main package)
```

### GraphQL Introspection and Typings

Syncify does not use Shopify OSS offerrings, you will find zero `@shopify/*` projects in the codebase. Interfacing with the Shopify API is handled with a custom client. The client is extensively typed and the TypeScript definitions are generated using [codegen](https://the-guild.dev/graphql/codegen). The repository comes with definitions and introspection included so there is no need to pull or regenerate.

# Author / Licensing

Syncify was created and is maintained by [Νικολας Σαββιδης](https://github.com/panoply). Shopify has no affiliation with this project and does not fund Syncify; it is a completely independent solution. Choosing to leverage Syncify helps keep these independent projects alive and sends a clear message to Shopify that the community drives innovation.

### Acknowledgements

Special thanks to the talented developers who have contributed to Syncify. This project has been in development for several years, and without these individuals, it wouldn't have progressed this far.

- [Kim Skinner](https://github.com/WolfGreyDev)
- [Taksh](https://github.com/taksh108)
- [Mansedan](https://github.com/webdeveman)
- [David Warrington](https://ellodave.dev)

### Donate / Sponsor

If you are an **individual** looking to express gratitude financially, I would much prefer you donate to your local animal shelter and share the story with me on [X](https://x.com/niksavvidis). If you are a business, agency, or representing an enterprise using Syncify and interested in discussing partnerships, opportunities, or custom solutions, you can reach me via [email](mailto:n.savvidis@gmx.com) or message me on [X](https://x.com/niksavvidis).

### License

The project is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).
