# @syncify/hot

HOT Reload client used to perform live reloading using websocket.

# Usage

Syncify will automatically inject script via the devtools protocol.

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
