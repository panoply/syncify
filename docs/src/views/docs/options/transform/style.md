---
title: 'Style Transform'
layout: base.liquid
permalink: '/options/transform/style/index.html'
anchors:
  - 'Style'
  - 'Supported Files'
  - 'Default Options'
---

# Style

The `style` transform option simplifies the process of bundling CSS, SCSS, or SASS by integrating compilers such as **Dart SASS**, **PostCSS**, and **Tailwind**. This feature offers developers a familiar configuration control, mirroring what you might set up manually, but with added ease.

# Options

{% include 'include/options', options: transforms.Style %}

---

# Example Usage

Passing an array of `style` configurations.

<!-- prettier-ignore -->
```js
import { defineConfig } from '@syncify/cli';

export default defineConfig({
  transform: {
    style: [
      {
        input: 'path/a.css',
        tailwind: true          // process with tailwind
      },
      {
        input: 'path/b.css',
        snippet: true,          // output as a snippet
        rename: 'x.liquid',     // rename the snippet
        sass: false,            // do not process with sass
        postcss: [
          plugin()              // use a postcss plugin
        ]
      },
      {
        input: 'path/c.scss',
        postcss: false,         // do not process with postcss
        sass: true,             // use processor defined settings
        watch: [
          'path/files/*'        // trigger rebuild if these files change
        ]
      }
    ]
  }
});
```

<!-- prettier-ignore -->
```ts
{
  input: string | string[];              // required!
  watch?: string[];                      // []
  rename?: string;                       // undefined
  snippet?: boolean;                     // false
  attrs?: Array<[ string, string ]>;     // []
  tailwind?: boolean | Tailwind;         // false unless tailwind is installed
  postcss?: boolean | PostCSS;           // true
  sass?: boolean | Sass;                 // false unless sass-dart is installed
}
```

<br>

<!-- prettier-ignore -->
```js
// Passing boolean true
// Process files with SASS, defaults to true when .scss extension
{ sass: true }

// Passing boolean false
// Defaults to false if sass is not installed
{ sass: false }

// Provide SASS options
{
  sass: {
    sourcemap: true,     // Whether or not to generate sourcemap files
    style: 'compressed', // SASS output style, also accepts: 'expanded'
    warnings: true,      // Whether or not to print warnings to CLI
    quietDeps: false,    // Disable warnings that are caused by dependencies.
    include: [
      'node_modules'     // A list of paths to include, defaults to node_modules
    ]
  }
}
```

```js
import { defineConfig } from '@syncify/cli'

export default defineConfig({
  transform: {
    style: {
      'assets/stylesheet.min.css': {
        input: 'styles/stylesheet.scss',
        watch: ['styles/sections/*'],
        postcss: true,
        sass: true
      },
      'snippets/css.liquid': {
        input: 'styles/vars.css.liquid',
        postcss: true,
        sass: true
      },
      'assets/bootstrap.min.scss': {
        input: 'styles/vendors/bootstrap.scss',
        style: 'expanded',
        includePaths: ['node_modules/bootstrap']
      }
    }
  }
})
// OPTION 1 - Rename with single input
{
  style: {
   'assets/stylesheet.css': 'path/to/file.scss', // write to assets dir and
   'snippets/style.liquid': 'path/to/foo.css' // write as snippet
  }
}
// OPTION 2 - Rename with multiple inputs
{
  style: {
   'assets/stylesheet.css': [
     'path/to/source/file-1.scss',
     'path/to/source/file-2.scss',
   ]
  }
}
// OPTION 3 - Rename with overrides
{
  style: {
   'assets/filename.min.css': {
      input: 'path/to/source/file.scss',
      includePaths: ['node_modules'],
      watch: []
   }
  }
}
// OPTION 4 - Single config
{
  style: {
    input: 'path/to/source/file.scss',
    rename: 'filename.min.css',
    postcss: [ plugin() ] // use some postcss plugin with this file
    sass: {
      includePaths: [
       'node_modules/bootstrap' // include this path
      ]
    }
  }
}
// OPTION 5 - Multiple configs
{
  style: [
   {
     input: 'path/to/source/file-1.css',
     snippet: true,
     rename: 'some-name.liquid',
     postcss: [ plugin() ], // use some plugin with this file
     sass: false // do not process with sass
   },
   {
     input: 'path/to/source/file-2.scss',
     postcss: false, // do not process with postcss
     sass: true, // use processor defined settings
     watch: [
      'path/to/files/*.scss'
     ]
   }
  ]
}
```
