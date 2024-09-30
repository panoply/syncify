---
title: 'Transforms'
layout: base.liquid
permalink: '/usage/spawn/index.html'
anchors:
  - 'Spawn'
  - 'Overview'
  - 'CLI'
  - 'Configuration'
---

# Spawn

The spawn option accepts a **key** > **value** list of commands (i.e: scripts) which can be used when running in **watch** (`--watch`) or **build** (`--build`) modes. The Spawn configuration option allows you to leverage additional build tools and have them execute in parallel with Syncify as child processes.

> Spawned processes allow you use your preferred asset bundlers such as [Rollup](#), [Webpack](#), [Gulp](#) and many more without having to run multiple npm-scripts.

---

# Overview

There are 2 available modes from which you can trigger a spawned process. When a process is spawned in `watch` mode it will run along side Syncify in parallel and execute sequentially in the order of which each spawn is defined. You need to provide any --flags your command (build tool or bundler) requires when running. Spawning a process in `build` mode will trigger spawned commands only 1 time, so it is here where you would provide the compile-only or build-only command, ie: not using watch flags/arguments.

The Syncify **build** mode re-builds the entire theme and you might choose to run this mode using the Syncify `--prod` flag, if you require context of the environment, mode or action taking place within spawned config files, then take a look at the available [Utilities](#utilities) which Syncify exposes to help conditionally load plugins or trigger different build types in accordance with the Syncify execution cycle.

### CLI

```bash
--spawn <name>   # spawn targeting
-s <name>
```

### Configuration

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({

    // ...

    spawn: {
      build: {},
      watch: {}
    }
  }
})
```

# Usage

In most situations you will leverage the spawn option to compile something like TypeScript or JavaScript but it is important to note that this capability is not specific to these assets types. Syncify is using [cross-spawn](https://www.npmjs.com/package/cross-spawn) under the hood to help negate any cross-platform issues that may arise. Below are a couple examples where we spawn up 2 well known JavaScript bundlers and lastly we illustrate how to spawn multiple processes.

> All stdout/stderr/stdio from spawned processes will be piped through and intercepted by Syncify, which might result in output being stripped of color.

### Rollup Example

If you are processing JavaScript asset files using the [Rollup](https://rollupjs.org/) bundler you can spawn build and watch processes by providing the rollup commands to each mode accordingly. Rollup is a fantastic choice for handling `.js` files. In this example, it is assumed that a `rollup.config.js` file is located in the root of your project.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({
    spawn: {
      build: {
        rollup: 'rollup -c'
      },
      watch: {
        rollup: 'rollup -c -w'
      }
    }
  }
})
```

### Webpack Example

If you are processing JavaScript asset files using the [Webpack](https://webpack.js.org/) bundler you can spawn build and watch processes by providing the webpack commands to each mode accordingly. You will need to be using the [Webpack CLI](https://github.com/webpack/webpack-cli) module to ensure a successful spawn is triggered.

> Notice how we also provide the `--color` flag in the spawn. If you omit this flag then the webpack logs will be printed to the CLI without colors, when using webpack you should provide this flag.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({
    spawn: {
      build: {
        webpack: 'webpack --color'
      },
      watch: {
        webpack: 'webpack --watch --color'
      }
    }
  }
})
```

### Multiple Processes

Though it is unlikely you'd ever need to include 2 different JavaScript bundlers in a project there is nothing stopping you from doing such a thing. For the sake of brevity, the below example illustrates how we can execute multiple spawned child processes to run in parallel with Syncify. Notice how we have also included an additional **gulp** spawn in `build` and `watch` modes. Syncify will trigger these processes in sequentially order, Rollup (1), Gulp (2) and Webpack (3).

> Aside from attempting to spawn Syncify itself, there is no limitation or restrictions imposed on what you choose to run along side Syncify.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({
    spawn: {
      build: {
        rollup: 'rollup -c',
        webpack: 'webpack --color',
        gulp: 'gulp watch-task'
      },
      watch: {
        webpack: 'webpack --watch --color',
        rollup: 'rollup -c -w',
        gulp: 'gulp watch-task'
      }
    }
  }
})
```
