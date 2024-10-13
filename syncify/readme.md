# Developer Guide

This directory contains the source code for Syncify. The contents of this file act as developers guide and attempts to explains the architecture and execution model applied. At first glance, Syncify may seem like a monolithic project but it's relatively easy to understand and extend.

### Overview

Syncify is bundled using [TSUP](#) via [ESBuild](#). There are 4 distribution bundles generated. Consult the [tsup.config.ts](#) file in the root of the project for additional context. Syncify has raw exports available in global scope, most of which pertain to logging. Runtime execution boils down to the following 5 processes:

1. Determine runtime (ESM or CJS)
2. Digest CLI Commands
3. Read config files and set environment
4. Define running state and merge options
5. Execute mode operation

The file chain for runtime execution is as follows:

| File                                     | Description                                           |
| ---------------------------------------- | ----------------------------------------------------- |
| [`cli.ts`](cli.ts)                       | Digests the CLI argv, parses and passes to `index.ts` |
| [`index.ts`](index.ts)                   | Responsible for dispatching and data setup            |
| [`options/define.ts`](options/define.ts) | The main handler, from here running state is defined  |

The [`cli.ts`](cli.ts) will automatically invoke the `run()` function contained in the [`index.ts`](index.ts) file and will pass CLI argv in as parameters. The `index.ts` file will pass argv to the `options/define.ts` file. The `define()` function within [`options/define.ts`](options/define.ts)`is where the setup process is carried out. The import chain is easy to follow in`options/define.ts`and thereafter. Refer back to the`index.ts`where after`define()` concludes the execution mode is called. You will be able to follow import chains within each mode as it is similar to the pattern employed for runtime execution.

### [`$`](model/$.ts)

Across the code base you'll notice the `$` named import. The `$` is a class instance of [`Bundle`](/types//bundle/index.d.ts) and is responsible for the running state of Syncify. It's from this instance that the all operations will reference and is mostly immutable. Augmentations will only apply at runtime during the [`define()`](options/define.ts) process, almost any augmentation thereafter is scarce. Consider it **readonly** when imported into files outside of [`options`](options) directory.

### Path Aliases

The [`tsconfig.json`](/tsconfig.json) sets various path reference for local imports. This makes including modules much easier to access within the project. Given there are a lot of files, referencing can be a tad painful, so aliases help alleviate some of this, though at first glance it seems like straight fucking chaos.

One of the main aspects to aliases is their syntactic structure, you'll notice that aliases linked internally are suffixed with a `syncify:` keyword. This attempts to make differentiation a tad easier.

# Directories

- [cli](#cli)
- [hot](#hot)
- [log](#log)
- [Model](#model)
- [Modes](#modes)
- [Options](#options)
- [Process](#process)
- [Requests](#requests)
- [Resource](#resource)
- [Terser](#terser)
- [Transform](#transform)
- [Utils](#utils)

# [cli](/syncify/cli)

The `cli` directory contains normalization logic for command line operations and various utilities or helper modules pertaining to CLI execution. Please see the [@syncify/ansi](/packages/ansi/) module within the packages directory, for additional functions around CLI and Console logging.

# [hot](/syncify/hot)

The `hot` directory contains HOT Reloading logic, this includes the relative [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) configuration. Please see the Please see the [@syncify/hot](/packages/hot/) module within the packages directory, for the client side injection script.

# [log](/syncify/hot)

The Log directory contains all console logging related logic. All loggers are made available using function export methods. Depending on the execution mode, different logging and loggers are used and this is what gives Syncify its beautiful TUI.

```js
import { log } from 'syncify:log';

log.upload();
log.minified();
log.build();
log.error();
log.write();
log.external();
log.hook();
log.unhook();
log.changed();
log.process();
log.importer();
log.transform();
log.retrying();
log.reloaded();
log.ignored();
log.failed();
log.throws();
log.spawn();
```

# [model](/syncify/model)

As mentioned above, this directory pertains to execution state. Files contained in this directory related to the data models in which Syncify operates.

# [modes](/syncify/modes)

The Modes directory is where you will find execution logic. For example, if Syncify is invoked in **watch** mode, you will find the handler in this directory.

# [options](/syncify/options)

The options directory is probably the most import directory in the project as files within are responsible for constructing the runtime state (see [$](#overview)). Every configuration option available in a `syncify.config.ts` file will pass through a series of functions which will go about validating and applying state.

# [plugin](plugin)

TODO

# [/syncify/prompts](process)

The `prompts` directory is where the Terminal prompts and interactive CLI logic lives. It's here where operations that will accept input, provide choices and allow the user to run Syncify with more of a GUI like experience.

# [process](/syncify/process)

The `process` directory contains files for the when we context is needed to be obtained. Say (for example), we are running in **Watch** mode and a file has been changed then it will more than likely pass through functions contained in the Process directory.

# [requests](/syncify/requests)

The `requests` directory contains the Shopify API clients and interfacing logic. Currently, Syncify is querying the Shopify REST endpoints, with only minor migration to GraphQL endpoints. You'll also find the `require.ts` file within this directory, this is responsible for runtime external file handling of `.ts` or other extensions.

# [Terser](terser)

TODO

# [transform](/syncify/transform)

The `transform` directory is where the action happens. It's here where compiling, bundling and transpiled operation are handled. Almost all bundle processing of files will be passed through here.

# [utils](/syncify/utils)

The `utils` directory is a little bit of mess, mainly focused on sugars, helper utilities and general "utilities" live here. You'll notice that almost every single file in the Syncify codebase will reference a file within this directory.
