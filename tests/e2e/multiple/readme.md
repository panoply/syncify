# Syncify Strap ~ Dawn Sample

An E2E structure and output test wires up a customized architecture. The case takes advantage of various features shipped with Syncify and aims to match the requirements of a common project. Containing theme files are from [Dawn](https://github.com/Shopify/dawn) and files contained directories named using a single `_` character are **test examples**.

**You can use any directory name, the E2E just uses underscore for the sake of brevity**

# Instructions

Fork or download this repository. You should use install [pnpm](https://pnpm.js.org/en/cli/install) and use it instead of npm or yarn (though they are also supported). The first things you need to do is simply install the dependencies. Given this a test case sample, there are additional modules installed which you probably wont needs if you're using this as a strap starting point.

1. `pnpm i`
2. `pnpm build`

Go to the [Syncify](https://github.com/panoply/syncify) repository and review readme.

### Requirements

You will need to update the `env.example` file first. Say (for example) your myshopify store name is `awesome-jeans` then you will need to set this information.

Rename the `.env.example` file to `.env` and enter this:

```bash
# EXAMPLE STOREFRONT API TOKEN
#
awesome-jeans_api_token = 'TOKEN-GOES-HERE'
```

> Update the commands in `package.json` file and of course the `stores` option in the `syncify.config.ts` file.

### Commands

The following commands are already wired up:

```bash
pnpm dev               # Runs Syncify in development mode with hot reloads
pnpm dev:multi         # Runs Syncify in development targeting multiple themes
pnpm build             # Runs Syncify in build mode and applied minification
pnpm upload            # Runs Syncify in upload mode and publishes it online
pnpm upload:multi      # Runs Syncify in upload mode to many stores and themes
pnpm download          # Runs Syncify download
```

### Structure

Consult the `syncify.config.ts` file located in the root of this directory to review how the configuration model is composed.

```bash
├── package.json
├── pnpm-lock.yaml
├── readme.md
├── redirects.yaml
├── src
│   ├── assets
│   │   ├── icons
│   │   │   ├── dawn        # Dawns SVG Icons which will output to snippets
│   │   │   └── feather
│   │   └── images
│   ├── data
│   │   ├── settings
│   │   └── translations
│   ├── pages
│   ├── scripts
│   │   ├── bundle.ts
│   │   ├── components
│   │   ├── dawn           # Dawns JS Files
│   │   ├── extensions
│   │   ├── globs
│   │   ├── i18n.js.liquid
│   │   ├── modules
│   │   ├── shop.js.liquid
│   │   └── snippet.ts
│   ├── styles
│   │   ├── dawn
│   │   ├── example
│   │   ├── example.scss
│   │   └── snippet.scss
│   └── views
│       ├── customers           # Dawn templates/customer files
│       ├── sections
│       │   ├── _               # Directories using _ are non Dawn examples
│       │   ├── blocks          # Dawn sections or various types
│       │   ├── cart            # Dawn sections starting with cart-
│       │   ├── featured        # Dawn sections starting with features-
│       │   ├── groups          # Dawn section group files
│       │   ├── layout          # Dawn sections starting with layout-
│       │   └── main            # Dawn sections starting with main-
│       ├── snippets
│       │   ├── _               # Directories using _ are non Dawn examples
│       │   ├── header          # Dawn snippets starting with header-
│       │   ├── misc            # Dawn snippets miscellaneous
│       │   └── product         # Dawn snippets starting with product-
│       ├── templates
│       │   ├── json            # All .json templates
│       │   └── liquid          # All .liquid templates
│       │ 
│       ├── password.liquid
│       └── theme.liquid        # The main theme layout files
│ 
├── syncify.config.ts
└── tsconfig.json
```
