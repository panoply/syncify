[![npm version](https://badge.fury.io/js/shopify-sync.svg)](https://www.npmjs.com/package/shopify-sync)

<hr>

# @liquify/syncify

A blazing fast, extensible and superior alternative Shopify [theme kit](https://shopify.github.io/themekit/) tool. Syncify applies an intuitive approach for theme development that extends upon your existing build tools. It ships with a powerful and informative CLI that will spawn child processes for compiler coupling. Supports multiple storefront/theme synchronization with watch, upload, download, metafield and redirect sync capabilities included.

> Syncify exists as part of the [Liquify](https://liquify.dev) project.

### Key Features

- Upload, download and watch multiple storefronts and/or themes.
- Clear, concise and informative CLI logging.
- Supports HTML + Liquid and JSON minification.
- An elegant directory based metafields sync approach with JSON files.
- Built-in support for SCSS and CSS transpilation using SASS Dart and [PostCSS](https://postcss.org/).
- SVG Sprite and inlined SVG snippet generation using [SVGO](https://github.com/svg/svgo).
- Intelligent path mapping capabilities for custom theme directory structures.
- Digests existing build tool configurations for asset transformations.
- Prompt based CLI/TUI and exposed module API for script usage.

### Why?

Shopify does a terrible job at providing quality tooling for developers who are working with the platform. The likelihood of a project maintained by the Shopify team lasting longer than 12 months is slim. I have been working with this SaaS for last several years and nothing the Shopify team have produced has actually helped in my productivity. Theme-kit is inconsistent, restrictive, basic and built atop of Ruby. It sucks. This module is not like Theme-Kit. Syncify is fast, it's flexible, it's build atop of Node and it will not lock you into some poorly thought through workflow and setup apparatus.

# Contents

- [Overview](#overview)
  - [Theme Files](#theme-files)
  - [Asset Pipeline](#asset-pipeline)
  - [Built-in Support](#built-in-support)
- [Installation](#installation)
  - [Setup](#setup)
  - [Credentials](#credentials)
  - [Extending Schema](#Extending-Schema)
- [Configuration](#configuration)
  - [Stores](#options)
  - [Dirs](#dirs)
  - [Paths](#paths)
  - [Spawn](#spawn)
  - [Transform](#transforms)
    - [Icons](#icons)
    - [Styles](#styles)
    - [JSON](#json)
    - [Views](#views)
- [CLI Usage](#cli-usage)
  - [Commands](#commands)
  - [Prompts](#prompts)
- [API Usage](#api-usage)
  - [Export](#export)
  - [Config File](#config-file)
  - [Plugin](#config-file)
  - [Utilities](#utilities)
- [Contributing](#contributing)

# Overview

The main purpose of Syncify is to watch and upload files from your local machine to your Shopify store\s via API. Syncify supports file transformation capabilities like minification and allows developers to spawn child running processes in parallel. It employs an intelligent queue-based sync/burst based upload approach.

### Theme Files

Syncify uses built-in capabilities when handling `.liquid` and `.json` snippets, templates, layouts, locales, configs and sections. These files are considered `views` in Syncify and content transformations like minification are applied using the features shipped within the tool.

### Asset Pipeline

Syncify does not want to re-create nor impede on developer preferences or tool appropriation when it comes to handling asset files. Build tools and bundlers specifically designed for processing different assets types can be spawned and run in parallel with the Syncify watch instance.

### Built-in Support

Syncify provides built-in convenience support for handling SCSS, CSS and SVG files. These assets types can be transformed into theme snippets and processed together with build tools like [PostCSS](#) and [SVGO](#). When a `postcss.config.js` or `svgo.config.js` exists within a project the configurations specified within will used in the transform process.

# Installation

PNPM

```cli
pnpm add @liquify/syncify -D
```

NPM

```cli
npm i @liquify/syncify --save-dev
```

Yarn

```cli
yarn add @liquify/syncify --dev
```

### Setup

After installing you will need to quickly configure a connection between your shopify store theme/s. In your `package.json` file you can define a configuration using the `"syncify":{}` property. Syncify requires you provide credentials within a `.env` file.

### Credentials

Store credential are stored within a `dotenv` file. You will need to create a [private app](https://help.shopify.com/en/manual/apps/private-apps) in your store to obtain an API Key and Password, also provide read and write access to themes and metafields. Store credentials can be expressed in either upper or lowercase within a`.env` file. Your store credentials **must** begin with the store name following an underscore character. For example, a store with a _myshopify_ domain of `sissel.myshopify.com` has a store name value of `sissel` so credentials would start with `sissel` - For the sake of brevity, this is how you would define the api key and password to such a store within the `.env` file:

```env
sissel_api_key = 'abcdefghijklmnopqrstuvwz'
sissel_password = 'abcdefghijklmnopqrstuvwz'
```

As aforementioned, you can also express this in uppercase, eg:

```env
SISSEL_API_KEY = 'abcdefghijklmnopqrstuvwz'
SISSEL_PASSWORD = 'abcdefghijklmnopqrstuvwz'
```

Refer to the `.env.example` file in this repository for an example and please remember to never commit the `.env` to a public repository.

> If you are syncing to multiple storefronts just follow this pattern for each store.

### Extending Schema

Syncify exposes a large set of configuration options. If you are using a text editor like [VS Code](https://code.visualstudio.com/) or one that supports [JSON Schema Specs](https://json-schema.org/specification.html) then you can **optionally** extend the built-in `package.json` schema used by your editor to provide hover descriptions and auto-completions for fields and values. The schema will provide you with intellisense support on the `"syncify":{}` field. If you are using VSCode then Syncify will automatically apply and generate this for you. It is highly recommended that you extend the spec if your editor supports it.

**Specification**

```cli
https://schema.liquify.dev/syncify.json
```

**Extending in VS Code**
<br>
Create a `.vscode` directory in the root of your projects workspace. `cd` into the newly created `.vscode` directory and create a `settings.json` file that uses the following configuration settings:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["package.json"],
      "url": "https://schema.liquify.dev/syncify.json"
    }
  ]
}
```

> You can also apply this to your global workspace settings but it is recommended you extends schema on a per-project basis.

# Configuration

Syncify configuration is defined with your projects `package.json` file. Syncify **requires** you provide references to store/s and theme/s you wish to sync via the `"stores"` property. By default Syncify will assume your store exists within a `theme` directory (relative to your project root) and the folders/files within that directory are using a default Shopify theme structure.

> Please note that you will need to remove the comments if you are copy and pasting configuration settings below. Checkout the [Examples](https://github.com/panoply/syncify-examples) repository to download or clone Syncify baked templates.

### Example

<!-- prettier-ignore -->
```jsonc
{
  "syncify": {

    // THIS SETTING IS REQUIRED

    // Stores and themes to sync
    //
    "stores": [
      {
        "domain": "your-store", // Your myshopify name (without .myshopify)
        "themes": {
          "dev": 123456789, // Theme you want to sync (key property is target name)
          "prod": 543216789 // Another theme you want to sync
        }
      },
      {
        "domain": "example", // Optionally provide a second storefront.
        "themes": {
          "dev": 123456789 // Theme you want to sync (key property is target name)
        }
      }
    ],

    // THESE SETTINGS ARE OPTIONAL

    // Directory paths
    //
    "dirs": {
      "input": "source", // The src directory of files, relative to the root directory.
      "output": "theme", // The dist directory of files, relative to the root directory.
      "import": "import", // The directory for downloaded themes
      "export": "export", // The directory for packaged .zip theme files
      "config": "config" // The directory of build config files (eg: rollup.config.js)
    },

    // Customize the directory structures
    //
    "paths": {
      "assets": [], // An optional list of file paths to sync to the assets directory
      "config": [], // An optional list of paths to configuration files
      "locales": [], // An optional list of paths to locale files
      "layout": [], // An optional list of file paths to configuration files
      "sections": [], // An optional list of file paths to sections
      "snippets": [], // An optional list of file paths to snippets
      "templates": [], // An optional list of file paths to templates
      "templates/customers": [] // An optional list of file paths to templates/customers
    },

    // Spawned processes to run in parallel with Syncify
    //
    "spawn": {

      // Child processes to run in watch mode
      //
      "watch": {
        "rollup": "rollup -c -w", // Example of a rollup spawned process
        "esbuild": "esbuild ./config/index.js --watch" // Example of an esbuild spawned process
      },

      // Child processes to run in build/upload mode
      //
      "build": {
        "rollup": "rollup -c",
        "esbuild": "esbuild ./config/index.js --watch"
      }
    },

    // Transform options
    //
    "transform": {

      // SASS, SCSS files processing
      //
      "styles": [
        {
          "input": "", // An stylesheet input path, eg: styles/stylesheet.scss
          "snippet": false, // Generates an inline <style> tag as a snippet
          "rename": "", // Optionally rename the file, default to input name
          "watch": [], // A list of file paths that when changed should trigger compile
          "include": [] // An optional list of paths to include, eg: node_modules
        }
      ],

      // SVG icon processing
      //
      "icons": {
        "snippets": [], // A list of paths to SVG files to process as snippets
        "sprites": [
          {
            "input": [], // A list of paths to SVG files to generate a as sprite
            "output": "", // Sprites are exported as snippets, define the filename here
            "options": {
              "dimensionAttributes": true, // Options passed to SVG Sprite
              "namespaceClassnames": false, // Options passed to SVG Sprite
              "namespaceIDS": false, // Options passed to SVG Sprite
              "rootAttributes": {} // A key > value list of attributes to applied to Sprite
            }
          }
        ]
      },

      // JSON file processing
      //
      "json": {
        "allowComments": false, // Whether or not to allow JSON comments
        "minify": {
          "env": "never", // What ENV variable should minification be applied
          "removeSchemaRefs": true, // Strips $schema references from JSON (if any)
          "exclude": [] // An optional list of files to exclude from minification
        }
      },

      // Liquid file processing
      //
      "views": {
        "sections": {
          "allowPrefix": true, // Allow parent directory name prefix on sub dir nested sections
          "onlyPrefixDuplicates": false, // Only apply prefixing on duplicate named snippets
          "prefixSeparator": "_", // The separator character to use when prefixing
          "globals": [] // A list of directories or files to never have prefixing applied
        },
        "minify": {
          "env": "never", // What ENV variable should minification be applied on templates
          "minifyJS": true, // Whether or not to minify <script> tag contents
          "minifyCSS": true, // Whether or not to minify <style> tag contents
          "removeComments": true, // Whether or not to remove HTML comments
          "collapseWhitespace": true, // Whether or not to collapse whitespace
          "trimCustomFragments": true, // Whether or not to trim custom fragments
          "ignoreCustomFragments": [], // A regular expression list of fragments to ignore
          "minifySectionSchema": true, // Whether or not to minify {% schema %} contents
          "removeLiquidComments": true, // Whether or not to remove Liquid comments
          "ignoredLiquidTags": [], // A List of Liquid tags to ignore from minification
          "exclude": [] // A list of files/paths to exclude from minification.
        }
      }
    }
  }
}
```

### Options

Below you will find the complete configuration guidelines and option references.

# CLI Usage

Syncify ships with a powerful command line interface that supports prompt execution. If you have installed Syncify globally, you can call `syncify` from any project but you should avoid this and instead install the module as a development dependency on a per-project basis. If you are using a package manager like [pnpm](https://pnpm.js.org/en/cli/install) you can simply call `pnpm syncify` but if you are using npm or yarn then you may need to create reference script in your `package.json` file, for example:

```json
{
  "scripts": {
    "syncify": "syncify"
  }
}
```

> If you are not using [pnpm](https://pnpm.js.org/en/cli/install) then you should really consider adopting it within your stack. It is a wonderful addition to any JavaScript project.

### Commands

The Syncify CLI provides the following commands:

```cli
Default:
  syncify       Starts interactive CLI command prompt

Commands:
  syncify watch     <store>   Starts watch mode
  syncify download  <store>   Downloads a specific theme/s from store/s
  syncify upload    <store>   Uploads the theme directory
  syncify build               Triggers a build of te entire theme
  syncify themes              Prints list of themes, helpful when you need ids
  syncify status              Prints list of connected stores
  syncify query               Queries a resource endpoint like metafields

Flags:
  -t, --theme   <list>   A comma separated list of themes
  -s, --store   <list>   A comma separated list of store
  -o, --output  <path>   A path value (used in download mode only)
  -h, --help             Prints command list and some help information
```

### Example

CLI usage aims to be as simple as possible. A typical project will be targeting a single Shopify theme but you can target multiple themes and stores. When targeting multiple stores/themes you can pass the store name as a flag followed by comma separated list of theme targets. See below examples:

**Watching 1 store and 1 theme**

```cli
$ syncify watch shop -t dev
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

```jsonc
{
  "syncify": {
    "stores": [
      {
        "domain": "cool-shop", // The store name
        "themes": {
          "dev": 123456789 // The theme id and target name
        }
      }
    ]
  }
}
```

</details>

**Watching 1 store and 2 themes**

```cli
$ syncify watch shop -t dev,prod
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

```jsonc
{
  "syncify": {
    "stores": [
      {
        "domain": "my-shop", // The store name
        "themes": {
          "dev": 123456789, // The theme id and target name
          "prod": 123456789 // The theme id and target name
        }
      }
    ]
  }
}
```

</details>

**Watching 2 stores and multiple themes**

```cli
$ syncify watch -s shop1,shop2 --shop1=test --shop2=dev,stage,prod
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

# API

Syncify can be initialized within scripts. This approach is a little more feature-full and allows you to integrate it with different build tools. You can hook into the transit process of files and apply modifications before they are uploaded to your store/s with this approach.

### Utilities

Utilities will return some basic information about the Syncify instance. These are extremely helpful when when you are executing spawned processes and need to control what feature to load. For example, if you are spawning a webpack process for compiling JavaScript assets and need to inform upon watch mode you'd can use `util.resource('watch')` which returns a boolean value when running in watch mode.

```typescript
import { util } from 'shopify-sync'

// Environment
util.env('dev' | 'prod' ): boolean

// Returns the current resource
util.resource('watch' | 'upload' | 'download'): boolean

// Returns spawns
util.spawned(): string[]

```

### Instance

```javascript
import syncify from 'shopify-sync'

// Create a resource instance
// which returns a hook function callback

const watch = syncify('watch', {

  // The path to a directory to watch (optional if defined in package.json)
  dir: 'example',

  // The target store name (key) and themes as (value)
  target: {

    // Reference a theme defined in your package.json config
    shop1: ['theme-name'],

    // Reference by theme id
    shop2: [1234567890, 0987654321]

  },

  // Number of parallel requests
  concurrency: 20,

  // Metafields feature, will publish JSON file contents to metafields
  metafields: true,

  // Apply ignores at chokidar instance
  forceIgnore: false,

  // An array of files and/or an any-match `/*/**` wildcard paths to ignore
  ignore: [
    'example/ignore-dir/**/**'
    'example/assets/*.map.js',
    'example/snippets/ignore.liquid'
  ]
})

// Syncify returns a function, call this to
// hook into the transit process of files.

watch(function(content){

  // this scope will returns parsed file path object
  console.log(this)

  // The content parameter passes a Buffer
  console.log(content)

  // Convert the content parameter Buffer to a string.
  console.log(content.toString())

  // Returning a string or buffer will modify contents.
  return 'hello world'

})

```

Create a script command within your `package.json` file.

```json
{
  "scripts": {
    "watch": "node src/name-of-file.js"
  }
}
```

### Gulp

If you're using a tool like [Gulp](https://gulpjs.com), you can call upon the sync from within a task function and it will initialize when the task is triggered. This approach allows you process files before they are passed to Syncify and work from a `src` directory.

```javascript
import sync from 'shopify-sync'

function sync (done) {

  sync('watch', {
    dir: 'example',
    target: 'development',
    ignore: [
        'example/sections/ignore.js',
        'example/assets/ignore.liquid'
    ]
  })

  done()

}

export.default = parallel(exampleTask, syncTask)

```

## Options

When initializing via a node script you have a couple of additional options opposed to running sync from the CLI. In most cases running the command `watch` will suffice but for those who may want to manipulate files in transit or for additional control the API ships with the following:

**`dir`**<br>
The `dir` option defaults to `theme` and is the directory that the sync will watch, upload or download modified or changed files from. The watch resource will only accept a directory that resides within the root of your project.

**`metafields`** (experimental)<br>
This `metafields` option will provide synchronization for JSON metafields. You will need to provide a `path` reference to a specific `metafields` directory within your development workspace. The `metafields` directory treats every sub-directory as metafield `namespace` and the files contained within the namespace sub-directory will be synchronized to your store.

**`target`**<br>
The `target` option is **required** and is the reference point to your Shopify stores API credentials. The target defined here should reflect the `target_name` property defined in your config file.

**`concurrency`**<br>
The `concurrency` option defaults to 20. This option will allow you to set a number of parallel requests to run when uploading or downloading theme files. Please note that all asset syncs are executed asynchronously.

**`forceIgnore`**<br>
Forcefully ignores files from the chokidar instance which will prevent them from being read and printing to stdout. This option is recommended if you are ignoring a large quantity of files and want to keep your logs clean.

**`ignore`**<br>
The ignore option accepts an array of files. You must use full path (`theme/assets/*.map`) glob patterns.

**`callback`**<br>
A callback function executed post transfer. Access the passed in file path via the functions _this_ scope which will return the parsed file path. You function will pass a Buffer as parameter value which contains the files contents. See below file `this` scope.

```typescript
{
  root: string,
  dir: string,
  base: string,
  ext: string,
  name: string
}
```

> Use `content.toString()` to return the file content as a string opposed to Buffer.

# Contributing

This project uses [pnpm](https://pnpm.js.org/en/cli/install) (because pnpm is dope and pnpm does dope shit) - Fork the project, run `pnpm i` and you're good to go. If you're using Yarn like the rest of the plebs or npm like the boomers then you will still need to install pnpm.

# Sissel SaaS

Syncify is shipped via by [Nίκος Σαβίδης](https://github.com/panoply) of [Sissel ΣaaΣ](https://sissel.io). It operated under the [@liquify](#) organization.

# Changelog

Refer to the [Changelog](changelog.md) for each per-version update and/or fixes.
