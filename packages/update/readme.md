# @syncify/update

Checks for version updates of an NPM module and returns a detailed model describing the version increment and changes. Supports pre-release version identifiers and registry tags.

### Installation

This module is available for consumption on NPM Registry and can be used in isolation.

```bash
$ pnpm add @syncify/update -D
```

### Priorities Order (`-rc`, `-beta` & `-alpha`)

This module will adhere to [Semantic Versioning](https://semver.org/) but also take into consideration pre-release identifiers. The ordering will respect the NPM publishing rules, for example:

1. `v1.0.0-alpha.1`
2. `v1.0.0-alpha.2`
3. `v1.0.0-beta.1`
4. `v1.0.0-beta.2`
5. `v1.0.0-rc.1`
6. `v1.0.0-rc.2`
7. `v1.0.0`

Number `1` is the oldest version, whereas number `7` is the newest version. In Syncify, NPM package versions and releases are structured in the above manner, but this is not strictly imposed for isolated usage.

# Usage

There is a single default function export exposed which requires a package name and a version number to be provided. You can target specific tagged versions and extend the pre-release priorities. By default, the module will check the `latest` version in the registry and the above priorities.

<!--prettier-ignore-->
```ts
import update from '@syncify/update'

const version = await update('@syncify/cli', '1.0.0', {
  tag: 'latest',
  priorities: { alpha: 1, beta: 2, rc: 3 }
})

if (version !== false) {

  console.log(version) // version increment information

}
```

### Version Increment

When a newer version is available, the promise will resolve the following object.

```ts
interface VersionUpdate {
  change: 'major' | 'minor' | 'patch';
  bump: string;
  step: boolean;
  release: string;
  breaking: boolean;
  current: string;
  registry: string;
  parse: {
    current: {
      major: number;
      minor: number;
      patch: number;
      release: string;
      stage: number;
    };
    registry: {
      major: number;
      minor: number;
      patch: number;
      release: string;
      stage: number;
    };
  };
}
```
