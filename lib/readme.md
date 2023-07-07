# Overview

This directory contains the source code for Syncify. This readme attempts to explains to architecture and execution model applied. Syncify is relatively simple and complexities are mostly around the TUI/CLI logic.

## State Model

The `bundle` class instance holds all the execution state. It's form this class that the entire operation model is maintained.

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
