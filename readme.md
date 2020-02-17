[![npm version](https://badge.fury.io/js/shopify-sync.svg)](https://www.npmjs.com/package/shopify-sync)

<hr>

# Shopify Sync

 A lightning-fast cli/node equivalent shopify [theme kit](https://shopify.github.io/themekit/) tool. Supports watching, uploading and downloading theme files to multiple stores concurrently.

### Use case?

The main purpose of the module is to watch a specified directory in your project and upload changed or modified files to a configured Shopify theme. Additionally, the tool supports download/upload features.

## Installation

Yarn
```cli
yarn add shopify-sync --dev
```

NPM
```cli
npm install shopify-sync --save-dev
```

After installing, you will need to create a  `.shopifysync.json` file and place it in the root of your directory. This file will hold your store API credentials. The configuration file is written in `JSON` and should be defined within the `targets[]` property, eg:

```jsonc
{

  // An array of themes to sync
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

IntelliSense features for the configuration file can be provided by referencing the [json-schema.json](https://raw.githubusercontent.com/panoply/shopify-sync/master/json-schema.json) file of this repository via the `$schema` property.

```json
{
  "$schema": "https://raw.githubusercontent.com/panoply/shopify-sync/master/json-schema.json"
}
```

## Usage

You can run Shopify Sync via the [CLI](#cli) or intialize as a function using in a node script, eg:

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

If you're using a tool like Gulp 4 you can call the sync from within a task function, eg:

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
Intialize and execute the sync via the command line. You can install the project globaly or locally (depending on your flavour). If you're installing this on a per-project basis then create a reference in your `package.json` file set to the value `sync`, for example:

```json
{
   "scripts": {
      "sync": "sync",
   }
}
```

##### Commands

|     Command    | Details
|----------------|-------------------------------
|`sync` | Show list of commands
|`sync watch` | Starts watching a directory
|`sync upload` | Uploads files, (accepts a filter).
|`sync download` | Downloads the theme
|`--target=[target_name]` | Explicitly select theme target
|`--filter=[filename]` | Only transfer files matching specified filter

## Options

When initializing via a node script you have a couple of additional options opposed to running sync from the CLI. In most cases running the command `watch` will suffice but for those who may want to manipulate files in transit or for additional control the API ships with the following:

| Option | Type | Default|
|--------|------|--------|
|`resource` | string | *Required* |
|`target` | string | *Required* |
|`dir` | string | 'theme' |
|`concurrency` | Number | 20|
|`forceIgnore` | Boolean | true |
|`ignore` | Array | [ ] |
|`callback` | Function | ( |


**resource** <br>
The `resource` option is a **required** option and is the first argument that is passed in, eg: `sync(resource, {})`. There are 3 avaiable resources to call, they are `watch`, `upload` or `download`

**dir**<br>
The `dir` option defaults to `theme` and is the directory that Shopify Sync will `watch`, `upload` or `download` modified or changed files from. **PLEASE NOTE:** You cannot use deep or nested directories when using the `watch` resource. The watch resource will only accepts a directory that resides within the root of your project.

**target**<br>
The `target` option is **required** and is the reference point to you store API credentials located within the `sync.config.json` file. The target is the `target_name` property. The option accepts only a string for now.

**concurrency**<br>
The `concurrency` option defaults to 20. This option will allow you to set a number of parallel requests to run when uploading or downloading theme files.

**forceIgnore**<br>
Forcefully ignores files from the chokidor instance, preventing them from being read and printing to stdout. Reccomended if you are ignoring a large quantity of files.

**ignore**<br>
The ignore option accepts an array of files. You must use full path, for example `theme/assets/*.map`.

**callback**<br>
The callback function. Access the passed in file path and its content from within the function scope. `this.file` will return the parsed path of the file and `this.content` will supply you with a Buffer of the files contents.

> Use `this.content.toString()` to return the file content as a string opposed to Buffer.


# Contributing

Fork the project, run `yarn` and you're good to go.

# Changelog

Refer to the [Changelog](changelog.md) for each per-version update and/or fixes.
