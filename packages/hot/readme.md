# @syncify/hot

HOT Reload client used to perform live reloading using websocket. This module will be injected into store theme layouts and is responsible for morphs and traversal loads.

# Installation

```bash
$ pnpm add @syncify/hot -D
```

# Usage

Running in HOT mode will result in Syncify injecting a snippet into layouts. The snippet is the socket receiver that is responsible for executing replacements/morphs and exposes programmatic control for developers who can to customize or hook into the HOT reload rendering cycles.

```ts
// STATUS
//
window.syncify.ready: boolean
window.syncify.connected: boolean;

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
