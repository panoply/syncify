---
title: 'JSON Transform'
layout: base.liquid
permalink: '/usage/transforms/json/index.html'
anchors:
  - 'JSON Transform'
  - 'Key Features'
  - 'Config Options'
  - 'Terse Options'
---

# JSON Transforms

JSON (JavaScript Object Notation) is a standard file format in Shopify theme development and powers features like locales, settings and (OS 2.0^) sections. Syncify extends upon this and uses JSON for its own features, including [shared schema](/usage/shared-schema/), metafields, navigation and translation sync capabilities. The `json` transform in Syncify is used to control control JSON handling keeping things consistent across projects.

##### Key Features

Syncify supports formatting, sorting, and minification, while extending standard JSON with a less-strict syntax. This sits between the [JSON5](https://json5.org/) and strict [JSON](https://www.json.org/json-en.html), keeping things practical for theme development. Here's what is included:

- Formatting Control: Set indent, crlf, useTab.
- Trailing Commas: Allowed in objects and arrays.
- Property Sorting: Sort with sortObjects, sortTargets or skip via noSortList.
- Comments: Line `{js} //` or Block `{js} /* */` comments with stipping
- Minification: Minify JSON files use terse for production.
- Diffing: Intelligent diffing of local and remote copies

> You'll want to align beautification specific settings like `indent`, `crlf` and `useTab` with your Prettier (or [Æsthetic](https://aesthetic.js.org)) formatting rules to avoid messy git diffs when collaborating or tracking changes.

---

# Config Options

The `json` transform option can be used to control JSON processing behaviour. This option lets you customize formatting, sorting, and minification (see [terse output](/usage/terse-output/)) to match your project’s needs, keeping files readable for team collaboration. It ships with sensible defaults (listed below).

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  // ...
  transform: {
    json: {
      crlf: false,            // Control line termination (CRLF or LF) format
      indent: 2,              // The indentation level
      useTab: false,          // Whether to use tabbed `\t` identation characters
      stripComments: false,   // Whether comments should be stripped or preserved
      sortObjects: false,     // Whether alpha-numeric sorting applies to object properties
      sortTargets: [],        // Apply sorting on a specific list of entries in JSON
      noSortList: [],         // Property names that should be excluded and skipped from sorting
      exclude: [],            // Glob pattern of filenames to exclude from JSON transforms
      terse: false            // Terse minification options, accepts boolean or object
    }
  }
})
```

---

# Terse Options

When `terse` is set to an object rather than a boolean, it provides a detailed way to configure JSON minification across different directories and use cases in your Syncify project. Each property within the `terse` object targets a specific directory or context, and they all default to `{js} true` unless you explicitly override them with `{js} false` in the configuration.

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    json: {
      // ...
      terse: {
        assets: true,         // Minify .json files writting to assets directory
        config: true,         // Minify .json files writting to config directory
        locales: true,        // Minify .json files writting to locales directory
        metafields: true,     // Minify .json metafields with syncing to stores
        metaobject: true,     // Minify .json files writting to metaobject directory
        groups: true,         // Minify .json section group files
        templates: true,      // Minify .json files writting to templates directory
        exclude: []           // Glob pattern of filenames to exclude from minification
      }
    }
  }
})
```

> Terse minification only kicks in when the `{bash} --prod` or `{bash} --terse` CLI flag is provided, regardless of these settings.
