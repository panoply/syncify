---
title: 'Shared Schema'
layout: base.liquid
permalink: '/features/shared-schema/index.html'
anchors:
  - 'Shared Schema'
  - 'How it works?'
  - 'Structures'
---

# Shared Schema

Syncify provides an elegant and simple solution for Shared Section Schema. Shared Schemas are a superset implementation that provides developers a refined way to reuse schema `settings` and `blocks` across multiple sections. Syncify supports this capability using an isolation → injection approach wherein schema structures written in external JSON files can be injected into section `{% schema %}` tags.

The internal structure of shared schema files use a simple `key` → `value` (object) pattern that is similar to how we define `presets` in section schema. Importing shared schemas into `{% schema %}` tags is made possible using a reference `$ref` key and injection value expression that allows for cherry picking different structures within schema files.

#### Motivation

In theme development, we often need to reuse schema across multiple sections. However, this capability is not supported by Shopify, which leaves developers at the mercy of replication methods (i.e: copy/paste), potentially leading to inconsistencies. Syncify's shared schema capability addresses this issue by allowing developers to isolate the schema structures they intend to reuse across multiple sections.

> Use the [VSCode Liquid](https://github.com/panoply/vscode-liquid) extension and take advantage of the Syncify Shared Section Schema approach with IntelliSense capabilities. VSCode Liquid has built-in Syncify support for hovers, completions and validations.

# Usage

Shared Schema usage begins with the `schema` configuration `paths` option. The `schema` paths option is where Syncify will resolve shared schema JSON files. By default, Syncify assumes your shared schema files exist within a directory named `schema` relative to the `input` base directory, see below:

:::: grid row

::: grid col

```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  paths: {
    sections: 'sections/**/*.liquid'
    schema: 'schema/*.{schema,json}'
  }
});
```

:::
::: grid col

```treeview
/
└── source/
    ├── sections/
    │   ├── header.liquid
    │   └── footer.liquid
    └── schema/
        ├── foo.schema
        └── baz.schema
```

:::
::::

The above example is the **default** configuration the Syncify will adhere to using, wherein shared schema files are to exist within a `source/schema` directory. Shared Schema files can use `.schema` or `.json` extension, both are valid and will be interepreted as JSON with the difference being that files using the `.schema` extension support intellisense features and generally the preferred format to apply is `.schema` as the VSCode Liquid extension has built-in intellisense support for files using the `.schema` extension.

### Schema Files

There are several different structures you can use for defining `settings` and `blocks` within shared schema files. Syncify describes each shared schema structure as follows:

- **Setting Singleton**
  - lorem
- **Setting Spread**
  - lorem
- **Setting Collection**
  - lorem
- **Block Singleton**
  - lorem
- **Block Spread**
  - lorem

### Schema $refs

> The below code samples showcase implementation examples of how shared schema can be implemented into your Syncify project. As with anything development related, the best way to familiarize yourself with a feature of capability is to test it out. Take a look at [using-schema](https://github.com/panoply/syncify/examples/using-schema) example or alternatively install it as a starting point strap (see [straps](#)) via the command line.

---

### Setting Singleton

:::: grid row
::: grid col

```json
{
  "example": {
    "$description": "IntelliSense Hover",
    "type": "textarea",
    "id": "info",
    "label": "Information",
    "default": "Lorem ipsum",
    "info": "Example"
  }
}
```

:::
::: grid col

```liquid
{{ section.settings.info }}

{% schema %}
{
  "name": "demo",
  "settings": [
    {
      "$ref": "file.example"
    }
  ]
}
{% endschema %}

```

:::
::::

---

### Settings Spread

Below is an example of a shared schema settings spread. The approach accepts an array list of settings and when referenced in sections will spread the output.

:::: grid row
::: grid col

```json
{
  "example": [
    {
      "type": "text",
      "id": "foo",
      "label": "Example 1"
    },
    {
      "type": "text",
      "id": "bar",
      "label": "Example 2"
    }
  ]
}
```

:::
::: grid col

```liquid

{{ section.settings.foo }}
{{ section.settings.bar }}

{% schema %}
{
  "name": "demo",
  "settings": [
    {
      "$ref": "test.example"
    }
  ]
}
{% endschema %}
```

:::
::::

---

### Settings Collection

Below is an example of a shared schema settings spread. The approach accepts an array list of settings and when referenced in sections will spread the output. Below is an example of a shared schema settings spread. The approach accepts an array list of settings and when referenced in sections will spread the output.

:::: grid row dir-each
::: grid col

```json
{
  "example": {
    "$description": "Used in hover intellisense",
    "settings": [
      {
        "type": "text",
        "id": "foo",
        "label": "Example",
        "info": "Lorem ipsum"
      }
    ]
  }
}
```

:::
::: grid col

```liquid

{{ section.settings.foo }}


{% schema %}
{
  "name": "demo",
  "settings": [
    {
      "$ref": "test.example"
    }
  ]
}
{% endschema %}

```

:::
::::

---

### Block Singleton

:::: grid row dir-each
::: grid col

```json
{
  "block_singleton": {
    "name": "Sample",
    "type": "sample",
    "settings": [
      {
        "type": "text",
        "id": "title",
        "label": "Example",
        "default": "Hello World"
      }
    ]
  }
}
```

:::
::: grid col

```liquid

{% for block in section.blocks %}
  {% if block.type == 'name' %}

    {{ block.settings.title }}

  {% endif %}
{% endfor %}

{% schema %}
{
  "name": "demo",
  "blocks": [
    {
      "$ref": "file.block_singleton"
    }
  ]
}
{% endschema %}

```

:::
::::

---

### Block Collection

Below is an example of a shared schema settings spread. The approach accepts an array list of settings and when referenced in sections will spread the output. Below is an example of a shared schema settings spread. The approach accepts an array list of settings and when referenced in sections will spread the output.

:::: grid row
::: grid col

```json
{
  "example": [
    {
      "$description": "Lorem ipsum",
      "name": "foo",
      "type": "foo",
      "settings": [
        {
          "type": "article",
          "id": "something",
          "label": "Something"
        }
      ]
    },
    {
      "$description": "Info about block",
      "name": "bar",
      "type": "bar",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Example",
          "default": "Hello World"
        }
      ]
    }
  ]
}
```

:::
::: grid col

```liquid

<div class="flex">

  {% for block in section.blocks %}
    {% if block.type == 'foo' %}

      {{ block.settings.something }}

    {% elsif block.type == 'bar '%}

      {{ block.settings.title }}

    {% endif %}
  {% endfor %}
</div>


{% schema %}
{
  "name": "demo",
  "tag": "section",
  "class": "container",
  "blocks": [
    {
      "$ref": "test.example"
    }
  ]
}
{% endschema %}

```

:::
::::
