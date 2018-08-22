# Shopify Sync

A stripped down and slightly modified version of the [Quickshot](https://github.com/internalfx/quickshot) shopify development tool which only implements the `upload`, `download` and `watch` command functionality. Shopify Sync is used in conjunction with the [Shopify Strap](https://github.com/panoply/shopify-strap) development environment theme which is an opionated jumpstart build tool and store theme boilerplate for Shopify projects.

### Why not just use Quickshot?
You can! This version is just a copy with several features eliminated which enables us to keep its dependencies up-to-date and give a little more control over logging and implementations with the [Shopify Strap](https://github.com/panoply/shopify-strap) theme.

### When should I use this?
Unless you're using Shopify Strap, then you shouldn't use Shopify Sync! Only in some rare real world situations would you maybe require this module. For most projects just use [Quickshot](https://github.com/internalfx/quickshot) or the [Shopify Theme Kit](https://www.youtube.com/watch?v=4umc0Nd4Tvc).

## Installation
Install this dependency globally to access the `store` command from any directory.

```
npm install shopify-sync -g
```

If you don't want as a global dependency you will need to access the wizard by creating a script tag with the value of `sync` in your projects root directory.

```
"scripts": {
   "sync": "sync"
}
```

> If you're using Shopify Strap you can access the CLI wizard with `yarn sync`

## Modified Features

- CLI uses `sync [options]` opposed to `quickshot [options]` commands.
- Uses `.strignore` opposed to `.quickshotignore` file.
- Slightly more modified CLI logging.
- Dependencies use latest versions.
- No Babel (ES6) or SASS transpilation.
- Settings use a `sync.config.json` file opposed to `quickshot.json` file.
