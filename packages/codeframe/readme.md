# @syncify/codeframe

Codeframe generator used by the [Syncify CLI](https://syncify.sh) in errors and warnings. This module borrows logic used by [@babel/code-frame](https://github.com/babel/babel/blob/main/packages/babel-code-frame) and extends upon it to cover various languages supported by transforms in Syncify.

### Features

- Supports Shopify GraphQL User Errors
- Liquid, CSS/SCSS, JSON, JavaScript and Markup
- Syncify TUI Aesthetic with Tree line prefixes
- Specialised ANSI colouring.

# Usage

The module provides a single named export of `codeframe` and can be used in both CJS or ESM environments. Codeframes require you provide file source and without reference to this, codeframes cannot be generated.

```ts
import { codeframe } from '@syncify/codeframe';

const frame = codeframe(source, {
  language: '', // defaults to javascript
  type: 'error', // accepts 'error' | 'warning' | 'info'
  highlight: true, // whether or not syntax highlighting applies
  linesAbove: 2, // the number of lines above to include
  linesBelow: 2, // the number of lines below to include
  start: {
    line: 1,
    column: 10
  },
  end: {
    line: 2,
    column: 10
  }
});

console.log(frame); // Returns a string
```

### Shopify Specific Errors

Use `codeframe.shopify` method for framing Shopify (Liquid) errors. This will return different context and is designed for markup + liquid language handling. The code snippet that will be generated uses the error message of Shopify.

```ts
import { codeframe } from '@syncify/codeframe';

const frame = codeframe.shopify(source, message, {
  highlight: true,
  type: 'error',
  linesAbove: 2,
  linesBelow: 2
});

// Range Location
//
error.line; // Starting line number of error
error.column;

// Message Related
//
error.summary; // This is summary of the error, eg: Liquid syntax error on line 21
error.details; // This is the additional info, i.e, the 2nd line of the message
error.message; // This is a highlighted combination of summary and details
error.output; // This is message + codeframe

// Codeframe
//
error.frame; // The generated codeframe
error.hasFrame; // Whether or not codeframe was created.
```

---

# Shopify Graphql Errors

User error messages via the [Shopify GraphQL](https://shopify.dev/docs/api/admin-graphql) API are supported and the module is designed to improve the clarity and usability of errors returned by the graph. The logic can be used in isolation, though comes preset to adhere to the TUI Aesthetic of Syncify.

<samp align="center">
<strong>
<br>
<table><tr><td>

  <h3>FAULT TOLERENT</h3>

This module is designed as a fault-tolerant integration. If Shopify changes error messages in a way that prevents interpretation, the module will return a non-breaking result. Given Shopify's rapid and often unpredictable updates, efforts are made to mitigate potential issues. However, users are encouraged to exercise caution when using the module in isolation.

<br>
</td></tr></table>
</strong>
</samp>

Shopify's error messages can be ultra-violent. While they provide some context, like much of Shopify's ecosystem, there's significant room for improvement. Although IDE integrations with IntelliSense strive to prevent invalid code from being passed, they cannot be entirely foolproof due to the unique challenges of theme development.

> All codeframes render according to a predefined wrap limit, ignoring the file's source indentation, so the animals and Dawn users with deeply nested markup structures get readable code frame results.

## Standard Shopify Error Message 🤡

Shopify provides basic error messages for theme file upsert mutations. These messages have remained largely unchanged over the years, even the Graphql slop they've enforced has seen no improvements on this front. Let's look at an example error message of an upsert rejection, this would apply if an invalid `{% for %}` tag was passed:

```
Liquid syntax error (line 21): Syntax Error in 'for loop' - Valid syntax: for [item] in [collection]
```

We have the Liquid Parser to thank for the above line number context and token occurance, but this is still a tad cumbersome to parse on the human level, but with this we can drastically improve things.

## Syncify Error Message Interpretation 🤌

In [Syncify](https://syncify.sh), errors are more sophisticated because the messages are processed through a lexical parser. During this interpretation, errors undergo several modifications to enhance the provided information and expand upon the contextual details. The resulting output enables precise codeframe generation, including pinpointing the exact line and column number based on the source file's content. The above error message will be transformed into:

```
│ Syntax error on line 21 in sections/file.liquid
│
│ Invalid or incomplete syntactical expressed in the 'for' (loop) tag.
│ Valid syntax: for [item] in [collection]
│
│
│   19 │  <div class="foo bar baz">
│   20 │    <section>
│ ➤ 21 │      {%- for 100 in -%}
│    ✕ │      ^^^^^^^^^^^^^^^^^
│
```

> [!NOTE]
> The message will apply syntax highlighting using [@syncify/ansi](/packages/ansi/) and by default render in accordance with the Syncify TUI (Terminal User Interface) aesthetic. This can be disabled using the available options.

### Error Parsing

A list of known error messages that the Shopify API may return upon rejection. These messages are largely undocumented, aside from what can be gleaned from the [Liquid](https://github.com/Shopify/liquid) repository. Even with this resource, clarity is limited. In most cases, the Liquid parser provides a line number in its error messages, such as:

```
Liquid syntax error (line 4):
```

The presence of this string determines whether a codeframe can be generated for Liquid-related errors. The module attempts to extract locations from file sources based on the encountered error messages. If the error message string does not reference a line number, the module applies lexing to approximate the error's location within the file that was rejected during upsert operations.

### Required Tags

Rejections when required object tags like `{{ content_for_header }}` are missing

- `Missing %{tag} in the %{location} section of the template`

## JSON in templates

Rejections when invalid JSON is present in template.json files.

- `unknown key '%{property}'`
- `Section id '%{property}' is missing a type field`
- `Section id '%{property}' must exist in %{property}`
- `Section type '%{value}' does not refer to an existing section file`

**Dynamically inserted**

- `'%{property}: must be an object'`

## Miscellaneous

Rejections of various syntax errors which might occur

- `Expected [:end_of_string] but found %{something} in "%{token}"`
- `invalid_expression = '[:end_of_string] is not a valid expression in "%{token}`
- `Invalid expression type '#{invalid_expr}' in range expression`

## JSON in schema tag

Rejections when invalid JSON is present in section `{% schema %}` tags.

- `Invalid tag 'schema': must be an object`
- `Invalid schema: setting type is required`
- `Invalid schema: '%{property}' is not a valid attribute`
- `Invalid block '%{property}': type is required`

## Specified in Liquid Repository

Rejection messages obtained via [liquid repo](https://github.com/Shopify/liquid/blob/03aafa974c2ace05605be5ce8cb732e92e4ca94d/lib/liquid/locales/en.yml) - most of which are Syntax related.

- `Syntax Error in '%{tag}' - Valid syntax: %{tag}`
- `Syntax Error in 'assign' - Valid syntax: assign [var] = [source]`
- `Syntax Error in 'capture' - Valid syntax: capture [var]`
- `Syntax Error in 'case' - Valid syntax: case [condition]`,
- `Syntax Error in tag 'case' - Valid when condition: {% when [condition] [or condition2...] %}`
- `Syntax Error in tag 'case' - Valid else condition: {% else %} (no parameters) `
- `Syntax Error in 'cycle' - Valid syntax: cycle [name :] var [, var2, var3 ...]`
- `Syntax Error in 'for loop' - Valid syntax: for [item] in [collection]"`
- `Syntax Error in 'table_row loop' - Valid syntax: table_row [item] in [collection] cols=3`
- `Syntax Error in tag 'if' - Valid syntax: if [expression]`
- `Syntax error in tag 'render' - Template name must be a quoted string`
- `Syntax error in tag '#' - Each line of comments must be prefixed by the '#' character`
- `For loops require an 'in' clause`
- `Variable '%{token}' was not properly terminated with regexp: %{tag_end}`
- `Invalid attribute in for loop. Valid attributes are limit and offset`
- `Invalid template encoding`
- `Error in tag 'include' - Valid syntax: include '[template]' (with|for) [object|collection]`
- `Tag '%{token}' was not properly terminated with regexp: %{tag_end}`
- `Unexpected outer '%{tag}' tag`
- `Unknown tag '%{tag}'`

**Dynamically inserted**

- `'%{tag}' is not a valid delimiter for %{block_name} tags. use %{block_delimiter}`
- `'%{block_name}' tag was never closed`
- `%{block_name} tag does not expect 'else' tag`

# Contributing

This package is designed for usage within [Syncify](https://syncify.sh). Contributions are not accepted unless they pertain to the core Syncify module. If contributions fall into that category, fork the Syncify project.
