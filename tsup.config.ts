import { defineConfig } from 'tsup';
import { join } from 'path';
import { writeFileSync, readFileSync, copyFileSync } from 'fs';
import * as pkg from '../package.json';

const cwd = process.cwd();
const packages = join(cwd, 'packages');

function importSchema () {

  const liquifySchema = join(cwd, 'node_modules', '@liquify/schema');
  const syncifySchema = join(packages, 'schema');

  const sections = readFileSync(join(liquifySchema, 'syncify/shared-schema.json'));
  const env = readFileSync(join(liquifySchema, 'syncify/env.json'));
  const pkgjson = readFileSync(join(liquifySchema, 'syncify/package-json.json'));

  const config = readFileSync(join(liquifySchema, 'syncify.json'));
  writeFileSync(join(syncifySchema, 'syncify.json'), pkgjson);
  writeFileSync(join(syncifySchema, 'config.json'), config);
  writeFileSync(join(syncifySchema, 'sections.json'), sections);
  writeFileSync(join(syncifySchema, 'env.json'), env);

  copyFileSync(join(packages, 'hot', 'hot.js.liquid'), join(cwd, 'hot.js.liquid'));

}

importSchema();

const json = JSON.stringify;

const noExternal = [
  'ansis',
  'clean-stack',
  'lines-and-columns',
  'mergerino',
  'log-update',
  'p-queue',
  'p-map',
  'parse-json',
  'rambdax',
  'strip-json-comments',
  'wrap-ansi',
  'scrollable-cli'
];

const external = [
  '@syncify/turndown',
  'anymatch',
  'adm-zip',
  'axios',
  'cbor',
  'write-file-atomic',
  'pathe',
  'chokidar',
  'cross-spawn',
  'dotenv',
  'fast-glob',
  'figlet',
  'finalhandler',
  'fs-extra',
  'gray-matter',
  'html-minifier-terser',
  'lz-string',
  'markdown-it',
  'mime-types',
  'minimist',
  'node-notifier',
  'ngrok',
  'prompts',
  'serve-static',
  'ws',

  // BUILD DEPS
  'ava',
  'eslint',
  'prettier',
  'tsup',
  'typefest',
  'tsconfig-type',
  'typescript',

  // PEER DEPS
  'esbuild',
  'postcss',
  'sass',
  'sharp',
  'svgstore',
  'svgo'
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
  treeshake: true,
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
    options.treeShaking = true;
  }
});
