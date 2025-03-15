# @syncify/acquire

Resolves ESM and CJS config files. Based on [Bundle Require](https://github.com/egoist/bundle-require) by [egoist](https://github.com/egoist), performs identical resolution with minor differences for appropriation and usage in the [Syncify CLI](https://syncify.sh). Supports the following extensions and file types:

- `.ts`
- `.js`
- `.cjs`
- `.mjs`

### How this differs from bundle-require?

Bundle require performs some additional analysis that I did not need along with applied logic which Syncify will have already obtained before calling acquire, this runtime is more effecient. The main differences is that this variation does not perform `package.json` analysis nor does not provide `.tsx` or `.jsx` support. Module resolution is applied on the `thenable`. The return object are exposed as getters and lastly, resolve issues will throw custom errors which are an `AcquireError` instance.

# Installation

Peer depedency on [ESBuild](https://esbuild.github.io).

```bash
pnpm add @syncify/acquire -D
```

# Usage

The module itself can be used in isolation in any node.js project, despite being design for usage within Syncify CLI. Similar configuration and setup bundle-require, though the following methods and options are provided.

<!-- prettier-ignore -->
```ts
import { acquire, $import, $tsconfig, $require } from '@syncify/acquire';

await acquire({

  file: '/path/to/syncify.config.ts',  // Required (or whatever file)

  cwd: process.cwd(),                  // Optional
  type: 'module' | undefined,          // Optional
  named: undefined,                    // Optional
  preserve: false,                     // Optional
  tsconfig: '/path/to/tsconfig.json',  // Optional

  external: [],                        // Optional
  extenalNodeModules: [],              // Optional
  noExternal: [],                      // Optional

  onError: (errors) => [],             // Optional - Bundle errors (if any)
  onWarning: (errors) => [],           // Optional - Bundle warnings (if any)
  onRebuild: ($module) => $module      // Optional - Bundle Module

})

acquire.isWatching: boolean;           // Whether or not acquire is watch file for changes

```

> The module is throughly typed and annotated with JSDocs comment descriptions, which will describe each option and method in good detail.

### Practical Usage

The most basic usage is as follows:

```js
import { acquire } from '@syncify/acquire';

const config = await acquire({
  file: '/path/to/syncify.config.ts',
  onError: errors => console.error(...errors)
});

config; // Returns null is errors or module itself
```
