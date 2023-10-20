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

The [`tsconfig.json`](/tsconfig.json) sets various path reference for local imports. This makes including modules much easier to across the workspace. Given there are a lot of files, referencing can be a tad painful, so aliases help alleviate some of this.

# Directories

- [CLI](#cli)
- [Forks](#forks)
- [Log](#log)
- [Model](#model)
- [Modes](#modes)
- [Options](#options)
- [Process](#process)
- [Requests](#requests)
- [Resource](#resource)
- [Terser](#terser)
- [Transform](#transform)
- [Utils](#utils)

# [CLI](/cli)

The CLI directory contains normalization logic for command line operations and various utilities or helper modules pertaining to CLI execution. The TUI (Terminal User Interface) designed for Syncify is unique and little chaotic. The `ansi.ts` file is where you will find the terminal colors, characters and symbols. Files existing in the [log](#) directory will digest and re-export the exposed exports within `ansi.ts`. The `progress.ts`, `size.ts` and other files within CLI are self explanatory and documented.

# Forks

The forks directory is where hard-forked modules reside. Hard-forks are carbon copies of Open Source projects that Syncify uses but requires additional handling to be applied.

# Log

The Log directory contains all console logging related logic. All logger are made available using function export methods. Depending on the execution mode, different logging and loggers are used and this is what gives Syncify its beautiful TUI.

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

# Model

TODO

# [Hot](hot)

The HOT directory contains the HOT Reloading logic. The [snippet](/snippet) file is generated in an isolate build process.

# [Modes](modes)

The Modes directory is where you will find execution logic. For example, if Syncify is invoked in **watch** mode, you will find the handler in this directory.

# [Options](options)

The options directory is probably the most import directory in the project as files within are responsible for constructing the runtime state (see [$](#overview)). Every configuration option available in a `syncify.config.ts` file will pass through a series of functions which will go about validating and applying state.

Below is a list of each file and their pertaining use:

| File                                 | Description                                                                            |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| [`define.ts`](options/define.ts)     | The entry point from which all files are digests                                       |
| [`dirs.ts`](options/dirs.ts)         | Functions used for generating theme and base directories                               |
| [`files.ts`](options/files.ts)       | Functions used for reading config files (i.e: `syncify.config.ts`, `package.json` etc) |
| [`filters.ts`](options/filters.ts)   | Parses CLI `--filter` argv and constructs reference in `$.filters` model               |
| [`hot.ts`](options/hot.ts)           | Constructs the HOT Reloading configuration and settings based on `syncify.config.ts`   |
| [`json.ts`](options/json.ts)         | Constructs the JSON configuration and settings based on `syncify.config.ts`            |
| [`modes.ts`](options/modes.ts)       | Parses CLI `mode` argv and constructs a reference in `$.modes`                         |
| [`pages.ts`](options/pages.ts)       | Constructs the Pages configuration and settings based on `syncify.config.ts`           |
| [`paths.ts`](options/paths.ts)       | Resolves and sets anymatch patterns based according to `syncify.config.ts` **paths**   |
| [`scripts.ts`](options/scripts.ts)   | Constructs the **script** transform config based on `syncify.config.ts`                |
| [`sections.ts`](options/sections.ts) | TODO                                                                                   |
| [`snippets.ts`](options/snippets.ts) | TODO                                                                                   |
| [`spawn.ts`](options/spawn.ts)       | TODO                                                                                   |
| [`stores.ts`](options/stores.ts)     | TODO                                                                                   |
| [`style.ts`](options/style.ts)       | TODO                                                                                   |
| [`svg.ts`](options/svg.ts)           | TODO                                                                                   |
| [`syver.ts`](options/syver.ts)       | TODO                                                                                   |
| [`terser.ts`](options/terse.ts)      | TODO                                                                                   |

# [Plugin](plugin)

TODO

# [process](process)

The Process directory contains files for the when we context is needed to be obtained. Say (for example), we are running in **Watch** mode and a file has been changed then it will more than likely pass through functions contained in the Process directory.

# [Requests](requests)

TODO

# [Terser](terser)

TODO

# [Transform](transform)

TODO

# [Utils](utils)

TODO
