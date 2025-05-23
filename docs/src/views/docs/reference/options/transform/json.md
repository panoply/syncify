---
title: 'Options - Transforms - JSON'
layout: base
permalink: '/options/transform/json/index.html'
anchors:
  - 'crlf'
  - 'useTab'
  - 'stripComments'
  - 'sortObjects'
  - 'sortTargets'
  - 'noSortList'
  - 'exclude'
  - 'terse'
  - 'terse → assets'
  - 'terse → config'
  - 'terse → locales'
  - 'terse → metafields'
  - 'terse → metaobject'
  - 'terse → groups'
  - 'terse → templates'
  - 'terse → exclude'
---

# JSON

The `json` transform governs how Syncify processes `.json` and `.schema` files in your project, including theme configurations, metafields, and other JSON-based structures. This transform is optional, you can skip it entirely, and Syncify will fallback to the default settings when omitted from your configuration. See [usage](/usage/transform/json/) documentation.

:: row mt-5
:: col-9 opts fs-sm

# `crlf`

Controls whether JSON files use Windows-style CRLF (`\r\n`) line endings. Defaults to false, which applies Unix-style LF (`\n`) — the standard for most development environments. Set to `{js} true` if targeting Windows-specific workflows.

# `indent`

Sets the number of spaces used for indentation in formatted JSON output. Defaults to `2`, aligning with common style guides like Prettier. Adjust this to match your team’s formatting preferences.

# `useTab`

Determines if tabs (`\t`) are used for indentation instead of spaces. When true, the tab width is calculated as indent / 2 (e.g., `{js} indent: 4` means `2` tabs). Defaults to `{js} false` for space-based indentation, which is more common in JSON formatting.

# `stripComments`

Decides whether comments (`{js} //` or `{js} /* */`) in JSON files are removed or kept. Set to `{js} true` to strip them, or keep the default `{js} false` to preserve them. Affects both local files and remote sources fetched by Syncify.

# `sortObjects`

Enables alphabetical sorting of object properties throughout the JSON structure, including nested objects. Defaults to `{js} false` to maintain the original order. Turn on with `{js} true` for consistent property ordering.

# `sortTargets`

Specifies a list of JSON paths (using dot notation, e.g., `settings.colors`) to sort specific object entries. Only applies sorting to these targets, leaving others unsorted. Empty `[]` by default, so no sorting occurs unless populated.

# `noSortList`

Lists property names (e.g., `id`, `created_at`) to exclude from sorting when `sortObjects` is `{js} true`. Ignored if `sortObjects` is `{js} false`. Useful for preserving order in specific fields. Empty `[]` by default.

# `exclude`

A list of glob patterns (e.g., `**/private.json`) for `.json` files to skip during processing. Matching files pass through unchanged. Empty `[]` by default, meaning all files are processed.

# `terse`

Controls JSON minification. Can be a boolean (`{js} true` or `{js} false`) or an object with detailed settings (see below). Defaults to `{js} false`, disabling minification. When enabled (`{js} true` or object), requires the `{bash} --prod` or `{bash} --terse` CLI flag to activate otherwise, minification is skipped.

# `terse → assets`

Minifies `.json` files written to the theme/assets directory when `{js} true`. Set to `{js} false` to keep them unminified, preserving readability for asset-related JSON.

# `terse → config`

Minifies `settings_schema.json` and `settings_data.json` in the config directory when `{js} true`. Disable with `{js} false` if you need these files human-readable for debugging or collaboration.

# `terse → locales`

Minifies .json files in the locales directory (e.g., translation files) when `{js} true`. Set to `{js} false` to avoid minifying, which can help when reviewing locale data.

# `terse → metafields`

Minifies `.json` metafield files synced to stores when `{js} true`. Defaults to `{js} true` for compact output, use `{js} false` to keep them formatted, aiding in manual inspection.

# `terse → metaobject`

Minifies `.json` files in the metaobject directory when `{js} true`. Set to `{js} false` to skip minification, useful if metaobject data needs to remain readable.

# `terse → groups`

Minifies section group `*-group.json` files when `{js} true`. Defaults to `{js} true` for smaller files, switch to `{js} false` to maintain formatting for easier edits.

# `terse → templates`

Minifies `.json` files in the templates directory when `{js} true`. Use `{js} false` to keep them unminified, which can simplify template development workflows.

# `terse → exclude`

A list of glob patterns (e.g., `**/debug.json`) to exclude specific `.json` files from minification. Files matching these patterns stay unminified, even if their directory is targeted. Empty`[]` by default.

::
::

---
