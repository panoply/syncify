import { defineConfig } from 'tsup';
import { build } from 'esbuild';

const noExternal = [
  'ansis',
  'clean-stack',
  'mergerino',
  'log-update',
  'p-queue',
  'rambdax',
  'strip-json-comments',
  'tiny-spinner',
  'wrap-ansi'
];

const external = [
  'anymatch',
  'axios',
  'chokidar',
  'cross-spawn',
  'dotenv',
  'fast-glob',
  'finalhandler',
  'fs-extra',
  'gray-matter',
  'html-minifier-terser',
  'lz-string',
  'markdown-it',
  'mime-types',
  'minimist',
  'node-notifier',
  'prompts',
  'serve-static',
  'turndown',
  'turndown-plugin-gfm',
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

export default defineConfig(options => ([
  {
    entry: [
      'src/cli.ts',
      'src/api.ts',
      'src/index.ts'
    ],
    outDir: 'dist',
    clean: [
      'dist'
    ],
    splitting: true,
    treeshake: true,
    noExternal,
    external,
    esbuildOptions (options) {
      options.chunkNames = 'cjs';
    },
    async onSuccess () {

      await build({
        entryPoints: [ 'src/hot/snippet.ts' ],
        bundle: true,
        minify: false,
        format: 'iife',
        banner: { js: '<script>' },
        footer: { js: '</script>' },
        treeShaking: true,
        outfile: 'hot.js.liquid'
      });

    }
  }
]));
