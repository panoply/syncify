**BETA VERSION**

<hr>

# @liquify/syncify

The fast, extensible and superior alternative Shopify CLI [theme kit](https://shopify.github.io/themekit/) tool. Syncify applies an intuitive approach for theme development that extends upon your existing build tools. It ships with a powerful and informative CLI, hot reloading, asset transformations, multiple storefront theme synchronization with watch, upload, download and metafield capabilities plus a whole lot more.

**Syncify exists as part of the [Liquify](https://liquify.dev) project**

### Key Features

- Watch, upload, download and export multiple storefronts and themes.
- Intelligent path mapping capabilities for custom directory structures.
- Live hot reloading support for assets and views.
- Clear, concise, informative and beautiful CLI logging.
- Liquid/HTML and JSON minification support.
- An elegant global directory based metafields sync approach using JSON files.
- TypeScript/JavaScript transpilation using [ESBuild](https://esbuild.github.io/).
- SCSS/CSS transpilation using SASS Dart and [PostCSS](https://postcss.org/).
- SVG Sprite and inlined SVG snippet generation using [SVGO](https://github.com/svg/svgo).
- Digests and spawns existing build tools for asset transformations.
- Prompt based CLI/TUI and exposed module API for script usage.

### Why?

I have been working on the Shopify platform for last several years and nothing the Shopify team maintain or have produced has actually helped me. Shopify's tooling tends to impede upon my productivity and alternatives like the Shopify CLI fail to achieve fluidity. Syncify is how I believe theme creation, development and maintenance should be handled. It's fast, flexible, extensible, scalable and will not lock you into some restrictive workflow and setup apparatus.

_Powerful and productive tooling built by a developer for developers_

# Install

Install as development dependency in your project.

**PNPM**

```cli
pnpm add @syncify/syncify -D
```

**NPM**

```cli
npm i @syncify/syncify --save-dev
```

**Yarn**

```cli
yarn add @syncify/syncify --dev
```

# Overview

The main purpose of Syncify is to facilitate seamless theme development between your local machine and Shopify store/s. It ships with build, watch, download, upload, merge and pull capabilities for interfacing with remote Shopify webshop's. Together with a prompt based execution model, Syncify provides developers with theme control that aims to exceed expectations. In addition to the core sync support, Syncify also provides opt-in pre-processor capabilities for handling asset file types.

### Theme Files

Syncify uses built-in capabilities when handling snippets, templates, layouts, locales, configs and sections. Files using a `.liquid` or `.json` extension are considered **views** in Syncify. Content transformations like minification and path mappings are applied to these files types.

### Asset Files

Syncify does not want to re-create or impede on developer preferences and tool appropriation. Build tools and bundlers specifically designed for processing different assets types can be spawned and run in parallel with Syncify's `build` and `watch` instances. Syncify also provides pre-processor capabilities for handling TypeScript, JavaScript, CSS, SCSS and SVG file types and exposes wrappers around the popular and performant modules.

### Data Files

Syncify exposes and introduces an elegant low-level method for interfacing with shop metafields, pages, redirects and files. Pull, push, merge and delete resource capabilities are provided using a directory/file based approach which allows developers to advance their workflows in a controlled and extensible manner.

# Setup

After installing you will need to configure a connection to your shopify store. Syncify requires you provide either an admin API access token (recommended) or API Key and secret as credentials.

<details>
<summary>
<strong>Authorize</strong>
</summary>
<p>

You will need to create a [private app](https://help.shopify.com/en/manual/apps/private-apps) to obtain this information from Shopify. If you are coming from [Theme Kit](https://shopify.dev/themes/tools/theme-kit) you might be able to port those settings but it is recommended that you generate API access information specifically for usage with Syncify.

> There are plans to provide an official Syncify Shopify App to make this easier in future releases.

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

You need to provide Syncify read and write access to a couple of admin endpoints so it can perform operations. Below are the required scopes you will need to enable within in your private app.

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

Shop credentials can be stored within a `.env` or `.env.syncify.json` file. You can also provide credentials at runtime using `process.env` variables. The preferred approach is to store this information within a `.env` file.

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

### Using a `.env.syncify.json` file

If you do not wish to use an `.env` file you can store API credentials within a `.env.syncify` or `.env.syncify.json` file. When using this approach it is important that the file is added to `.gitignore` and never committed to a public repository. The file expects credentials be supplied as array list and depending on your authorization method items should use one of following models:

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

Syncify also supports runtime credential assignment. This approach allows you to set credentials via the command line or within a script executable. This is highly discouraged and rather insecure.

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

Syncify exposes a large set of configuration options. If you are using a text editor like [VS Code](https://code.visualstudio.com/) or one which supports extension of [JSON Schema Specs](https://json-schema.org/specification.html) then you can extend `package.json` schemas. JSON schema specs provide features like hover descriptions, validations, auto-completion and intellisense for JSON file types. Extending the package schema will enable these capabilities be provided to the `syncify` field.

> It is **highly recommended** that you extend the `package.json` json specifications.

### Generate Schemas (vscode users)

Syncify can automatically generate the `package.json` schema specs for developers using the VS Code text editor. The settings reference will be written within a `.vscode` directory. Use the following command:

```
syncify --vsc
```

### Provide Manually

If you wish to provide the specs manually you will need to create a `.vscode` directory and `settings.json` file within. The `settings.json` should contain the following configuration settings:

```json
{
  "files.associations": {
    ".syncifyrc": "json"
  },
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

Syncify supports `syncify.config.js` and `package.json` configurations. Depending on your preference, either option suffices and no restrictions are imposed. If you are defining options within your projects `package.json` file you can assign options on a `syncify` property.

### Support Files

- `syncify.config.js`
- `syncify.config.ts`
- `syncify.config.mjs`
- `syncify.config.cjs`
- `syncify.config.json`

### Default Options

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/syncify';

export default defineConfig({
  input: 'source',
  output: 'theme',
  export: 'export',
  import: 'import',
  config: '.',
  stores: {
    domain: '',
    themes: {}
  },
  hot: {
    label: 'visible',
    method: 'hot',
    inject: true,
    layouts: ['theme.liquid'],
    scroll: 'preserved',
    server: 3000,
    socket: 8089
  },
  logger: {
    timer: true,
    sizes: true,
    clear: true,
    silent: false
  },
  paths: {
    redirects: 'redirects.yaml',
    assets: 'assets/**/*',
    files: 'files/**/*',
    config: 'config/*.json',
    locales: 'locales/*.json',
    layout: 'layouts/*.liquid',
    sections: 'sections/*.liquid',
    snippets: 'snippets/*.liquid',
    metafields: 'metafields/**/*.json',
    customers: [
      'templates/customers/*.json',
      'templates/customers/*.liquid'
    ],
    pages: [
      'pages/*.md',
      'pages/*.html'
    ],
    templates: [
      'templates/*.json',
      'templates/*.liquid'
    ],
  },
  spawn: {
    build: {},
    watch: {},
  },
  views: {
    snippets: {
      prefixDir: false,
      separator: '-',
      global: []
    },
    sections: {
      prefixDir: false,
      separator: '-',
      global: []
    },
    pages: {
      suffixDir: true,
      language: ['html', 'markdown'],
      author: '',
      global: []
    }
  },
  transforms: {
    script: {},
    style: {},
    svg: {},
    image: {},
  },
  processors: {
    esbuild: {},
    sass: {},
    postcss: {},
    sharp: {},
    svgo: {},
    sprite:{},
    json: {},
  },
  minify: {
    json: {
      assets: true,
      config: true,
      locales: true,
      metafields: true,
      templates: true,
      exclude: []
    },
    script: {
      legalComments: 'none',
      mangleQuoted: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      mangleProps: null,
      mangleCache: false,
    },
    views: {
      minifyScript: true,
      minifyStyle: true,
      minifySchema: true,
      removeComments: true,
      collapseWhitespace: true,
      stripDashes: true,
      ignoreTags: [],
      ignoreObjects: [],
      exclude: []
    }
  },
  plugins: [],
});
```

# Getting Started

It is relatively easy to get started developing Shopify themes using Syncify. If you are converting an existing project and using Theme Kit or another build environment you can progressively adapt it into your workflow by manually configuring how Syncify should behave. Whatever the case, have a look at the [Dusk](#) theme in the [Syncify Examples](#) repository. Dusk is the Shopify [Dawn](#) theme using Syncify instead of Theme Kit and provides developers a great starting point for new projects.

### Pre-requisites

Before going over the features Syncify provides, it is assumed that you have done the following:

1. Installed Syncify as a development Dependency
2. Created a private app and added API credentials
3. Added a `syncify.config.ts` file in the root of your project

### Contents

- [Directories](#dirs)
- [Paths](#dirs)
- [Stores](#stores-required)
- [Hot](#hot)
- [Spawn](#spawn)
- [Views](#views)
- [Transforms](#views)
- [Processors](#views)
- [Minify](#views)

## Directories

The `dirs` option allows you to define custom base directories. In Syncify, `dirs` refers to a directory name which is relative to the root of your project. You **cannot** define multi-level directories (eg: `some/dir`) or reverse paths (eg: `../dir`). This option accepts string values only.

<!-- prettier-ignore -->
<table>
  <thead>
    <tr>
      <th width="500px"> API</th>
      <th width="500px">CLI</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>

<!-- prettier-ignore -->
```json
{
  "input": "source",
  "output": "theme",
  "import": "import",
  "export": "export",
  "config": "."
}
```

</td>
<td height="200px">

<!-- prettier-ignore -->
```bash
--input  -i   # source
--output -o   # theme
--config -c   # config
--export -e   # config
```

</td>
</tr>

  </tbody>
</table>

### Input > Output

Syncify expects projects to have an **input** directory path which contains theme **source** files. Files contained within an input directory are written to your defined **output** directory path. The generated output will be reflective of your online store and in most cases you will add the output directory to your `.gitignore` file because it can rebuilt from input. If you are used to working from a single directory (eg: Dawn) then it is important that you understand the difference between the **input** and **output** directories.

# Stores (Required)

The `stores` option accepts an **object** or **array** list. Each item will hold a settings object that contains references to your shopify store/s and their theme/s. For each store you define, Syncify requires you provide the shop name and theme id/s you wish to sync. The `themes` object uses a **key** > **value** structure. Please see theme [commands](#commands) example for more information on how this is used with the CLI.

### CLI

```bash
--theme, -t <target>   # theme targeting
```

### API

```ts
import { defineConfig } from '@syncify/syncify';

export default defineConfig({
  stores: [
    {
      domain: 'shop-1', // equivalent of shop-1.myshopify.com
      themes: {
        dev: 123456789,
        prod: 123456789,
        stage: 123456789,
        test: 123456789
      }
    }
  ]
});
```

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

# Metafields

The `metafields` directory path reference is where you can provide **global** JSON metafield files that can be synced to your Shopify store. Metafield sync capabilities provided by Syncify use a simple **directory** > **file** based approach. The sub-directory names represent a metafield `namespace` value and JSON file names contained within represent metafield `key` values.

> Syncify will keep your remote and local metafield references aligned with one another and warn you when local versions do not match remote versions. This will help prevent you from overwriting changes that may have been applied by third-party apps or online within your store.

**Pull Metafields**

Syncify provides you with simple interactive prompt based approach for importing pre-existing metafields from your online store. You can optionally choose which metafields you'd like to maintain. Use the `-m` or `--metafields` flag together with the `--pull` flag on the command line to download metafields:

```
$ syncify -m --pull
```

**Merge Metafields**

Working with metafields from your local machine may have result in unexpected overwrites if changes were made to remote versions that conflict with local versions. In order to combat this Syncify support **merge** capabilities which can be used to merge changes when metafield modification timestamps differ. Use the `-m` or `--metafields` flag together with the `--merge` flag on the command line perform local and remote alignments.

```
$ syncify -m --merge
```

**Structure**

In order to best illustrate how the metafield sync capabilities work it is important that you understand the structure logic. The directory based approach and naming conventions employed are imperative and strict. Syncify wants to prevent irreversible overwrites or deletions from occurring, so please be mindful and wary when using this feature.

<table>
  <thead>
    <tr>
      <th align="left" width="300px">&nbsp;&nbsp;&nbsp;&nbsp;Metafield Structure</th>
      <th align="left" width="700px">&nbsp;&nbsp;&nbsp;&nbsp;Description</th>
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

### Options

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

The `metafields` option refers to a directory within your project which can contain global JSON metafield files. The path location you reference here should point to a directory of sub-directories. Please refer to the [Metafields](#metafields) section for more information.

**Correct**

```
{
  "dirs": {
    "metafields": "source/metafields"
  }
}
```

**Invalid**

```
{
  "dirs": {
    "metafields": "source/metafields/**/*.json"
  }
}
```

</p>
</details>

# Paths

The `paths` option allows you to define a custom set of path locations which point to theme specific files contained within the defined `input` directory. Syncify does not require you set a development structure consistent with that required by Shopify in your **input** because files are re-routed to the standard theme structure upon generating the **output**. Each path option accepts either a `string` or `string[]` array list of glob [anymatch](https://www.npmjs.com/package/anymatch) patterns. Paths will automatically resolve to the `input` directory, so you do not need to include it within your mapping.

### API

By default, Syncify assumes you are using the basic-bitch (default) structure as followed:

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/syncify';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    assets: 'assets/**',
    config: 'config/*.json',
    locales: 'locales/*.json',
    layout: 'layout/.liquid',
    metafields: 'metafields/**/*.json',
    sections: 'sections/*.liquid',
    snippets: 'snippets/*.liquid',
    templates: 'templates/*.liquid',
    customers: 'templates/customers/*',
    pages: 'pages/*',
    redirects: 'redirects.yaml',
  }
})
```

### Custom Structures

Below are **2** different **input** structures and an **output** structure. The **default structure** is what Syncify will use (as above) if no `paths` have been defined in your configuration, the tool defaults to this. The **customized structure** is an example of how you _could_ arrange an `input` directory using the Syncify `paths` option. The **output structure** is what Syncify will generated as an **output** which Shopify understands.

<table>
  <thead>
    <tr>
      <th width=330px>Default Structure</th>
      <th width="330px">Customized Structure</th>
      <th width="330px">Output Structure</th>
    </tr>
  </thead>
  <tbody>
          <td>
      <pre>
      <code>
      ㅤ
      ㅤ
      ㅤ
   source
   └─┐
     ├─ assets
     ├─ config
     ├─ layout
     ├─ locales
     ├─ pages
     ├─ metafields
     │  └─ namespace
     │     └─ key.json ㅤ
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
   │        └─ key.json ㅤ
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
       └─ customers ㅤ
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

There is no distributed difference between the **default** and **customized** structures illustrated above. Both would generate an **output** that Shopify understands, requires and reasons with. Only the **input** source locations differ. The **output** Syncify creates will always be written to a standard Shopify theme structure regardless of how you may decide to organize **input** paths.

### Options

<details>
<summary>
<strong><code>Assets</code></strong>
</summary>
<p>

An array list of glob path patterns for **asset** files. These will be written in the `assets` directory of your defined `output` path. Please note that you if you transforming CSS, SCSS, SASS or SVG file types using Syncify then you do not need to define those paths here as the `transforms` option will automatically route them, this is the same for assets being processed by spawns.

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

**Understanding Section Processing**

If the section input path is `source/sections/index/some-file.liquid` then the filename will be prefixed with `index` so when referencing it within themes you'd need to use `index-some-file.liquid` in `{% section %}` tags. Prefixing is helpful when you have a large number of sections and want to avoid name collusion.

See also [Views](#views).

</p>

</details>

<details>
<summary>
<strong><code>Snippets</code></strong>
</summary>
<p>

An array list of glob path patterns to `.liquid` **snippet** files. These will be written to the `snippets` directory of your defined `output` path.

See also [Views](#views).

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

# HOT

Live reloading is supported in development modes. Syncify leverages websocket's, XHR and statically served endpoints to provide this capability with zero configuration or the need to install or setup additional workflows. When you invoke `--hot` syncify will listen for messages sent via websocket on the client and carry out HOT replacements of Assets, Sections, Snippets, Layouts and Templates without triggering full-page refreshes.

### Assets

SASS/CSS, TypeScript/JavaScript and SVG asset file types are HOT reloaded by swapping out URL's with localhost equivalents that Syncify will statically serve.

### Sections

Sections are fetched via the Ajax Section rendering API. Replacements are applied to fragments in real-time.

### Snippets

In order to provide HOT replacements Syncify employs a mild form of DOM hydration. Snippet files will have HTML comments `<!-- hot:1aa4f32cf9 -->` containing a UUID injected before they are uploaded to themes. Syncify will pass this UUID to the client via websocket and once received an XHR (fetch) will be triggered. The response of XHR request is then parsed and all nodes which proceed the injected UUID comment/s are plucked and applied swapped in the persisted DOM. Scroll position is persisted, assets and surrounding (unchanged) elements are left intact and not reloaded.

This approach is a mild form DOM hydration that's 10x faster than invoking a hard-refresh.

# Spawn

The spawn option accepts a **key** > **value** list of commands (ie: scripts) which you can be used when we are running `watch` or `build` modes. Spawn allows you to leverage additional build tools and have them execute in parallel with Syncify. Spawned processes allow you use your preferred asset bundlers, like [Rollup](#), [Webpack](#), [Gulp](#) and many more without having to run multiple npm-scripts.

### Overview

There are 2 available modes from which you can trigger a spawned process. When a process is spawned in `watch` mode it will run along side Syncify in parallel and execute sequentially in the order of which each spawn is defined. You need to provide any --flags your command (build tool or bundler) requires when running. Spawning a process in `build` mode will trigger spawned commands only 1 time, so it is here where you would provide the compile-only or build-only command, ie: not using watch flags/arguments.

The Syncify **build** mode re-builds the entire theme and you might choose to run this mode using the Syncify `--prod` flag, if you require context of the environment, mode or action taking place within spawned config files, then take a look at the available [Utilities](#utilities) Syncify exposes to help you conditionally load plugins or trigger different build types in accordance with Syncify.

### CLI

```bash
--spawn, -s <name>   # spawn targeting
```

### API

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/syncify';

export default defineConfig({
    spawn: {
      build: {},
      watch: {}
    }
  }
})
```

## Usage

In most situations you will leverage the spawn option to compile TypeScript or JavaScript assets, but it is important to note that this capability is not specific to these assets types. Syncify is using [cross-spawn](https://www.npmjs.com/package/cross-spawn) under the hood to help negate any cross-platform issues that may arise. Please note that all stdout/stderr/stdio from spawned processes will be piped through and intercepted by Syncify, which might result in output being stripped of color. Below are a couple examples where we spawn up 2 well known JavaScript bundlers and lastly we illustrate how to spawn multiple processes.

### Rollup Example

If you are processing JavaScript asset files using the [Rollup](https://rollupjs.org/) bundler you can spawn build and watch processes by providing the rollup commands to each mode accordingly. Rollup is a fantastic choice for handling `.js` files and is the preferred option for processing these asset types. In this example, it is assumed that a `rollup.config.js` file is located in the root of your project.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/syncify';

export default defineConfig({
    spawn: {
      build: {
        rollup: 'rollup -c'
      },
      watch: {
        rollup: 'rollup -c -w'
      }
    }
  }
})
```

### Webpack Example

If you are processing JavaScript asset files using the [Webpack](https://webpack.js.org/) bundler you can spawn build and watch processes by providing the webpack commands to each mode accordingly. You will need to be using the [Webpack CLI](https://github.com/webpack/webpack-cli) module to ensure a successful spawn is triggered.

> Notice how we also provide the `--color` flag in the spawn. If you omit this flag then the webpack logs will be printed to the CLI without colors, when using webpack you should provide this flag.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/syncify';

export default defineConfig({
    spawn: {
      build: {
        webpack: 'webpack --color'
      },
      watch: {
        webpack: 'webpack --watch --color'
      }
    }
  }
})
```

### Multiple Processes

Though it is unlikely you'd ever need to include 2 different JavaScript bundlers in a project there is nothing stopping you from doing such a thing. For the sake of brevity, the below example illustrates how we can execute multiple spawned child processes to run in parallel with Syncify. Notice how we have also included an additional **gulp** spawn in `build` and `watch` modes. Syncify will trigger these processes in sequentially order, Rollup (1), Gulp (2) and Webpack (3).

> Aside from attempting to spawn Syncify itself, there is no limitation or restrictions imposed on what you choose to run along side Syncify.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/syncify';

export default defineConfig({
    spawn: {
      build: {
        rollup: 'rollup -c',
        webpack: 'webpack --color',
        gulp: 'gulp watch-task'
      },
      watch: {
        webpack: 'webpack --watch --color',
        rollup: 'rollup -c -w',
        gulp: 'gulp watch-task'
      }
    }
  }
})
```

# Transform

In Syncify, asset files can be transformed and augmented before being written to the defined `output` directory and uploaded to your Shopify store. The `transform` option allows you to control how your asset files are processed. Syncify supports built-in and partial processing for the following file types:

- `.json`
- `.js`
- `.ts`
- `.jsx`
- `.tsx`
- `.css`
- `.scss`
- `.sass`
- `.svg`

## Scripts

Syncify exposes a `scripts` transform option which can be used as a convenience wrapped around the [tsup](https://tsup.egoist.sh/#what-can-it-bundle) bundler. TSUP uses the powerful [ESBuild](https://esbuild.github.io/) under the hood for processing TypeScript and JavaScript file types.

## Styles

Syncify exposes a `styles` transform option which can be used as a convenience wrapper for handling `.css`, `.scss` or `.scss` asset files types. The **styles** option accepts an **array** list of style specific configurations that are used together with compilers like [Dart SASS](#) and [PostCSS](#). Style transforms help alleviate the complexities sometimes involved in setting up these tools so you can easily process and generate asset specific stylesheets that can be optionally inlined as a **snippet** file.

### SASS Support

Syncify provides partial processing of `.scss` and `.sass` file types using [Dart SASS](#). If you require transform support for these files you need to install the Dart module as a development dependency in your project.

```
pnpm add sass -D
```

### CSS Support

In addition to SASS transformation, Syncify also support CSS processing using [PostCSS](#). If you wish have Syncify handle CSS transforms then you need to install **PostCSS** as a development dependency and also include a `postcss.config.js` file in your project. Syncify expects you will inform upon how CSS files are to be handled within a `postcss.config.js` file and it will look for the existence of one within your workspace.

> Provide PostCSS plugins and any specific settings within the `postcss.config.js` file.

```
pnpm add postcss -D
```

**Please note:** If you are using Syncify to compile SASS files, then by default the transformed CSS will be passed to PostCSS. Use the available Syncify `style` options to disable this behavior.

### Usage

In the below example we are generating multiple stylesheets and compiling both SCSS and CSS file types. The example illustrates how one can leverage Syncify together with [Dart SASS](#), [PostCSS](#) and additional node modules like the Bootstrap framework.

> **Please Note** You will need to remove the comments from the code example if you are copy and pasting it into your `package.json` file. JSON with Comments is not supported in `package.json` files.

<!-- prettier-ignore-->
```ts
import { defineConfig } from '@syncify/syncify'

export default defineConfig({
  transforms: {
   script: {
      'assets/bundle.min.js': 'scripts/bundle.ts',
      'assets/mithril.min.js': 'scripts/virtual.ts',,
      'snippets/[dir]-[file]': ['scripts/globs/*.ts'],
      'assets/globs.min.js': {
        input: 'scripts/globs.ts',
        format: 'iife'
      }
    },
    style: {
      'assets/stylesheet.min.css': {
        input: 'styles/stylesheet.scss',
        watch: ['styles/sections/*'],
        postcss: true,
        sass: true
      },
      'snippets/css.liquid': {
        input: 'styles/vars.css.liquid',
        postcss: true,
        sass: true
      },
      'assets/bootstrap.min.scss': {
        input: 'styles/vendors/bootstrap.scss',
        style: 'expanded',
        includePaths: ['node_modules/bootstrap']
      }
    }
  }
})
```

## Views

The `views` transform option controls how `.liquid` file types should be handled. Snippets, Templates, Sections and Layout paths are typically where liquid files are used. Options defined here will be used when Syncify is processing such types.

### Sections

Syncify provides sub-directory grouping and rename prefixing capabilities when handling theme sections. You might be accustom to storing sections within a single directory and despite Shopify using this approach in their Dawn theme, it is restrictive and rather chaotic to the developer experience. A far better approach is to take advantage of the sub-directory grouping feature which Syncify provides.

**Sub-directory Grouping**

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
      "sections/**/*"
    ]
  },
  "sections": {
    "prefix": true,
    "prefixSeparator": "-",
    "prefixDuplicates": true,
    "globals": [
      "shared",
      "layout",
      "related.liquid"
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

Notice how we can nest sections within sub-directories and also apply prefixing to the section output filenames. We also inform Syncify that some of our sections should be considered **global** and this allows those defined there to pass through without name augmentation (prefixing). We passed a `true` value to the `prefix` option, this informed Syncify that section files which are not explicitly defined as **global** should have their output filename prefixed with the **parent** directory name they are contained within.

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

# Processors

Syncify can used together with different _third party_ preprocessor tooling and has built-in support that can be deferred to for handling. Using processors requires installing the relative module you'd like to leverage. This is an opt-in capability.

### Script

- [ESBuild](#esbuild)

### Svg

- [SVGO](#svgo)
- [Sprite](#sprite)

### Style

- [SASS](#sass)
- [PostCSS](#postcss)

### Image

- [Sharp](#sharp)

# ESBuild

Syncify provides integrated support with ESBuild for processing TypeScript, JavaScript, JSX and TSX file types. ESBuild provides wonderful capabilities like code splitting and tree shaking.

See also [Script Transforms](#).

### Installation

Install ESBuild as a development dependency in your project:

```bash
pnpm add esbuild -D
```

### Configuration

<!-- prettier-ignore -->
```ts
{
  processors: {
    esbuild: {} // TSUP config options
  }
}
```

# SASS

Syncify provides integrated support with SASS Dart for processing SASS/SCSS file types. Syncify implements its own handling when for usage with SASS and allows you to use it together with [PostCSS](#postcss).

See also [Style Transforms](#).

### Installation

Install SASS as a development dependency in your project:

```bash
pnpm add sass -D
```

### Configuration

<!-- prettier-ignore -->
```ts
{
  processors: {
    sass: {} // SASS config options
  }
}
```

# PostCSS

Syncify provides integrated support with PostCSS for processing CSS file types. You can leverage PostCSS together with the SASS processor for CSS files.

See also [Style Transforms](#).

### Installation

Install PostCSS as a development dependency in your project:

```bash
pnpm add postcss -D
```

### Configuration

<!-- prettier-ignore -->
```ts
{
  processors: {
    postcss: [] // PostCSS plugins
  }
}
```

# SVGO

Syncify provides integrated support with SVGO for processing SVG file types. If you would like to produce SVG Sprites, then you install [Spriter](#spriter) which uses SVGO under the hood.

See also [SVG Transforms](#) and [Icons Plugin](#).

### Installation

Install SVGO as a development dependency in your project:

```bash
pnpm add svgo -D
```

### Configuration

<!-- prettier-ignore -->
```ts
{
  processors: {
    svgo: {} // SVGO config options
  }
}
```

# Sprite

Syncify provides integrated support for creating SVG Sprites using Spriter (aka: SVG Sprite). SVG Sprite is a low level module that optimizes SVGs and bakes them into sprites that Syncify can inline and output.

See also [SVG Transforms](#) and [@syncify/icons-plugin](#).

### Installation

Install Spriter as a development dependency in your project:

```bash
pnpm add svg-sprites -D
```

### Configuration

<!-- prettier-ignore -->
```ts
{
  processors: {
    sprite: {} // SVG Sprite config options
  }
}
```

# Sharp

Syncify provides integrated support for convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions using the Sharp.

See also [Image Transforms](#)

### Installation

Install Sharp as a development dependency in your project:

```bash
pnpm add sharp -D
```

### Configuration

<!-- prettier-ignore -->
```ts
{
  processors: {
    sharp: {} // Sharp config options
  }
}
```

# Minify

TODO

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

Resource Flags:
  -t, --theme   <targets>    A comma separated list of theme targets
  -b, --build               Triggers a build, use with upload to run build before uploading
  -w, --watch               Starts watching for changes of files building when they occur
  -u, --upload              Uploads theme to online store, use with -t to target theme
  -d, --download            Downloads themes/s from specified stores
  -p, --package             Package theme and export a .zip
  -m, --metafields          Metafields resource mode
  -l, --locales             Locales resource mode
  -s, --settings            Settings resource mode
  -o, --output  <path>      A path value (used in download and build mode only)
  -h, --help,               Prints command list and some help information
  -c, --clean,              Removes all output files, use with --build to clean before bundling
  -q, --query   <filter>    Query online store data API, eg: themes, metafields assets
  -v, --version <action>    Version control resource mode (see version arguments)

Version Arguments:
  patch                    Increments the package.json version patch, eg: 1.0.0 > 1.0.1
  minor                    Increments the package.json version minor, eg: 1.0.0 > 1.1.0
  major                    Increments the package.json version major, eg: 1.0.0 > 2.0.0

Operation Flags:
  --status                 Checks development environment and connections are valid.
  --pull                   Pull data from online store
  --merge                  Merge online data with local references

Generator Flags:
  --vsc                    Generates JSON schema spec for vscode users

Environment Flags:
  --dev, --development     Run in development mode (default)
  --prod, --production     Run in production mode
```

### Example

CLI usage aims to be as simple as possible. A typical project will be targeting a single Shopify theme but you can target multiple themes and stores in seamless and productive manner. When targeting multiple stores or themes the CLI employs a flag based naming approach.

**Generate theme targets**

```cli
$ syncify store-name -q themes
```

Prompt interface will be initialized

1. Target **store-name**
2. Initialize Query resource
3. Inform query we want the "themes" endpoint

**Generate local metafields**

```cli
$ syncify store-name -m --pull
```

Prompt interface will be initialized

1. Target **store-name**
2. Initialize Metafields resource
3. Pull data from online-store

**Upload theme to online store**

```cli
$ syncify store-name -t theme-1,theme-2 -c -b -u --prod
```

Exchange interface will be initialized

1. Target **store-name**
2. Theme targets are **theme-1** and **theme-2**
3. Trigger Clean
4. Trigger Build (production build because of --prod flag)
5. Trigger Upload

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

- [Joseph Curtis](#)
- [David Warrington](https://ellodave.dev/)
- [Mansedan](#)

# Changelog

Refer to the [Changelog](changelog.md) for each per-version update and/or fixes.
