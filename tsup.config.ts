import { defineConfig } from 'tsup';

export default defineConfig(
  {
    entry: [
      './src/cli.ts',
      './src/api.ts',
      './src/index.ts'
    ],
    splitting: true,
    clean: true,
    noExternal: [
      '@web/config-loader',
      'ansis',
      'clean-stack',
      'mergerino',
      'p-queue',
      'rambdax',
      'strip-json-comments',
      'tiny-spinner',
      'wrap-ansi'
    ],
    external: [
      'anymatch',
      'axios',
      'prompts',
      'bundle-require',
      'chokidar',
      'cross-spawn',
      'dotenv',
      'finalhandler',
      'fs-extra',
      'glob',
      'gray-matter',
      'html-minifier-terser',
      'joycon',
      'markdown-it',
      'mime-types',
      'minimist',
      'node-notifier',
      'serve-static',
      'turndown',
      'turndown-plugin-gfm',
      'ws',
      // PEERS
      'postcss',
      'sass',
      'sharp',
      'svg-sprite',
      'svgo'
    ]
  }
);
