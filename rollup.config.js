import { defineConfig as Rollup } from 'rollup';
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import noderesolve from '@rollup/plugin-node-resolve';
import beep from '@rollup/plugin-beep';
import del from 'rollup-plugin-delete';
import json from '@rollup/plugin-json';

export default Rollup(
  {
    input: 'src/index.ts',
    external: [
      'anymatch',
      'axios',
      'bluebird',
      'boxen',
      'chalk',
      'chokidar',
      'fancy-log',
      'fs-extra',
      'glob',
      'inquirer',
      'log-update',
      'minimist',
      'mkdirp'
    ],
    output: {
      format: 'cjs',
      file: 'package/index.js',
      sourcemap: 'hidden',
      preferConst: true,
      esModule: false,
      exports: 'default',
      chunkFileNames: '[name].js',
      plugins: process.env.prod ? [
        terser(
          {
            ecma: 2016,
            compress: {
              passes: 5
            }
          }
        )
      ] : []
    },
    plugins: [
      del(
        {
          verbose: true,
          runOnce: true,
          targets: 'package/*'
        }
      ),
      json(),
      ts(
        {
          check: false,
          useTsconfigDeclarationDir: true,
          typescript
        }
      ),
      noderesolve(
        {
          preferBuiltins: true,
          extensions: [
            '.ts',
            '.js'
          ]
        }
      ),
      commonjs(
        {
          requireReturnsDefault: 'namespace',
          extensions: [
            '.ts',
            '.js'
          ]
        }
      ),
      beep(),
      filesize(
        {
          showGzippedSize: false,
          showMinifiedSize: true
        }
      )
    ]

  }
);
