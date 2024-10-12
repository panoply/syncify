---
title: 'Syncify CLI'
layout: base
permalink: '/usage/syncify-cli/index.html'
anchors:
  - 'Syncify CLI'
---

# Syncify CLI

Syncify is designed as a Command Line Interface (CLI) tool. It provides a streamlined, powerful, intuitive and aesthetically beautiful Terminal User Interface, complete with prompt-based interactivity and short code flag support. This page aims to describe usage and explain how to leverage at the most elementary level. Although there is an extensive array of commands available, which might initially suggest a steep learning curve, in practice, most developers will find themselves utilizing only about 4 to 5 commands regularly.

# Bin

The CLI can be installed globally or locally depending on your preference. If installed globally, `sy` (or `syncify`) becomes universally accessible from any project directory. Global installation will perform periodic checks for updates, notifying you of any new versions when they become available. For those opting for project-specific installations, leveraging your package manager to access Syncify commands is recommended, and likely going to be the easiest way to obtain the executable.

```json
{
  "scripts": {
    "sy": "syncify" // Adding the executable to our package.json scripts
  }
}
```

# Commands

The below selection consists of commonly used commands and flags by the Syncify CLI.

{% raw %}

```bash
Default:
  syncify                     # Starts interactive CLI command prompt
  sy                          # An alias of syncify (can be used instead of syncify)

Commands:
  sy                          # Starts interactive CLI command prompt
  sy <store>                  # Store name or comma separated list of stores and flags

Prompts:
  sy                          # Show help screen, same as using calling help flags
  sy setup                    # Interactive helper for setting up Syncify
  sy git                      # Configure git connection and branch workflows
  sy themes                   # List themes and add them as target to package.json
  sy strap                    # Generate a fresh Syncify theme strap boilerplate
  sy version  <version>       # Bump theme version, accepts patch, minor or major argument

Developing:
  -i, --input   <path>        # Overwrite config and specify the input source directory
  -o, --output  <path>        # Overwrite config and specify the output directory for themes
  -c, --config  <path>        # Overwrite directory path where config files exist
  -t, --theme   <targets>     # A comma separated list of theme targets
  -f, --filter  <glob>        # Glob match pattern file or directory matcher
  -b, --build                 # Builds the theme from input (source)
  -w, --watch                 # Watches for changes and syncs to the store
  -h, --hot                   # HOT Reloading, can only be passed in watch mode
  -p, --publish               # Builds, exports and publishes theme to the store
  -u, --upload                # Uploads theme file/s to online store, use together with filter

Distribution:
  --import                    # Imports theme/s from the online store
  --export                    # Exports theme, will trigger build and will generate a zip file

Operations:
  --terse                     # Enables terse minification
  --clean                     # Removes all output files, use before bundling or watching
  --merge                     # Merge online data with local references
  --force                     # Forces a sync, replacing remote source with local one
  --silent                    # Silence the logger, omit only errors
  --spawn  <name>             # Target a specific spawn, available in watch or build modes

Environments:
  --dev, --development        # Run in development mode (default)
  --prod, --production        # Run in production mode, terse minification applies if enabled
```

{% endraw %}

> Please keep in mind that not all commands are active as the project is still in beta.

## Examples

CLI usage aims to be as simple as possible. A typical project will be targeting a single Shopify theme but you can target multiple themes and stores in a seamless manner. When targeting multiple stores or themes the CLI employs a flag based naming approach.

**Generate theme targets**

```bash
$ syncify store-name -q themes
```

Prompt interface will be initialized

1. Target **store-name**
2. Initialize Query resource
3. Inform query we want the "themes" endpoint

**Generate local metafields**

```bash
$ syncify store-name --metafields --pull
```

Prompt interface will be initialized

1. Target **store-name**
2. Initialize Metafields resource
3. Pull data from online-store

**Upload theme to online store**

```bash
$ syncify store-name -t theme-1,theme-2 --clean -b -u --prod
```

Exchange interface will be initialized

1. Target **store-name**
2. Theme targets are **theme-1** and **theme-2**
3. Trigger Clean
4. Trigger Build (production build because of --prod flag)
5. Trigger Upload

**Watching 1 store and 1 theme**

```bash
$ syncify shop -w -t dev
```

<details>
<summary>
Breakdown
</summary>

The above command is calling `watch` on a store named `cool-shop` and will upload changes to a theme named `dev`. We are using the shorthand `--theme` flag (`-t`) to inform upon the theme we want changes uploaded.

</details>

<details>
<summary>
Configuration
</summary>

The `package.json` configuration for the command would look like this:

```json
{
  "syncify": {
    "stores": {
      "domain": "cool-shop", // The store name
      "themes": {
        "dev": 123456789 // The theme id and target name
      }
    }
  }
}
```

</details>

**Watching 1 store and 2 themes**

```bash
$ syncify shop -t dev,prod -w
```

<details>
<summary>
Breakdown
</summary>

The above command is calling `watch` on a store named `my-shop` and will upload changes to 2 different themes in that store we have named `dev` and `prod`.

</details>

<details>
<summary>
Configuration
</summary>

The `package.json` configuration for the command would look like this:

```json
{
  "syncify": {
    "stores": {
      "domain": "my-shop", // The store name
      "themes": {
        "dev": 123456789, // The theme id and target name
        "prod": 123456789 // The theme id and target name
      }
    }
  }
}
```

</details>

**Watching 2 stores and multiple themes**

```bash
$ syncify shop1,shop2 --shop1=test --shop2=dev,stage,prod -w
```

<details>
<summary>
Breakdown
</summary>

The above command is calling `watch` on 2 stores, `shop1` and `shop2`. We are targeting a theme named `test` in the store `shop1` and 3 different themes in `shop2` named `dev`, `stage` and `prod`. Syncify will upload changes to both store and all the defined themes. Notice how we target different store themes in the command using the store name as a flag.

</details>

<details>
<summary>
Configuration
</summary>

The `package.json` configuration for the command would look like this:

```json
{
  "syncify": {
    "stores": [
      {
        "domain": "shop1", // The store name
        "themes": {
          "test": 123456789 // The theme id and target name
        }
      },
      {
        "domain": "shop2", // The store name
        "themes": {
          "dev": 123456789,
          "stage": 123456789,
          "prod": 123456789
        }
      }
    ]
  }
}
```

</details>
