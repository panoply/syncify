# Syncify ~ Dawn

Basic level [Syncify](https://github.com/panoply/syncify) strap building the Shopify [Dawn](https://github.com/Shopify/dawn) theme. This example is the most low level (elementary) configurations for building themes leveraging Syncify.

### Showcasing

This strap demonstrates how Syncify can be used as a replacement for the Shopify CLI. Consult the [syncify.config.js](/syncify.config.js) file overview of the logic.

- Uses `syncify.config.js` file for configuration
- Optionally Bundles JavaScript files
- Optionally Bundles CSS files
- Optionally Process CSS with PostCSS, Autoprefixer and CleanCSS.
- Leverages sub-directories and renames

# Instructions

Fork or download this repository. You should install [pnpm](https://pnpm.js.org/en/cli/install) and use it instead of npm or yarn (though they are also supported). Follow the below steps, this is not complicated and Syncify will help you.

1. Run `pnpm install` to install dependencies
2. Run `pnpm sy --setup` and follow the prompts

### Commands

Couple of basic commands to use during development

```bash
$ pnpm sy -w              # Runs Syncify in development watch mode
$ pnpm sy -w --hot        # Runs Syncify in development watch mode with hot reloads
$ pnpm sy -b              # Runs Syncify in build mode
$ pnpm sy -b --prod       # Runs Syncify in build mode with production output
$ pnpm sy -p              # Runs Syncify publish mode to export theme
```

# License

MIT
