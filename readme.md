[![npm version](https://badge.fury.io/js/shopify-sync.svg)](https://www.npmjs.com/package/shopify-sync)

<hr>

# Shopify Sync

A lightning-fast node equivalent shopify [theme kit](https://shopify.github.io/themekit/) tool. Supports watching, uploading and downloading of Shopify theme files to multiple storefronts concurrently. A concise and clear log interface, custom file transit control and much more!

### Why?

Because Shopify tooling is utter garbage. The likelihood of a project maintained by the Shopify team lasting longer than 12 months is slim. This module does one job, it's flexible, does not require you to install 20+ fucking ruby gems and will not lock you into some poorly thought through workflow or theme development apparatus that is common with Shopify.

### Use case?

The main purpose of the module is to watch a specified directory in your project and upload/remove changed or modified files to a configured Shopify theme target. Additionally, the tool supports download/upload features.

## Installation

PNPM

```cli
pnpm i shopify-sync --dev
```

Yarn

```cli
yarn add shopify-sync --dev
```

NPM

```cli
npm install shopify-sync --save-dev
```

## Configuration

After installing you will need quickly configure a connection between your shopify store theme/s and Shopify Sync. In your `package.json` file define configuration using a `"shopifysync":{}` property. Provide your credentials in an `.env` file.

> In previous versions configuration and credentials were stored in a `.shopifysync.json` file, this approach is deprecated and will not be supported in future versions.

### Options

Within your `package.json` file, you can provide the following configuration options:

```jsonc
{
  "shopifysync": {
    "dir": "example", // The directory to watch
    "targets": [
      {
        "domain": "your-store", // Your myshopify name (without .myshopify)
        "target_name": "development", // The name of the theme target
        "theme_name": "Development", // The theme name
        "theme_id": 123456789 // The theme ID
      }
    ]
  }
}
```

### Credentials

Store credential are stored within a dotenv file. Credentials can be expressed in either upper or lowercase. Credentials **must** begin with the store name, following an underscore. For example, a store with a myshopify domain of `sissel.myshopify.com` has a store name value of `sissel` - this is how you would define the api key and password to that store within the `.env` file:

```env
sissel_api_key = 'abcdefghijklmnopqrstuvwz'
sissel_password = 'abcdefghijklmnopqrstuvwz'
```

You can also express this in uppercase, if you prefer, eg:

```env
SISSEL_API_KEY = 'abcdefghijklmnopqrstuvwz'
SISSEL_PASSWORD = 'abcdefghijklmnopqrstuvwz'
```

Refer to the `.env.example` file in this repository for an example and please remember to never commit a `.env` to a public repository.

## Script Usage

You can run Shopify Sync via the [CLI](#cli) or initialize as a function in a node script, eg:

```javascript
import sync from 'shopify-sync'

sync('watch',  // Resource type (upload, download, watch)
{
  dir: 'example', // The directory of to watch
  target: 'development', // Your theme target
  concurrency: 20, // Number of parallel requests
  forceIgnore: false,  // Apply ignores at chokidor instance
  ignore: [ // Accepts an array of files and/or an anymatch `/*/**` wildcard
    'example/ignore-dir/**/**'
    'example/assets/*.map.js',
    'example/snippets/ignore.liquid'
  ]
}, function(){

   // Execute callback function
   // this.file will returns parsed file path object)
   // this.content will return the buffer content
   console.log(this)

})

```

Create a script command within your `package.json` file.

```json
"scripts": {
   "sync": "node src/name-of-file.js"
}
```

If you're using a tool like Gulp 4 you can call upon the sync from within a task function, eg:

```javascript
import sync from 'shopify-sync'

function syncTask (done) {

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

### CLI

Execute the sync via the command line. You can install the project globaly or locally. If you're installing locally create a reference in your `package.json` file, for example:

```json
{
  "scripts": {
    "sync": "sync"
  }
}
```

> If yo've instaled globally you can access the CLI using the `sync` command

##### Commands

| Command                  | Details                                       |
| ------------------------ | --------------------------------------------- |
| `sync`                   | Show list of commands                         |
| `sync watch`             | Starts watching a directory                   |
| `sync upload`            | Uploads files, (accepts a filter).            |
| `sync download`          | Downloads the theme                           |
| `--target=[target_name]` | Explicitly select theme target                |
| `--filter=[filename]`    | Only transfer files matching specified filter |

## Options

When initializing via a node script you have a couple of additional options opposed to running sync from the CLI. In most cases running the command `watch` will suffice but for those who may want to manipulate files in transit or for additional control the API ships with the following:

| Option        | Type     | Default    |
| ------------- | -------- | ---------- |
| `resource`    | string   | _Required_ |
| `target`      | string   | _Required_ |
| `dir`         | string   | 'theme'    |
| `concurrency` | Number   | `20`       |
| `forceIgnore` | Boolean  | `true`     |
| `ignore`      | Array    | `[]`       |
| `callback`    | Function | `()`       |

**`resource`** <br>
The `resource` option is a **required** option and is the first argument that is passed in. There are 3 available resources to call, they are: `watch`, `upload` or `download`.

**`dir`**<br>
The `dir` option defaults to `theme` and is the directory that the sync will watch, upload or download modified or changed files from. The watch resource will only accept a directory that resides within the root of your project.

**`target`**<br>
The `target` option is **required** and is the reference point to your Shopify stores API credentials. The target defined here should reflect the `target_name` property defined in your config file.

**`concurrency`**<br>
The `concurrency` option defaults to 20. This option will allow you to set a number of parallel requests to run when uploading or downloading theme files. Please note that all asset syncs are executed asynchronously.

**`forceIgnore`**<br>
Forcefully ignores files from the chokidar instance which will prevent them from being read and printing to stdout. This option is recommended if you are ignoring a large quantity of files and want to keep your logs clean.

**`ignore`**<br>
The ignore option accepts an array of files. You must use full path (`theme/assets/*.map`) glob patterns.

**`callback`**<br>
A callback function executed post transfer. Access the passed in file path and its content via the functions _this_ scope. `this.file` will return the parsed file path and `this.content` will supply you with a Buffer of the files contents, eg:

```javascript
{
   file: {
      root: String,
      dir: String,
      base: String,
      ext: String,
      name: String
   },
   content: <Buffer>
}
```

> Use `this.content.toString()` to return the file content as a string opposed to Buffer.

# Contributing

This project uses [pnpm](https://pnpm.js.org/en/cli/install) (because pnpm is dope and pnpm does dope shit) - Fork the project, run `pnpm i` and you're good to go. If you're using Yarn like the rest of the plebs or npm like the boomers then you will still need to install pnpm.

# Changelog

Refer to the [Changelog](changelog.md) for each per-version update and/or fixes.
