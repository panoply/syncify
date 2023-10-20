**BETA VERSION**

<hr>

# SYNCIFY

A lightening fast, extensible and superior alternative Shopify CLI (Theme Development) tool. Syncify provides developers with a powerful CLI and employs an intuitive approach for creating Shopify themes. It's batteries included solution designed for advanced theme development.

### Demos

- [Syncify Dawn Basic](https://github.com/panoply/syncify-dawn-basic)
- [Syncify Dawn Advanced](https://github.com/panoply/syncify-dawn-advanced)

### Key Features

- Watch, upload, import and export to multiple storefronts and themes.
- Intelligent path mapping resolutions that support custom directory structures.
- HOT Reloading of assets, section, snippets, templates and layouts.
- Shared section schema support with IntelliSense support in [VSCode Liquid](https://github.com/panoply/vscode-liquid).
- Clear, concise, informative and beautiful TUI/CLI logging.
- An elegant global directory based metafields sync approach using JSON files.
- Supports spawned processing with existing build tools.
- Additional resource controls for syncing Files, Pages and Redirects.
- Provides a simple Reusable Sections approach for shared section references

### Why?

I have been working on the Shopify platform for several years and nothing the Shopify team have produced has increased my productivity. Despite the advancements Shopify has made in recent years I still find their developer tooling to be missing the mark and a clear disconnect is apparent. The Shopify CLI is cool and all but for me the approach to theme development fails to achieve fluidity. Syncify is how I believe theme creation, development and maintenance should be done.

This tool provides you with essential stack tooling for producing lean, performant and refined themes. It's fast, flexible, extensible, scalable but most importantly, it's an un-restrictive workflow.

# Installation

Syncify is distributed as both an ESM and CJS module. It is recommended that you install as a development dependency in your project opposed to installing globally. Please consider choosing and adopting [pnpm](https://pnpm.js.org/en/cli/install) as your package manager for most optimal usage.

**PNPM**

```bash
pnpm add @syncify/cli -D
```

> Use `pnpx @syncify/cli` for remote execution

**NPM**

```bash
npm i @syncify/cli --save-dev
```

> Use `npx @syncify/cli` for remote execution

**Yarn**

```bash
yarn add @syncify/cli --dev
```

# Setup

After installing you will need to configure a connection to your shopify store and provide an ngrok auth token. Syncify requires you provide either an Admin API Access Token (recommended) or API Key and Secret as credentials. The ngrok auth token is optional, but required if you plan to publish themes to stores.

### Shopify Authorization

Syncify requires Admin API access to your store/s.

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

### Ngrok Authorization

If you are planning to deploy themes using Syncify, you will need to provide an [ngrok](http://ngrok.com) auth token. This is simple, easy and **free** to acquire. Follow the below steps:

1. Create a `.env` file in your project root
2. Sign-up to [ngrok](https://dashboard.ngrok.com/signup)
3. You have an auth token

Provide the ngrok auth token within your `.env` file as follows:

```bash
NGROK_AUTH_TOKEN = 'abcdefghijklmnopqrstuvwz'
```

# Credentials

Shop credentials and your ngrok authorization can be stored within a `.env` file. You can also provide credentials at runtime using `process.env` variables. The preferred approach is to store this information within a `.env` file.

> Syncify also supports `.env.syncify` or `.env.syncify.json` environment files.

### Using a `.env` file

When using a `.env` file, you can provide shop credentials in either uppercase of lowercase format. The `.env` values **must** begin with the shop name following an underscore `_` character. If you are syncing to multiple storefronts just follow the pattern for each store.

Using an **API Access Token**

```bash
FOO_API_TOKEN = 'shpat_abcdefghijklmnopqrstuvwz' # FOO > foo.myshopify.com
```

Using an **API key** and **API Secret**

```bash
FOO-BAR_API_KEY = 'abcdefghijklmnopqrstuvwz'    # FOO-BAR > foo-bar.myshopify.com
FOO-BAR_API_SECRET = 'abcdefghijklmnopqrstuvwz' # FOO-BAR > foo-bar.myshopify.com
```

### Using `process.env` variables

Syncify also supports runtime credential assignment. This approach allows you to set credentials via the command line or within a script executable. This is highly discouraged and rather insecure.

Using an **API Access Token**

```js
// Using an API Access Token
process.env['FOO_API_TOKEN'] = 'shpat_abcdefghijklmnopqrstuvwz';
```

Using an **API key** and **API Secret**

```js
// Using an API Key and API Secret
process.env['FOO-BAR_API_KEY'] = 'abcdefghijklmnopqrstuvwz';
process.env['FOO-BAR_API_SECRET'] = 'abcdefghijklmnopqrstuvwz';
```

Defining **ngrok**

```js
// Using an API Key and API Secret
process.env['NGROK_AUTH_TOKEN'] = 'abcdefghijklmnopqrstuvwz';
```

<!--
### Testing Scopes

Once you've configured credentials, it's a good idea to **test** your connection to ensure that Syncify has got access to your store/s and you've provided the correct scopes. Open up your terminal and run the following command:

```bash
$ pnpm syncify doctor
```

The `syncify doctor` command instructs Syncify to tests your credentials, scopes and general setup. If Syncify has encountered an error or it cannot access certain store resources you will be informed. -->

# Stores

Once you've configured credentials, you will need to provide store references. Stores references are provided within your projects `package.json` file on the `syncify > stores` key property. Syncify exposes a helpful command which you can use to automatically setup stores and themes.

Open up your terminal and run the following command:

```bash
$ pnpm syncify themes
```

You will be prompted

```jsonc
{
  "syncify": {
    "stores": {
      "domain": "shop-1", // equivalent of shop-1.myshopify.com
      "themes": {
        "dev": 123456789,
        "prod": 123456789,
        "test": 123456789
      }
    }
  }
}
```

###

The option accepts an **object** or **array** type. Each item will hold reference to your shopify store/s and their theme/s. For each store you define, you will provide the **shop** name, theme **target** name and **id**. The `themes` object uses a **key** > **value** structure, where the **key** represent a theme name (target) and the value a theme id.

The information you provide to this option can be used via the CLI when targeting and executing operations. Please refer to the [commands](#commands) portion of this readme for more information on CLI usage.

> **Note**
>
> The theme target name does need to match that defined in your online store and can be anything you like.

### Config File

Below is an example of how a store reference can be defined. In the example, we have only provided a store domain `shop-1.myshopify.com` and 3 themes to connect and interface with. You can provide reference to multiple stores by passing an array list using the same structure.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  stores: {
    domain: 'shop-1', // equivalent of shop-1.myshopify.com
    themes: {
      dev:  123456789,
      prod: 123456789,
      test: 123456789
    }
  }
});
```

# Stores

Once you've configured credentials, you will need to provide store references. Syncify requires that you provide stores references within your projects `package.json` file.

# Configuration

Syncify supports `syncify.config.ts` and `package.json` configurations. Depending on your preference, either option suffices and no restrictions are imposed. If you are defining options within your projects `package.json` file you can assign options on the `syncify.config` property.

### Supported Files

Syncify supports the following configuration file types. The recommended approach is the TypeScript `syncify.config.ts` configuration file type.

- `syncify.config.ts`
- `syncify.config.js`
- `syncify.config.ts`
- `syncify.config.mjs`
- `syncify.config.cjs`
- `syncify.config.json`

### Default Options

Below are the **default** configurations. Options commented out within [transform](#transform), [processors](#processors) and [terser](#terser) require peer dependencies to be installed for usage.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme',
  export: 'export',
  import: 'import',
  config: '.',
  clean: true,
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
    metaobject: [
      'templates/metaobject/*.json'
    ],
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
  hot: {
    label: 'visible',
    history: true,
    method: 'hot',
    inject: true,
    strategy: 'hydrate',
    scroll: 'preserved',
    server: 3000,
    socket: 8089,
    layouts: [
      'theme.liquid'
    ],
  },
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  },
  spawn: {
    build: {},
    watch: {},
  },
  views: {
    snippets: {
      separator: '-',
      global: [],
      prefixDir: false,
      renamePatterns: {}
    },
    sections: {
      separator: '-',
      prefixDir: false,
      global: [],
      renamePatterns: {}
    },
    pages: {
      safeSync: true,
      author: '',
      importLanguage: 'html',
      suffixDir: false,
      global: []
    }
  },
  transform: {
    script: {},
    style: {},
    svg: {},
    image: {}
  },
  processors: {
    json: {
      crlf: false,
      indent: 2,
      useTab: false,
      exclude: []
    }

    // Refer to transforms section for usage
    //
    // esbuild: {},
    // sass: {},
    // postcss: [],
    // tailwind: {},
    // svgo: {},
    // sprite: {},
    // sharp: {},

  },
  terser: {
    json: {
      assets: true,
      config: true,
      locales: true,
      metafields: true,
      templates: true,
      exclude: []
    },
    views: {
      collapseWhitespace: true,
      minifySchema: true,
      minifyScript: true,
      minifyStyle: true,
      removeComments: true,
      stripDashes: true,
      exclude: []
    },

    // Refer to terser section for usage
    //
    // script: {},
    // style: {},
  }
});
```

# Getting Started

It is relatively easy to get started developing Shopify themes using Syncify. If you are converting an existing project and using Theme Kit, Shopify CLI or another build environment you can progressively adapt it into your workflow by manually configuring how Syncify should behave. Whatever the case, have a look at the [Syncify Dawn (Basic)](https://github.com/panoply/syncify-dawn-basic) example repository as a starting point.

### Pre-requisites

Before going over the features Syncify provides, it is assumed that you have done the following:

1. Installed Syncify as a development Dependency
2. Created a private app and added API credentials
3. Added a `syncify.config.ts` file in the root of your project

### Contents

- [Directories](#directories)
- [Paths](#dirs)
- [Stores](#stores-required)
- [Hot](#hot)
- [Spawn](#spawn)
- [Views](#views)
- [Transforms](#views)
- [Processors](#views)
- [Terser](#views)

# Directories

Syncify requires you to define custom **base** directory paths that point to theme files. The values you provide will refer to a directory name that is relative to the root of your project. You **cannot** define multi-level directories (eg: `some/dir`) or reverse paths (eg: `../dir`). You can pass these references within your syncify configuration file or via the CLI.

> **Note**
>
> References passed in via the CLI will overwrite those provided in syncify configuration files.

### Input → Output

Syncify expects projects to have an **input** directory path which contains theme **source** files. Files contained within an input directory are written to your defined **output** directory path. The generated output will be reflective of your online store and in most cases you will add the output directory to your `.gitignore` file (because it can always be rebuilt from input). If you have become accustomed to working from a single directory structure (i.e: Shopify Dawn) it is important that you understand the difference between the **input** and **output** directory approach.

Single directory structures are not a viable approach when building modern and performant Shopify themes. Client-side (front-end) development is not SaaS specific and thus, with the proper tooling, Shopify theme development does not require one to adhere to the imposed approach of Shopify Dawn (via Shopify CLI). The argument for multi-directory architecture rests upon the millions of projects which isolate source ~ distribution variations and appropriate such logic.

### Default Structure

Below is an example of a Syncify theme structure using the defaults. Syncify will assume this directory structure if you do not provide any customizations via the CLI or within your syncify config file.

```bash
├─ source              # The src directory where you develop and theme files exist
├─ theme               # The output directory where source files will be written
├─ .env                # Shop credentials, such as Admin API Token or API key and secret
├─ .gitignore          # Files to be ignored by git, e.g: your .env file
├─ package.json        # The package.json file common in all Node projects, self explanatory
├─ syncify.config.ts   # The syncify config file, you can optionally use package.json
└─ tsconfig.json       # TypeScript configurations, this is optional but preferred.

```

<!-- prettier-ignore -->
<table>
  <thead>
    <tr>
      <th width="500px">Config File</th>
      <th width="500px">CLI Flags</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme',
  import: 'import',
  export: 'export',
  config: '.'
})
```

</td>
<td height="200px">

<!-- prettier-ignore -->
```bash


--input  -i   # Input Path
--output -o   # Output Path
--config -c   # Config Path
--export -e   # Export Path


```

</td>
</tr>

  </tbody>
</table>

### CLI Usage

Based on the above example configuration, this is how we would target and perform operations with the store and its theme/s using the CLI. In Syncify, when performing a sync action, you pass the store name as the first argument, followed by any `--flags`.

<!-- prettier-ignore -->
```bash

# FLAGS

--theme, -t <target>  # Theme name or comma separated list of theme names to target

# EXAMPLES

$ syncify shop-1 -t dev --watch          # Running watch mode and targeting dev theme
$ syncify shop-1 -t dev,prod --upload    # Uploading to the dev and prod themes of shop-1

```

### Options

<details>
<summary>
<strong><code>Domain</code></strong>
</summary>
<p>

The `domain` option expects a string value, which is your Shopify store name without the `myshopify.com` portion. The domain will be used by the CLI as a target argument. Each store (domain) can have multiple themes.

</p>
</details>

<details>
<summary>
<strong><code>Themes</code></strong>
</summary>
<p>

The `themes` option refers to theme ids the store contains. This option is an object type which uses **key** > **value** mappings. The theme **keys** represent a unique target name, this can be any alpha numeric value. The **key** value is used by the CLI as target reference. The **value** should be the theme id.

</p>
</details>

# Paths

The `paths` option allows you to define your theme/projects structure within the defined `input` directory. Syncify does not require you set a development structure required by Shopify and you should begin to decouple from that logic as it is generally flawed and restrictive when building advanced or large scale stores.

Each path key represents a theme directory or resource point. Path options accept either a `string` or `string[]` array list of glob [anymatch](https://www.npmjs.com/package/anymatch) patterns and can point to files contained within sub-directories of infinite depth. All defined references will automatically resolve to the defined `input` directory starting point, so you do not need to include it within your path definitions.

There is no restrictions or limitations imposed on structures other than **input** relativity. Syncify will obtain full resolution and build a valid theme structure that Shopify understands when generating an **output**.

### Config File

By default, Syncify assumes you are using a basic (defaults) structure. This structure is certainly not the preferred format and when leveraging Syncify you are encouraged to establish a structure which suits your project and adheres to your workflow or tastes.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

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
    // pages: 'pages/*',
    // redirects: 'redirects.yaml',
  }
})
```

### Custom Structures

Below are **2** different **input** structures and an **output** structure. The **default structure** is what Syncify will use (as above) if no `paths` have been defined in your configuration (the tool defaults to this). The **customized structure** is an example of how you _could_ arrange an `input` directory using the Syncify `paths` option. The **output structure** is what Syncify will generated as an **output** which Shopify can digest.

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
        ├─ metaobject
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
      ├─ meta
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
       ├─ metaobject
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

There is no distributed difference between the **default** and **customized** structures illustrated above. Both would generate an **output** that Shopify understands, requires and reasons with. Only the **input** source locations differ. The **output** Syncify creates will always be written to a standard Shopify theme structure regardless of how you may decide to organize **input** paths. Custom structures give you creative freedom and does not impose a restrictive workflow you may have become behest to working with Dawn and the Shopify CLI.

Welcome to the better approach, you're welcome.

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

<details>
<summary>
<strong><code>Metaobject</code></strong>
</summary>
<p>

An array list of glob path patterns to `.json` **metaobject** template files. These will be written to the `{output}/templates/metaobject` directory of your defined `output` path.

</p>
</details>

# Shared Section Schema

Syncify provides an elegant and simple solution for shared section schema. Shared section schema provides developers an easy way to re-use section contents between section files containing schema.

> Use the [VSCode Liquid](https://github.com/panoply/vscode-liquid) extension and take advantage of the Syncify Shared Section Schema approach with IntelliSense capabilities.

### How it works?

Shared Section Schemas

### Structures

There are several different structures you can use for defining shared schemas.

##### Setting Singleton

```json
{
  "example": {
    "$description": "An optional internal description used by VSCode Liquid",
    "type": "textarea",
    "id": "items",
    "label": "items",
    "default": "Item 1\nItem 2\nItem 3\netc etc",
    "info": "Separate each item to render on newline"
  }
}
```

##### Settings Spread

Below is an example of a shared schema settings spread. The approach accepts an array list of settings and when referenced in sections will spread the output.

```jsonc
// source/schema/test.json
{
  "example": [
    {
      "type": "text",
      "id": "foo",
      "label": "Example 1"
    },
    {
      "type": "text",
      "id": "bar",
      "label": "Example 2"
    }
  ]
}
```

<details>
<summary>
<strong>Reference Example</strong>
</summary>
<p>

Referencing the above shared schema in your section `{% schema %}` tag

```liquid
{% schema %}
{
  "settings": [
    {
      "$ref": "test.example"
    }
  ]
}
{% endschema %}
```

</details>

<details>
<summary>
<strong>Output Example</strong>
</summary>
<p>

The generated output will inject and spread the schemas you've defined.

```liquid
{% schema %}
{
  "settings": [
    {
      "type": "text",
      "id": "foo",
      "label": "Example 1"
    },
    {
      "type": "text",
      "id": "bar",
      "label": "Example 2"
    }
  ]
}
{% endschema %}
```

</p>
</details>

##### Settings Collection

```json
{
  "example": {
    "$description": "An optional internal description used by VSCode Liquid",
    "settings": [
      {
        "type": "text",
        "id": "foo",
        "label": "Example",
        "default": "Hello World",
        "info": "Lorem ipsum dolor sit amet"
      }
    ]
  }
}
```

##### Block Singleton

```json
{
  "block_singleton": {
    "$description": "An optional internal description used by VSCode Liquid",
    "name": "",
    "type": "",
    "settings": []
  }
}
```

##### Block Collection

```json
{
  "example": [
    {
      "$description": "An optional internal description used by VSCode Liquid",
      "name": "foo",
      "type": "bar",
      "settings": [
        {
          "type": "article",
          "id": "something",
          "label": "Something"
        }
      ]
    },
    {
      "$description": "An optional internal description used by VSCode Liquid",
      "name": "bar",
      "type": "baz",
      "settings": [
        {
          "type": "text",
          "id": "foo",
          "label": "Example",
          "default": "Hello World",
          "info": "Lorem ipsum dolor sit amet"
        }
      ]
    }
  ]
}
```

# HOT

Live reloading is supported in watch mode. Syncify leverages websocket's, XHR and statically served endpoints to provide this capability with zero configuration or the need to install or setup additional tooling. No extensions and no complexities. Syncify will listen for messages sent via websocket on the client and carry out HOT replacements of Assets, Sections, Snippets, Layouts and Templates without triggering full-page refreshes. HOT Reloads can be enabled by passing the `--hot` flag via the CLI.

> The HOT reload approach Syncify employs tends to be considerably faster than HOT reloading with the Shopify CLI.

### Assets

SASS/CSS, TypeScript/JavaScript and SVG asset file types are HOT reloaded by swapping out the URL's or containing source with localhost equivalents served statically by Syncify.

### Section

Dynamic sections, static sections of a combination of both are fetched via the Ajax [Section rendering API](https://shopify.dev/docs/api/section-rendering). Replacements are applied to fragments in real-time and surrounding nodes are left intact.

### Snippets, Layouts and Templates

In order to provide HOT replacements Syncify employs a mild form of DOM hydration. Snippets, templates and Liquid/JSON layout files will inject HTML comments `<!-- hot:1aa4f32cf9 -->` containing a UUID before they are uploaded to themes. Syncify will pass this UUID to the client via websocket and once received an XHR (fetch) will be triggered. The response of the XHR request is then parsed and all nodes which proceed the injected UUID comment/s are plucked and swapped in the persisted DOM while leaving unchanged elements intact. The approach employed by Syncify is a mild form DOM hydration that's 10x faster than invoking a hard-refresh.

## Programmatic Control

Running in HOT mode will result in Syncify injecting a snippet into layouts. The snippet is the socket receiver that is responsible for executing replacements/morphs and exposes programmatic control for developers who can to customize or hook into the HOT reload rendering cycles.

```ts
// STATUS
//
window.syncify.ready: boolean
window.syncify.connected: boolean;

// RELOADS
//
window.syncify.assets(): void;
window.syncify.reload(): void;
window.syncify.refresh(): void

// SECTIONS
//
window.syncify.sections.get()
window.syncify.sections.list()
window.syncify.sections.load()

// LABEL
//
window.syncify.style.parent({ /* CSS */ });
window.syncify.style.label({ /* CSS */ });
```

# Pages

Syncify supports page sync and employs an intuitive approach to working with static pages for stores. The [paths](#paths) **pages** option is where you can provide path file references to be synced. Pages in Syncify can be either `.html` (markup) or `.md` (markdown) files and cannot contain Liquid syntax (Shopify does not support Liquid in pages only static markup). Syncify also support frontmatter in page files, this allows you to pass in additional data when syncing to store/s.

### Options

The `pages` setting available in the `views` option of your `syncify.config.ts` file allows you to configure page processing and transforms. In Syncify, frontmatter can be used to configure per-page control.

<!--prettier-ignore-->
```js
import { defaultConfig } from '@syncify/cli'

export default defineConfig({
  ...,
  paths: {
    // Set the location of page files
    pages: [
      'pages/*.md',
      'pages/*.html'
    ]
  },
  views: {

    pages: {
      suffixDir: false,        // When true, directory name will be used for template_suffix
      safeSync: true,          // Ensure local and remote versions are aligned
      author: '',              // Fallback author name
      global: [],              // List of directories to exclude from applying template_suffix
      importLanguage: 'html'   // Set the import language when remote sources sync to local ones
    }

  }
})
```

### Remote and Local sources

By default, syncify will perform **safe** synchronization. The `safeSync` option instructs syncify to pull down remote versions before uploading local ones in watch and upload modes. This operation ensures that you do not overwrite page content in situations where changes have been applied in your store since the last sync was performed on your local machine. Syncify will prompt you when misalignment is detected and allow you to pull in the remote versions.

### Markdown Support

Pages can be written in markdown, Syncify will transform `.md` page files into valid HTML markup when syncing. Markdown pages are parsed and transformed using the the powerful [markdown-it](https://github.com/markdown-it/markdown-it) and support Github flavored markdown syntax. In addition to Markdown → HTML generation, Syncify can also perform reversed conversion (HTML → Markdown). Using the `importLanguage` option, any time a remote to local alignment is carried out, files will be written in markdown.

### Frontmatter Support

You can pass frontmatter data in page files. Page frontmatter can be used to control per-page publishing settings and allows for additional request payloads to be passed. Syncify supports a modest schema structure for page frontmatter.

<!-- prettier-ignore -->
```yaml
---
title: 'Lorem Ipsum'    # The page title
handle: '/some-handle'  # Custom page handle
template: 'example'     # Specify a template_suffix
published: true         # Whether the page is published
links: false            # Auto-convert URL-like
breaks: true            # Convert '\n' into `<br>`
metafields:             # Pass in additional metafields
  - namespace: 'foo'
    key: 'greeting'
    type: 'single_line_text_field'
    value: 'Hello World!'
  - namespace: 'bar'
    key: 'some_condition'
    type: 'boolean'
    value: true
---
```

# Metafields

###### NOT YET AVAILABLE

The `metafields` directory `path` reference is where you can provide **global** JSON metafield files that can be synced to your Shopify store. Metafield sync capabilities provided by Syncify use a simple **directory** > **file** based approach. The sub-directory names represent a metafield `namespace` value and JSON file names contained within represent metafield `key` values.

> Syncify will keep your remote and local metafield references aligned with one another and warn you when local versions do not match remote versions. This will help prevent you from overwriting changes that may have been applied by third-party apps or online within your store.

**Pull Metafields**

Syncify provides you with simple interactive prompt based approach for importing pre-existing metafields from your online store. You can optionally choose which metafields you'd like to maintain. Use the `-m` or `--metafields` flag together with the `--pull` flag on the command line to download metafields:

```
$ syncify --metafields --pull
```

**Merge Metafields**

Working with metafields from your local machine may have result in unexpected overwrites if changes were made to remote versions that conflict with local versions. In order to combat this Syncify support **merge** capabilities which can be used to merge changes when metafield modification timestamps differ. Use the `-m` or `--metafields` flag together with the `--merge` flag on the command line perform local and remote alignments.

```
$ syncify --metafields --merge
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

# Spawn

The spawn option accepts a **key** > **value** list of commands (i.e: scripts) which can be used when running in **watch** (`--watch`) or **build** (`--build`) modes. The Spawn configuration option allows you to leverage additional build tools and have them execute in parallel with Syncify as child processes.

Spawned processes allow you use your preferred asset bundlers such as [Rollup](#), [Webpack](#), [Gulp](#) and many more without having to run multiple npm-scripts.

### Overview

There are 2 available modes from which you can trigger a spawned process. When a process is spawned in `watch` mode it will run along side Syncify in parallel and execute sequentially in the order of which each spawn is defined. You need to provide any --flags your command (build tool or bundler) requires when running. Spawning a process in `build` mode will trigger spawned commands only 1 time, so it is here where you would provide the compile-only or build-only command, ie: not using watch flags/arguments.

The Syncify **build** mode re-builds the entire theme and you might choose to run this mode using the Syncify `--prod` flag, if you require context of the environment, mode or action taking place within spawned config files, then take a look at the available [Utilities](#utilities) which Syncify exposes to help conditionally load plugins or trigger different build types in accordance with the Syncify execution cycle.

### CLI

```bash
--spawn, -s <name>   # spawn targeting
```

### Configuration

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({

    // ...

    spawn: {
      build: {},
      watch: {}
    }
  }
})
```

## Usage

In most situations you will leverage the spawn option to compile something like TypeScript or JavaScript but it is important to note that this capability is not specific to these assets types. Syncify is using [cross-spawn](https://www.npmjs.com/package/cross-spawn) under the hood to help negate any cross-platform issues that may arise. Below are a couple examples where we spawn up 2 well known JavaScript bundlers and lastly we illustrate how to spawn multiple processes.

> All stdout/stderr/stdio from spawned processes will be piped through and intercepted by Syncify, which might result in output being stripped of color.

### Rollup Example

If you are processing JavaScript asset files using the [Rollup](https://rollupjs.org/) bundler you can spawn build and watch processes by providing the rollup commands to each mode accordingly. Rollup is a fantastic choice for handling `.js` files. In this example, it is assumed that a `rollup.config.js` file is located in the root of your project.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli';

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
import { defineConfig } from '@syncify/cli';

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
import { defineConfig } from '@syncify/cli';

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

In Syncify, asset files can be transformed before being written to the defined `output` directory and uploaded to your Shopify store. The `transform` option provides users with control of the "asset pipeline" and Syncify exposes configuration wrappers for handling files together with modern developer tooling. Transforms are totally optional, and require you to provide additional modules in your project.

Syncify supports built-in and partial processing for the following file types:

- `.json`
- `.js`
- `.ts`
- `.jsx`
- `.tsx`
- `.css`
- `.scss`
- `.sass`
- `.svg`

## Script

Syncify exposes a `script` transform option which supports TypeScript (`.ts` and `.tsx`) and/or JavaScript (`.js` and `.jsx`) bundling using [ESBuild](https://esbuild.github.io/). Script transforms use a pre-defined set of processing configurations and will produce lean JavaScript bundles designed to work seamlessly in development mode or when leveraging HOT reloads. Syncify will also apply refinements to distribution bundles focused on performance when generating production builds for your Shopify theme.

> ESBuild is the same bundler used under the hood by tools like [vite](https://vitejs.dev/) and [tsup](https://tsup.egoist.sh). If you are using existing tools like Webpack or Rollup, consider adopting ESBuild as its a far superior option.

### Installing ESBuild

In order for you to leverage **script** transforms, you will need to install ESBuild as a development dependency. Syncify will complain if you try to use script options without esbuild installed.

```bash
pnpm add esbuild -D
```

### Bundling TypeScript

The **script** transform option aims to make bundling easy but also extensible for more advanced use cases. Syncify will automatically detect `tsconfig.json` (or `jsconfig.json`) files located in your workspace and respect processing options defined within. By default, Syncify will produce **ESM** module formats that output in **ES2016** but you can also generate **IIFE** bundles and even inline code as a snippets within `<script></script>` tags.

The `script` options accepts several different structures and it is up to you how you wish to provide settings. The below code sample depicts the default configuration structure:

<!--prettier-ignore-->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    script: [
      {
        input: [],
        format: 'esm',
        target: 'es2016',
        snippet: false,
        rename: '',
        external: [],
        watch: [],
        esbuild: {}
      }
    ]
  }
})
```

You may prefer to use rename (entry point) structures instead. When we are using rename entry points the prefix path expects either `snippets/` or `assets/` be provided. When passing `snippets/` then a snippet will be generated, whereas `assets/` will generate a `.js` file.

> Rename entry points accept `[file]`, `[dir]` and `[ext]` placeholders.

<!--prettier-ignore-->
```ts
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    script: {

      // Producing 2 inline snippet <script> bundles
      // Output will be slideshow.js.liquid and search-form.js.liquid
      'snippets/[file][ext]': [
        'scripts/sections/slideshow.ts',
        'scripts/sections/search-form.ts'
      ]

      // Producing an IIFE script as an asset
      // The return value is accessible via window.Foo
      'assets/foo.min.js': {
        input: 'scripts/index.ts',
        format: 'iife',
        globalName: 'window.Foo,
      }
    }
  }
})
```

## Styles

###### TAILWIND IS NOT YET SUPPORT

Syncify exposes a `style` transform option which can be used for CSS (`.css`) and SCSS/SASS (`.scss` or `.sass`) bundling. Style transform support is made possible by using compilers like [Dart SASS](#), [PostCSS](#) and/or [Tailwind](#). The `style` option provides developers with replicated configuration control but you may also prefer to use standard config files (e.g: `postcss.config.js`) which Syncify also supports.

Style transforms help alleviate the complexities sometimes involved in setting up these tools so you can easily process asset specific stylesheets or generate output as a **snippet** within `<style></style>` tags.

### SASS Support

Syncify provides SCSS/SASS transform support for `.scss` and `.sass` file types using [Dart SASS](#). Using SASS required you to install the Dart module as a development dependency in your project. Syncify will complain if you try to use SASS transforms without Dart SASS installed.

```bash
pnpm add sass -D
```

### Tailwind Support ~ COMING SOON

Syncify supports TailwindCSS for CSS processing. If you require transform support for Tailwind, you need to install the TailwindCSS module as a development dependency in your project. Syncify will ignore Tailwind class name occurrences without the module installed.

```bash
pnpm add tailwindcss -D
```

> Tailwind is not yet available in the beta.

### PostCSS Support

In addition to SASS transformation, Syncify also support CSS (post)-processing using [PostCSS](#). If you wish have Syncify handle CSS transforms then you need to install **PostCSS** as a development dependency. Syncify will complain if you try to use PostCSS transforms without PostCSS installed.

> Provide PostCSS plugins and any specific settings within the `postcss.config.js` file.

```
pnpm add postcss -D
```

**Please note:** If you are using Syncify to compile SASS files, then by default the transformed CSS will be passed to PostCSS.

### Usage

In the below example we are generating multiple stylesheets and compiling both SCSS and CSS file types. The example illustrates how one can leverage Syncify together with [Dart SASS](#), [PostCSS](#) and additional node modules like the Bootstrap framework.

> **Please Note** You will need to remove the comments from the code example if you are copy and pasting it into your `package.json` file. JSON with Comments is not supported in `package.json` files.

<!-- prettier-ignore-->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  transform: {
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

In Syncify, **processors** refer to the external tools used in [Transforms](#transform) (i.e: SVGO, ESBuild SASS etc). The `processors` configuration option provides developers a point of control for configuring these (supported) _third party_ modules. The configurations defined in processors will used as the defaults bundling options of each transform and allows developers to retain a single point of control from which all _third party_ processor operations will refer, this saves you having to include multiple external config files in your projects workspace.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({

  // ...

  processors: {
    json: {},       // applied to json transforms
    esbuild: {},    // applied to script transforms
    sass: {},       // applied to style transforms
    postcss: [],    // applied to style transforms
    tailwind: {},   // applied to style transforms
    svgo: {},       // applied to svg transforms
    sprite: {},     // applied to svg transforms
    sharp: {},      // applied to image transforms
  }
})
```

> Using processors requires installing the relative module you'd like to leverage. This is an opt-in capability.

### External Config Files

Some third party tools allow (or require) config file usage (e.g: `postcss.config.js`, `tailwind.config.js` etc etc). Syncify will check for the existence of configuration files in the workspace and use them as the processor defaults. In situations where an external config file is detected and you've defined custom `processor` settings which differ from the Syncify defaults then options of the external config will overwritten (or merged) by those defined on `processor` configuration.

Say you're using a `postcss.config.js` file to provide a couple of plugins in your project, for example:

<!-- prettier-ignore -->
```js
// postcss.config.js

module.exports = {
  plugins: [
    require('postcss-nested')(),
    require('autoprefixer')()
  ]
};

```

Syncify will automatically detect and digest this file at runtime. It will use the export value when processing CSS with PostCSS and will consider it the **default** value, assigning it to `processors.postcss`. Instead of providing a `postcss.config.js` file, you _could_ instead just pass this to the **postcss** processor option, for example:

<!-- prettier-ignore -->
```js
// syncify.config.ts

import { defineConfig } from '@syncify/cli';

export default defineConfig({
  // ...
  processors: {
    postcss: [
      require('postcss-nested')(),
      require('autoprefixer')()
    ]
  }
});
```

### Transform Overrides

You can overwrite processor defaults on a per-file basis at the transform level. Each transform exposes a processor property which accepts the same options which will apply an immutable merge with processor defaults. This is helpful when you require file specific transforms.

Take the following code sample, notice how we've passed an SASS override on certain files. In this example the `style.scss` transform will use the `processor.sass` configuration, whereas the the `example.scss` file will override the `processor.sass` defaults and use a different set of configuration options.

<!-- prettier-ignore -->
```js
// syncify.config.ts

import { defineConfig } from '@syncify/cli';

export default defineConfig({
  // ...
  processor: {
    sass: {
      sourcemap: true,
      style: 'compressed',
      include: ['node_modules/'],  // the style.scss include path
    }
  },
  transform: {
    style: [
      {
        input: 'styles/style.scss',
        postcss: true
      },
      {
        input: 'styles/example.scss',
        snippet: true,
        sass: {
          style: 'expanded',     // we override the output style
          include: ['some/dir']  // we override the include path
        }
      }
    ]
  }
});
```

### Usage Proposition

Processors (and transforms) are optional in Syncify and may not fit your use case but there is an added benefit to using them. If you are leveraging HOT reloads or require different outputs be generated, then they are a great help. They also take a lot of the guess work out of bundling, so you can focus on writing code without worrying about bundler configurations.

[Spawn](#spawn) processes are another option available for cases where you require a different complier which is not supported by Syncify, but please note that spawned processes will not apply HOT reloads and execute in child process. Whatever the case may be, it is important you weigh up the usage proposition for your project and determine which works best for you and your development workflow.

### Supported Processors

Syncify provides extendable support with the following build tools:

- [ESBuild](#esbuild)
- [SASS](#sass)
- [PostCSS](#postcss)
- [Tailwind](#tailwind-support)
- [SVGO](#svgo)
- [Sprite](#sprite)
- [Sharp](#sharp)

# ESBuild

Syncify provides integrated support with ESBuild for processing TypeScript, JavaScript, JSX and TSX file types. ESBuild provides wonderful capabilities like code splitting and tree shaking.

See also [Script Transforms](#).

### Using Config File

ESBuild Configuration files `esbuild.config.js` are not supported for script transforms.

### Using Processors

The `esbuild` property is were ESBuild configuration option defaults can be provided.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
    esbuild: {} // ESBuild Options
  }
})
```

# SASS

Syncify provides integrated support with SASS Dart for processing SASS/SCSS file types. Syncify implements its own handling when for usage with SASS and allows you to use it together with [PostCSS](#postcss).

See also [Style Transforms](#).

### Config File is not supported

SASS Configuration files are not supported for style transforms.

### Using Processors

The `sass` property is were SASS configuration option defaults can be provided.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
    sass: {} // SASS Options
  }
})
```

# PostCSS

Syncify provides integrated support with PostCSS for processing CSS file types. You can leverage PostCSS together with the SASS processor for CSS files.

See also [Style Transforms](#).

### Using Config File

Provide a `postcss.config.js` file in the root of your project or within the defined `config` path.

### Using Processors

The `postcss` property accepts an array list of PostCSS plugins.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
    postCSS: [] // PostCSS Plugins
  }
})
```

# SVGO

Syncify provides integrated support with SVGO for processing SVG file types. If you would like to produce SVG Sprites, then refer to [Sprites](#) section which uses SVGO under the hood.

See also [SVG Transforms](#).

### Using Config File

Provide a `svgo.config.js` file in the root of your project or within the defined `config` path.

### Using Processors

The `svgo` property accepts SVGO configuration options.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
   svgo: {} // SVGO Options
  }
})
```

# Sprite

Syncify provides integrated support for creating SVG Sprites using [SVG Sprites](#). SVG Sprite is a low level module that optimizes SVGs and bakes them into sprites that Syncify can inline and output.

See also [SVG Transforms](#).

### Config File is not supported

SVG Sprites Configuration files are not supported for Sprite transforms.

### Using Processors

The `sprite` property accepts SVG Sprite configuration options.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
    sprite: {} // SVG Sprite Options
  }
})
```

# Sharp

Syncify provides integrated support for convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions using the Sharp.

See also [Image Transforms](#)

### Config File is not supported

Sharp Configuration files are not supported for Image transforms.

### Using Processors

The `sharp` property accepts Sharp configuration options.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  processors: {
    sharp: {} // Sharp Options
  }
})
```

# Terser

The **Terser** option is for minification configuration options. Syncify supports minification and compression of Liquid, HTML JSON and also provides handling around Script and Style transform file types. Terse output is core to theme development using Syncify and developers should indeed get into a habit a distributing themes in terse a format.

### Does Liquid Minification Matter?

When we are talking about Liquid syntax specifically, there is no real measurable performance increase one gets removing whitespace and newlines but Syncify does more than just strip whitespace, it also performs code elimination. The Syncify minification process will remove comments, strip extraneous delimiter trims and where possible it replaces syntax occurrences for faster equivalents.

### Usage

Produce terse output by passing the `--terse` command flag. The `--prod` flag will also produce terse output. You can pass a boolean `false` to options to skip minification. The `terser` options defined within your Syncify configuration file will be used when performing minification. If all terser options are set to `false` then (logically) terse minification will not be applied.

### Terse Options

Below is is the default configuration Syncify uses for minification. The `json`, `liquid`, `markup` and `script` options accept either an object or a boolean value. Passing boolean `true` will use defaults, whereas boolean `false` will skip minification.

<!-- prettier-ignore -->
```ts
import { defineConfig } from '@syncify/cli'

export default defineConfig({
 terser: {
    json: {
      assets: true,
      config: true,
      locales: true,
      metafields: true,
      metaobject: true,
      groups: true,
      templates: true,
      exclude: []
    },
    liquid: {
      collapseWhitespace: true,
      collapseInner: false,
      removeComments: true,
      minifyJavascript: false,
      minifySchema: false,
      minifyStyle: false,
      minifyStylesheet: false,
      stripDashes: true,
      exclude: []
    },
    markup: {
      collapseWhitespace: true,
      minifyScriptJSON: true,
      minifyScript: true,
      minifyStyle: true,
      removeComments: true,
      exclude: []
    },
    // Requires ESBuild to be installed
    script: {
      mangleProps: true,
      keepNames: false,
      legalComments: true,
      keepNames: false,
      legalComments: "inline",
      mangleProps: undefined,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      mangleQuoted: true,
      exclude: []
    }
  }
});
```

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

### PARTIALLY INCOMPLETE - NOT ALL COMMANDS WORK

The Syncify CLI supports the following commands.

```bash
Default:
  syncify       Starts interactive CLI command prompt

Aliases:
  sync          An alias of syncify (can be used instead of syncify)

Commands:
  syncify                   Starts interactive CLI command prompt
  syncify <store> --flags   Store name or comma separated list of stores and flags

Flags:
  -t, --theme   <targets>   A comma separated list of theme targets
  -b, --build               Triggers a build, use with upload to run build before uploading
  -w, --watch               Starts watching for changes of files building when they occur
  -u, --upload              Uploads theme to online store, use with -t to target theme
  -d, --download            Downloads themes/s from specified stores
  -c, --config  <path>      An optional config path to the syncify.config.js file.
  -h, --hot                 HOT Reloading (available in watch mode only)
  -p, --package             Package theme and export to a .zip file
  -s, --spawn,   <name>     Target a specific spawn (use with -w or -b flags to specify mode)
  -o, --output   <path>     A path value (used in download and build mode only)
  -h, --help,               Prints command list and some help information
  -f, --filter   <filter>   Query online store data API, eg: themes, metafields assets
  -v, --version  <action>   Version control resource mode (see version arguments)

Resource Modes:
  --metafields              Metafields resource mode
  --locales                 Locales resource mode
  --settings                Settings resource mode
  --redirects               Redirects resource mode

Version Arguments:
  patch                    Increments the package.json version patch, eg: 1.0.0 > 1.0.1
  minor                    Increments the package.json version minor, eg: 1.0.0 > 1.1.0
  major                    Increments the package.json version major, eg: 1.0.0 > 2.0.0

Operation Flags:
  --clean                  Removes all output files, use with --build to clean before bundling
  --status                 Checks development environment and connections are valid.
  --pull                   Pull data from online store
  --merge                  Merge online data with local references
  --force                  Forces a sync, replacing remote source with local one
  --silent                 Silence the logger, omit only errors

Generator Flags:
  --vsc                    Generates JSON schema spec for vscode users
  --strap  <name>          Generates a Syncify theme strap, eg: --strap dawn

Environment Flags:
  --dev, --development     Run in development mode (default)
  --prod, --production     Run in production mode
```

> Please keep in mind that not all commands are active as the project is still in beta.

## Examples

CLI usage aims to be as simple as possible. A typical project will be targeting a single Shopify theme but you can target multiple themes and stores in a seamless manner. When targeting multiple stores or themes the CLI employs a flag based naming approach.

**Generate theme targets**

```bash
$ syncify store-name -q themes
```

Prompt interface will be initialized

1. Target **store-name**
2. Initialize Query resource
3. Inform query we want the "themes" endpoint

**Generate local metafields**

```bash
$ syncify store-name --metafields --pull
```

Prompt interface will be initialized

1. Target **store-name**
2. Initialize Metafields resource
3. Pull data from online-store

**Upload theme to online store**

```bash
$ syncify store-name -t theme-1,theme-2 --clean -b -u --prod
```

Exchange interface will be initialized

1. Target **store-name**
2. Theme targets are **theme-1** and **theme-2**
3. Trigger Clean
4. Trigger Build (production build because of --prod flag)
5. Trigger Upload

**Watching 1 store and 1 theme**

```bash
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
    "stores": {
      "domain": "cool-shop", // The store name
      "themes": {
        "dev": 123456789 // The theme id and target name
      }
    }
  }
}
```

</details>

**Watching 1 store and 2 themes**

```bash
$ syncify shop -t dev,prod -w
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
    "stores": {
      "domain": "my-shop", // The store name
      "themes": {
        "dev": 123456789, // The theme id and target name
        "prod": 123456789 // The theme id and target name
      }
    }
  }
}
```

</details>

**Watching 2 stores and multiple themes**

```bash
$ syncify shop1,shop2 --shop1=test --shop2=dev,stage,prod -w
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

```ts
import { syncify } from '@syncify/cli';

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

Utilities will return some basic information about the Syncify instance. These are extremely helpful when when you are executing [spawned](#spawn) processes and need to control what feature to load. For example, if you are spawning a webpack process for compiling JavaScript assets and need to inform upon watch mode you'd use `util.resource('watch')` utility which returns a boolean value when running in watch mode.

```typescript
import { util, env } from '@syncify/cli'

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

# Contributing

This project uses [pnpm](https://pnpm.js.org/en/cli/install). Fork the project, run `pnpm i` and you're good to go.

# Author

Created by [Nίκος Σαβίδης](https://github.com/panoply).

### Acknowledgements

Special thanks to a couple of talented developers that helped work through ideas and edge-cases on the project.

- [Joseph Curtis](#)
- [David Warrington](https://ellodave.dev/)
- [Mansedan](#)

# Changelog

Refer to the [Changelog](changelog.md) for each per-version update and/or fixes.
