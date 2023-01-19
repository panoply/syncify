# Syncify Plugins

Official plugins for the Shopify theme development tool [Syncify](#).

# Plugins

<table>
  <thead>
    <tr>
      <th align="left" width="200px">&nbsp;&nbsp;Plugin</th>
      <th align="left" width="800px">&nbsp;&nbsp;Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#">@syncify/plugin-terser</a></td>
      <td>Liquid and HTML minification support using Terser</td>
    </tr>
    <tr>
      <td><a href="#">@syncify/plugin-sass</a></td>
      <td>SASS transpilation support with extended support for generating snippets</td>
    </tr>
     <tr>
      <td><a href="#">@syncify/plugin-postcss</a></td>
      <td>PostCSS support from processing CSS</td>
    </tr>
    <tr>
      <td><a href="#">@syncify/plugin-purgecss</a></td>
      <td>PurgeCSS support for removing unused CSS classes</td>
    </tr>
    <tr>
      <td><a href="#">@syncify/plugin-obfucss</a></td>
      <td>Obfuscate CSS class names in stylesheets and views across your project</td>
    </tr>
    <tr>
      <td><a href="#">@syncify/plugin-tsup</a></td>
      <td>Bundle scripts with TSUP and ESBuild</td>
    </tr>
    <tr>
      <td><a href="#">@syncify/plugin-svgo</a></td>
      <td>Process SVG files with SVGO</td>
    </tr>
    <tr>
      <td><a href="#">@syncify/plugin-schema</a></td>
      <td>Expansion plugin for working with schema tag blocks</td>
    </tr>
    <tr>
      <td><a href="#">@syncify/plugin-sprite</a></td>
      <td>Produce SVG sprites, inline icons with custom HTML tags and more!</td>
    </tr>
    <tr>
      <td><a href="#">@syncify/plugin-sharp</a></td>
      <td>Image processing capabilities using Sharp.</td>
    </tr>
    <tr>
      <td><a href="#">@syncify/plugin-mjml</a></td>
      <td>Email design support using MJML</td>
    </tr>
  </tbody>
</table>

### Creating plugins

Syncify has a low level API for building plugins that is very loosely based on the approach introduced by Rollup. Plugins require use of the [@syncify/plugin](#) module which exposes several essential methods for integrating into the build cycle gracefully.

### Example

Each hook method fires a different points in the bundle process.

<!--prettier-ignore-->
```typescript
import { fileSize, ansi, timer, client } from '@syncify/plugin'

export function plugin (options = {}) {

  return {
    name: 'plugin-name',
    flags: [],
    onInit(config) {},
    onBuild(file) {},
    onWatch(wss) {},
    onChange(file) {},
    onTransform(file, content) {},
    onReload(dom) {}
  };

}
```

### Scope

Each plugin hook exposes access to the build scope and allows.

<!--prettier-ignore-->
```typescript

onChange() {

  // Logger
  this.log.warn('')
  this.log.error(string)
  this.log.process(string)
  this.log.transform(string)
  this.log.minified(...string[])

  // Bundle
  this.bundle

}
```
