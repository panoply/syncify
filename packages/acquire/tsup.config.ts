import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: [ 'src/index.ts' ],
    target: 'node20',
    platform: 'node',
    treeshake: true,
    clean: true,
    bundle: true,
    dts: true,
    external: [
      'esbuild',
      '@parcel/watcher'
    ]
  }
]);
