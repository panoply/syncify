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

Shopify theme development, while streamlined by tools like Syncify, occasionally demands functionalities that extend beyond its built-in capabilities. For these instances, the `spawn` option allows concurrent execution during `build` and/or `watch` phases alongside Syncify as child processes. This ensures that additional scripts, third-party tools, or even features from the official Shopify CLI can be integrated, rather than executed in isolation.

# Options

In the context of Syncify, there are two operational modes from which you can initiate a spawned process. In `watch` mode, the spawned process operates concurrently with Syncify, executing commands in the sequence they are defined. It's important to include any necessary flags or arguments with these commands so they run correctly alongside Syncify's monitoring activities.

When a process is spawned in `build` mode, it triggers the execution of defined commands just once. This mode is ideal for commands focused on compilation or a one-time build process, where you might not need ongoing monitoring. When you're running in `build` mode, Syncify re-builds the entire theme, which could be particularly useful when preparing for production using the `--prod` flag. If your spawned processes need to adapt based on the environment or the specific action Syncify is performing, you can leverage Syncify's spawn utilities. These utilities allow for conditional loading of plugins or the execution of different build types, aligning with Syncify's current operational phase.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({
    spawn: {
      build: {}, // Build mode, key is process name and value is command
      watch: {}  // Watch mode, key is process name and value is command
    }
  }
})
```

# Example Usage

In most cases, you'll use the `spawn` option to compile assets like TypeScript or JavaScript, but it's important to note that this capability isn't limited to those file types. Let's create a couple of spawns to demonstrate how to take full advantage of this feature. For simplicity, in this example we'll use two popular JavaScript bundlers [Rollup](https://rollupjs.org/) and [Webpack](https://webpack.js.org/).

> All stdout, stderr, and stdio from spawned processes will be piped through Syncify, which may result in output losing its color formatting. There are workarounds for this, sometimes its merely a matter of passing an additional flag.

First, let's start with [Rollup](https://rollupjs.org/) and assume that a `rollup.config.js` file is located in the root our project. We want to have Rollup spawn for `build` and `watch` processes and thus we will pass the appropriate Rollup commands to each mode, in your `syncify.config` file we will add the following:

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

Next, lets add [Webpack](https://webpack.js.org/). We need to do a little bit extra for Webpack and install the [Webpack CLI](https://github.com/webpack/webpack-cli) module as Webpack does not have CLI capabilities available out of the box, so after doing that just like we did with Rollup, let's have also have Webpack spawn for both `build` and `watch` processes by including the relative commands:

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

> We also include the `--color` flag to retain colored output in the CLI. If this flag is omitted, Webpack logs will be printed without color.

While it's uncommon to use two different JavaScript bundlers in a single project, we are not going to focus on the irregularities here, as strange as it might be. Aside from attempting to spawn Syncify itself, there is no limitation or restrictions imposed on what you choose to run along side Syncify. The main takeaway is that there's nothing preventing you from doing something like this, the tool will not judge you. Let's have a look at how our configuration looks with both the Rollup and Webpack spawns defined:

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({
    spawn: {
      build: {
        rollup: 'rollup -c',
        webpack: 'webpack --color',
      },
      watch: {
        webpack: 'webpack --watch --color',
        rollup: 'rollup -c -w',
      }
    }
  }
})
```
