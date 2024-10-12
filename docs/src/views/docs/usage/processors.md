---
title: 'Processors'
layout: base.liquid
permalink: '/usage/processors/index.html'
anchors:
  - 'Transforms'
  - 'Supported Files'
  - 'Default Options'
---

# Processors

In Syncify, **processors** refer to the external tools used in [Transforms](#transform) (i.e: SVGO, ESBuild SASS etc). The `processors` configuration option provides developers a point of control for configuring these (supported) _third party_ modules. The configurations defined in processors will used as the defaults bundling options of each transform and allows developers to retain a single point of control from which all _third party_ processor operations will refer, this saves you having to include multiple external config files in your projects workspace.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({

  // ...

  processors: {
    json: {},       // applied to json transforms
    esbuild: {},    // applied to script transforms
    sass: {},       // applied to style transforms
    postcss: [],    // applied to style transforms
    tailwind: {},   // applied to style transforms
    svgo: {},       // applied to svg transforms
    sprite: {},     // applied to svg transforms
    sharp: {},      // applied to image transforms
  }
})
```

> Using processors requires installing the relative module you'd like to leverage. This is an opt-in capability.

### External Config Files

Some third party tools allow (or require) config file usage (e.g: `postcss.config.js`, `tailwind.config.js` etc etc). Syncify will check for the existence of configuration files in the workspace and use them as the processor defaults. In situations where an external config file is detected and you've defined custom `processor` settings which differ from the Syncify defaults then options of the external config will overwritten (or merged) by those defined on `processor` configuration.

Say you're using a `postcss.config.js` file to provide a couple of plugins in your project, for example:

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

Syncify will automatically detect and digest this file at runtime. It will use the export value when processing CSS with PostCSS and will consider it the **default** value, assigning it to `processors.postcss`. Instead of providing a `postcss.config.js` file, you _could_ instead just pass this to the **postcss** processor option, for example:

<!-- prettier-ignore -->
```js
// syncify.config.ts

import { defineConfig } from '@syncify/cli';

export default defineConfig({
  // ...
  processors: {
    postcss: [
      require('postcss-nested')(),
      require('autoprefixer')()
    ]
  }
});
```

### Transform Overrides

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
- [Sprite](#sprite)
- [Sharp](#sharp)
