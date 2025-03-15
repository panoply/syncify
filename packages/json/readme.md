# @syncify/json

Parser for JSON files and embedded regions present within Shopify themes. This package will mimic [JSON5](https://github.com/json5/json5) behavior and leverages [comment-json](https://github.com/kaelzhang/node-comment-json) for preservation occurences of both block or line comments contained in JSON. Throws informative errors on parse failures, supports deep-sorting, equality and formatting capabilities.

### Caveats

This module is not a drop-in replacement for JSON5, but instead an enchancement of JSONC with additional features baked in. The project is created for usage in the [Syncify CLI](https://syncify.sh) and is designed to enhance Shopify Theme JSON files and developer satisfaction.

### Installation

```bash
$ pnpm add @syncify/json -D
```

# Usage

There are several named exports available, each are designed for usage within Syncify, but the module itself can be used in isolation within any node.js project, Syncify is merely it's npm namespace. The following methods are provided:

<!-- prettier-ignore-->
```ts
import * as json from '@syncify/json'

json.parse(string, { /* options */})
json.stringify({} | [], { /* options */ })
json.evaluate(string, { /* options */ })
json.evaluate(actual, expected, { /* options */ })
json.strip(string, { /* options */ })
json.format(string, { /* options */ })
json.sort({} | [], { /* options */ })
json.equality(actual, expected, { /* options */ })
json.getIndent(string)
```

### Evaluate

Evaluate parses the value and returns an object of getters that hold reference to the source JSON in different structures and formats. This is used to perform diffing and elementary level formatting operations. The `checksum` value will hold an MD5 string value that applies based level sorting according to the `hashSort` options, this ensures diffing can be accurate.

<!-- prettier-ignore -->
```ts
import { evaluate } from '@syncify/json'

const {
  string,                   // (getter) Writeable string with comments
  parsed,                   // (getter) The parsed JSON object
  source,                   // (getter) The original source value
  hashed                    // (getter) Checksum MD5 hash
} = evaluate(string, {
  crlf: false,               // Use CRLF line endings (optional)
  useTab: false,             // Use Tab spacing (optional)
  indentSize: 2,             // The indentation size (optional)
  sorting: false,            // Applies sorting to the generated string, accepts object (optional)
  hashSort: {
    objects: true,         // Sorts objects in hash checksum structure (optional)
    arrays: false,         // Sort Arrays in  hash checksum structure (optional)
    target: [],            // Sort only these properties, accepts . separated deep targets (optional)
    exclude: []            // Property names to excude in a hash checksum sorting (optional)
  }
})
```

### Format

Formats a JSON structure. This will also parse the provided structure and throw if any parse errors are detected. Similar to the `stringify()` method, with the exception that you have control over comments within the JSON string you provide using the `removeComments` option.

> **NOTE**
>
> Sorting is disabled on the this method and the `sorting` option expects an `object` type, it does accept both `boolean` and `object` types be provided.

<!-- prettier-ignore -->
```ts
import { format } from '@syncify/json'

const result = format(string, {
  crlf: false,               // Use CRLF line endings (optional)
  useTab: false,             // Use Tab spacing (optional)
  indentSize: 2,             // The indentation size (optional)
  removeComments: false,     // Whether or no comments should be removed (optional)
  sorting: {
    objects: false,          // Sorts objects in the structure (optional)
    arrays: false,           // Sort Arrays in the structure (optional)
    exclude: []              // Property names to exclude in a the sorting (optional)
  }
})
```

### Get Indent

Detects the indentation of a file and returns a descriptor reference informing upon the indent levels. Can be used to respect indentation of JSON when no format rules are provided. Typically helpful for package.json writes.

<!-- prettier-ignore -->
```ts
import { getIndent } from '@syncify/json'

const detect = getIndent(`
{
  "foo": 1,
  "bar": 2,
  "baz": 3,
}
`)

detect.type        // => 'space'
detect.indent      // => '  '
detect.indentSize  // => 2
detect.indentChar  // => ' '
```

### Parse

Parses the provided string input parameter, strips any comments and returns a workable structure. Accepts a `revise` parameter argument which is a function that can be used to augment the input during parse operations.

<!-- prettier-ignore -->
```ts
import { parse } from '@syncify/json'

const json = parse(string, {
  revise: () => {} | null      // optional, defaults to null
});
```

### Stringify

Takes an object or array and stringifies the value. Processes and applies any formatting rules provided, returns a string which adheres to the options.

> Use the `replace` option to mimic `JSON.stringify` behaviour.

<!-- prettier-ignore -->
```ts
import { stringify } from '@syncify/json'

const string = stringify(json, {
  crlf: false,               // Use CRLF line endings (optional)
  useTab: false,             // Use Tab spacing (optional)
  indentSize: 2,             // The indentation size (optional)
  replace: () => {} | null,  // optional, defaults to null
  sorting: {
    objects: false,          // Sorts objects in hash checksum structure (optional)
    arrays: false,           // Sort Arrays in hash checksum structure (optional)
    target: [],            // Sort only these properties, accepts . separated deep targets (optional)
    exclude: []              // Property names to excude in a hash checksum sorting (optional)
  }
});
```

### Sort

A helper utility which will provide deep sorting capabilities. This is used by the `evaluate()`, `stringify()` and `format()` methods. You can control the sort behaviour and optionally skip sorting on objects and arrays. Sorting is done in alpha-numeric order and by default will only apply to properties within objects.

The sort function can apply cherry-pick sorting and supports exclusion. The `target` option accepts a `string[]` list of properties within the structure. You can deeply target properties using a `.` separator. Excluding also support `.` separator expressions.

<!-- prettier-ignore -->
```ts
import { stringify } from '@syncify/json'

const sorted = sort(json, {
  objects: true,           // Sorts objects in the structure (optional)
  arrays: false,           // Sort Arrays in the structure (optional)
  target: [],            // Sort only these properties, accepts . separated deep targets (optional)
  exclude: []              // Property names to exclude in a the sorting (optional)
});
```

### Equality

Performs a deep equality comparison check against 2 structures. Returns a boolean value indicating whether or not strucures match. Accepts either a JSON string, object or array type along with sorting control options to align the structures. Both the `actual` and `expected` values will parsed, aligned and hashed before equality comparison is performed.

<!-- prettier-ignore -->
```ts
import { equality } from '@syncify/json'

const isEqual = equality(actual, expected, {
  objects: false,          // Sorts objects in hash checksum structure (optional)
  arrays: false,           // Sort Arrays in hash checksum structure (optional)
  target: [],            // Sort only these properties, accepts . separated deep targets (optional)
  exclude: []              // Property names to excude in a hash checksum sorting (optional)
});
```

### Strip

Exposed re-export of [strip-json-comments](https://github.com/sindresorhus/strip-json-comments) that can be used to remove comments and trailing commas from a JSON string structure.

> **NOTE**
>
> The `evaluate()` and `stringify()` methods do not use the `strip-json-comments` implementation, this is provided for the quick strips and isolated usage.

<!-- prettier-ignore -->
```ts
import { strip } from '@syncify/json'

const string = strip(json, {
  trailingCommas: false,     // Strip trailing commas in addition to comments.
  whitespace: true           // Replace comments + trailing commas with whitespace instead of stripping
})
```

### JSON Errors

If JSON parsing failings then an error is thrown which will contain the source, line number, column number and a message describing the error that has occurred. In Syncify, this error will be displayed in a codeframe.

<!--prettier-ignore-->
```ts
import { JSONError } from '@syncify/json';

try {

  const output = parse(value)

} catch(error) {

  console.log(
    error.message,
    error.line,
    error.column,
    error.source
  )

}
```

# Contributing

This package is designed for usage within [Syncify](https://syncify.sh). Contributions are not accepted unless they pertain to the core Syncify module. If contributions fall into that category, fork the Syncify project.
