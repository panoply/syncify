import { defineConfig } from 'tsup';
import { build } from 'esbuild';

const noExternal = [
  'ansis',
  'clean-stack',
  'mergerino',
  'p-queue',
  'rambdax',
  'strip-json-comments',
  'tiny-spinner',
  'wrap-ansi',
  'log-update'
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

export default defineConfig(options => [
  {
    entry: [
      'src/cli.ts',
      'src/api.ts',
      'src/index.ts'
    ],
    clean: [
      'dist'
    ],
    splitting: true,
    treeshake: 'smallest',
    noExternal,
    external,
    esbuildOptions(options, context) {
      options.chunkNames = context.format
    },
    async onSuccess () {

      await build({
        entryPoints: [ 'src/hot/embed.ts' ],
        bundle: true,
        minify: true,
        format: 'iife',
        watch: options.watch === true,
        banner: { js: '<script>' },
        footer: { js: '</script>' },
        treeShaking: true,
        outfile: 'hot.js.liquid'
      });

    }
  }
]);
