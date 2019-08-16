[![npm version](https://badge.fury.io/js/shopify-sync.svg)](https://www.npmjs.com/package/shopify-sync)

<hr>

# Shopify Sync

 A node equivalent shopify [theme kit](https://shopify.github.io/themekit/) tool that can be used for watching, uploading or downloading theme files to multiple stores concurrently.

 > Shopify Sync is hard fork version of the Theme development tool [Quickshot](https://github.com/internalfx/quickshot) which has been stripped down and heavily modified.


### Use case?

The main purpose of the module is to watch a specified directory in your project and upload changed or modified files to a configured Shopify theme.

## Installation

Yarn
```cli
yarn add shopify-sync --dev
```

NPM
```cli
npm install shopify-sync --save-dev
```

After installing, you will need to create a  `.shopifysync` file. This file will hold your store API credentials. The configuration file is written in `JSON`. You can define configurations here.

```jsonc
{
  // An array of themes to sync with,
  "targets": [
     {
      "target_name": "development",
      "api_key": "",
      "password": "",
      "domain": "your-store",
      "primary_domain": "https://primary-domain.com",
      "theme_name": "Development",
      "theme_id": 123456789
    }
  ]
}

```

## Usage
Initialize as a function:

```javascript
import sync from 'shopify-sync'

sync('upload',  // Resource type (upload, download, watch)
{
  dir: 'example', // The directory of to watch
  target: 'development', // Your theme target
  concurrency: 20, // Number of parallel requests
  forceIgnore: false,  // Apply ignores at chokidor instance
  ignore: [ // Accepts an array of files and/or an anymatch `/*/**` wildcard
    'example/assets/*.map.js',
    'example/snippets/ignore.liquid'
  ]
}, function(){

   // Execute callback function
   // this.file (returns parsed file path object)

})

```

Create a script command within your `package.json` file.

```json
"scripts": {
   "sync": "node src/name-of-file.js"
}
```

Additionally, if you're using Gulp 4 you can just call from within a task function:

```javascript
import sync from 'shopify-sync'

function syncTask (done) {

   sync('upload', {
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
You also can intialize via the command line. Create a script reference in your `package.json` file.

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
If you're initializing within a script you have a couple of additional options opposed to running the sync via the command line.

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
The `dir` option defaults to `theme` and is the directory that Shopify Sync will `watch`, `upload` or `download` modified or changed files from.

> You cannot use deep or nested directories when using the `watch` resource. The watch resource will only accepts a directory that resides within the root of your project.

**target**<br>
The `target` option is **required** and is the reference point to you store API credentials located within the `sync.config.json` file.

> The target is the `target_name` property. The option accepts only a string for now.

**concurrency**<br>
The `concurrency` option defaults to 20. This option will allow you to set a number of parallel requests to run when uploading or downloading theme files.

**forceIgnore**<br>
Forcefully ignores files from the chokidor instance, preventing them from being read and printing to stdout. Reccomended if you are ignoring a large quantity of files.

**ignore**<br>
The ignore option accepts an array of files. You must use full path, for example `theme/assets/*.map`. You can also just use the `.syncignore` file.

**callback**<br>
The callback function. Access the passed in file path with `this.file`.

