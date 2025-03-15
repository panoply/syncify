## @syncify/eslint-config

This package includes a shareable [ESLint](https://eslint.org) configuration that can optionally be used within [Syncify](https://github.com/panoply/syncify) projects.

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```bash
pnpm add @syncify/eslint-config --save-dev
```

> Requires `eslint` as peer dependency.

### Usage

This shared configuration uses the eslint **flatConfig** format as per v9 of eslint and requires a `eslint.config.js` file be included at the root of projects.

```js
import shared from '@syncify/eslint-config';

export default [
  ...shared,
  {
    ignores: [],
    rules: {}
  }
];
```

### License

[MIT](#LICENSE)
