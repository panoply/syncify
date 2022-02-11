**BETA VERSION**

<hr>

# @liquify/syncify

A blazing fast, extensible and superior alternative Shopify [theme kit](https://shopify.github.io/themekit/) tool. Syncify applies an intuitive approach for theme development that extends upon your existing build tools. It ships with a powerful and informative CLI that will spawn child processes for compiler coupling. Supports multiple storefront/theme synchronization with watch, upload, download and metafield sync capabilities included.

> Syncify exists as part of the [Liquify](https://liquify.dev) project.

### Key Features

- Upload, download and watch multiple storefronts and/or themes.
- Clear, concise and informative CLI logging.
- Supports HTML + Liquid and JSON minification.
- An elegant directory based metafields sync approach with JSON files.
- Built-in support for SCSS and CSS transpilation using SASS Dart and [PostCSS](https://postcss.org/).
- SVG Sprite and inlined SVG snippet generation using [SVGO](https://github.com/svg/svgo).
- Intelligent path mapping capabilities for custom theme directory structures.
- Digests existing build tool configurations for asset transformations.
- Prompt based CLI/TUI and exposed module API for script usage.

### Why?

I have been working on the Shopify platform for last several years and nothing the Shopify team maintain or have produced has actually helped in my productivity. Theme Kit (imo) is an utter mess. Syncify is fast, it's flexible and it will not lock you into some poorly thought through workflow and setup apparatus.

# Install

**PNPM**

```cli
pnpm add @liquify/syncify -D
```

**NPM**

```cli
npm i @liquify/syncify --save-dev
```

**Yarn**

```cli
yarn add @liquify/syncify --dev
```

# Contents

- [Overview](#overview)
  - [Theme Files](#theme-files)
  - [Asset Pipeline](#asset-pipeline)
  - [Built-in Support](#built-in-support)
- [Installation](#installation)
  - [Setup](#setup)
  - [Scopes](#scopes)
  - [Credentials](#credentials)
  - [Extending Schema](#Extending-Schema)
- [Configuration](#configuration)
  - [Stores](#options)
  - [Dirs](#dirs)
  - [Paths](#paths)
  - [Spawn](#spawn)
  - [Transform](#transforms)
    - [Icons](#icons)
    - [Styles](#styles)
    - [JSON](#json)
    - [Views](#views)
- [CLI Usage](#cli-usage)
  - [Commands](#commands)
  - [Prompts](#prompts)
- [API Usage](#api-usage)
  - [Export](#export)
  - [Config File](#config-file)
  - [Plugin](#config-file)
  - [Utilities](#utilities)
- [Contributing](#contributing)

# Overview

The main purpose of Syncify is to watch, build, download or upload files to and from your local machine to Shopify store\s via API. Syncify supports file transformation capabilities like minification and allows developers to spawn child running processes in parallel. It employs an intelligent queue-based sync/burst based upload approach.

#### Theme Files

Syncify uses built-in capabilities when handling snippets, templates, layouts, locales, configs and sections. Files using a `.liquid` or `.json` extension are considered **views** in Syncify. Content transformations like minification and path mappings are applied to these files types.

#### Asset Pipeline

Syncify does not want to re-create or impede on developer preferences and tool appropriation when it comes to handling asset files. Build tools and bundlers specifically designed for processing different assets types can be spawned and run in parallel with Syncify `build` and `watch` instances.

#### Asset Support

Syncify provides built-in support for handling SCSS, CSS and SVG files. These assets types can be transformed into theme snippets and processed together with build tools like [PostCSS](#) and [SVGO](#). When a `postcss.config.js` or `svgo.config.js` exists within a project, Syncify will consume them and generate output by passing their configurations through the transform process.

# Setup

After installing you will need to quickly configure a connection to your shopify store. In your `package.json` file you can define configuration using a `syncify{}` property. Syncify requires you provide admin API access token (recommended) or API Key and Secret as credentials. You will need to create a [private app](https://help.shopify.com/en/manual/apps/private-apps) to obtain this information from Shopify.

<details>
<summary>
<strong>Schemas</strong>
</summary>

Syncify exposes a large set of configuration options. If you are using a text editor like [VS Code](https://code.visualstudio.com/) or one that supports [JSON Schema Specs](https://json-schema.org/specification.html) then you can optionally extend the built-in `package.json` json schema the editor uses to provide features like hover descriptions, auto-completions and intellisense support for the `"syncify":{}` field. It is highly recommended that you extend the `package.json` json specifications.

**Generate using CLI**

Syncify can automatically generate the `package.json` specs for developers using VS Code. The settings reference will be written within a `.vscode` directory in the root of your project. Use the following command:

```
$ syncify --vsc
```

**Provide Manually**

If you wish to provide the specs manually you will need to create a `.vscode` directory and a `settings.json` within that directory in the root of your projects workspace. The `settings.json` should contain the following configuration settings:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["package.json"],
      "url": "https://schema.liquify.dev/syncify.json"
    }
  ]
}
```

> You can also apply this to your global workspace settings too, but it is recommended you extends schema on a per-project basis.

</details>

<details>
<summary>
<strong>Scopes</strong>
</summary>

You need to provide Syncify read and write access to a couple admin endpoints so it can perform operations. Below are the required scopes you will need to enable within in your private app.

#### Files

- write_files
- read_files

#### Pages

- write_online_store_pages
- read_online_store_pages

#### Themes

- write_themes
- read_themes

</details>

<details>
<summary>
<strong>Credentials</strong>
</summary>

Shop credentials are stored within a `.env` file. You can provide credentials in either uppercase of lowercase. Your store credentials **must** begin with the shop name following an underscore `_` character. Please refer to the `.env.example` file in this repository for an example. If you are syncing to multiple storefronts just follow the pattern for each store.

Using an **API Access Token**

```env
YOUR-SHOP-NAME_API_TOKEN = 'shpat_abcdefghijklmnopqrstuvwz
```

Using an **API key** and **API Secret**

```env
YOUR-SHOP-NAME_API_KEY = 'abcdefghijklmnopqrstuvwz'
YOUR-SHOP-NAME_API_SECRET = 'abcdefghijklmnopqrstuvwz'
```

</details>

# Configuration

Syncify configuration and options are defined with a `package.json` file. You can use the `"stores"` property to define theme targets. By default, Syncify will assume your _src_ files exist within a `source` directory (relative to your project root) and folders/files within the directory are structured in the default Shopify theme structure.

<details>
<summary>
<strong>Provide Manually</strong>
</summary>

<!-- prettier-ignore -->
```jsonc
{
  "syncify": {

    // THIS SETTING IS REQUIRED

    // Stores and themes to sync
    //
    "stores": [
      {
        "domain": "your-store", // Your myshopify name (without .myshopify)
        "themes": {
          "dev": 123456789, // Theme you want to sync (key property is target name)
          "prod": 543216789 // Another theme you want to sync
        }
      },
      {
        "domain": "example", // Optionally provide a second storefront.
        "themes": {
          "dev": 123456789 // Theme you want to sync (key property is target name)
        }
      }
    ],

    // THESE SETTINGS ARE OPTIONAL

    // Directory paths
    //
    "dirs": {
      "input": "source", // The src directory of files, relative to the root directory.
      "output": "theme", // The dist directory of files, relative to the root directory.
      "import": "import", // The directory for downloaded themes
      "export": "export", // The directory for packaged .zip theme files
      "config": "" // The directory of build config files (eg: rollup.config.js) - defaults to root.
    },

    // Customize the directory structures
    //
    "paths": {
      "assets": [], // An optional list of file paths to sync to the assets directory
      "config": [], // An optional list of paths to configuration files
      "locales": [], // An optional list of paths to locale files
      "layout": [], // An optional list of file paths to configuration files
      "sections": [], // An optional list of file paths to sections
      "snippets": [], // An optional list of file paths to snippets
      "templates": [], // An optional list of file paths to templates
      "customers": [], // An optional list of file paths to templates/customers
      "metafields": [] // An optional list of directories that contain metafields
    },

    // Spawned processes to run in parallel with Syncify
    //
    "spawn": {

      // Child processes to run in watch mode
      //
      "watch": {
        "rollup": "rollup -c -w", // Example of a rollup spawned process
        "esbuild": "esbuild ./config/index.js --watch" // Example of an esbuild spawned process
      },

      // Child processes to run in build/upload mode
      //
      "build": {
        "rollup": "rollup -c",
        "esbuild": "esbuild ./config/index.js --watch"
      }
    },

    // Transform options
    //
    "transform": {

      // SASS, SCSS files processing
      //
      "styles": [
        {
          "input": "", // An stylesheet input path, eg: styles/stylesheet.scss
          "snippet": false, // Generates an inline <style> tag and outputs as a snippet
          "rename": "", // Optionally rename the file, default to input name
          "watch": [], // A list of file paths that when changed should trigger compile
          "include": [], // An optional list of paths to include, eg: node_modules
          "postcss": {
            "env": "any" // Define an environment where postcss should run
          },
          "sass": {
            "logWarnings": true, // If Dart SASS should log warnings to CLI
            "sourcemap": true, // Whether or not to generate sourcemaps
            "style": "compressed" // The output style, accepts either "compressed" or "expanded"
          }
        }
      ],

      // SVG icon processing
      //
      "icons": {
        "snippets": [], // A list of paths to SVG files to process as snippets
        "sprites": [
          {
            "input": [], // A list of paths to SVG files to generate a as sprite
            "output": "", // Sprites are exported as snippets, define the filename here
            "options": {
              "dimensionAttributes": true, // Options passed to SVG Sprite
              "namespaceClassnames": false, // Options passed to SVG Sprite
              "namespaceIDS": false, // Options passed to SVG Sprite
              "rootAttributes": {} // A key > value list of attributes to applied to Sprite
            }
          }
        ]
      },

      // JSON file processing
      //
      "json": {
        "spaces": 2, // Define the beautification spaces JSON files should be written using.
        "minify": {
          "env": "never", // What ENV variable should minification be applied
          "removeSchemaRefs": true, // Strips $schema references from JSON (if any)
          "exclude": [] // An optional list of files to exclude from minification
        }
      },

      // Liquid file processing
      //
      "views": {
        "sections": {
          "allowPrefix": true, // Allow parent directory name prefix on sub dir nested sections
          "onlyPrefixDuplicates": false, // Only apply prefixing on duplicate named snippets
          "prefixSeparator": "_", // The separator character to use when prefixing
          "globals": [] // A list of directories or files to never have prefixing applied
        },
        "minify": {
          "env": "never", // What ENV variable should minification be applied on templates
          "minifyJS": true, // Whether or not to minify <script> tag contents
          "minifyCSS": true, // Whether or not to minify <style> tag contents
          "removeComments": true, // Whether or not to remove HTML comments
          "collapseWhitespace": true, // Whether or not to collapse whitespace
          "trimCustomFragments": true, // Whether or not to trim custom fragments
          "ignoreCustomFragments": [], // A regular expression list of fragments to ignore
          "minifySectionSchema": true, // Whether or not to minify {% schema %} contents
          "removeLiquidComments": true, // Whether or not to remove Liquid comments
          "removeAttributeNewlines": true, // Whether to strip newlines from HTML attribute values
          "removeRedundantDashTrims": false, // Remove redundant whitespace dash trims from liquid tags
          "ignoredLiquidTags": [], // A List of Liquid tags to ignore from minification
          "exclude": [] // A list of files/paths to exclude from minification.
        }
      }
    }
  }
}
```

</details>

### Stores

The `stores` option accepts an `array` type and holds a reference to all your shopify themes/store to sync. For each store you define, Syncify requires you provide the `domain` and the `themes` you wish to target. The `themes` object keys are target names and the value is an `id` of a theme.

<details>
<summary>
<strong>Example</strong>
</summary>

The `package.json` default stores configuration:

```json
{
  "syncify": {
    "stores": [
      {
        "domain": "shop-name",
        "themes": {
          "dev": 123456789,
          "prod": 123456789,
          "stage": 123456789,
          "test": 123456789
        }
      }
    ]
  }
}
```

</details>

Please see theme [Command](#commands) examples for more information.

### Dirs

The `dirs` option allows you to define custom base directories. In Syncify, `dirs` refers to the name of directories which are relative to the root of your project. You cannot define multi-level directories (eg: `some/dir`) or reverse paths (eg: `../dir`). The directories should preface folders contained from the root directory only.

<details>
<summary>
<strong>Example</strong>
</summary>

The `package.json` default configuration:

```json
{
  "syncify": {
    "dirs": {
      "source": "source",
      "output": "theme",
      "import": "import",
      "export": "export",
      "config": "."
    }
  }
}
```

</details>

#### `input`

The `input` option refers to your projects src build path. This is the directory where your development theme files exist. Syncify defaults this directory to `source`. The value defined here will be prepended to any path you define within `paths`.

#### `output`

The `output` option refers to your project dist build path. This is the directory where transformed theme files from `input` will be written. Syncify defaults this to `theme`. The output directory will be reflective of your online shop. You should point any asset files executing via a spawned process to point to the `assets` directory contained within.

#### `config`

The `config` option refers to a directory within your project where configuration files exist, like (for example) a `rollup.config.js` or `webpack.config.js` file. Syncify by default (when this option is undefined) will look for configuration files in the root of your project but this might not always be ideal as it can create clutter in your workspace. This `config` directory allows you to optionally place spawn config files within a sub-directory that is relative to root.

> Typically this is named `scripts` in most node projects. Be sure to point output paths within third party configs to the assets output assets directory..

#### `import`

The `import` option refers to a directory where downloaded themes will be written. Syncify provides the ability to download themes from your online store and it is within this directory theme files will be created.

#### `export`

The `export` option refers to a directory where packaged (.zip) themes will be written when running the `package` resource via the CLI. Packaged themes will be prepended with the version number defined in your `package.json` file and are exported as `.zip` files.

#### `metafields`

The `metafields` option refers to a directory within your project which can contain global JSON metafield files. Syncify supports metafield sync capabilities using a simple directory > file based approach, where sub-directories represent metafield a `namespace` value, JSON files contained within represent metafield `key` values and the contents files the JSON to be written to you store.

<table>
  <thead>
    <tr>
      <th align="left">&nbsp;&nbsp;&nbsp;&nbsp;Metafield Structure</th>
      <th align="left">&nbsp;&nbsp;&nbsp;&nbsp;Description</th>
    </tr>
  </thead>
  <tbody>
      <td>
        <pre>
        <code>
  source
  │
  └── metafields
      │
      ├── garment
      │   ├── fits.json
      │   ├── sizes.json
      │   └── fabrics.json ㅤㅤ ㅤㅤ ㅤㅤ
      │
      └── details
          ├── colors.json
          └── weight.json
        </code>
        </pre>
      </td>
      <td>
       &nbsp;&nbsp;&nbsp;Metafields will be published to the global <code>shop</code> object.<br>
       &nbsp;&nbsp;&nbsp;Syncify will use the sub-directory names as the metafield<br>
       &nbsp;&nbsp;&nbsp; <code>namespace</code> and the JSON file names contained within<br>
       &nbsp;&nbsp;&nbsp;each namespace directory are used as the metafield <code>key</code> name.<br><br>
       <strong>Example:</strong><br><br>
        <ul>
           <li><code>{{ shop.metafields.garment.fits.value }}</code></li>
           <li><code>{{ shop.metafields.garment.sizes.value }}</code></li>
           <li><code>{{ shop.metafields.garment.fabrics.value }}</code></li>
           <li><code>{{ shop.metafields.details.colors.value }}</code></li>
           <li><code>{{ shop.metafields.details.weight.value }}</code></li>
       </ul>
      </td>
    </tr>
  </tbody>
</table>

## Paths

The `paths` option allows you to define a custom set of paths that point to theme specific files contained within your defined `input` directory. Syncify does not require you set a development structure consistent with that required by Shopify because files are re-routed to the standard theme structure. Each path option accepts an `array` of glob ([anymatch](https://www.npmjs.com/package/anymatch)) patterns. By default, Syncify assumes you are using the basic-bitch (default) structure.

<details>
<summary>
Defaults
</summary>

The `package.json` default configuration:

<!-- prettier-ignore -->
```json
{
  "syncify": {
    "paths": {
      "assets": [
        "source/assets/**"
      ],
      "config": [
        "source/config/*.json"
      ],
      "locales": [
        "source/locales/*.json"
      ],
      "layout": [
        "source/layout/.liquid"
      ],
      "metafields": [
        "source/metafields/**/*.json",
      ],
      "sections": [
        "source/sections/*.liquid"
      ],
      "snippets": [
        "source/snippets/*.liquid"
      ],
      "templates": [
        "source/templates/*.liquid",
        "source/templates/*.json"
      ],
      "customers": [
        "source/templates/customers/*.liquid",
        "source/templates/customers/*.json"
      ]
    }
  }
}
```

</details>

The **customized structure** shown below is an example of how you _could_ arrange an `input` directory using Syncify. The **default structure** is what Syncify will use if no `paths` are defined in your configuration. The **output structure** is what Syncify will build from source structures.

<table>
  <thead>
    <tr>
      <th colspan="3">
        Customized Structure&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ⇨&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Output Structure&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⇦&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default Structure</th>
    </tr>
  </thead>
  <tbody>
      <td>
        <pre>
        <code>
  source
  │
  ├── assets
  │  ├─ files
  │  ├─ icons
  │  └─ images
  ├─ data
  │  ├─ config
  │  ├─ locales
  │  └─ metafields
  │     └─ namespace
  │        └─ key.json ㅤ ㅤ ㅤㅤ
  ├─ styles
  ├─ scripts
  └─ views
     ├─ customers
     ├─ sections
     ├─ snippets
     ├─ templates
     └─ theme.liquid
        </code>
        </pre>
      </td>
          <td>
      <pre>
      <code>ㅤ
          ㅤ
          ㅤ
          ㅤ
         ㅤㅤ
         ㅤ
  theme
  │
  ├─ assets
  ├─ config
  ├─ locales
  ├─ layout
  ├─ sections
  ├─ snippets
  └─ template
     └─ customer ㅤㅤ
        ㅤ
        ㅤ
        ㅤ
        ㅤ
      </code>
      </pre>
      </td>
      <td>
      <pre>
      <code>
           ㅤ
         ㅤㅤ
         ㅤ
         ㅤ
  source
  │
  └── assets
      ├─ config
      ├─ layout
      ├─ locales
      ├─ metafields
      │  └─ namespace
      │     └─ key.json ㅤ ㅤㅤ
      ├─ sections
      ├─ snippets
      └─ templates
         └─ customers
         ㅤ
         ㅤ
         ㅤ
      </code>
      </pre>
      </td>
    </tr>
  </tbody>
</table>

_There is no distributed difference between the **customized** and **default** structures. Both would generate output that Shopify understands. Only the input file `source` locations differ but the **output** will always be written to a standard Shopify theme._

#### `assets[]`

An array list of glob path patterns to **asset** files. These will be written to the `assets` directory of your defined `output` path. Please note that you if you transforming CSS, SCSS, SASS or SVG file types using Syncify then you do not need to define those paths here as the transform option will do automatically route them. This is the same for assets being processed by spawns. Any paths defined in `assets` will typically just pass through.

#### `customers[]`

An array list of glob path patterns to `.liquid` or `.json` **customer** template files. These will be written to the `templates/customers` directory of your defined `output` path.

#### `locales[]`

An array list of glob path patterns to `.json` **locale** files. These will be written to the `locales` directory of your defined `output` path.

#### `config[]`

An array list of glob path patterns to `.json` **config** files. These will be written to the `config` directory of your defined `output` path.

#### `layout[]`

An array list of glob path patterns to `.liquid` **layout** files. These will be written to the `layout` directory of your defined `output` path.

#### `sections[]`

An array list of glob path patterns to `.liquid` **section** files. These will be written to the `sections` directory of your defined `output` path. Sections can be structured within sub-directories. If a section file is determined to be deeply nested in such a way then this option will enable parent directory name prefixing to be applied the output filenames.

If the section input path is `source/sections/index/some-file.liquid` then the filename will be prefixed with `index` so when referencing it within themes you'd need to use `index_some-file.liquid` in `{% section %}` tags. Prefixing is helpful when you have a large number of sections and want to avoid name collusions. You can only control what sub-directories should have prefexing applied using the `global[]` option or alternatively do not reference paths to sections which contain sub directories.

See [Sections](#sections).

#### `snippets[]`

An array list of glob path patterns to `.liquid` **snippet** files. These will be written to the `snippets` directory of your defined `output` path.

#### `templates[]`

An array list of glob path patterns to `.json` or `.liquid` **template** files. These will be written to the `templates` directory of your defined `output` path.

# Spawn

The spawn option accepts a key > value list of commands (scripts) which you can run in `watch` and `build` modes. Spawn allows you to leverage additional build tools and have them run in parallel with Syncify.

### Define

There are 2 available modes from which you can trigger a spawned process. When a process is spawned in `watch` mode it will run along side Syncify, so you need to provide any flags the build tool may require in watch mode. Spawning a process in `build` mode will trigger the commands only 1 time, so it is here where you would pass your bundle specific command.

<!-- prettier-ignore -->
```json
{
  "syncify": {
    "spawn": {
      "build": {},
      "watch": {}
    }
  }
}
```

### Example

In most situations you will leverage the spawn option to compile TypeScript or JavaScript assets. Below we will walk through how we can run 2 well known JavaScript bundlers, rollup and webpack together with Syncify in both watch and build modes.

### Spawn Rollup

<!-- prettier-ignore -->
```json
{
  "syncify": {
    "spawn": {
      "build": {
        "rollup": "rollup -c"
      },
      "watch": {
        "rollup": "rollup -c -w"
      }
    }
  }
}
```

### Spawn Webpack

<!-- prettier-ignore -->
```json
{
  "syncify": {
    "spawn": {
      "build": {
        "webpack": "webpack --color --config config/webpack.config.js"
      },
      "watch": {
        "webpack": "webpack --watch --color --config config/webpack.config.js"
      }
    }
  }
}
```

# Transform

TODO

# CLI Usage

Syncify ships with a powerful command line interface that supports prompt execution. If you have installed Syncify globally, you can call `syncify` from any project but you should avoid this and instead install the module as a development dependency on a per-project basis. If you are using a package manager like [pnpm](https://pnpm.js.org/en/cli/install) you can simply call `pnpm syncify` but if you are using npm or yarn then you may need to create reference script in your `package.json` file, for example:

```json
{
  "scripts": {
    "syncify": "syncify"
  }
}
```

> If you are not using [pnpm](https://pnpm.js.org/en/cli/install) then you should really consider adopting it within your stack. It is a wonderful addition to any JavaScript project.

### Commands

The Syncify CLI provides the following commands:

```cli
Default:
  $ syncify       Starts interactive CLI command prompt

Aliases:
  $ sync          An alias of syncify (can be used instead of syncify)

Commands:
  $ syncify                   Starts interactive CLI command prompt
  $ syncify --flags           Passing flags
  $ syncify <store> --flags   Store name or comma separated list of stores and flags

Flags:
  -b, --build            Triggers a build, use with upload to run build before uploading
  -w, --watch            Starts watching for changes of files
  -u, --upload           Triggers a build, use with upload to run build before uploading
  -d, --download         Downloads themes/s from specified stores
  -s, --store            A comma separated list of stores
  -t, --theme            A comma separated list of themes
  -o, --output  <path>   A path value (used in download and build mode only)
  -h, --help,            Prints command list and some help information
  --clean,               Removes all output files, use with --build to clean before bundling
  --vsc                  Generates JSON schema spec for vscode users
  --dev                  Run in development mode (default)
  --prod                 Run in production mode
```

### Example

CLI usage aims to be as simple as possible. A typical project will be targeting a single Shopify theme but you can target multiple themes and stores. When targeting multiple stores/themes you can pass the store name as a flag followed by comma separated list of theme targets. See below examples:

**Watching 1 store and 1 theme**

```cli
$ syncify shop -w -t dev
```

<details>
<summary>
Breakdown
</summary>

The above command is calling `watch` on a store named `cool-shop` and will upload changes to a theme named `dev`. We are using the shorthand `--theme` flag (`-t`) to inform upon the theme we want changes uploaded.

</details>

<details>
<summary>
Configuration
</summary>

The `package.json` configuration for the command would look like this:

```jsonc
{
  "syncify": {
    "stores": [
      {
        "domain": "cool-shop", // The store name
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
$ syncify shop -w -t dev,prod
```

<details>
<summary>
Breakdown
</summary>

The above command is calling `watch` on a store named `my-shop` and will upload changes to 2 different themes in that store we have named `dev` and `prod`.

</details>

<details>
<summary>
Configuration
</summary>

The `package.json` configuration for the command would look like this:

```jsonc
{
  "syncify": {
    "stores": [
      {
        "domain": "my-shop", // The store name
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
$ syncify shop1,shop2 -w --shop1=test --shop2=dev,stage,prod
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
    "stores": [
      {
        "domain": "shop1", // The store name
        "themes": {
          "test": 123456789 // The theme id and target name
        }
      },
      {
        "domain": "shop2", // The store name
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

### Prompts

Syncify provides a helpful command prompt feature. Running `syncify` will provide you a simple prompt interface.

# API Usage

Syncify can be initialized within scripts. This approach is a little more feature-full and allows you to integrate it with different build tools. You can hook into the transit process of files and apply modifications before they are uploaded to your store/s with this approach.

### Utilities

Utilities will return some basic information about the Syncify instance. These are extremely helpful when when you are executing spawned processes and need to control what feature to load. For example, if you are spawning a webpack process for compiling JavaScript assets and need to inform upon watch mode you'd use `util.resource('watch')` which returns a boolean value when running in watch mode.

```typescript
import { util } from 'shopify-sync'

// Environment
util.env('dev' | 'prod' ): boolean

// Returns the current resource
util.resource('watch' | 'upload' | 'download'): boolean

// Returns spawns
util.spawned(): string[]

```

### Instance

```javascript
import syncify from '@liquify/syncify';
```

Create a script command within your `package.json` file.

```json
{
  "scripts": {
    "watch": "node src/name-of-file.js"
  }
}
```

# Contributing

This project uses [pnpm](https://pnpm.js.org/en/cli/install). Fork the project, run `pnpm i` and you're good to go. If you're using Yarn like the rest of the plebs or npm then you will still need to install pnpm.

# Author

Created by [Nίκος Σαβίδης](https://github.com/panoply) of [Sissel ΣaaΣ](https://sissel.io).

# Changelog

Refer to the [Changelog](changelog.md) for each per-version update and/or fixes.
