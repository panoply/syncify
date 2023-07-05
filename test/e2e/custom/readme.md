# E2E Test ~ Syncify Dawn

An E2E structure and output test wires up a customized architecture. The case takes advantage of various features shipped with Syncify and aims to match the requirements of a common project. Containing theme files are from [Dawn](https://github.com/Shopify/dawn) and files contained directories named using a single `_` character are **test examples**.

**You can use any directory name, the E2E just uses underscore for the sake of brevity**

# Instructions

Fork or download this repository. You should use install [pnpm](https://pnpm.js.org/en/cli/install) and use it instead of npm or yarn (though they are also supported). The first things you need to do is simply install the dependencies. Given this a test case sample, there are additional modules installed which you probably wont needs if you're using this as a strap starting point.

### Requirements

You will need to update the `env.example` file first. Say (for example) your myshopify store name is `awesome-jeans` then you will need to set this information:

Rename the `.env.example` file to `.env` and enter this:

```bash
# EXAMPLE STOREFRONT API TOKEN
#
awesome-jeans_api_token = 'TOKEN-GOES-HERE'
```

### Commands

The following commands are already wired up:

```bash
pnpm dev               # Runs Syncify in development mode with hot reloads
pnpm dev:multi         # Runs Syncify in development targeting multiple themes
pnpm build             # Runs Syncify in build mode and applied minification
pnpm upload            # Runs Syncify in upload mode and publishes it online
pnpm build:multi       # Runs Syncify in upload mode to many stores and themes
```

### Structure

Consult the `syncify.config.ts` file located in the root of this directory to review how the configuration model is composed. The below structure is a recommended architecture for developing with Syncify and it's what the official strap ([silk](#)) implements.

```bash
├── dist                       # output directory
├── src                        # input directory
│   ├── assets
│   │   ├── documents          # contains documents that upload to files resource
│   │   ├── icons
│   │   │   ├── feather        # contains svg files that output as a sprite snippet
│   │   │   └── social         # contains svg files that are snippet inlined
│   │   │  
│   │   ├── images             # contains images that output to dist/assets
│   │   └── video              # contains videos that upload to files resource
│   │
│   ├── data
│   │   ├── metafields         # contains global metafields to sync to store
│   │   ├── settings           # contains settings_data.json and settings_schema.json
│   │   └── translations       # contains locale files that output to dist/locales
│   │
│   ├── scripts
│   │   ├── components
│   │   ├── modules
│   │   ├── bundle.ts          # outputs as js to dist/assets
│   │   └── vars.js.liquid     # outputs to dist/snippets as an inline <script>
│   │
│   ├── styles
│   │   ├── sections
│   │   ├── stylesheet.scss    # outputs as css to dist/assets
│   │   └── vars.scss.liquid   # outputs to dist/snippets as an inline <style>
│   │  
│   ├── views                  # contains liquid and json templates that output to dist/templates
│   │    ├── customer          # contains liquid that outputs to dist/templates/customer
│   │    ├── include           # contains liquid that outputs to dist/snippets
│   │    ├── layout            # contains liquid that outputs to dist/sections
│   │    ├── layout            # contains markdown that uploads to pages resource
│   │    ├── sections
│   │    │   ├── cart          # contains liquid that outputs to dist/sections with "cart-" prefix
│   │    │   ├── collection    # contains liquid that outputs to dist/sections
│   │    │   ├── index         # contains liquid that outputs to dist/sections with "index-" prefix
│   │    │   ├── product       # contains liquid that outputs to dist/sections
│   │    │   └── search        # contains liquid that outputs to dist/sections with "search-" prefix
│   │    ├── templates         # contains liquid and json templates that output to dist/templates
│   │    └── theme.liquid      # contains liquid that outputs to dist/layout
│   │ 
│   └── theme.liquid           # contains liquid that outputs to dist/layout
│ 
├── redirects.yaml             # publishes to the stores redirects resource
├── package.json
├── readme.md
└── syncify.config.js

```
