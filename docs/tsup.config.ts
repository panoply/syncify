import { defineConfig } from 'tsup';

export default defineConfig(
  {
    entry: {
      'bundle.min': './src/app/bundle.ts'
    },
    outDir: './public',
    outExtension: () => ({ js: '.js' }),
    clean: false,
    treeshake: false,
    splitting: false,
    silent: true,
    minify: true,
    target: 'es2017',
    platform: 'browser',
    format: [
      'iife'
    ]
  }
);
