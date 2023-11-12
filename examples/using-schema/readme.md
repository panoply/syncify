# Syncify using Schema

Example usage of shared schema files in Syncify. Shared Schema allow you to isolate and re-use section schema in your themes. Shared Schema files use a `.schema` file extension and can be referenced (imported) into `{% schema %}` tags using a `$ref` key and `<file>.<prop>` reference.

<pre><code><strong>PASSWORD</strong>  →   <code>access</code>
<strong>PREVIEW</strong>   →   <a href="https://syncify.myshopify.com?preview_theme_id=137588637937">https://syncify.myshopify.com?preview_theme_id=137588637937</a>
</code></pre>

### Showcasing

This example defines config within the projects `package.json` file. You can also define configuration within a `syncify.config.ts` file. The example showcases the below additional capabilities.

- Shared Schema usage within 3 sections
- CSS Transform using PostCSS and applied rename
- SVG Transform using SVGO which writes as a snippet
- Applies Custom Directory structures

### Usage

You can use this example as a starting point to your next project. Open up your terminal and run the following command:

```bash
$ pnpx @syncify/strap --strap examples/using-schema
```

> **Note**
> It is highly recommended that you use the [VSCode Liquid](https://github.com/panoply/vscode-liquid) extension and take advantage of intelliSense capabilities for Shared Schema.

# Overview

Contained within the `source/schema` directory are 2 different shared schema files. These files hold different schema settings and blocks which are referenced within sections contained in the `source/sections` directory.

```
├── source
│   │
│   ├── schema
│   │   ├── fields.schema
│   │   └── page.schema
│   │
│   └── sections
│      ├── demo.liquid
│      ├── form.liquid
│      └── page.liquid
```

The shared schemas are imported within each section `{% schema %}` tag. For the purpose of the example, the `demo.liquid` section imports settings from both shared schema files, whereas the `form.liquid` and `page.liquid` sections import settings from one shared schema file.

Schema contained within `demo.liquid` file.

```liquid
{% schema %}
{
  "name": "demo",
  "settings": [
    {
      "type": "textarea",
      "id": "heading",
      "label": "Heading",
      "default": "An example which combines both shared schema files"
    },
    {
      "$ref": "page.example"
    }
  ],
  "blocks": [
    {
      "name": "Contact Form",
      "type": "contact_form",
      "settings": [
        {
          "$ref": "fields.input"
        },
        {
          "$ref": "fields.email"
        },
        {
          "$ref": "fields.textarea"
        }
      ]
    }
  ]
}
{% endschema %}
```
