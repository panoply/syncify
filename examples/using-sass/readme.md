# Syncify using SASS

Example usage of SASS Transforms with Syncify. This repository showcases how developers can process `.scss` files using Syncify **style** transforms. This example also applies some customizations and take advantage of additional features that Syncify offers.

<pre><code><strong>PASSWORD</strong>  →   <code>access</code>
<strong>PREVIEW</strong>   →   <a href="https://syncify.myshopify.com?preview_theme_id=137588506865">https://syncify.myshopify.com?preview_theme_id=137588506865</a>
</code></pre>

### Showcasing

This example defines config within the projects `syncify.config.json` file. You can also define configuration within the projects `package.json` file or alternatively use a `syncify.config.ts` or `syncify.config.js` file. This example showcases the below additional capabilities.

- SASS Transforms with post-processing with PostCSS
- SVG Transform using SVGO which writes as a snippet
- Applies Custom Directory structure
- Leverages a shared schema section file
- JavaScript Transform example exported as snippet

### Usage

You can use this example as a starting point to your next project. Open up your terminal and run the following command:

```bash
$ pnpx @syncify/strap --strap examples/using-sass
```

# Overview

Contained within the `source/assets/styles` directory are 2 different `.scss` files. For the sake of this example we instruct syncify to compile each of these files using Dart SASS. One file (`bootstrap.scss`) will include the [Bootstrap](https://getbootstrap.com/) CSS framework. Rhe other file (`stylesheet.scss`) will consists of some basic SASS syntax and structures. Each file will written to the default output `theme/assets` directory path.

```
├── source
│   └── assets
│       └── styles
│           ├── bootstrap.scss
│           └── stylesheet.css

```

SASS transforms require us to include the [Dart SASS](https://sass-lang.com/dart-sass) module as a development dependency, which is included within the `package.json` file. Refer to the [`syncify.config.json`](/syncify.config.json) configuration to see how each style transform has been configured.
