import { defineConfig } from 'tsup';

const noExternal = [
  'ansis',
  'clean-stack',
  'mergerino',
  'p-queue',
  'rambdax',
  'strip-json-comments',
  'tiny-spinner',
  'wrap-ansi',
  'log-update',
  'boxen',
  'log-groups'
];

const external = [
  'anymatch',
  'axios',
  'bundle-require',
  'chokidar',
  'cross-spawn',
  'dotenv',
  'finalhandler',
  'fs-extra',
  'glob',
  'gray-matter',
  'html-minifier-terser',
  'markdown-it',
  'mime-types',
  'minimist',
  'node-notifier',
  'prompts',
  'serve-static',
  'turndown',
  'turndown-plugin-gfm',
  'ws',

  // DEV
  'ava',
  'eslint',
  'prettier',
  'tsup',
  'typefest',
  'typescript',

  // PEERS
  'esbuild',
  'postcss',
  'sass',
  'sharp',
  'svg-sprite',
  'svgo'
];

export default defineConfig([
  {
    entry: [
      './src/cli.ts',
      './src/api.ts',
      './src/index.ts'
    ],
    splitting: true,
    treeshake: 'smallest',
    clean: [ 'dist', '!dist/hot' ],
    noExternal,
    external
  }
]);
