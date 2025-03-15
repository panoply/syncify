# @syncify/glue

Rather pointless utility which provides sugars for joining strings together. It is exposed as an isolated package for usage by the [Syncify CLI](https://syncify.sh).

# Usage

The module provides 4 methods exposed as a named export `glue`:

### `glue`

Accepts a `...string` (spread) or `string[]` array and applies `.join('')`

<!-- prettier-ignore -->
```js
import { glue } from '@syncify/glue';

glue('foo', 'bar', 'baz');  // foobarbaz
glue(['a', 'b', 'c', 'd']); // abcd
```

### `glue.join`

Accepts a character as first parameter followed by `...string` (spread) or `string[]` array and applies `.join(character)`. Can be curried for special use cases.

<!-- prettier-ignore -->
```js
import { glue } from '@syncify/glue';

glue.join('-', 'foo', 'bar', 'baz');    // foo-bar-baz
glue.join('-', ['foo', 'bar', 'baz']);  // foo-bar-baz

// Curried Example
const join = glue.join('-');

join('foo', 'bar', 'baz');    // foo-bar-baz
join(['foo', 'bar', 'baz']);  // foo-bar-baz
```

### `glue.ws`

Accepts a `...string` (spread) or `string[]` array and applies `.join(' ')`

<!-- prettier-ignore -->
```js
import { glue } from '@syncify/glue';

glue.join('foo', 'bar', 'baz');    // foo bar baz
glue.join(['foo', 'bar', 'baz']);  // foo bar baz
```

### `glue.nl`

Accepts a `...string` (spread) or `string[]` array and applies `.join('\n')`

<!-- prettier-ignore -->
```js
import { glue } from '@syncify/glue';

glue.nl('foo', 'bar', 'baz');
/* foo
 * bar
 * baz */

glue.nl(['foo', 'bar', 'baz']);
/* foo
 * bar
 * baz */
```

# Contributing

This package is designed for usage within [Syncify](https://syncify.sh). Contributions are not accepted unless they pertain to the core Syncify module. If contributions fall into that category, fork the Syncify project.
