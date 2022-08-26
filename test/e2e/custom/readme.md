# E2E Test ~ Syncify Custom

An E2E structure and output test wires up a customized architecture. The case takes advantage of various features shipped with Syncify and aims to match the requirements of a common project.

### Commands

The E2E case has wired up some low level commands:

```bash
pnpm syncify           # Runs the Syncify executable, ie: $ syncify
pnpm dev               # Runs Syncify in development mode with hot reloads
pnpm build             # Runs Syncify in build mode and applied minification
pnpm upload            # Runs Syncify in upload mode and publishes it online
pnpm bump              # Runs version control manager and launches the prompt
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
