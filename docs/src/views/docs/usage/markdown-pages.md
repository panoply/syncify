---
title: 'Pages'
layout: base
permalink: '/usage/markdown-pages/index.html'
anchors:
  - 'Markdown Pages'
  - 'Supported Files'
  - 'Default Options'
---

# Markdown Pages

Syncify supports page sync and employs an intuitive approach to working with static pages for stores. The [paths](#paths) **pages** option is where you can provide path file references to be synced. Pages in Syncify can be either `.html` (markup) or `.md` (markdown) files.

> Pages cannot contain Liquid syntax (Shopify does not support Liquid in pages only static markup). Adding Liquid to page content will result in an error.

Pages can be written in markdown, Syncify will transform `.md` page files into valid HTML markup when syncing. Markdown pages are parsed and transformed using the the powerful [markdown-it](https://github.com/markdown-it/markdown-it) and support Github flavored markdown syntax. In addition to Markdown → HTML generation, Syncify can also perform reversed conversion (HTML → Markdown). Using the `importLanguage` option, any time a remote to local alignment is carried out, files will be written in markdown.

---

# Remote and Local sources

By default, syncify will perform **safe** synchronization. The `safeSync` option instructs syncify to pull down remote versions before uploading local ones in watch and upload modes. This operation ensures that you do not overwrite page content in situations where changes have been applied in your store since the last sync was performed on your local machine. Syncify will prompt you when misalignment is detected and allow you to pull in the remote versions.

---

# Markdown Support

Pages can be written in markdown, Syncify will transform `.md` page files into valid HTML markup when syncing. Markdown pages are parsed and transformed using the the powerful [markdown-it](https://github.com/markdown-it/markdown-it) and support Github flavored markdown syntax. In addition to Markdown → HTML generation, Syncify can also perform reversed conversion (HTML → Markdown). Using the `importLanguage` option, any time a remote to local alignment is carried out, files will be written in markdown.

---

# Frontmatter Support

You can pass frontmatter data in page files. Page frontmatter can be used to control per-page publishing settings and allows for additional request payloads to be passed. Syncify supports a modest schema structure for page frontmatter.

<!-- prettier-ignore -->
```yaml
title: 'Lorem Ipsum'    # The page title
handle: '/some-handle'  # Custom page handle
template: 'example'     # Specify a template_suffix
published: true         # Whether the page is published
links: false            # Auto-convert URL-like
breaks: true            # Convert '\n' into `<br>`
metafields:             # Pass in additional metafields
  - namespace: 'foo'
    key: 'greeting'
    type: 'single_line_text_field'
    value: 'Hello World!'
  - namespace: 'bar'
    key: 'some_condition'
    type: 'boolean'
    value: true
```
