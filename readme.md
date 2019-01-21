[![npm version](https://badge.fury.io/js/shopify-sync.svg)](https://www.npmjs.com/package/shopify-sync)

# Shopify Sync

A node equivalent shopify [theme kit](https://shopify.github.io/themekit/) tool that can be used for watching, uploading or downloading theme files to multiple stores concurrently. Use in a node script, gulp task or with the command line.

> Shopify Sync is a stripped down and heavily modified version of [Quickshot](https://github.com/internalfx/quickshot).

### When should I use this?

The main purpose of the module is to watch a specified directory in your project and upload changed or modified files to a configured Shopify theme. You can use it to upload files during development to your store. The added bonuses of uploading and downloading themes is also available.

## Installation

```cli
npm install shopify-sync
```

Access the wizard by creating a script tag with the value of `sync` in your projects root directory `package.json` file.

```json
"scripts": {
   "sync": "sync"
}
```
After installing, you will need to create a  `sync.config.json` file. This file is used by Shopify Sync and will hold your store API credentials. You can generate this using the command line interface by running `yarn sync configure` or  you can create a file in the root of your directory name `sync.config.json` – The config file should look like this:

```json
{
  "concurrency": 20,
  "ignore_file": ".syncignore",
  "targets": [{
      "target_name": "development",
      "api_key": "123456789abcdefghijklmnop",
      "password": "123456789abcdefghijklmnop",
      "domain": "your-store",
      "primary_domain": "https://primary-domain.com",
      "theme_name": "Development",
      "theme_id": 123456789
    }
  ]
}

```

## Usage
You can integrate Shopify Sync into any node project and you also have the command line interface depending on how you want to control things. Below is couple of examples:

#### Command Line

|     Command    | Details
|----------------|-------------------------------
|`sync` | Show list of commands
|`sync configure` | Creates/Updates the configuration file
|`sync theme` | Manage Shopify themes


### Node Script
If you're initializing within a node script you have 3 options:

|    Option    | Details
|----------------|-------------------------------
|`run` | *watch, upload or download*
|`target` | *Name of the theme you want to target*
|`concurrency` | *How many parallel requests to run*


```javascript
import sync from 'shopify-sync'

sync({
   run: 'watch', // REQUIRED
   target: 'development' // REQUIRED
})

```
Create a script command within your `package.json` file:

```json
"scripts": {
   "sync": "node src/name-of-file.js"
}
```

### Gulp 4 Task
Run the Shopify Sync within a Gulp 4 task:

```javascript
import sync from 'shopify-sync'

function sync (done) {

   sync({
      run: 'watch',
      target: 'development'
   })

   done()
}

export.default = parallel(exampleTask, sync)
```

