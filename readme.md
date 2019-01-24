[![npm version](https://badge.fury.io/js/shopify-sync.svg)](https://www.npmjs.com/package/shopify-sync)

# Shopify Sync

A node equivalent shopify [theme kit](https://shopify.github.io/themekit/) tool that can be used for watching, uploading or downloading theme files to multiple stores concurrently. Use in a node script, gulp task or with the command line.

> Shopify Sync is a stripped down and heavily modified version of [Quickshot](https://github.com/internalfx/quickshot).

### Use case?

The main purpose of the module is to watch a specified directory in your project and upload changed or modified files to a configured Shopify theme.

## Installation

```cli
yarn add shopify-sync --dev
```

After installing, you will need to create a  `sync.config.json` file. This file is used by Shopify Sync and will hold your store API credentials.

You can generate this using the command line interface by running `yarn sync configure` or  you can create a file in the root of your directory named `sync.config.json`:

```json
{
  "concurrency": 20,
  "ignore_file": ".syncignore",
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
There are two different ways you can integrate and use Shopify Sync. You can include it into your node project and initialize with a script:

### Script

```javascript
import sync from 'shopify-sync'

sync('upload', {
  dir: 'example',
  target: 'development',
  ignore: [
    'example/sections/ignore.js',
    'example/assets/ignore.liquid'
  ]
})

```

Create a script command within your `package.json` file.

```json
"scripts": {
   "sync": "node src/name-of-file.js"
}
```

### Command Line
You also can use this with command line

|     Command    | Details
|----------------|-------------------------------
|`sync` | Show list of commands
|`sync configure` | Creates/Updates the configuration file
|`sync theme` | Manage Shopify themes


### Gulp 4

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



## Options
If you're initializing within a script you have a couple of additional options opposed to running the sync via the command line.

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

**ignore**<br>
The ignore option accepts an array of files. You must use full path, for example `theme/assets/*.map`. You can also just use the `.syncignore` file.
