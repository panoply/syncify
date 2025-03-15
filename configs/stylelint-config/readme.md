## @syncify/stylelint-config

This package includes the shareable [Stylelint](https://stylelint.io/) configuration that can optionally be used within [Syncify](https://github.com/panoply/syncify) projects. The config is ideal for developers leveraging [SASS](https://sass-lang.com/) and comes with bare essentials pre-defined and ready for usage.

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm add stylelint @syncify/stylelint-config -D
```

> [Stylelint](https://stylelint.io/) is an `peerDependency` so you will need to install it within your project.

### Usage

We extend configuration from within `package.json` files.

```json
{
  "stylelint": {
    "extends": "@syncify/stylelint-config",
    "ignoreFiles": ["**/node_modules"]
  }
}
```

### Text Editor (VSCode)

Install the [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) extension from the marketplace. Depending on how your editor is configured, one may require setting global configuration in a user `settings.json` file:

```jsonc
{
  "stylelint.validate": ["scss", "sass", "postcss"],
  "stylelint.packageManager": "pnpm",
  "stylelint.enable": true,
  "scss.validate": false, // important to disable vscode validation
  "scss.scannerExclude": ["**/.git", "**/node_modules"],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
}
```

### License

[MIT](#LICENSE)
