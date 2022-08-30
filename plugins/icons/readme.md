# @syncify/plugin-icons

### Install

```bash
pnpm add @syncify/plugin-icons -D
```

### Usage

<!--prettier-ignore-->
```js
import icons from '@syncify/plugin-icons';

export default {
  transforms: {
    svg: {
      input: '...',
    }
  },
  plugins: [
    icons(
      {
        tagName: 'icon';
        tagVoid: true,
        vscodeCustomData: true
      }
    )
  ]
};
```
