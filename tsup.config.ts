import type { Plugin } from 'esbuild';
import type { Options } from 'tsup';

import { readFileSync, writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

import gqlmin from 'gqlmin';
import { defineConfig } from 'tsup';

import * as pkg from './package.json';
import * as cfg from './packages/config/package.json';
import * as hot from './packages/hot/package.json';

const cwd = process.cwd();
const packages = join(cwd, 'packages');
const json = JSON.stringify;

const schema = () => {

  const liquifySchema = join(cwd, 'node_modules', '@liquify/schema');
  const syncifySchema = join(packages, 'schema');

  const sections = readFileSync(join(liquifySchema, 'syncify/shared-schema.json'));
  const pkgjson = readFileSync(join(liquifySchema, 'syncify/package-json.json'));

  const config = readFileSync(join(liquifySchema, 'syncify.json'));

  writeFileSync(join(syncifySchema, 'syncify.json'), pkgjson);
  writeFileSync(join(syncifySchema, 'config.json'), config);
  writeFileSync(join(syncifySchema, 'sections.json'), sections);

};

const gqlfile = (): Plugin => ({
  name: 'gql-loader',
  setup (build) {
    build.onLoad({ filter: /\.gql$/ }, async ({ path }) => {
      const source = await readFile(path, 'utf8');
      return {
        contents: `export default \`${gqlmin(source)}\`;`,
        loader: 'ts'
      };
    });
  }
});

const gql = (): Plugin => ({
  name: 'gql-minify-plugin',
  setup (build) {
    build.onLoad({ filter: /\.tsx?$/ }, async (args) => {

      const contents = await readFile(args.path, 'utf8');
      const regex = /gql`([\s\S]*?)`/g;

      let lastIndex = 0;
      let newContent = '';
      let match: RegExpExecArray | null;

      while ((match = regex.exec(contents)) !== null) {

        // Append content before the match
        newContent += contents.slice(lastIndex, match.index);

        // Minify the GraphQL query
        const minify = gqlmin(match[1].trim());
        newContent += `\`${minify}\``;
        lastIndex = regex.lastIndex;
      }

      // Append any remaining content after the last match
      newContent += contents.slice(lastIndex);

      return {
        contents: newContent,
        loader: 'ts' // Changed to 'ts' for TypeScript files
      };
    });
  }
});

const glue = (...input: string[]) => {
  return input.join('\n') + '\n';
};

schema();

const noExternal = [

  // SYNCIFY PACKAGES
  //
  // Development dependencies included in build
  //
  '@syncify/ansi',
  '@syncify/codeframe',
  '@syncify/kill',
  '@syncify/update',
  '@syncify/config',
  '@syncify/types',
  '@syncify/glue',

  // THIRD PARTIES
  //
  // Development Dependencies - Typically due to their minimal size or ESM distribution
  //
  'anymatch',
  'dotenv',
  'p-map',
  'p-queue',
  'tree-kill',
  'write-file-atomic',
  'write-package'
];

const external = [

  // SYNCIFY PACKAGES
  //
  // Required as dependencies
  //
  '@syncify/acquire',
  '@syncify/json',
  '@syncify/turndown',
  '@syncify/uws',

  // THIRD PARTIES
  //
  // Required as dependencies
  //
  '@parcel/watcher',
  'xior',
  'cbor',
  'enquirer',
  'esbuild',
  'fast-glob',
  'fs-extra',
  'gray-matter',
  'html-minifier-terser',
  'node-notifier',
  'write-package',

  // TRANSFORM SPECIFIC
  //
  // Included as dependencies and will be dynamically imported
  //
  'adm-zip',
  'clean-css',
  'sass-embedded',
  'markdown-it',
  'postcss',
  'svgo',
  'js-yaml',
  'smol-toml',
  '@tailwindcss/postcss',

  // PEER TRANSFORM SPECIFIC
  //
  // Included as optional peers and lazy imported
  //
  'tailwindcss'

];

const define = {
  // SYNCIFY VERSION
  VERSION: `"${pkg.version}"`,
  // CONFIG VERSION
  CONFIG_VERSION: `"${cfg.version}"`,
  // HOT VERSION
  HOT_VERSION: `"${hot.version}"`,
  // CHARACTER SUGAR INJECTIONS
  NIL: json(''),
  NWL: json('\n'),
  NLR: json('\n\n'),
  WSP: json(' '),
  WSR: json('  ')
};

const banner =
`
/**
 * SYNCIFY CLI ~ v${pkg.version}
 *
 * E: n.savvidis@gmx.com
 * X: @niksavvidis
 * W: https://syncify.sh
 *
 * © 2025 Νικολας Σαββιδης / Nik Savvidis
 *
 * -----------------------------------------
 *
 * APACHE 2.0 LICENSE
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS LICENSE MUST BE PRESENT IN ALL COPIES
 */`;

export const options: Options = {
  entry: [
    './syncify/cli.ts',
    './syncify/index.ts',
    './syncify/api.ts'
  ],
  dts: {
    entry: {
      index: './packages/types/index.d.ts'
    },
    resolve: true,
    banner: glue(
      '/// <reference path="../node_modules/@types/clean-css/index.d.ts" />',
      '/// <reference path="../node_modules/svgo/lib/svgo.d.ts" />',
      '/// <reference path="../node_modules/postcss/lib/postcss.d.ts" />',
      '/// <reference path="../node_modules/tailwindcss/types/index.d.ts" />',
      '/// <reference path="../node_modules/esbuild/lib/main.d.ts" />',
      '/// <reference path="../node_modules/type-fest/index.d.ts" />'
    )
  },
  outDir: 'dist',
  banner: {
    js: banner
  },
  watch: [
    './syncify/**/*',
    './packages/acquire/package/*',
    './packages/ansi/dist/*',
    './packages/codeframe/dist/*',
    './packages/config/dist/*',
    './packages/json/dist/*',
    './packages/kill/dist/*',
    './packages/update/dist/*'
  ],
  clean: true,
  shims: false,
  target: 'es2020',
  platform: 'node',
  cjsInterop: false,
  treeshake: true,
  removeNodeProtocol: false,
  sourcemap: false,
  splitting: true,
  outExtension: () => ({ js: '.js' }),
  noExternal,
  external,
  define,
  keepNames: false,
  format: 'cjs',
  esbuildPlugins: [
    gql(),
    gqlfile()
  ],
  esbuildOptions (options) {
    options.target = 'es2020';
    options.treeShaking = true;
    options.chunkNames = 'syncify';
    options.legalComments = 'none';
    options.supported = {
      'async-await': true,
      'dynamic-import': true,
      'array-spread': true,
      'rest-argument': true,
      'optional-chain': false,
      'unicode-escapes': false,
      'template-literal': true,
      'const-and-let': true,
      'class-field': true,
      'class-private-accessor': false,
      'class-private-brand-check': false,
      'class-private-field': false,
      'class-private-method': false,
      'class-private-static-accessor': false,
      'class-private-static-field': false,
      'class-private-static-method': false,
      'class-static-blocks': true,
      'class-static-field': true
    };
  }
};

export default defineConfig(options);
