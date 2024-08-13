# @syncify/turndown

Hard forked variation of [Turndown](https://github.com/mixmark-io/turndown) for Github flavored markdown. Used for reversed markdown conversion of HTML to Markdown in Shopify pages using [Syncify](https://github.com/panoply/syncify).

### Installation

```bash
$ pnpm add @syncify/turndown -D
```

### Usage

```ts
import { Turndown, GithubFlavor } from '@syncify/turndown';

const turndown = new Turndown('...').use(GithubFlavor).turndown(content);
```
