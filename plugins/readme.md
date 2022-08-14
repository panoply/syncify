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
      <td>
      <a href="#">@syncify/plugin-icons</a>
      </td>
      <td>
      Extended features for working with SVG's. Inline icons using custom HTML tags and more!
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
export default function (options = {}) {

  return {
    name: 'hello-world',
    onInit(config) {

      this.log.info('onInit');
    },
    onBuild(file) {

      this.log.info('onBuild');
    },
    onWatch(wss) {

      this.log.info('onWatch');
    },
    onChange(file) {

      this.log.info('onChange');
    },
    onTransform(file, content) {

      this.log.info('onTransform');
    },
    onReload(dom) {

      this.log.info('onReload');
    }
  };
}
```
