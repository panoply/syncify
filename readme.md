[![npm version](https://badge.fury.io/js/shopify-sync.svg)](https://www.npmjs.com/package/shopify-sync)

# Shopify Sync

A node equivlent shopify [theme kit](https://shopify.github.io/themekit/) tool that can be used for watching, uploading or downloading theme files to multiple stores concurrently.

> Shopify Sync is a stripped down and heavily modified version of [Quickshot](https://github.com/internalfx/quickshot).

### When should I use this?

You can use this in node projects. The main purpose of the module is to watch a specified directory in your project and upload changed or modified files to a configured Shopify theme.

## Installation
Install this dependency globally to access the `sync` command from any directory.

```cli
npm install shopify-sync -g
```

If you don't want as a global dependency you will need to access the wizard by creating a script tag with the value of `sync` in your projects root directory.

```json
"scripts": {
   "sync": "sync"
}
```

## Usage
You can intergrate Shopify Sync into any node project and you also have the command line interface depending on how you want to control things, Below is couple of examples:

#### Command Line

|     Command    | Details
|----------------|-------------------------------
|`sync` | Show list of commands
|`sync configure` | Creates/Updates the configuration file
|`sync theme` | Manage Shopify themes


#### Node Script:

```javascript

import shopifySync from 'shopify-sync'


sync({
   run: 'watch',
   target: 'development'
})

```


Create a command within your `package.json` file:

```json
"scripts": {
   "watch": "node src/sync.js"
}
```

#### [Gulp 4](gulpjs.com) Task

```javascript

import shopifySync from 'shopify-sync'

function shopifySync (done) {

   sync({
      run: 'watch',
      target: 'development'
   })

   done()
}

export.default = parallel(exampleTask, shopifySync)
```

