# @syncify/hot

HOT Reload client used to perform HOT and Live Reloading in [Syncify](https://syncify.sh). This module will be injected within themes during Runtime evaluation and is done so in a dynamic manner using the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). It's unlikely you'll ever need this module in isolation as Syncify will automatically expose the instance for you.

# Usage

The module is injected after page load and `connect()` is automatically invoked. You can interface with module if you require more custom operations. The below methods are exposed.

```ts
// INIT
window.syncify.connect(/* options */);

// STATUS
//
window.syncify.isReady: boolean
window.syncify.isConnected: boolean;

// RELOADS
//
window.syncify.assets(): void;
window.syncify.reload(): void;
window.syncify.refresh(): void

// SECTIONS
//
window.syncify.sections.get()
window.syncify.sections.list()
window.syncify.sections.load()

// LABEL
//
window.syncify.style.parent({ /* CSS */ });
window.syncify.style.label({ /* CSS */ });
```

# Contributing

This package is written to the root directory of the Syncify distributed module. If you wish to contribute, you'll need to frok the entire Syncify repository.
