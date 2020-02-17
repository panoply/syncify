[![npm version](https://badge.fury.io/js/shopify-sync.svg)](https://www.npmjs.com/package/shopify-sync)

<hr>

# Shopify Sync

A lightning-fast node equivalent shopify [theme kit](https://shopify.github.io/themekit/) tool. Supports watching, uploading and downloading of Shopify theme files to multiple storefronts concurrently. A concise and clear log interface, custom file transit control and much more!

### Use case?

The main purpose of the module is to watch a specified directory in your project and upload changed or modified files to a configured Shopify theme target. Additionally, the tool supports download/upload features.

## Installation

Yarn

```cli
yarn add shopify-sync --dev
```

NPM

```cli
npm install shopify-sync --save-dev
```

After installing, you will need to create a `.shopifysync.json` file and place it in the root of your directory. This file will hold your store API credentials. The configuration file should be written in `JSON` and store themes to sync should be defined via the `targets[]` property, eg:

```jsonc
{
  "dir": "example", // The directory to watch
  "targets": [
    {
      "target_name": "development", // The name of the theme target
      "api_key": "", // Shopify API Key
      "password": "", // Shopify Password
      "domain": "your-store", // Your myshopify name (without .myshopify)
      "primary_domain": "https://primary-domain.com", // Primary domain, eg: www.store.com
      "theme_name": "Development", // The theme name
      "theme_id": 123456789 // The theme ID
    }
  ]
}
```

##### JSON Schema

If you're using an editor like vscode or one that supports JSON IntelliSense features you can grab the Schema Store configuration file can be provided by referencing the [json-schema](https://raw.githubusercontent.com/panoply/shopify-sync/master/json-schema.json) file in this repository via the `$schema` property, eg:

```json
{
  "$schema": "https://raw.githubusercontent.com/panoply/shopify-sync/master/json-schema.json"
}
```

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
The `resource` option is a **required** option and is the first argument that is passed in. There are 3 avaiable resources to call, they are: `watch`, `upload` or `download`.

**`dir`**<br>
The `dir` option defaults to `theme` and is the directory that the sync will watch, upload or download modified or changed files from. The watch resource will only accept a directory that resides within the root of your project.

**`target`**<br>
The `target` option is **required** and is the reference point to your Shopify stores API credentials. The target defined here should reflect the `target_name` property defined in your config file.

**`concurrency`**<br>
The `concurrency` option defaults to 20. This option will allow you to set a number of parallel requests to run when uploading or downloading theme files. Please note that all asset syncs are executed asynchronously.

**`forceIgnore`**<br>
Forcefully ignores files from the chokidor instance which will prevent them from being read and printing to stdout. This option is reccomended if you are ignoring a large quantity of files and want to keep your logs clean.

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

Fork the project, run `yarn` and you're good to go.

# Changelog

Refer to the [Changelog](changelog.md) for each per-version update and/or fixes.
