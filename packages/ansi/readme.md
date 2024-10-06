# @syncify/ansi

Terminal utilities for the [Syncify CLI](https://syncify.sh) Shopify theme development tool. This module provides CLI enhancements, helpers and various other TUI logic which are used in console logging and reporting for Syncify.

### Installation

```bash
$ pnpm add @syncify/ansi -D
```

# Colors

Terminal colors are exposed and made available using [Ansis](https://github.com/webdiscus/ansis). There are custom colors and raw access to `Ansis` is available.

### Standard Colors

![](https://img.shields.io/static/v1?label=&message=red&color=CA1A01)
![](https://img.shields.io/static/v1?label=&message=cyan&color=cyan)
![](https://img.shields.io/static/v1?label=&message=green&color=00C202)
![](https://img.shields.io/static/v1?label=&message=yellow&color=C8C400)
![](https://img.shields.io/static/v1?label=&message=magenta&color=CA30C7)
![](https://img.shields.io/static/v1?label=&message=blue&color=blue)
![](https://img.shields.io/static/v1?label=&message=white&color=white)
![](https://img.shields.io/static/v1?label=&message=gray&color=gray)
![](https://img.shields.io/static/v1?label=&message=dim&color=686A6E)

### Bright Colors

![](https://img.shields.io/static/v1?label=&message=redBright&color=F34634)
![](https://img.shields.io/static/v1?label=&message=cyanBright&color=60FDFF)
![](https://img.shields.io/static/v1?label=&message=greenBright&color=5EFA68)
![](https://img.shields.io/static/v1?label=&message=yellowBright&color=fffc67)
![](https://img.shields.io/static/v1?label=&message=magentaBright&color=FF77FF)
![](https://img.shields.io/static/v1?label=&message=whiteBright&color=ffffff)

### Custom Colors

![](https://img.shields.io/static/v1?label=&message=brown&color=c19a6b)
![](https://img.shields.io/static/v1?label=&message=pink&color=ff75d1)
![](https://img.shields.io/static/v1?label=&message=teal&color=91EBC2)
![](https://img.shields.io/static/v1?label=&message=lightGray&color=2a2a2e)
![](https://img.shields.io/static/v1?label=&message=orange&color=FFAB40)
![](https://img.shields.io/static/v1?label=&message=lavender&color=8080FF)
![](https://img.shields.io/static/v1?label=&message=neonGreen&color=56ef83)
![](https://img.shields.io/static/v1?label=&message=neonCyan&color=69d5fd)
![](https://img.shields.io/static/v1?label=&message=neonRouge&color=FF8095)
![](https://img.shields.io/static/v1?label=&message=neonMagenta&color=7b68ee)

# Symbols

There are various symbols (characters) available as named exports. Symbols in the CLI are color wrapped and injected into strings when composing logs and messaged etc.

### Character Helpers

Character are `const` exports, they are output in `darkGray` by default.

```
|        PIP
#        HSH
+        PLS
-        MIN
,        COM
✓        CHK
𐄂        BAD
:        COL
→        ARR
▸        CHV
⥂        ARL
~        TLD
—        DSH
```

### Infix Wrappers

Infix wrappers are `const` exports, they are output in `darkGray` by default.

```
(        LPR
)        RPR
{        LCB
}        RCB
[        LSB
]        RSB
<        LAN
>        RAN
```

### Tree Characters

Tree characters available on the `Tree` named export and are output in `darkGray` by default. Characters are also available in `red` and `yellow` colors.

```
┌─       Tree.open
├        Tree.stub
├─       Tree.dash
│        Tree.line
└─       Tree.base

\n│      Tree.next
│\n      Tree.after

\n│\n    Tree.wrap

├──┐     Tree.indent.fall
│  │     Tree.indent.line
│  ├     Tree.indent.stub
│  ├─    Tree.indent.dash
│  └─    Tree.indent.base

├──┬─    Tree.indent.edge
```

# Progress

Progress bar utility is available on the `progress` named export. This function returns an instance with methods.

```bash
▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱ 50%
```

### Usage

<!-- prettier-ignore-->
```js
import { progress } from '@syncify/ansi';

const loading = progress(25, {
  showPercentage: true,
  barColor: 'neonGreen',
  percentColor: 'whiteBright',
  barSize: 40,
  clearOnComplete: false
});

loading.increment(1);  // Increment progress
loading.decrement(1);  // Decrement progress
loading.render()       // Render the progress bar, returns string
loading.stop()         // Stop progress
loading.percent        // Returns loading percentage
```

# Size

The module also exposes a helper utility for obtaining the developers terminal size and will return some information about the terminal dimensions.

```js
import { size } from '@syncify/ansi';

const { wrap, cols, row } = size();
```
