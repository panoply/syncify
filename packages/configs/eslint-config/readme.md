## @syncify/eslint-config

This package includes a shareable [ESLint](https://eslint.org) configuration that can optionally be used within [Syncify](https://github.com/panoply/syncify) projects.

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm i eslint @syncify/eslint-config -D
```

> Requires `typescript` and `eslint` as peers.

### Usage

Extend the configuration within `package.json`

```json
{
  "eslintConfig": {
    "ignorePatterns": "*.html",
    "extends": ["@syncify/eslint-config"]
  }
}
```

### License

[MIT](#LICENSE)
