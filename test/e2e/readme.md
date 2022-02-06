# E2E Test

This is test development environment for Syncify.

### Real World

Refer to the [syncify-examples](https://github.com/panoply/syncify-examples) repository for real world theme examples using Syncify and call upon the module from the registry.

- [Dusk Theme](#)
- [Silk Theme](#)

# Overview

The `package.json` file scripts point to the Syncify package in the root of this repository. Each test is wired up and can be tested in parallel with a running build. The `package.json` file contains the configuration used for the various cases.

### Basic Tests

Tests setup/installation based commands.

```
$ pnpm test:vsc             Tests vscode JSON schema spec workspace settings generator
$ pnpm test:prompts         Tests interactive mode, loading the prompt based CLI
```

### Common Tests

Standard commands used to test Syncify in the most common modes. Syncify is being triggered from within node scripts.

```
$ pnpm test:build           Tests syncify in build mode, syncing all files from source into theme
$ pnpm test:build:prod      Tests syncify in build mode with production flag, applying minification.
$ pnpm test:watch           Tests syncify in watch mode, syncing to a single store and theme
$ pnpm test:watch:multi     Tests syncify in watch mode, syncing to multiple stores and themes
$ pnpm test:upload          Tests syncify in upload mode, syncing to a single store and theme
$ pnpm test:upload:multi    Tests syncify in upload mode, syncing to multiple stores and themes
```

### Spawned Tests

Spawned process tests which reference additional build tools and compilers running in parallel with Syncify. Each command will load a specific bundler/compiler. Running `test:spawns` will execute multiple build tools.

```
$ pnpm test:spawns          Tests multiple spawned processes in watch mode
$ pnpm test:rollup          Tests rollup bundler watch mode using syncify spawned child process
$ pnpm test:webpack         Tests webpack bundler watch mode using syncify spawned child process
$ pnpm test:typescript      Tests typescript in watch mode using syncify spawned child process
$ pnpm test:esbuild         Tests esbuild in watch mode using syncify spawned child process
$ pnpm test:gulp            Tests gulp in watch mode using syncify spawned child process
```

### Utilities Test

Within spawned config files Syncify utility helpers are applied. Each command
