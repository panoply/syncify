# @syncify/hot

Remote client used to perform HOT and Live Reloading with [Syncify](https://syncify.sh). The distributed JavaScript file of this module will be automatically injected into theme layouts (i.e, `theme.liquid`) when running Syncify in `--hot` mode.

### How it works?

Passing the `--hot` or `-h` flag will begin watching and sync changes from your local machine to your Shopify store/s. The client side scripting which this module contains will be uploaded as a liquid **snippet** file named `hot.js.liquid` and when running Syncify with HOT mode enabled the snippet reference is dynamically injected into layout files just after the `<head>` tag.

During a HOT watch session, the client side snippet will interface over websocket using the powerful [uWebSockets](https://github.com/uNetworking/uWebSockets.js) implementation. When a watch session ends or is killed (e.g, pressing `crtl + c` in terminal) the injection is removed from the remote layout/s before the watch process exits. Reconnection will be retried 5 times within 10 seconds before being the socket connection is killed in the browser.

# Usage

The module is injected after page load and `connect()` is automatically invoked. You can interface with module if you require more custom operations. The below methods are exposed.

```ts
// INIT
window.Syncify.connect(/* options */);

// STATUS
//
window.Syncify.isReady: boolean
window.Syncify.isConnected: boolean;

// RELOADS
//
window.Syncify.assets(): void;
window.Syncify.reload(): void;
window.Syncify.refresh(): void

// SECTIONS
//
window.Syncify.sections.get()
window.Syncify.sections.list()
window.Syncify.sections.load()

// LABEL
//
window.Syncify.style.parent({ /* CSS */ });
window.Syncify.style.label({ /* CSS */ });

// HOOKS
window.Syncify.onReload((syncify) => {})
window.Syncify.onAsset((type, url) => { /* return false to cancel */ })
window.Syncify.onMorph((oldDom, newDom) => { /* return false to cancel */})
```

# Contributing

This package is written to the root directory of the Syncify distributed module. If you wish to contribute, you'll need to fork the entire Syncify repository.
