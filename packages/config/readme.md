<strong align="center">
<code>

!! ATTENTION - PLEASE READ !!

This module is intended for users leveraging JavaScript or TypeScript configuration files with global installations of the Syncify CLI. Developers using project installations do not require this package.

</code>
</strong>

# @syncify/config

This utility provides a project-level `defineConfig` function specifically for use within `syncify.config.js` (or `.ts`) configuration files. It is made available for users working on Shopify themes using global [Syncify CLI](https://syncify.sh) installations.

### Why?

Globally installed Node packages are only available as CLI binaries. If you are using `.js` or `.ts` configuration files to define per-project settings for Syncify, global installations of the module will prevent TypeScript features from working at the project-level. This module patches that limitation by exposing the `defineConfig` utility in isolation.

### Installation

Please ensure you have global installation of [@syncify/cli](https://github.com/panoply/syncify) available on your system. If you are using a local installation of the CLI (i.e, within your `devDependencies` or `depedencies` list), you already have access to the `defineConfig` utility and you do not need this module.

```bash
pnpm add @syncify/config -D
```

# Usage

The module exposes a `defineConfig` named export function and `env` reference model which you can use within you `syncify.config.js` or `syncify.config.ts` file. This is indentical to the `defineConfig` and `env` named export available within [@syncify/cli](https://github.com/panoply/syncify). package.

<!-- prettier-ignore -->
```ts
import { defineConfig, env } from '@syncify/config';

env.dev    // boolean
env.prod   // boolean
env.watch  // boolean

export default defineConfig({
  hot: {},
  log: {},
  clean: true,
  editor: 'vscode',
  input: 'source',
  output: 'theme',
  config: '.',
  paths: {},
  transform: {},
  processor: {},
  vc: {}
})
```

> **As mentioned several times in this readme, those who have local installs of [@syncify/cli](https://github.com/panoply/syncify) (i.e, it exists in your projects `devDependencies` object) do not need to install this package. You can access the same `defineConfig` named export within the `@syncify/cli` module.**

# Contributing

This package is designed for usage within [Syncify](https://syncify.sh) and version increments are applied in automation. Contributions are not accepted unless they pertain to the core Syncify module. If contributions fall into that category, fork the entire Syncify project.
