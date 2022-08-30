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
      <td>
        <a href="#">@syncify/plugin-icons</a>
      </td>
      <td>
        Extended features for working with SVG's. Inline icons using custom HTML tags and more!
      </td>
    </tr>
    <tr>
      <td>
        <a href="#">@syncify/obfuscss</a>
      </td>
      <td>
        Obfuscate CSS class names in stylesheets and views across your project
      </td>
    </tr>
  </tbody>
</table>

### Creating plugins

Syncify has a low level API for building plugins that is very loosely based on the approach introduced by Rollup. You should take a peek at the [plugin-sample](#) to get a better idea of how Syncify plugins work.

### Example

Each hook method fires a different points in the bundle process.

<!--prettier-ignore-->
```js
export default function plugin (options = {}) {

  return {
    name: 'plugin-name',
    onInit(config) {},
    onBuild(file) {},
    onWatch(wss) {},
    onChange(file) {},
    onTransform(file, content) {},
    onReload(dom) {}
  };

}
```
