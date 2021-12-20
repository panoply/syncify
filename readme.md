[![npm version](https://badge.fury.io/js/shopify-sync.svg)](https://www.npmjs.com/package/shopify-sync)

<hr>

# Syncify

A lightning fast node equivalent shopify [theme kit](https://shopify.github.io/themekit/) tool. Supports watching, uploading and downloading of Shopify theme files to multiple storefronts. It provides a concise and clear log interface, custom file transit control, metafield sync and much more!

### Features

- Upload to multiple storefronts and/or themes
- Supports HTML + Liquid minification
- Global JSON file based metafield sync
- Lightweight, extensible and mature

### Why?

Because Shopify maintained tooling is utter garbage. The likelihood of a project maintained by the Shopify team lasting longer than 12 months is slim. This module is fast and flexible. It will not lock you into some poorly thought through workflow or theme development apparatus that is common with Shopify.

### Use case?

The main purpose of Syncify is to watch a specified directory for file changes. When changes are detected Syncify will determine what action took place and publish (upload) them to store theme/s. It provides watch, upload, download and metafield sync capabilities.

## Installation

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

## Setup

After installing you will need to quickly configure a connection between your shopify store theme/s. In your `package.json` file define a configuration with a `"syncify":{}` property. Syncify requires you provide credentials within a `.env` file.

#### Configuration

Within your `package.json` file, provide the following configuration:

```jsonc
{
  "syncify": {
    "dir": "example", // The directory to watch
    "targets": [
      {
        "store": "your-store", // Your myshopify name (without .myshopify)
        "metafields": true,
        "themes": {
          "dev": 123456789,
          "prod": 543216789,
          "stage": 987651234
        }
      },
      {
        "store": "another-store", // Optionally provide a second storefront.
        "metafields": true,
        "themes": {
          "dev": 123456789,
          "prod": 543216789,
          "stage": 987651234
        }
      }
    ]
  }
}
```

#### Credentials

Store credential are stored within a dotenv file. You will need to create a [private app](https://help.shopify.com/en/manual/apps/private-apps) in your store to obtain an API Key and Password. Credentials can be expressed in either upper or lowercase. Your store credentials **must** begin with the store name following an underscore. For example, a store with a _myshopify_ domain of `sissel.myshopify.com` has a store name value of `sissel` so credentials would start with `sissel`. For the sake of brevity, this is how you would define the api key and password to that store within the `.env` file:

```env
sissel_api_key = 'abcdefghijklmnopqrstuvwz'
sissel_password = 'abcdefghijklmnopqrstuvwz'
```

You can also express this in uppercase, eg:

```env
SISSEL_API_KEY = 'abcdefghijklmnopqrstuvwz'
SISSEL_PASSWORD = 'abcdefghijklmnopqrstuvwz'
```

Refer to the `.env.example` file in this repository for an example and please remember to never commit a `.env` to a public repository.

> If you are syncing to multiple storefronts just follow this pattern for each store.

## CLI Usage

Syncify ships with a powerful command line interface. If you have installed Syncify globally, you can call `syncify` from any project but you should avoid this and instead install the module as a development dependency on a per-project basis. If you are using a package manager like [pnpm](https://pnpm.js.org/en/cli/install) you can simply call `pnpm syncify` but if you are using npm or yarn you will need to create reference script in your `package.json` file, for example:

```json
{
  "scripts": {
    "syncify": "syncify"
  }
}
```

> If you are not using [pnpm](https://pnpm.js.org/en/cli/install) then you should really consider adopting it within your stack. It is a wonderful addition to any JavaScript project.

#### Commands

The Syncify CLI provides the following commands:

```cli
Commands:
  syncify watch     <store>   Starts watch mode
  syncify download  <store>   Downloads a specific theme/s from store/s
  syncify upload    <store>   Uploads the theme directory
  syncify themes              Prints list of themes, helpful when you need ids
  syncify status              Prints list of connected stores

Flags:
  -t, --theme   <list>   A comma separated list of themes
  -s, --store   <list>   A comma separated list of store
  -o, --output  <path>   A path value (used in download mode only)
  -h, --help             Prints command list and some help information
```

#### Example

CLI usage aims to be as simple as possible. A typical project will be targeting a single theme but you can target multiple themes and stores. When targeting multiple stores and multiple themes within those stores the you can pass the store name as a flag, followed by comma separated list of theme targets.

**Watching 1 store and 1 theme**

```cli
$ syncify watch shop -t dev
```

<details>
<summary>
Breakdown
</summary>

The above command is calling `watch` on a store named `shop` and will upload changes to a theme named `dev`. We are using the shorthand `--theme` flag `-t` to inform upon the theme we want changes applied.

</details>

<details>
<summary>
Configuration
</summary>

The `package.json` configuration for the command would look like this:

```json
{
  "syncify": {
    "dir": "example", // The directory to watch
    "targets": [
      {
        "store": "shop", // The store name
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

The above command is calling `watch` on a store named `shop` and will upload changes to 2 different themes in that store we have named `dev` and `prod`.

</details>

<details>
<summary>
Configuration
</summary>

The `package.json` configuration for the command would look like this:

```json
{
  "syncify": {
    "dir": "example", // The directory to watch
    "targets": [
      {
        "store": "shop", // The store name
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
    "dir": "example", // The directory to watch
    "targets": [
      {
        "store": "shop1", // The store name
        "themes": {
          "test": 123456789 // The theme id and target name
        }
      },
      {
        "store": "shop2", // The store name
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

## Script Usage

Syncify can be initialized within scripts. This approach is a little more feature full and allows you to integrate it with different build tools. You can hook into the transit process of files and apply modifications before they are uploaded to your store/s.

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

#### Gulp

If you're using a tool like [Gulp](https://gulpjs.com), you can call upon the sync from within a task function and it will initialize when the task is triggered.

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

# Changelog

Refer to the [Changelog](changelog.md) for each per-version update and/or fixes.
