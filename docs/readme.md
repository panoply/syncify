# Syncify Documentation

Documentation for the [Syncify](https://github.com/panoply/syncify) theme development tool. Syncify is a superior alternative to Shopify [theme kit](https://shopify.github.io/themekit/). This website uses Syncify to generate a Shopify store. Take a look within the [source](/source) directory to see how it is being leveraged to build the compatible theme for documentation.

### Usage/Contributing

Install [pnpm](https://pnpm.js.org/en/cli/install) and either clone, fork or [download](https://github.com/panoply/syncify-docs/archive/refs/heads/master.zip) repository.

1. Run `pnpm i` and install dependencies.
2. Provide API token credentials within a `.env` file.
3. Run `pnpm sync --setup` and follow the prompts.
4. Run `pnpm dev` to start development.

### Commands

The project uses a couple of node commands as convenience executables around [Syncify](https://github.com/panoply/syncify). Take a look in the `package.json` file to see how it has been wired up.

```cli
pnpm sync     Alias to the syncify command
pnpm dev      Runs Syncify in watch mode, uploads to the docs theme target.
pnpm build    Triggers a production build with clean mode
pnpm merge    Executed a data alignment for metafields
pnpm upload   Uploads output to the docs theme target
```

# Illustrating

This repository illustrates how Syncify can be used to create a Shopify theme using Syncify. This project exists as a great reference point for developers who are considering or currently using Syncify in their theme development process. This theme is leveraging the following Syncify capabilities:

- The **input** source directory uses a customized Structure.
- **SASS** stylesheets are compiled and purged using **SASS Dart** and **PostCSS**.
- Shop pages are compiled from **markdown** and published as valid HTML.
- The missing templates in the **input** source are automatically generated in **output**
- **SVG** icons are bundled into a Sprite and exported as a **snippet**.
- JSON **metafield** sync capabilities are being used to publish global metafields.
- **JavaScript** is complied from **\*TypeScript** using a spawned **TSUP** process.
- Distributed **output** is minified when building in **production** mode.
- The generated theme is **version** controlled and [exported](/export).

### Development Tooling

The project is also using a couple of wonderful development tools to provide features like formatting and linting capabilities.

### Theme Architecture

The theme is leveraging 2 powerful JavaScript modules that enable the shop to load pages instantaneously between navigation's. You will quickly notice that the documentation (despite being hosted on Shopify) is incredibly fast and snappy. At first glance you may assume it's a _headless_ or running atop of _hydrogen_ but you'd be mistaken. The docs are SSR.

- [SPX](https://github.com/panoply/spx)
- [stimulus.js](https://stimulusjs.org/)

# Author

Created by [Nίκος Σαβίδης](https://github.com/panoply) of [Sissel ΣaaΣ](https://sissel.io).
