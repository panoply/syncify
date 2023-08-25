# Overview

This directory contains the source code for Syncify. This readme attempts to explains the architecture and execution model applied. Syncify is relatively simple and complexities are mostly around the TUI/CLI logic.

## State Model

The `$` constant is a class instance of `Bundle` and is responsible for the running state of Syncify. It's from this instance that the entire execution and processing model is operating. The `$` is composed at runtime (see [lib/options/define](/lib/options/define.ts)) and is accessible project wide, it is **GLOBAL**.

The `$` model is mostly immutable and augmentations will only apply at runtime.

```ts
const $: {

  // PRIVATE STATICS

  private static defaults: Config;
  private static package: PackageJson;
  private static terser: TerserConfig;
  private static plugins: Plugins;
  private static cache: Cache;

  // OPERATIONS

  wss: WSS;
  filters: Filters;
  commands: Commands;
  version: strinG;
  cwd: string;
  argv: string;
  errors: Set<string>;
  env: Env;
  hot: HOTBundle;
  logger: Logger;
  mode: Modes;
  file: ConfigFile;
  files: Set<string>;
  dirs: Directories;
  cmd: CommandBundle;
  sync: Sync;
  spawn: Spawn;
  section: SectionBundle;
  snippet: SnippetBundle;
  watch: WatchBundle;
  paths: PathsBundle;

  // TRANSFORMS

  page: PagesBundle;
  script: ScriptBundle[];
  style: StyleBundle[];
  svg: SVGBundle[];
  image: any;
  terse: TerserBundle;

  // GETTER / SETTERS

  get terser (): TerserConfig;
  set terser (options: TerserConfig);

  set config (data: Config);
  get config (): Config;

  set pkg (data: PackageJson)
  get pkg (): PackageJson;

  // GETTERS ONLY

  get processor (): Processors
  get plugins (): Plugins;
}
```

## [cli](/cli)

The CLI directory contains CLI related logic

## [hot](/hot)

The HOT directory contains the HOT Reloading logic. The [snippet](/snippet) file is generated in an isolate build process.

## [log](/log)

The Log directory contains all console logging related logic. This directory is different from the CLI directory. All logging is are made available using function export methods. Depending on the execution mode, different logging and loggers are used.

```js
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

## [model](/model)

The Model directory is where execution states exist. The [$](/model/$.ts) file will digest all exports within this directory and make the available via `$` getters.


## [modes](/modes)

The Modes directory is where you will find execution logic. For example, if Syncify is invoked in **watch** mode, you will find the handler in this directory.


## [options](/options)

The Options directory is probably the most import directory in the project as files within are responsible for constructing the runtime state (see [State Model](#state-model)). Every configuration option available in a `syncify.config.ts` file will pass through a series of functions will go about validating and applying state.


## [plugin](/plugin)

TODO

## [process](/process)

The Process directory contains files for the when we context is needed to be obtained. Say (for example), we are running in **Watch** mode and a file has been changed then it will more than likely pass through functions contained in the Process directory.