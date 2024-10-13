import { defineConfig } from 'tsup';
import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import * as pkg from './package.json';

const cwd = process.cwd();
const packages = join(cwd, 'packages');

function importSchema () {

  const liquifySchema = join(cwd, 'node_modules', '@liquify/schema');
  const syncifySchema = join(packages, 'schema');

  const sections = readFileSync(join(liquifySchema, 'syncify/shared-schema.json'));
  const pkgjson = readFileSync(join(liquifySchema, 'syncify/package-json.json'));

  const config = readFileSync(join(liquifySchema, 'syncify.json'));

  writeFileSync(join(syncifySchema, 'syncify.json'), pkgjson);
  writeFileSync(join(syncifySchema, 'config.json'), config);
  writeFileSync(join(syncifySchema, 'sections.json'), sections);

}

importSchema();

const json = JSON.stringify;

const noExternal = [

  // HOT Related
  'chrome-launcher',

  '@syncify/ansi',

  // Others
  'anymatch',
  'p-map',
  'p-queue',
  'parse-json',
  'rambdax',
  'strip-json-comments',
  'tree-kill',
  'write-file-atomic'

];

const external = [

  // Syncify Specific
  '@syncify/turndown',
  '@syncify/uws',

  // HOT Related
  'chrome-remote-interface',

  // Third parties
  'adm-zip',
  'axios',
  'cbor',
  'chokidar',
  'clean-css',
  'dotenv',
  'enquirer',
  'esbuild',
  'fast-glob',
  'figlet',
  'form-data',
  'fs-extra',
  'gray-matter',
  'html-minifier-terser',
  'markdown-it',
  'ngrok',
  'node-notifier',
  'postcss',
  'scrollable-cli',
  'svg-sprite',
  'svgo',

  // BUILD DEPS
  'eslint',
  'prettier',
  'tsconfig-type',
  'tsup',
  'type-fest',
  'typescript',

  // PEER DEPS
  'sass',
  'sharp',
  'tailwindcss'
];

const define = {

  // SYNCIFY VERSION

  VERSION: `"${pkg.version}"`,

  // CHARACTER SUGAR INJECTIONS

  NIL: json(''),
  NWL: json('\n'),
  NLR: json('\n\n'),
  WSP: json(' '),
  WSR: json('  ')

};

export default defineConfig({
  entry: [
    'syncify/cli.ts',
    'syncify/api.ts',
    'syncify/index.ts'
  ],
  outDir: 'dist',
  clean: [
    'dist'
  ],
  splitting: false,
  treeshake: false,
  cjsInterop: true,
  format: [
    'cjs',
    'esm'
  ],
  shims: true,
  noExternal,
  external,
  define,
  esbuildOptions (options) {
    options.mainFields = [ 'module', 'main' ];
    options.chunkNames = 'syncify';
  }
});
