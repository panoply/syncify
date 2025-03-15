# @syncify/turndown

Hard forked variation of [Turndown](https://github.com/mixmark-io/turndown) for Github flavored markdown. Design for Shopify pages using [Syncify](https://github.com/panoply/syncify) to provide reversed conversion of Markdown files and produce HTML markup equivalents.

### Installation

```bash
$ pnpm add @syncify/turndown -D
```

# Usage

```ts
import { Turndown, GithubFlavor } from '@syncify/turndown';

const turndown = new Turndown('...').use(GithubFlavor).turndown(content);
```

# License

License is [SPDX](/LICENSE) (MIT OR Apache-2.0)
