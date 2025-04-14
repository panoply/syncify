# Syncify using Paths

Example usage of custom directory architecture in Syncify. Using the `paths` configuration option, you can create custom `input` structures according to your preference or project requirements.

> The [Using Rename](/examples/using-rename/) example extends upon this example to showcase how we can use `paths` to also rename files.

<pre><code><strong>PASSWORD</strong>  →   <code>access</code>
<strong>PREVIEW</strong>   →   <a href="https://syncify.myshopify.com?preview_theme_id=137588605169">https://syncify.myshopify.com?preview_theme_id=137588605169</a>
</code></pre>

### Showcasing

- Preset VSCode Workspace
- Shared Schema File
- PostCSS Style Transform
- SVG Inline Icon Snippet
- TypeScript → JavaScript Transform
- Sub-directories and custom architecture

### Commands

This example assumes you know the command line prompt of Syncify, below are some basics:

```bash
$ sy -w       # watch
$ sy -w --hot # watch with hot reloading
$ sy -b       # build the theme
```

### Strap

This example intends to showcase build execution. You can optionally use this example as a starting point boilerplate. Open your terminal and run the following command:

```bash
$ pnpm sy --strap using-paths
```

### Overview

Below is the example source directory architecture. Consult the `syncify.config.ts` file in the root which is pre-configured to respect this directory structure. Syncify will generate an valid theme structure from this.

```
├── src
│   ├── assets
│   │   └── icons
│   │       └── logo.svg
│   ├── data
│   │   ├── settings
│   │   │   ├── settings_data.json
│   │   │   └── settings_schema.json
│   │   └── translations
│   │       ├── en.default.json
│   │       └── en.default.schema.json
│   ├── scripts
│   │   ├── bundle.ts
│   │   └── components
│   │       ├── bar.ts
│   │       └── foo.ts
│   ├── styles
│   │   └── base.css
│   └── views
│       ├── customers
│       │   ├── account.liquid
│       │   ├── activate_account.liquid
│       │   ├── addresses.liquid
│       │   ├── login.liquid
│       │   ├── order.liquid
│       │   ├── register.liquid
│       │   └── reset_password.liquid
│       ├── layouts
│       ├── sections
│       │   └── example
│       │       ├── page.liquid
│       │       └── page.schema
│       ├── snippets
│       ├── templates
│       │   ├── 404.json
│       │   ├── article.json
│       │   ├── blog.json
│       │   ├── cart.json
│       │   ├── collection.json
│       │   ├── gift_card.liquid
│       │   ├── index.json
│       │   ├── list-collections.json
│       │   ├── page.json
│       │   ├── password.json
│       │   ├── product.json
│       │   └── search.json
│       └── theme.liquid
```
