# Packages

### @syncify/acquire

Resolves ESM and CJS config files. Based on [Bundle Require](https://github.com/egoist/bundle-require) by [egoist](https://github.com/egoist), performs identical resolution with minor differences for appropriation and usage in the [Syncify CLI](https://syncify.sh). Supports the following extensions and file types:

- NPM
- Github

### @syncify/ansi

Terminal utilities for the [Syncify CLI](https://syncify.sh) Shopify theme development tool. This module provides CLI enhancements, helpers and various other TUI logic which are used in console logging and reporting for Syncify.

- NPM
- Github

### @syncify/codeframe

Codeframe generator used by the [Syncify CLI](https://syncify.sh) in errors and warnings. This module borrows logic used by [@babel/code-frame](https://github.com/babel/babel/blob/main/packages/babel-code-frame) and extends upon it to cover various languages supported by transforms in Syncify.

- NPM
- Github

### @syncify/codegen

A streamlined tool for extracting a normalized GraphQL introspection schema from the Shopify GraphQL API. This module serves as a drop-in replacement for generating clean, concise types when working with Shopify's GraphQL schema. It operates as a post-processing step, enabling selective extraction of only the types you need.

- NPM
- Github

### @syncify/config

This utility provides a project-level `defineConfig` function specifically for use within `syncify.config.js` (or `.ts`) configuration files. It is made available for users working on Shopify themes using global [Syncify CLI](https://syncify.sh) installations.

- NPM
- Github

### @syncify/glue

Rather pointless utility which provides sugars for joining strings together. It is exposed as an isolated package for usage by the [Syncify CLI](https://syncify.sh).

- NPM
- Github

### @syncify/hot

Remote client used to perform HOT and Live Reloading with [Syncify](https://syncify.sh). The distributed JavaScript file of this module will be automatically injected into theme layouts (i.e, `theme.liquid`) when running Syncify in `--hot` mode.

- NPM
- Github

### @syncify/json

Parser for JSON files and embedded regions present within Shopify themes. This package will mimic [JSON5](https://github.com/json5/json5) behavior and leverages [comment-json](https://github.com/kaelzhang/node-comment-json) for preservation occurrences of both block or line comments contained in JSON. Throws informative errors on parse failures, supports deep-sorting, equality and formatting capabilities.

- NPM
- Github

### @syncify/kill

Task execution and stdin pre-exit operations utility triggering before `process.exit` or `ctrl+c` keyboard input.

- NPM
- Github

### @syncify/timer

Timing utility which keeps a readable execution elapse.

- NPM
- Github

### @syncify/turndown

Hard forked variation of [Turndown](https://github.com/mixmark-io/turndown) for Github flavored markdown. Design for Shopify pages using [Syncify](https://github.com/panoply/syncify) to provide reversed conversion of Markdown files and produce HTML markup equivalents.

- NPM
- Github

### @syncify/types

TypeScript definitions for the syncify configuration files. This package is exposed in isolation, provides consumer level declarations and is consumed by [@syncify/cli](/packages/config/) and [@syncify/config](/packages/config/) modules.

- NPM
- Github

### @syncify/update

Checks for version updates of an NPM module and returns a detailed model describing the version increment and changes. Supports pre-release version identifiers and registry tags.

- NPM
- Github

### @syncify/uws

Packaged reference of [uWebSockets](https://github.com/uNetworking/uWebSockets.js) for usage in [Syncify](https://syncify.sh)

- NPM
- Github
