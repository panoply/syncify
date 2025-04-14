---
title: 'Directory Structures'
layout: base.liquid
sport: 1
permalink: '/usage/directory-structures/index.html'
anchors:
  - 'Base Directories'
  - 'Input → Output'
  - 'Path Defintions'
  - 'Custom Structures'
  - 'Renaming Files'
  - 'Stash References'
---

# Directory Structures

Syncify requires you to define custom **base** directory paths that point to theme files. The values you provide will refer to a directory name that is relative to the root of your project. You **cannot** define multi-level directories (e.g: `some/dir`) or reverse paths (e.g: `../dir`). You can pass these references within a syncify configuration file or via the CLI.

:::: grid row ai-stretch mb-5
::: grid col fs-sm

```treeview
/
├── source/
├── theme/
├── .env
└── syncify.config.ts
```

:::
::: grid px-0 col-auto ac-center stash-next

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col-8

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',  // Default input directory
  output: 'theme'   // Default output directory
})
```

:::
::::

Syncify expects projects to have an **input** directory path which contains theme **source** files. Files contained within an input directory are written to your defined **output** directory path. The generated output will be reflective of your online store and in most cases you will add the output directory to your `.gitignore` file because it can always be rebuilt from input. If you are coming from the Shopify CLI, it is important to understand that flat structures are not possible in Syncify and all projects must adhere to **input** ➔ **output** architecture.

---

# Path Definitions

The `paths` option lets you customize your theme structure, resolved relative to the `input` directory. Syncify doesn’t enforce Shopify’s theme structure, freeing you to break from its constraints. Use this option to tailor your development theme layout. Each path key represents a theme directory or resource point, accepting a single string or an array of strings for glob patterns (via [anymatch](https://www.npmjs.com/package/anymatch)). Exceptions are `snippets` and `sections`, which also support [rename paths](/renaming-files/) for deeper sub-directory control.

> All paths will auto-resolve to the `input` directory defined, so you don't need to specify it in path definitions.

##### Default Defintions:

:::: grid row ai-stretch dir-each mb-5
::: grid col fs-sm

```treeview
source/
├── +/
│   ├── blogs^
│   ├── files^
│   ├── meta^
│   ├── menus^
│   ├── pages^
│   ├── policies^
│   └── schema^
├── assets^
├── blocks^
├── config^
├── layout^
├── locales^
├── sections^
├── snippets^
├── templates/
│   ├── customers^
│   └── metaobjects^
├── theme^
├── .env
├── .liquidrc.json
├── package.json
├── syncify.config.ts
└── tsconfig.json
```

:::
::: grid px-0 col-auto ac-center stash-next

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col-8

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    assets: 'source/assets/**',
    blocks: 'source/blocks/*.liquid',
    config: 'source/config/*.json',
    locales: 'source/locales/*.json',
    layout: 'source/layout/*.liquid',
    sections: 'source/sections/**/*.{liquid,json}',
    snippets: 'source/snippets/**/*.liquid',
    metaobject: 'source/templates/metaobject/*.{liquid,json}',
    customers: 'source/templates/customers/*.{liquid,json}',
    templates: 'source/templates/*.{liquid,json}',
    blogs: 'source/+/blogs/**/*.{md,html}',
    files: 'source/+/files/**',
    metafields: 'source/+/meta/**/*.json',
    navigation: 'source/+/menus/**/*.json',
    pages: 'source/+/pages/*.{md,html}',
    policies: 'source/+/policies/*.{md,html}',
    schema: 'source/+/*.{schema,json}',
  }
})
```

:::
::::

<div class="row ">
  <div class="col">
  </div>
  <div class="col">
  </div>
</div>

---

# Custom Structures

Sticking to the default structure isn’t ideal with Syncify. Instead, you’re encouraged to craft an input (theme) structure that fits your project, aligns with your workflow, and reflects your preferences. The `paths` option empowers you to define a tailored setup, giving you control over how your theme is organized. Below is a basic example of how to create a customized structure using `paths`, showcasing the flexibility to adapt the layout to your specific needs.

:::: grid row ai-stretch dir-each my-5
::: grid col fs-sm

```treeview
/
├── source/
│   ├── assets/
│   │   └── files/
│   ├── data/
│   │   ├── config/
│   │   ├── locales/
│   │   └── metafields/
│   │       └── namespace/
│   ├── pages/
│   └── views/
│       ├── customers/
│       ├── meta/
│       ├── sections/
│       │   ├── blocks/
│       │   └── schema/
│       ├── snippets/
│       ├── templates/
│       └── theme.liquid
├── .env
├── package.json
└── syncify.config.ts
```

:::
::: grid px-0 col-auto ac-center

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col-8

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    assets: 'assets/**',
    config: 'data/config/*.json',
    locales: 'data/locales/*.json',
    metafields: 'data/metafields/**/*.json',
    layout: '*.liquid',
    blocks: 'views/sections/blocks/*.liquid',
    sections: 'views/sections/**/*.liquid',
    snippets: 'views/snippets/**/*.liquid',
    templates: 'views/templates/*.{liquid,json}',
    customers: 'views/customers/*.{liquid,json}',
    schema: 'views/sections/**/*.schema',
    metaobject: 'views/meta/*.{liquid,json}',
    pages: 'pages/*.{md,html}',
    redirects: 'redirects.yaml'
  }
})
```

:::
::::

---

# Renaming Files

The `paths` option in Syncify lets developers customize output filenames for specific theme files. For sections and snippets, path references can optionally use an object rename value type. This rename object allows you to adjust filenames before they’re written to the output directory, enhancing control over the final structure. Consider a project where `snippets` and `sections` are organized into sub-directories.

Below are examples of **input** and **output** structures to demonstrate this. The **input** includes a `sections` directory with three sub-directories: blocks, product, layouts and a snippets directory with a cards sub-directory plus two unnested snippet files. The **output** illustrates the resulting structure when using the rename object feature to shape themes.

:::: grid row mb-4 ai-center
::: grid col fill-papyrus

##### Input Structure: `{js} { input: 'source' }`

```treeview
source/
    ├── sections/
    │   ├── blocks/
    │   │   ├── slideshow.liquid
    │   │   └── rich-text.liquid
    │   ├── product/
    │   │   ├── details.liquid
    │   │   └── images.liquid
    │   └── layouts/
    │       ├── header.liquid
    │       └── footer.liquid
    └── snippets/
        ├── all-cards/
        │   ├── collection.liquid
        │   ├── drawer.liquid
        │   └── product.liquid
        ├── share-button.liquid
        └── social-icons.liquid
```

:::
::: grid col-auto

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col

##### Output Structure `{js} { output: 'theme' }`

```treeview
theme/
    ├── assets/
    ├── config/
    ├── layout/
    ├── locales/
    ├── sections/
    │   ├── header.liquid
    │   ├── footer.liquid
    │   ├── product-details.liquid
    │   ├── product-images.liquid
    │   ├── rich-text.liquid
    │   └── slideshow.liquid
    ├── snippets/
    │   ├── card-collection.liquid
    │   ├── card-drawer.liquid
    │   ├── card-product.liquid
    │   └── social-icons.liquid
    └── templates/
```

:::
::::

> This rename object pairs rename patterns with glob patterns, all are resolved relative to the **input** directory.

Let's explore how to create the above **output** structure using a rename object in a config. For both `sections` and `snippets`, we define an object within the `paths` option. Each key in the object specifies a glob pattern to match files, while its value defines the renaming logic - such as altering filenames, flattening sub-directories, or preserving specific parts of the path before writing to the output directory.

##### Configuration `syncify.config.ts`

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    sections: {
      '*': 'sections/**/*',                // Wildcard global
      '[dir]-[name]': 'sections/product/*' // Directory and Filename rename
    },
    snippets: {
      '[name]': 'snippets/**/*',            // Wildcard global
      'card.[name]': 'snippets/all-cards/*' // Directory and Filename rename
    }
  }
});
```

### Sections Wildcard

The `'*'` wildcard pattern matches all files within the `sections` directory and its subdirectories. The wildcard acts like fallback reference and the glob pattern `sections/**/*` will ensure that it targets every file, regardless of extension, within `sections` and its nested folders. Using a wildcard pattern like this allows files to **pass through** without renaming, ensuring their original names are preserved.

### Sections Rename

The `[dir]-[name]` pattern dynamically renames files by replacing `[dir]` with the subdirectory name and `[name]` with the original file name. The glob pattern `sections/product/*`, applies the rename to all files found in that location. The **output** result will be file names renamed with the subdirectory name as a prefix, and suffixed with the source name.

### Snippets Wildcard

The `[name]` pattern, when used without any prefix or suffix, functions like a wildcard `'*'` **pass-through** pattern, ensuring that all files in the `snippets` directory and its subdirectories are included. The glob pattern `snippets/**/*'` targets every file, regardless of extension, within `snippets` and its nested folders. This allows files to pass through without renaming, preserving their original names.

### Sections Rename

The pattern `'card-[name]'` dynamically renames files by adding the prefix `card` and a dot `.` separator character to the base name of each snippet file. The associated glob pattern `snippets/all-cards/*` specifically targets all files located in the `all-card/` subdirectory.

---

# Stash References

Stash references are write locations used in projects with custom structures and complex globs patterns. The **input** ➔ **output** approach of Syncify offers developers flexibility, but there are nuances when we execute [pull](/cli/sy-pull/) operations. In a flat structure, file placement is predictable and intuitive: snippets land in the `snippets/` directory, sections in the `sections/` directory, and so on—there’s no room for ambiguity or deviation. With Syncify, however, the freedom to create custom nested theme structures introduces complexity. Mapping files to their intended locations becomes less straightforward, as the directory layout varies depending on the developers preferences.

### Usage

By default, Syncify will attempt to automatically pinpoint write destinates within your **input** (source) directories using pre-existing glob patterns provided in to configuration. In most cases, your path entries will be enough for Syncify to determine a valid write location, but if your project uses complex or file specific patterns, then it is recommended that you provide stash references.

##### Configuration `syncify.config.ts`

:::: grid row mb-4 ac-center
::: grid col pr-0 stash-height

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    // ...
    snippets: [
      'path/snippets/*',
      'path/examples/*',
      { index: 1, stash: '*' }
    ],
    sections: [
      'path/sections/*',
      { stash: 'temp' }
    ]
  }
});
```

:::
::: grid col-auto pl-0 stash-header fs-sm stash-height

<div class="pl-4 pr-3 pt-3 fs-sm bd stash-bd ">

## `{ts} { stash: '*' }`

Asterisk applies a flat-write of files in path

## `{ts} { stash: true }`

Boolean `true` applies write in directory called stash

## `{ts} { stash: number }`

Target a flat-write of files at specific pattern index

## `{ts} { stash: string }`

Write to a sub-directory relative to pattern

## `{ts} { index: number; stash: true }`

Target pattern at index and write in directory stash

## `{ts} { index: number; stash: string }`

Target pattern at index and write to sub-directory

</div>

:::
::::

> Stash directories are designed to provide developers a grouping mechinsim for remote files obtained during [pull](/cli/sy-pull/) operations. We will wlak through a common use-case situation where you'll need stash references

### Real-world scenario

Let’s examine a real-world scenario requiring stash references. Imagine you need to integrate changes from a remote theme edited by multiple developers. You’re using Syncify with custom structures, while they use the Shopify CLI with basic, flat structures. Their setups are simple and beginner-level, lacking sub-directories, whereas your professional approach leverages tailored layouts. In this example, we use section [rename](/renaming-files/) path patterns. While this explicit, verbose mapping isn’t inherently flawed, it can create issues when collaborating with developers or syncing with flat-structure projects built via Shopify CLI.

:::: grid row mb-4 ai-center
::: grid col

<!--prettier-ignore-->
```js
export default defineConfig({
  input: 'source',
  paths: {
    sections: {
      '[name]': [
        'sections/**',
        { stash: '+' }
      ],
      '[dir]-[name]': [
        'sections/product/*'
      ]
    }
  }
});
```

:::
::: grid col-auto pt-5 stash-next

{% svg 'arrow-right', 'icon-output'%}

:::
::: grid col

```treeview
source/
  └── sections/
      ├── +/    # write stash files here
      ├── blocks/
      │   ├── slideshow.liquid
      │   └── rich-text.liquid
      ├── product/
      │   ├── details.liquid
      │   └── images.liquid
      └── layouts/
          ├── header.liquid
          └── footer.liquid

```

:::
::::

# TODO

---

<h1 class="vs"> Hierarchical <span>VS</span> Flat Structures</h1>

One key constraint in Shopify CLI theme development is its strict flat directory structure, emphasizing predictable file organization. Flat structures suit Shopify themes well due to their simplicity, ease of navigation, and consistency, which simplifies collaboration by removing guesswork when multiple developers handle a theme. However, while practical, this flat structure limits extensibility and scalability, crucial for complex or growing storefronts.

Syncify projects enforce a hierarchical **input** ➔ **output** base structure. Developers can mimic flat structures within **input** directories, but the organization of files and folders remains unpredictable, left to the developer or team's discretion. The hierarchical structure might intimidate developers used to the Shopify CLI's flat approach, particularly newcomers to alternative setups. Yet, for modern, high-performance Shopify themes, flat structures falter, growing unwieldy as complexity increases. Syncify's hierarchical design supports expanding theme needs, boosting scalability by letting developers freely organize their projects.

### Limitations

While it’s straightforward to critique the Shopify CLI’s rigid flat structure mandate for theme development, the hierarchical (custom) structures offered by Syncify come with their own set of challenges. Despite these shortcomings, Syncify strives to address each potential issue with minimally invasive workarounds, ensuring flexibility without overwhelming complexity.

One notable limitation of the hierarchical approach is the difficulty in pinpointing location context. This can complicate certain tasks, such as downloading files from a theme using `sy pull` commands. To mitigate this, Syncify offers solutions like [Stash References](#stash-references), which provide a clear method to handle such cases and maintain control over file organization.The hierarchical approach, while powerful, isn’t flawless. It trades some of the flat structure’s simplicity for greater flexibility, which can occasionally feel like a double-edged sword. Still, when compared holistically, the hierarchical model imposes fewer overall constraints.

The last notable limitation the developers should consider is the longevity, in the shape transitioning a Syncify theme back to a Shopify CLI workflow, or vice versa. This does require significant restructuring, as the tools prioritize different paradigms. Developers must weigh this trade-off: The robust, customizable environment with Syncify versus the Shopify CLI's standardized, predictable simplicity, and general shit-show. For those committed to Syncify, the need for compatibility with Shopify CLI fades, as Syncify delivers a comprehensive, standalone alternative.

> Syncify provides several workarounds to ensure that any percieved limitations do overshadow the benefits. Beyond pinpointing location context, hierarchical structures are largely adaptable.

### Compatibility

The compatibility of themes developed with Syncify versus those built using the Shopify CLI hinges heavily on your chosen project structure, with differences rooted in the fundamental contrast between hierarchical and flat architectures. These structural disparities often render Syncify-developed themes incompatible with their Shopify CLI counterparts, creating a clear divide in workflow and output.

While Syncify offers the flexibility to generate a flat-structure theme if desired, this output is distinct from its source code, which remains hierarchically organized. The generated flat structure might resemble a Shopify CLI theme superficially, but the underlying development process and file management differ significantly. More critically, Syncify isn't designed merely as an alternative tool, it is built to fully replace the Shopify CLI for theme development. This intentional shift means Syncify handles all operations and tasks related to theme structures, from file organization to deployment all within its own ecosystem. As a result, it can seamlessly manage both hierarchical and flat outputs without relying on the Shopify CLI. This replacement approach eliminates dependency on the Shopify CLI entirely, offering a self-contained solution for developers. For instance, tasks like theme previews, uploads, or asset management, which typically require Shopify CLI commands, are fully supported with Syncify.

---
