**BETA VERSION**

<hr>

# @liquify/syncify

A blazing fast, extensible and superior alternative Shopify [theme kit](https://shopify.github.io/themekit/) tool. Syncify applies an intuitive approach for theme development that extends upon your existing build tools. It ships with a powerful and informative CLI that can spawn child processes (compiler coupling). Supports multiple storefront theme synchronization with watch, upload, download and metafield capabilities included.

**Syncify exists as part of the [Liquify](https://liquify.dev) project**

### Key Features

- Upload, download and watch multiple storefronts and/or themes.
- Clear, concise and informative CLI logging.
- Supports HTML + Liquid and JSON minification.
- An elegant directory based metafields sync approach using JSON files.
- Built-in support for SCSS and CSS transpilation using SASS Dart and [PostCSS](https://postcss.org/).
- SVG Sprite and inlined SVG snippet generation using [SVGO](https://github.com/svg/svgo).
- Intelligent path mapping capabilities for custom theme directory structures.
- Digests existing build tool configurations for asset transformations.
- Prompt based CLI/TUI and exposed module API for script usage.

### Why?

I have been working on the Shopify platform for last several years and nothing the Shopify team maintain or have produced has actually helped in my productivity. Theme Kit and other tools in this nexus fail to achieve fluidity (imo). Syncify is how I handle theme creation, development and maintenance, it's fast, flexible, extensible, scalable and will not lock you into some restrictive workflow and setup apparatus.

# Install

Install as development dependency in your project. Syncify will run a script on post-install which writes default configuration options to your `package.json` file.

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

# Overview

The main purpose of Syncify is to facilitate seamless theme development between your local machine and Shopify store. It ships with build, watch, build download, upload, merge and pull capabilities.

### Theme Files

Syncify uses built-in capabilities when handling snippets, templates, layouts, locales, configs and sections. Files using a `.liquid` or `.json` extension are considered **views** in Syncify. Content transformations like minification and path mappings are applied to these files types.

### Asset Pipeline

Syncify does not want to re-create or impede on developer preferences and tool appropriation when it comes to handling asset files. Build tools and bundlers specifically designed for processing different assets types can be spawned and run in parallel with Syncify `build` and `watch` instances.

### Asset Support

Syncify provides wrapper support for handling SCSS, CSS and SVG files. These assets types can be transformed into theme snippets and processed together with build tools like [PostCSS](#) and [SVGO](#). When a `postcss.config.js` or `svgo.config.js` exists within a project, Syncify will consume them and generate output using their configurations.

# Setup

After installing you will need to configure a connection to your shopify store. In your `package.json` file you can define configuration within via a `syncify` property. Syncify requires you provide either an admin API access token (recommended) or API Key and secret as credentials.

<details>
<summary>
<strong>Authorize</strong>
</summary>
<p>

You will need to create a [private app](https://help.shopify.com/en/manual/apps/private-apps) to obtain this information from Shopify. If you are coming from [Theme Kit](https://shopify.dev/themes/tools/theme-kit) you might be able to port those settings but it is recommended that you generate API access information specifically for usage with Syncify.

**Steps:**

1. From your Shopify admin, go to **Apps**.
2. Click **Develop apps**.
3. Click **Create an app**.
4. Provide an App name (eg: `Syncify`) and click **Create app**
5. The app will be created, then click **Configure Admin API Scope**
6. Select the required scopes (listed below)
7. Click **Save**
8. Goto the **API credentials** tab,
9. Under **Access Tokens** press the **Install app** button.
10. Press **Reveal token once** and copy the token into an `.env` file.

</p>
</details>

<details>
<summary>
<strong>Scopes</strong>
</summary>
<p>

You need to provide Syncify read and write access to a couple admin endpoints so it can perform operations. Below are the required scopes you to enable within in your private app.

#### Files

- write_files
- read_files

#### Pages

- write_online_store_pages
- read_online_store_pages

#### Themes

- write_themes
- read_themes

</p>
</details>

# Credentials

Shop credentials can be stored within a `.env`, `.syncifyrc` file or supplied at runtime by assigning `process.env` variables. Using an `.env` file is the preferred approach for most use cases.

### Using a `.env` file

When using a `.env` file, you can provide shop credentials in either uppercase of lowercase format. The `.env` values **must** begin with the shop name following an underscore `_` character. If you are syncing to multiple storefronts just follow the pattern for each store.

Using an **API Access Token**

```env
YOUR-SHOP-NAME_API_TOKEN = 'shpat_abcdefghijklmnopqrstuvwz'
```

Using an **API key** and **API Secret**

```env
YOUR-SHOP-NAME_API_KEY = 'abcdefghijklmnopqrstuvwz'
YOUR-SHOP-NAME_API_SECRET = 'abcdefghijklmnopqrstuvwz'
```

### Using a `.syncifyrc` file

If you do not wish to use an `.env` file you can store API credentials within a `.syncifyrc` or `.syncifyrc.json` file. When using this approach it is important that the file is added to `.gitignore` and never committed to a public repository. The `.syncifyrc` file expects credentials be supplied as array list and depending on your authorization method, each item should use one of following structures:

Using an **API Access Token**

```json
[
  {
    "domain": "your-shop-name",
    "token": "shpat_abcdefghijklmnopqrstuvwz"
  }
]
```

Using an **API key** and **API Secret**

```json
[
  {
    "domain": "your-shop-name",
    "key": "abcdefghijklmnopqrstuvwz",
    "secret": "abcdefghijklmnopqrstuvwz"
  }
]
```

### Using `process.env` variables

Syncify also supports runtime credential referencing. This approach allows you to set credentials via the command line or within a script executable. This approach is highly discouraged and rather insecure, so avoid doing this and instead leverage one of the other methods available.

Using an **API Access Token**

```js
// Using an API Access Token
process.env['YOUR-SHOP-NAME_API_TOKEN'] = 'shpat_abcdefghijklmnopqrstuvwz';
```

Using an **API key** and **API Secret**

```js
// Using an API Key and API Secret
process.env['YOUR-SHOP-NAME_API_KEY'] = 'abcdefghijklmnopqrstuvwz';
process.env['YOUR-SHOP-NAME_API_SECRET'] = 'abcdefghijklmnopqrstuvwz';
```

# Package Schema

Syncify exposes a large set of configuration options. If you are using a text editor like [VS Code](https://code.visualstudio.com/) or one which supports extension of [JSON Schema Specs](https://json-schema.org/specification.html) then you can optionally extend `package.json` schemas. JSON schema specs provide features like hover descriptions, validations, auto-completion and intellisense with JSON file types. Extending the package schema will enable these capabilities on the `syncify` field.

> It is **highly recommended** that you extend the `package.json` json specifications.

### Generate via CLI (vscode users)

Syncify can automatically generate the `package.json` schema specs for developers using VS Code. The settings reference will be written within a `.vscode` directory in the root of your project workspace:

```
syncify --vsc
```

### Provide Manually

If you wish to provide the specs manually you will need to create a `.vscode` directory and `settings.json` file within in it. The `settings.json` should contain the following configuration settings:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["package.json"],
      "url": "https://schema.liquify.dev/syncify.json"
    },
    {
      "fileMatch": [".syncifyrc", ".syncifyrc.json"],
      "url": "https://schema.liquify.dev/syncifyrc.json"
    }
  ]
}
```

# Configuration

Syncify configuration options can be defined from a `syncify` property in your `package.json` file. By default, Syncify assumes **src** files exist within a directory named `source` and the contents of this directory are using the default Shopify theme structure.

### Options

The default options Syncify uses will be automatically applied to your `package.json` file after installing the module. If you are using [VS Code](https://code.visualstudio.com/) then please add the [Package Schema](#package-schema) reference to your workspace settings to enable intellisense features on this field. Below is the default settings that are applied.

<!-- prettier-ignore -->
```jsonc
{
  "syncify": {
    "stores": [
       {
        "domain": null,
        "themes": {}
      }
    ],
    "dirs": {
      "input": "source",
      "output": "theme",
      "import": "import",
      "export": "export",
      "config": "."
    },
    "paths": {
      "assets": [],
      "config": [],
      "locales": [],
      "layout": [],
      "sections": [],
      "snippets": [],
      "templates": [],
      "customers": [],
      "metafields": []
    },
    "spawn": {
      "watch": {},
      "build": {}
    },
    "transform": {
      "styles": [
        {
          "input": null,
          "rename": null,
          "watch": [],
          "include": [],
          "snippet": false,
          "postcss": {
            "env": "all"
          },
          "sass": {
            "logWarnings": true,
            "sourcemap": true,
            "style": "compressed"
          }
        }
      ],

      "icons": {
        "snippets": [],
        "sprites": [
          {
            "input": [],
            "output": null,
            "options": {
              "dimensionAttributes": true,
              "namespaceClassnames": false,
              "namespaceIDS": false,
              "rootAttributes": {}
            }
          }
        ]
      },
      "json": {
        "spaces": 2,
        "minify": {
          "env": "never",
          "removeSchemaRefs": true,
          "exclude": []
        }
      },
      "views": {
        "sections": {
          "allowPrefix": true,
          "onlyPrefixDuplicates": false,
          "prefixSeparator": "-",
          "globals": []
        },
        "minify": {
          "env": "never",
          "minifyJS": true,
          "minifyCSS": true,
          "removeComments": true,
          "collapseWhitespace": true,
          "trimCustomFragments": true,
          "ignoreCustomFragments": [],
          "minifySectionSchema": true,
          "removeLiquidComments": true,
          "removeAttributeNewlines": true,
          "removeRedundantDashTrims": false,
          "ignoredLiquidTags": [],
          "exclude": []
        }
      }
    }
  }
}
```

### Stores

The `stores` option accepts an `array` list of items. Each item in this array will hold an object reference to your shopify stores and their themes. This information can be provided to Syncify within your `package.json` file or alternatively you can use a `.syncifyrc` or `.syncifyrc.json` file. For each store you define, Syncify requires you provide the shop name and theme ids you wish to sync. The `themes` object uses a **key** > **value** approach.

Please see theme [Command](#commands) examples for more information on how this is used with the CLI.

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

#### Using a `.syncifyrc` file

In some situations using the `package.json` file for store and theme references may not be the ideal. If you are working with a large and using multiple development stores you can provide `stores` within a `.syncifyrc` or `.syncifyrc.json` file.

```json
[
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
```

> If you are using a `.syncifyrc` file to store your shop credentials, then you need only add theme id references.

<details>
<summary>
<strong><code>Domain</code></strong>
</summary>
<p>

The `domain` option expects a string value, which is your Shopify store name without the `myshopify.com` portion. The domain will be used by the CLI as a target reference argument. Each store (domain) can have multiple themes.

</p>
</details>

<details>
<summary>
<strong><code>Themes</code></strong>
</summary>
<p>

The `themes` option refers to theme ids the store contains. This option is an object type which uses **key** > **value** mappings. The theme **keys** represent a unique target name, this can be any alpha numeric value. The **key** value will be used by the CLI as target names. The **value** should be the theme id.

</p>
</details>

## Dirs

The `dirs` option allows you to define custom base directories. In Syncify, `dirs` refers to a directory name which is relative to the root of your project. You cannot define multi-level directories (eg: `some/dir`) or reverse paths (eg: `../dir`). This option accepts string values only.

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

<details>
<summary>
<strong><code>Input</code></strong>
</summary>
<p>

The `input` option refers to your projects **src** location This is the directory where your development theme files exist. Syncify defaults this directory to `source`. The value defined here will be prepended to any path you define within `paths`.

</p>
</details>

<details>
<summary>
<strong><code>Output</code></strong>
</summary>
<p>

The `output` option refers to your project **dist** location. This is the directory where transformed theme files from `input` will be written. Syncify defaults this to `theme`. The `output` directory will be reflective of your online shop. You should point any asset files executing via spawned processes to the `assets` directory contained within this location.

</p>
</details>

<details>
<summary>
<strong><code>Config</code></strong>
</summary>
<p>

The `config` option refers to a directory within your project where configuration files exist, like (for example) a `rollup.config.js` or `webpack.config.js` file. Syncify by default (when this option is **undefined**) will look for config files in the root of your project but this might not always be ideal as it can create clutter in the workspace. The `config` directory allows you to optionally place spawned config files within a sub-directory and informs Syncify to look for these files from that location.

> Typically this is directory is named `scripts` in node projects.

</p>
</details>

<details>
<summary>
<strong><code>Import</code></strong>
</summary>
<p>

The `import` option refers to a directory where downloaded themes will be written. Syncify provides the ability to download themes from your online store and it is within this directory the files are created.

</p>
</details>

<details>
<summary>
<strong><code>Export</code></strong>
</summary>
<p>

The `export` option refers to a directory where packaged (`.zip`) themes will be written when running the `package` command. Packaged themes will be prepended with the version number defined in the projects `package.json` file.

</p>
</details>

<details>
<summary>
<strong><code>Metafields</code></strong>
</summary>
<p>

The `metafields` option refers to a directory within your project which can contain global JSON metafield files. Syncify supports metafield sync capabilities using a simple **directory** > **file** based approach. Sub-directory names in this location represent a metafield `namespace` value. JSON file names contained within the sub-directory represent a metafield `key` value. JSON contents represent metafield value.

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
       &nbsp;&nbsp;&nbsp;<code>namespace</code> and the JSON file names contained within<br>
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

</p>
</details>

## Paths

The `paths` option allows you to define a custom set of path locations which point to theme specific files contained within your defined `input` directory. Syncify does not require you set a development structure consistent with that required by Shopify because files are re-routed to the standard theme structure. Each path option accepts an `array` of glob ([anymatch](https://www.npmjs.com/package/anymatch)) patterns. By default, Syncify assumes you are using the basic-bitch (default) structure.

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

Below are **2** different **input** structures and an **output** structure. The **default structure** is what Syncify will use if no `paths` have been defined in your configuration, the tool defaults to this. The **customized structure** is an example of how you _could_ arrange an `input` directory using the Syncify `paths` option. The **output structure** is what Syncify will generated as an **output** structure that Shopify understands.

<table>
  <thead>
    <tr>
      <th>Default Structure</th>
      <th>Customized Structure</th>
      <th>Output Structure</th>
    </tr>
  </thead>
  <tbody>
          <td>
      <pre>
      <code>
      ㅤ
      ㅤ
      ㅤ
      ㅤ
   source
   └─┐
     ├─ assets
     ├─ config
     ├─ layout
     ├─ locales
     ├─ metafields
     │  └─ namespace
     │     └─ key.json ㅤ ㅤㅤㅤㅤ
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
      <td>
        <pre>
        <code>
 source
 └─┐
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
      <code>
      ㅤㅤ
      ㅤ
      ㅤ      ㅤ
      ㅤ      ㅤ
      ㅤ      ㅤ
      ㅤ
  output
  └─┐
    ├─ assets
    ├─ config
    ├─ locales
    ├─ layout
    ├─ sections
    ├─ snippets
    └─ template
       └─ customers ㅤㅤㅤㅤㅤ
       ㅤ
       ㅤ
       ㅤ
       ㅤ
</code>
      </pre>
      </td>
    </tr>
  </tbody>
</table>

There is no distributed difference between the **default** and **customized** structures. Both would generate output that Shopify understands. Only the input file `source` locations differ. The **output** will always be written to a standard Shopify theme regardless of how you decide to organize the **input** structure.

<details>
<summary>
<strong><code>Assets</code></strong>
</summary>
<p>

An array list of glob path patterns for **asset** files. These will be written in the `assets` directory of your defined `output` path. Please note that you if you transforming CSS, SCSS, SASS or SVG file types using Syncify then you do not need to define those paths here as the transform option will do automatically route them. This is the same for assets being processed by spawns. Any paths defined in `assets` will typically just pass through.

**Understanding Spawns in watch mode**

Syncify will automatically set watch paths of assets when running in watch mode. It will glob match all files being written to your defined `{output}/assets` path but exclude those which you have set to be handled or transformed. For example, if you are using a JavaScript bundler like webpack of rollup, Syncify will watch for any files that are written and handled by these tools or any other spawned process for that matter and once written will trigger an upload.

</p>
</details>

<details>
<summary>
<strong><code>Customers</code></strong>
</summary>
<p>

An array list of glob path patterns to `.liquid` or `.json` **customer** template files. These will be written to the `{output}/templates/customers` directory of your defined `output` path.

</p>
</details>

<details>
<summary>
<strong><code>Locales</code></strong>
</summary>
<p>

An array list of glob path patterns to `.json` **locale** files. These will be written to the `{output}/locales` directory of your defined `output` path.

</p>
</details>

<details>
<summary>
<strong><code>Config</code></strong>
</summary>
<p>

An array list of glob path patterns to `.json` **config** files. These will be written to the `{output}/config` directory of your defined `output` path.

</details>

<details>
<summary>
<strong><code>Layout</code></strong>
</summary>
<p>

An array list of glob path patterns to `.liquid` **layout** files. These will be written to the `{output}/layout` directory of your defined `output` path.

</p>
</details>

<details>
<summary>
<strong><code>Sections</code></strong>
</summary>
<p>

An array list of glob path patterns to `.liquid` **section** files. These will be written to the `sections` directory of your defined `output` path. Sections can be structured within sub-directories. If a section file is determined to be deeply nested in such a way then this option will enable parent directory name prefixing to be applied the output filenames.

If the section input path is `source/sections/index/some-file.liquid` then the filename will be prefixed with `index` so when referencing it within themes you'd need to use `index_some-file.liquid` in `{% section %}` tags. Prefixing is helpful when you have a large number of sections and want to avoid name collusion's. You can only control what sub-directories should have prefexing applied using the `global[]` option or alternatively do not reference paths to sections which contain sub directories.

See [Sections](#sections).

</p>

</details>

<details>
<summary>
<strong><code>Snippets</code></strong>
</summary>
<p>

An array list of glob path patterns to `.liquid` **snippet** files. These will be written to the `snippets` directory of your defined `output` path.

</p>
</details>

<details>
<summary>
<strong><code>Templates</code></strong>
</summary>
<p>

An array list of glob path patterns to `.json` or `.liquid` **template** files. These will be written to the `templates` directory of your defined `output` path.

</p>
</details>

# Spawn

The spawn option accepts a **key** > **value** list of commands (ie: scripts) which you can be used when we are running `watch` or `build` modes. Spawn allows you to leverage additional build tools and have them execute in parallel with Syncify. Spawned processes allow you use your preferred asset bundlers, like [Rollup](#), [Webpack](#), [Gulp](#) and many more without having to run multiple npm-scripts.

### Overview

There are 2 available modes from which you can trigger a spawned process. When a process is spawned in `watch` mode it will run along side Syncify in parallel and executing sequentially in the order of which they are defined. You need to provide any --flags your spawned command (build tool or bundler) requires when running in **watch** mode.

Spawning a process in `build` mode will trigger spawned commands only 1 time, so it is here where you would provide the compile-only or build-only command, ie: not using watch flags/arguments. The Syncify **build** mode re-builds the entire theme and you might choose to run this mode using the Syncify `--prod` flag, if you require context of the environment, mode or action taking place within spawned config files, then take a look at the available [Utilities](#utilities) Syncify exposes to help you conditionally load plugins or trigger different build types in accordance with Syncify.

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

### Usage Examples

In most situations you will leverage the spawn option to compile TypeScript or JavaScript assets, but it is important to note that this capability is not specifically for these assets types. Below are a couple examples were we spawn up 2 well known JavaScript bundlers. If you run into any problems, please submit an issue.

### Rollup

If you are processing JavaScript asset files using the [Rollup](#) bundler you can spawn build and watch processes by providing the rollup commands to each mode accordingly. Rollup is a fantastic choice for handling `.js` files and is the preferred option for processing these asset types. In this example, it is assumed that a `rollup.config.js` file is located in the root of your project.

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

### Webpack

If you are processing JavaScript asset files using the [Webpack](#) bundler you can spawn build and watch processes by providing the webpack commands to each mode accordingly. You will need to be using the [Webpack CLI](#) module to ensure a successful spawn is triggered. In this example, it is assumed that a `webpack.config.js` file is located within a `config` directory and you have informed upon this via the `dirs` option in your Syncify configuration.

> Notice how we also provide the `--color` flag in the spawn. If you omit this flag then the webpack logs will be printed to the CLI without colors, when using webpack you should provide this flag.

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

In Syncify, `input` files can be transformed and augmented before being written to your define `output` path location. The `transform` option allows you to control how your **input** files are processed. Syncify supports built-in and partial processing for the following file types:

- `.liquid`
- `.json`
- `.css`
- `.svg`
- `.scss`
- `.sass`

Processing `.liquid` and `.json` files are handled using built-in capabilities support by Syncify. Handling of `.css`, `.sass`, `scss` and `.svg` file types requires you install additional tooling which Syncify uses in their transform process. By default, Syncify assumes that it should only handle `.liquid` and `.json` files.

### SASS Support

Syncify provides partial processing of `.scss` and `.sass` file types using [Dart SASS](#). If you require transform support for these files you need to install Dart module as a development dependency in your project.

```
pnpm add sass -D
```

### CSS Support

In addition to SASS transformation, Syncify also support CSS processing using [PostCSS](#). If you wish have Syncify handle CSS transforms then you need to install **PostCSS** as a development dependency and also include a `postcss.config.js` file in your project. Syncify expects you will inform upon how CSS files are to be handled within a `postcss.config.js` file and look for the existence of one within your workspace. Provide PostCSS plugins and any specific settings within the `postcss.config.js` file.

```
pnpm add postcss -D
```

> **Please note:** If you are using Syncify to compile SASS files, then by default the transformed CSS will be passed to PostCSS. Use the available Syncify `style` options to disable this behavior.

## Views

The `views` transform option controls how `.liquid` file types should be handled. Snippets, Templates, Sections and Layout paths are typically where liquid files are used. Options defined here will be used when Syncify is processing such types.

### Sections

Syncify provides sub-directory grouping and rename prefixing capabilities when handling theme sections. You might be accustom to storing sections within a single directory and despite Shopify using this approach in their Dawn theme, it is restrictive and rather chaotic to the developer experience. A far better approach is to take advantage of the sub-directory grouping feature which Syncify provides.

### Grouping Sub-directories

Shopify shipped "sections everywhere" capabilities in Online Store 2.0 and while this is a great feature to have it opens the door to inconsistent structures. The logic of Shopify here has been to provide store developers "freedom" but it is a double edged sword. Sections everywhere has consequently resulted in developers indirectly facilitating merchants the ability to leverage sections on pages where they should otherwise be avoided. For instance, enabling merchants to add a featured-collection, featured-blog or full-screen hero image to product pages is not necessarily a good idea. Developers may be more inclined to provide such section types when working from within a single directory structure that is without organized order.

Shopify tends to push a DRY infrastructure approach for the theme development wherein store sections _should_ be capable of appropriation within any template. This is great in theory but in order to achieve aesthetic fluidity it is not realistic when we go beyond a Dawn structure and even there we find the utter chaos. Approaching things in a compartmentalized manner is just better approach but this is difficult when working from a single level structured directory.

Grouping section into sub-directories results is far better consideration, organization and order at the development level. Syncify provides these capabilities while still respecting developer personal preferences. Below is an example of how you can leverage Syncify to use sub-directories together with pre-fixing capabilities.

<!-- prettier-ignore -->
<table>
  <thead>
    <tr>
      <th>Syncify Options</th>
      <th>Source Structure</th>
      <th>Theme Output</th>
    </tr>
  </thead>
  <tbody>
      <td>

<!-- prettier-ignore -->
```json
{
  "paths": {
    "sections": [
      "sections/**/*.liquid"
    ]
  },
  "sections": {
    "prefix": true,
    "prefixSeparator": "-",
    "prefixDuplicates": true,
    "globals": [
      "shared",
      "layout",
      "product/related.liquid"
    ]
  }
}
```

  </code>
      </td>
      <td>
      <pre>
      <code>ㅤ
  source
  │
  └─ sections
    ├─ collection
    │  ├─ filter.liquid
    │  └─ search.liquid
    ├─ product
    │  ├─ images.liquid
    │  ├─ on-sale.liquid
    │  └─ related.liquid
    ├─ layout
    │  ├─ header.liquid
    │  └─ footer.liquid
    └─ shared
       ├─ banner.liquid
       └─ slideshow.liquid
      </code>
      </pre>
      </td>
      <td>
      <pre>
      <code>
      ㅤ
      ㅤ
  theme
  │
  └─ sections
    ├─ banner.liquid
    ├─ collection-filter.liquid
    ├─ collection-search.liquid
    ├─ footer.liquid
    ├─ header.liquid
    ├─ product-images.liquid
    ├─ product-on-sale.liquid
    ├─ related.liquid
    └─ slideshow.liquid
    ㅤ
    ㅤ
      </code>
      </pre>
      </td>
    </tr>
  </tbody>
</table>

Notice how we can nest sections within sub-directories and also apply prefixing to the section output filenames. We also inform Syncify that some of our sections should be considered **global** and this allows those defined there to pass through without name augmentation (prefixing). We passed a `true` value to the `prefix` option, this informed Syncify that section files that has not explicitly defined as **global** should have their output filename prefixed with their **parent** directory name.

<details>
<summary>
<strong><code>Sections</code></strong>
</summary>
<p>

**prefix**

**prefixDuplicates**

**prefixSeparator**

**globals**

</p>
</details>

<details>
<summary>
<strong><code>Minify</code></strong>
</summary>
<p>

**env**

`never`

**minifyJS**

`boolean`

**minifyCSS**

`boolean`

**removeComments**

`boolean`

**collapseWhitespace**

`boolean`

**trimCustomFragments**

`boolean`

**ignoreCustomFragments**

`string[]`

**minifySectionSchema**

`boolean`

**removeLiquidComments**

`boolean`

**removeAttributeNewlines**

`boolean`

**removeRedundantDashTrims**

`boolean`

**ignoredLiquidTags**

`string[]`

**exclude**

`string[]`

</p>
</details>

### Json

The `json` transform option controls how `.json` files should be processed. Templates, Config, Locales and Metafields paths typically where JSON files are used. Options defined here will be used when Syncify is processing these file types. In addition, Syncify will also apply handle any Assets that have `.json` extension using these options.

<details>
<summary>
<strong><code>Spaces</code></strong>
</summary>
<p>

Beautification `2`

</p>
</details>

<details>
<summary>
<strong><code>Minify</code></strong>
</summary>
<p>

Minification options

**env**

`never`

**removeSchemaRefs**

`true`

**exclude**

`string[]`

</p>
</details>

### Styles

The `styles` transform option accepts an array type. This option requires you have [Dart SASS](#) and/or [PostCSS](#) installed as a development dependencies in your project. Syncify supports the handling of `.sass`, `.scss` and `.css` file types using these tools and the options are convenience wrappers for them.

<details>
<summary>
<strong><code>Input</code></strong>
</summary>
<p>

Path `string[]` or `string`

</p>
</details>

<details>
<summary>
<strong><code>Rename</code></strong>
</summary>
<p>

Rename Options

`string[]`

</p>
</details>

<details>
<summary>
<strong><code>Watch</code></strong>
</summary>
<p>

Watch Options

`string[]`

</p>
</details>

<details>
<summary>
<strong><code>Snippet</code></strong>
</summary>
<p>

`boolean`

</p>
</details>

<details>
<summary>
<strong><code>PostCSS</code></strong>
</summary>
<p>

PostCSS options

**env**

`all`, `dev`, `prod` `never`

</p>
</details>

<details>
<summary>
<strong><code>SASS</code></strong>
</summary>
<p>

**logWarnings**

`boolean`

**sourcemap**

`boolean`

**style**

`compressed` or `expanded`

</p>
</details>

# CLI Usage

Syncify ships with a powerful command line interface that supports prompt execution. If you have installed Syncify globally, you can call `syncify` or `sync` from any project but you should avoid this and instead install the module as a development dependency on a per-project basis.

If you are using a package manager like [pnpm](https://pnpm.js.org/en/cli/install) you can simply call `pnpm syncify` (or `pnpm sync`) but if you are using npm or yarn then you may need to create reference script within your `package.json` file, eg:

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
  syncify       Starts interactive CLI command prompt

Aliases:
  sync          An alias of syncify (can be used instead of syncify)

Commands:
  syncify                   Starts interactive CLI command prompt
  syncify <store> --flags   Store name or comma separated list of stores and flags

Flags:
  -b, --build            Triggers a build, use with upload to run build before uploading
  -w, --watch            Starts watching for changes of files building when they occur
  -u, --upload           Triggers a build, use with upload to run build before uploading
  -d, --download         Downloads themes/s from specified stores
  -s, --store            A comma separated list of stores
  -t, --theme            A comma separated list of themes
  -o, --output  <path>   A path value (used in download and build mode only)
  -h, --help,            Prints command list and some help information
  -c, --clean,           Removes all output files, use with --build to clean before bundling
  --vsc                  Generates JSON schema spec for vscode users
  --dev                  Run in development mode (default)
  --prod                 Run in production mode
```

### Example

CLI usage aims to be as simple as possible. A typical project will be targeting a single Shopify theme but you can target multiple themes and stores in seamless and productive manner. When targeting multiple stores or themes the CLI employs a flag based naming approach.

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

Syncify provides a helpful command prompt feature. Running `syncify` will provide you a simple prompt interface from which you can use to explore endpoints directly from your CLI or trigger commands.

**Options**

**Queries**

# API

Syncify can be initialized within scripts. This approach is a little more feature-full and allows you to integrate it with different build tools. You can hook into the transit process of files and apply modifications before they are uploaded to your store/s with this approach.

### Usage

Syncify exports a function that has several methods which you can use to trigger specific modes. The default export can also target multiple hooks in accordance with what was passed from the command line.

```typescript
import { syncify } from '@liquify/syncify';

// Build hook
syncify.build(options: {}, async function(content?: Buffer): Promise<Buffer|string|void|false>);

// Watch hook
syncify.watch(options: {}, async function(content?: Buffer): Promise<Buffer|string|void|false>);

// Upload hook
syncify.upload(options: {}, async function(content?: Buffer): Promise<Buffer|string|void|false>);

// Download hook
syncify.download(options: {}, async function(content?: Buffer): Promise<Buffer|string|void|false>);

// Targeting all hooks
syncify(options: {})({
  async build(content?: Buffer): Promise<Buffer|string|void|false>,
  async watch(content?: Buffer): Promise<Buffer|string|void|false>,
  async upload(content?: Buffer): Promise<Buffer|string|void|false>,
  async download(content?: Buffer): Promise<Buffer|string|void|false>,
});

```

### Utilities

Utilities will return some basic information about the Syncify instance. These are extremely helpful when when you are executing spawned processes and need to control what feature to load. For example, if you are spawning a webpack process for compiling JavaScript assets and need to inform upon watch mode you'd use `util.resource('watch')` which returns a boolean value when running in watch mode.

```typescript
import { util, env } from 'shopify-sync'

// Environment Conditions
env.prod: boolean;
env.dev: boolean;
env.build: boolean;
env.watch: boolean;
env.download: boolean;
env.upload: boolean;

// Returns environment
util.env('dev' | 'prod'): boolean

// Returns the current resource
util.mode('build' | 'watch' | 'upload' | 'download'): boolean

// Returns spawns
util.spawned(): string[]

```

### Backwards Compatibility

Syncify supports backward compatibility for [shopify-sync](https://github.com/panoply/shopify-sync). This allows you to use it as you would have in earlier versions with build tools like [Gulp](https://gulpjs.com).

> Please note this support for this will eventually be deprecated.

```typescript
import { shopifysync as sync } from '@liquify/syncify';

// Backward compatible, ie: shopify-sync
sync(mode: string, options: {}, function() {})

```

# Contributing

This project uses [pnpm](https://pnpm.js.org/en/cli/install). Fork the project, run `pnpm i` and you're good to go. If you're using Yarn like the rest of the plebs or npm then you will still need to install pnpm.

# Author

Created by [Nίκος Σαβίδης](https://github.com/panoply) of [Sissel ΣaaΣ](https://sissel.io).

### Acknowledgements

Special thanks to a couple of talented developers that helped work through ideas and edge-cases on the project.

- [David Warrington](https://ellodave.dev/)
- [Joseph Curtis](#)
- [Mansedan](#)

# Changelog

Refer to the [Changelog](changelog.md) for each per-version update and/or fixes.
