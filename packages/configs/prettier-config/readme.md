## @syncify/prettier-config

This package includes the shareable [Prettier](https://prettier.io) configuration that can optionally be used within [Syncify](https://github.com/panoply/syncify) projects.

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm add prettier @syncify/prettier-config -D
```

> Prettier is an `peerDependency` so you will need to install it within your project.

### Usage

Extend configuration from within `package.json` files.

```json
{
  "prettier": "@syncify/prettier-config"
}
```

### Text Editor (VSCode)

Install the [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension from the marketplace. Depending on how your editor is configured, one may require setting global configuration in a user `settings.json` file:

```jsonc
{
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Ignored Files

Syncify does not leverage prettier for various file types because it is extremely opinionated and conflicts with code styling, especially syntax found in JavaScript and TypeScript based projects. Below is standard ignores asserted:

```
*.toml
*.mjs
*.js
*.ts
*.css
*.scss
*.liquid
*.html
```

### License

[MIT](#LICENSE)
