---
title: 'Directory Structures'
layout: base.liquid
sport: 1
permalink: '/usage/directory-structures/index.html'
anchors:
  - 'Directory Structures'
  - 'Hierarchical VS Flat Structures'
  - 'Base Directories'
  - 'Path Defintions'
  - 'Root Defintions'
  - 'Custom Structures'
  - 'Renaming Files'
  - 'Stash References'
  - 'Structure Compatibility'
---

# Directory Structures

Syncify projects adopt a hierarchical **input** ➔ **output** structure, allowing developers to organize files and folders within the input directory as they see fit, including mimicking flat structures if desired. While this flexible hierarchy offers powerful customization, it may feel unfamiliar to developers accustomed to the flat structure of the Shopify CLI.

> Syncify currently enforces a strict hierarchical structure and does not support flat structures. However, plans are in place to introduce flat structure compatibility in a future minor version release.

:: row dir-struc my-5
:: col-12 col-md fs-sm bd-bad

<h4 class="bad mb-1">Flat Structure</h4>

An example of a flat structure where the theme directories are exposed in the root of a project:

```treeview
/
├── assets^
├── blocks^
├── config^
├── layout^
├── locales^
├── sections^
├── snippets^
└── templates^
```

::
:: px-0 pt-5 col-auto ac-center stash-next tc d-none d-md-unset

{% svg 'arrow-right', 'icon-output mt-4'%}

::
:: col-12 col-md fs-sm bd-good mt-5 mt-sm-0

<h4 class="good mb-1">Hierarchical</h4>

An example of a hierarchical structure where theme directories are placed inside a base directory:

```treeview
/
├── source/
│    ├── assets^
│    ├── blocks^
│    ├── config^
│    ├── layout^
│    ├── locales^
│    ├── sections^
│    ├── snippets^
│    └── templates^
└── theme/
```

::
::

<h3 class="vs"> Hierarchical <span>VS</span> Flat Structures</h3>

While it's easy to critique the Shopify CLI's rigid flat structure mandate for theme development, the hierarchical (custom) structures offered by Syncify come with their own set of challenges. Despite these shortcomings, Syncify strives to address each potential issue with minimally invasive workarounds, ensuring flexibility without overwhelming complexity.

One notable limitation of the hierarchical approach is the difficulty in pinpointing location context. This can complicate certain tasks, such as downloading files from a theme using `sy pull` commands. To mitigate this, Syncify offers solutions like [Root Definitions](#root-references), which provide a clear method to handle such cases and maintain control over file organization. The hierarchical approach, while powerful, is not flawless. It trades some of the flat structure's simplicity for greater flexibility, which can occasionally feel like a double-edged sword. Still, when compared holistically, the hierarchical model imposes fewer overall constraints.

The last notable limitation the developers should consider is the longevity, in the shape transitioning a Syncify theme back to a Shopify CLI workflow, or vice versa. This does require significant restructuring, as the tools prioritize different paradigms. Developers must weigh this trade-off.

---

# Base Directories

The base directory `input` and `output` path references point to theme source and distribution files. The values you provide will refer to a directory name that is relative to the root of your project. You **cannot** define multi-level directories (e.g: `some/dir`) or reverse paths (e.g: `../dir`). You can pass these references within a Syncify configuration file or via the CLI.

:: row ai-stretch mb-5
:: col-12 col-md fs-sm mb-3 mb-md-0

```treeview
/
├── source/
├── theme/
├── .env
└── syncify.config.ts
```

::
:: px-0 col-auto ac-center stash-next d-none d-md-unset

{% svg 'arrow-right', 'icon-output'%}

::
:: co-12 col-md-8

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',  // Default input directory
  output: 'theme'   // Default output directory
})
```

::
::

Syncify expects projects to have an **input** directory path which contains theme **source** files. Files contained within an input directory are written to your defined **output** directory path. The generated output will be reflective of your online store and in most cases you will add the output directory to your `.gitignore` file because it can always be rebuilt from input. If you are coming from the Shopify CLI, it is important to understand that flat structures are not possible in Syncify and all projects must adhere to **input** ➔ **output** architecture.

---

# Path Definitions

The `paths` option lets you customize your theme structure, resolved relative to the `input` directory. Syncify doesn’t enforce Shopify’s theme structure, freeing you to break from its constraints. Use this option to tailor your development theme layout. Each path key represents a theme directory or resource point, accepting a single string or an array of strings for glob patterns (via [anymatch](https://www.npmjs.com/package/anymatch)). Exceptions are `snippets` and `sections`, which also support [rename paths](/renaming-files/) for deeper sub-directory control.

> All paths will auto-resolve to the `input` directory defined, so you don't need to specify it in path definitions.

##### Default Defintions:

:: row ai-stretch dir-each mb-5
:: col-12 col-md fs-sm mb-3 mb-sm-0

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

::
:: px-0 col-auto ac-center stash-next d-none d-sm-unset

{% svg 'arrow-right', 'icon-output'%}

::
:: col-12 col-md-8

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    assets: 'assets/**',
    blocks: 'blocks/*.liquid',
    config: 'config/*.json',
    locales: 'locales/*.json',
    layout: 'layout/*.liquid',
    sections: 'sections/**/*.{liquid,json}',
    snippets: 'snippets/**/*.liquid',
    metaobject: 'templates/metaobject/*.{liquid,json}',
    customers: 'templates/customers/*.{liquid,json}',
    templates: 'templates/*.{liquid,json}',
    blogs: '+/blogs/**/*.{md,html}',
    files: '+/files/**',
    metafields: '+/meta/**/*.json',
    navigation: '+/menus/**/*.json',
    pages: '+/pages/*.{md,html}',
    policies: '+/policies/*.{md,html}',
    schema: '+/*.{schema,json}',
  }
})
```

::
::

---

# Root Definitions

Root definitions in Syncify allow developers to specify where files should be written during a pull operation, which imports files from an online store to a local project. This feature is particularly valuable for projects with custom or nested directory structures, where determining the correct write location for imported files can be complex. By defining explicit write paths for resource types like snippets or sections, root definitions ensure that pulled files are placed exactly where intended relative to `input` (source) which eliminates ambiguity and aligning with a project's structure.

<!--prettier-ignore-->
```js
export default defineConfig({
  input: 'source',
  paths: {
    snippets: {
      '[name]': 'snippets/**/*.liquid'
    },
    sections: {
      '[name]': 'sections/**',
      '[dir]-[name]': 'sections/product/*'
    },
    roots: {
      snippets: 'snippets/imports',    // Write pulls to source/snippets/imports
      sections: 'sections/imports'     // Write pulls to source/sections/imports
    }
  }
});
```

Assume we are executing a pull operation and

:: row dir-each my-5
:: col-5 fs-sm

#### Breakdown

The above command instructs Syncify to pull sections and snippets which are not currently present in your local workspace. The `--new` flag ensures that only unknown files are imported, whereas `-F` (or `--filter`) signals to only look in these directories.

```bash
sy pull --new -F sections -F snippets
```

#### Snippets

- carousel.liquid
- search.liquid
- button.liquid

::
:: col fs-sm

```treeview
/
├── source/
│   ├── sections/
│   │   ├── layout/
│   │   │   ├── footer.liquid
│   │   │   └── header.liquid
│   │   ├── carousel.liquid
│   │   └── split-image.liquid
│   └── snippets/
│       └── common/
│           ├── search.liquid
│           └── button.liquid
├── .env
├── package.json
└── syncify.config.ts
```

::
:: col

```treeview
/
├── source/
│   ├── sections/
│   │   ├── layout/
│   │   │   ├── footer.liquid
│   │   │   └── header.liquid
│   │   ├── carousel.liquid
│   │   └── split-image.liquid
│   └── snippets/
│       └── common/
│           ├── search.liquid
│           └── button.liquid
├── .env
├── package.json
└── syncify.config.ts
```

::
::

<!--prettier-ignore-->
```js
export default defineConfig({
  input: 'source',
  paths: {
    snippets: {
      '[name]': 'snippets/**/*.liquid'
    },
    sections: {
      '[name]': 'sections/**',
      '[dir]-[name]': 'sections/product/*'
    },
    roots: {
      snippets: 'snippets/imports',    // Write pulls to source/snippets/imports
      sections: 'sections/imports'     // Write pulls to source/sections/imports
    }
  }
});
```

The configuration code sample above ensures that snippets and sections imported from an online store are written to their respective `imports/` sub-directories, regardless of the store's structure or the complexity of the paths globs.

We don't need to pass `source` prefix to the paths because it is assumed. Roots make it possible to maintain a consistent and predictable project structure.

Syncify's flexibility enables developers to create tailored project structures, moving beyond the standard input-to-output workflow. In a simple, flat project, file placement during a pull is straightforward, with snippets written to snippets/, sections to sections/, and templates to templates/. Syncify can easily map these files based on their resource type. However, in projects with nested directories or intricate path patterns, this process becomes less predictable. Without clear guidance, Syncify may place files in unintended directories, disrupting the project's organization. Root definitions address this challenge by providing a predefined path for each resource type, ensuring pulled files are written correctly.

In most cases, root definitions are optional, as Syncify can often infer write locations using the paths configuration, which defines how files are read and mapped during operations like push or watch. However, for projects with complex setups, such as nested subdirectories or overlapping path globs, relying solely on paths may lead to errors or misplaced files. Root definitions act as a safeguard, offering an explicit instruction for where to write files during a pull, making them an essential tool for developers working with non-standard project structures.

### When to Use Root Definitions

Root definitions are particularly useful in scenarios where a project's structure introduces complexity. For instance, if a project uses nested directories and different resolution points, Syncify may not automatically know where to write pulled files without explicit guidance. Similarly, if the paths configuration includes broad or overlapping globs, such as `sections/**` the ambiguity can result in files being written to incorrect locations. By providing clear write paths, root definitions eliminate guesswork and ensure that the project remains organized.

To illustrate the practical impact, consider running the `sy-pull` command to import snippets and sections from an online store. Without root definitions, Syncify would rely on the paths globs to determine write locations, potentially placing snippets in `source/snippets/` and sections in `source/sections/`. If the globs are ambiguous, files might end up in unexpected directories, disrupting the workflow.

---

# Custom Structures

Sticking to the default structure isn’t ideal with Syncify. Instead, you’re encouraged to craft an input (theme) structure that fits your project, aligns with your workflow, and reflects your preferences. The `paths` option empowers you to define a tailored setup, giving you control over how your theme is organized. Below is a basic example of how to create a customized structure using `paths`, showcasing the flexibility to adapt the layout to your specific needs.

:: row ai-stretch dir-each my-5
:: col fs-sm

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
│   ├── views/
│   │   ├── customers/
│   │   ├── meta/
│   │   ├── sections/
│   │   │   ├── blocks/
│   │   │   └── schema/
│   │   ├── snippets/
│   │   └── templates/
│   └── theme.liquid
├── package.json
├── redirects.yaml
└── syncify.config.ts
```

::
:: px-0 col-auto ac-center

{% svg 'arrow-right', 'icon-output'%}

::
:: col-8

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  input: 'source',
  output: 'theme',
  paths: {
    assets: 'assets/**',
    config: 'data/config/*.json',
    locales: 'data/locales/*.json',
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

::
::

---

# Renaming Files

The `paths` option in Syncify lets developers customize output filenames for specific theme files. For sections and snippets, path references can optionally use an object rename value type. This rename object allows you to adjust filenames before they’re written to the output directory, enhancing control over the final structure. Consider a project where `snippets` and `sections` are organized into sub-directories.

Below are examples of **input** and **output** structures to demonstrate this. The **input** includes a `sections` directory with three sub-directories: blocks, product, layouts and a snippets directory with a cards sub-directory plus two unnested snippet files. The **output** illustrates the resulting structure when using the rename object feature to shape themes.

:: row mb-4 ai-center
:: col fill-papyrus

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

::
:: col-auto

{% svg 'arrow-right', 'icon-output'%}

::
:: col

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

::
::

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

# Write References

Stash references are write locations used in projects with custom structures and complex globs patterns. The **input** ➔ **output** approach of Syncify offers developers flexibility, but there are nuances when we execute [pull](/cli/sy-pull/) operations.

In a flat structure, file placement is predictable and intuitive: snippets land in the `snippets/` directory, sections in the `sections/` directory, and so on—there’s no room for ambiguity or deviation. With Syncify, however, the freedom to create custom nested theme structures introduces complexity. Mapping files to their intended locations becomes less straightforward, as the directory layout varies depending on the developers preferences.

### Usage

By default, Syncify will attempt to automatically pinpoint write destinates within your **input** (source) directories using pre-existing glob patterns provided in to configuration. In most cases, your path entries will be enough for Syncify to determine a valid write location, but if your project uses complex or file specific patterns, then it is recommended that you provide stash references.

##### Configuration `syncify.config.ts`

:: row mb-4 ac-center
:: col pr-0 stash-height

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
      { write: 0 }
    ],
    sections: [
      'path/sections/*',
      { write: 'temp' }
    ]
  }
});
```

::
:: col-auto pl-0 stash-header fs-sm stash-height

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

::
::

> Stash directories are designed to provide developers a grouping mechinsim for remote files obtained during [pull](/cli/sy-pull/) operations. We will wlak through a common use-case situation where you'll need stash references

### Real-world scenario

Let’s examine a real-world scenario requiring stash references. Imagine you need to integrate changes from a remote theme edited by multiple developers. You’re using Syncify with custom structures, while they use the Shopify CLI with basic, flat structures. Their setups are simple and beginner-level, lacking sub-directories, whereas your professional approach leverages tailored layouts. In this example, we use section [rename](/renaming-files/) path patterns. While this explicit, verbose mapping isn’t inherently flawed, it can create issues when collaborating with developers or syncing with flat-structure projects built via Shopify CLI.

:: row mb-4 ai-center
:: col

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

::
:: col-auto pt-5 stash-next

{% svg 'arrow-right', 'icon-output'%}

::
:: col

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

::
::

# TODO

---

# Structure Compatibility

The compatibility of themes developed with Syncify versus those built using the Shopify CLI hinges heavily on your chosen project structure, with differences rooted in the fundamental contrast between hierarchical and flat architectures. These structural disparities often render Syncify-developed themes incompatible with their Shopify CLI counterparts, creating a clear divide in workflow and output.

While Syncify offers the flexibility to generate a flat-structure theme if desired, this output is distinct from its source code, which remains hierarchically organized. The generated flat structure might resemble a Shopify CLI theme superficially, but the underlying development process and file management differ significantly. More critically, Syncify isn't designed merely as an alternative tool, it is built to fully replace the Shopify CLI for theme development. This intentional shift means Syncify handles all operations and tasks related to theme structures, from file organization to deployment all within its own ecosystem. As a result, it can seamlessly manage both hierarchical and flat outputs without relying on the Shopify CLI.

This replacement approach eliminates dependency on the Shopify CLI entirely, offering a self-contained solution for developers. For instance, tasks like theme previews, uploads, or asset management, which typically require Shopify CLI commands, are fully supported with Syncify.

---
