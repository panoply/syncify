# @syncify/live

Shopify theme live reloading support for usage with [Syncify](#). This module is used under the hood by Syncify to facilitate live reload capabilities when developing Shopify themes. This module is injected into theme layouts automatically when using Syncify live and usage outside of Syncify is redundant.

# Overview

Syncify Live triggers reloads and assets replacements with localhost websocket when running in **watch** mode. This module is uploaded as snippet and inlined in development (preview) stores. The socket listens for messages sent from the server (Syncify) and employs an intuitive approach for achieve native-like reloads.

### Styles

External CSS stylesheets and inline `<style>` tags that do not contain Liquid are hot-reloaded.

### Scripts

External JavaScript files and inline `<script>` tags that do not contain Liquid are hot-reloaded

### Views

View reloading is carried out via XHR. The documents `<head>`  and `<body>` fragments a replaced and scroll position is preserved.

### LICENSE

[MIT](/license)
