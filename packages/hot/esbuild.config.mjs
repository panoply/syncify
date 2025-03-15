import { join } from 'path';

import * as esbuild from 'esbuild';
import fs from 'fs-extra';

const css = {
  entryPoints: [ './src/css/label.css' ],
  bundle: true,
  minify: true,
  sourcemap: false
};

const cwd = process.cwd();
const labelCSS = esbuild.buildSync({ ...css, write: false }).outputFiles[0].text.trim();
const pkg = fs.readJSONSync(join(cwd, 'package.json'));
const liquid = fs.readFileSync(join(cwd, 'template.liquid'))
.toString()
.replace('# inject@version', `# v${pkg.version}`) // Replace Version
.replace('# inject@label', `echo '${labelCSS}'`); // Replace label CSS

const js = {
  entryPoints: [ './src/index.ts' ],
  bundle: true,
  format: 'esm',
  minify: true,
  define: {
    VERSION: `"${pkg.version}"`
  }
};

const snippet = {
  ...js,
  banner: {
    js: `${liquid}\n<script id="syncify-hot-client">`
  },
  footer: {
    js: '</script>'
  }
};

await esbuild.build({ ...css, outfile: './dist/hot.css' });
await esbuild.build({ ...js, outfile: './dist/hot.js' });
await esbuild.build({ ...snippet, outfile: './dist/hot.js.liquid' });
await esbuild.build({ ...snippet, outfile: '../../hot.js.liquid' });
