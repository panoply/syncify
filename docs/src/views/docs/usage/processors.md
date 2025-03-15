---
title: 'Processors'
layout: base.liquid
permalink: '/usage/processors/index.html'
anchors:
  - 'Processors'
  - 'Single File Configuration'
  - 'Default Options'
---

# Processors

In Syncify, **processors** represent the external tools utilized within [transforms](/usage/transforms) such as SVGO, ESBuild, SASS and others. The `processor` configuration option gives developers control over how these supported _third-party_ modules are set up. Configurations specified in the `processor` section serve as default bundling options for each transform.

This setup allows developers to maintain a centralized control point for all third-party processor operations, eliminating the need for multiple external configuration files within your project's workspace.

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/config'

export default defineConfig({
  // ...
  processor: {
    esbuild: {},    // applied to script transforms
    sass: {},       // applied to style transforms
    postcss: [],    // applied to style transforms
    tailwind: {},   // applied to style transforms
    svgo: {},       // applied to svg transforms
  }
})
```

---

# Single File Configuration

Some third-party tools either require or allow the use of configuration files (e.g., `postcss.config.js`, `tailwind.config.js` etc.). Syncify automatically checks for these configuration files within your project workspace and uses them as default settings for the processors. If an external config file is found and you've also specified custom settings in the processor configuration that differ from Syncify's defaults, these custom settings will override or merge with the options in the external config file.

For instance, if you have a `postcss.config.js` file in your project, then Syncify will detect this file at runtime and use its exported value when processing CSS with PostCSS, setting it as the default for `processor.postcss` options. Below is an example of how we can leverage the `processor` option and eliminate additional config files in our projects workspace.

:::: grid row ai-center my-5
::: grid col fs-sm

<!-- prettier-ignore -->
```js
// postcss.config.js

module.exports = {
  plugins: [
    require('postcss-nested')(),
    require('autoprefixer')()
  ]
};
```

:::
::: grid px-0 col-auto

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col

<!-- prettier-ignore -->
```js
export default defineConfig({
  processor: {
    postcss: [
      require('postcss-nested')(),
      require('autoprefixer')()
    ]
  }
});
```

:::
::::

# Transform Overrides

You can overwrite processor defaults on a per-file basis at the transform level. Each transform exposes a processor property which accepts the same options which will apply an immutable merge with processor defaults. This is helpful when you require file specific transforms.

Take the following code sample, notice how we've passed an SASS override on certain files. In this example the `style.scss` transform will use the `processor.sass` configuration, whereas the the `example.scss` file will override the `processor.sass` defaults and use a different set of configuration options.

<!-- prettier-ignore -->
```js
// syncify.config.ts

import { defineConfig } from '@syncify/cli';

export default defineConfig({
  // ...
  processor: {
    sass: {
      sourcemap: true,
      style: 'compressed',
      include: ['node_modules/'],  // the style.scss include path
    }
  },
  transform: {
    style: [
      {
        input: 'styles/style.scss',
        postcss: true
      },
      {
        input: 'styles/example.scss',
        snippet: true,
        sass: {
          style: 'expanded',     // we override the output style
          include: ['some/dir']  // we override the include path
        }
      }
    ]
  }
});
```

### Usage Proposition

Processors (and transforms) are optional in Syncify and may not fit your use case but there is an added benefit to using them. If you are leveraging HOT reloads or require different outputs be generated, then they are a great help. They also take a lot of the guess work out of bundling, so you can focus on writing code without worrying about bundler configurations.

[Spawn](#spawn) processes are another option available for cases where you require a different complier which is not supported by Syncify, but please note that spawned processes will not apply HOT reloads and execute in child process. Whatever the case may be, it is important you weigh up the usage proposition for your project and determine which works best for you and your development workflow.

### Supported Processors

Syncify provides extendable support with the following build tools:

- [ESBuild](#esbuild)
- [SASS](#sass)
- [PostCSS](#postcss)
- [Tailwind](#tailwind-support)
- [SVGO](#svgo)
