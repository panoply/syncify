import { build } from 'esbuild';
import { writeFileSync } from ''

build({
  entryPoints: [ 'src/hot/embed.ts' ],
  write: false,
  format: 'iife',
  bundle: true

}).then(({ outputFiles: [ { text } ] }) => {



});
