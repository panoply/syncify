# @syncify/schema

This module contains [JSON Schema Stores](https://json-schema.org/) for [Syncify](https://github.com/panoply/syncify). Syncify is an enterprise level Shopify theme development tool and exists as a superior alternative to the Shopify CLI.


### Install

You don't need to install this module. Reference it using the CDN urls.

```bash
$ pnpm add @syncify/schema -D
```

### Usage

When referencing a schema, it is assumed that your text editor supports JSON `$schema` properties.

```json
{
  "$schema": "https://unpkg.com/@syncify/schema/<name>.json",
}
```

> Replace the `<name>` with one of the below available stores.

# Stores

Below the available schema stores provided in this module.



### [sections](https://unpkg.com/@syncify/schema/sections.json)

- [`https://unpkg.com/@syncify/schema/sections.json`](https://unpkg.com/@syncify/schema/sections.json)

JSON Schema used for providing intellisense features for shared section files.

```json
{
  "$schema": "https://unpkg.com/@syncify/schema/sections.json",
  "foo": {
    "type": "image_picker",
    "id": "some_id",
    "label": "Lorem Ipsum"
  }
}
```


### [package](https://unpkg.com/@syncify/schema/syncify.json)

- [`https://unpkg.com/@syncify/schema/env.json`](https://unpkg.com/@syncify/schema/syncify.json)

JSON Schema for the `syncify` key of `package.json` files.

```json
{
  "json.schemas": [
    {
      "url": "https://unpkg.com/@syncify/schema/syncify.json",
      "fileMatch": [
        "package.json"
      ]
    }
  ]
}
```

### [env](https://unpkg.com/@syncify/schema/env.json)

- [`https://unpkg.com/@syncify/schema/env.json`](https://unpkg.com/@syncify/schema/env.json)

JSON Schema used for providing intellisense features for `.env.syncify` or `.env.syncify.json` - This store requires you provide VSCode workspace settings configuration.

```json
{
  "json.schemas": [
    {
      "url": "https://unpkg.com/@syncify/schema/env.json",
      "fileMatch": [
        ".env.syncify",
        ".env.syncify.json"
      ]
    }
  ]
}
```

### Contributing

The Syncify Schema Stores are generated and maintained in [Liquify](https://github.com/panoply/liquify-schema).
