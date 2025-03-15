import type { Plugin } from 'esbuild';

import fs from 'fs';
import { dirname, extname, isAbsolute, resolve } from 'path';
import { pathToFileURL } from 'url';

import { REGEX_EXTJS, REGEX_FILTER, REGEX_NODE_MODULES, VAR_DIRNAME, VAR_FILENAME, VAR_IMPORT_META } from './const';
import { inferLoader, match } from './utils';

/**
 * Marker node_modules as external ESBuild Plugin
 */
export function esbuildExternalPlugin (options: {
  /**
   * External Matches
   */
  external?: (string | RegExp)[];
  /**
   * Non-External Matches
   */
  notExternal?: (string | RegExp)[];
  /**
   * Match external node_modules
   *
   * @default true
   */
  externalNodeModules?: boolean;

}): Plugin {

  const { external, externalNodeModules, notExternal } = Object.assign({
    external: undefined,
    externalNodeModules: true,
    notExternal: undefined
  }, options);

  return {
    name: 'acquire:external',
    setup (context) {

      context.onResolve({ filter: REGEX_FILTER }, async (args) => {

        if (match(args.path, external)) return { external: true };
        if (match(args.path, notExternal)) return; // Resolve with esbuild

        const DOT = args.path[0] === '.';

        if (externalNodeModules && args.path.match(REGEX_NODE_MODULES)) {

          const resolved = DOT ? resolve(args.resolveDir, args.path) : args.path;
          const path = pathToFileURL(resolved).toString();

          return { path, external: true };

        }

        if (DOT || isAbsolute(args.path)) return; // Fallback to default

        return { external: true }; // Importing from node_modules, mark external

      });
    }
  };
};

/**
 * Injection Scopes ESBuild Plugin
 */
export function esbuildInjectionPlugin (): Plugin {

  return {
    name: 'acquire:injection',
    setup (context) {

      context.initialOptions.define = { ...context.initialOptions.define };
      context.initialOptions.define.__dirname = VAR_DIRNAME;
      context.initialOptions.define.__filename = VAR_FILENAME;
      context.initialOptions.define['import.meta.url'] = VAR_IMPORT_META;
      context.onLoad({ filter: REGEX_EXTJS }, async (args) => {

        const loader = inferLoader(extname(args.path));
        const file = await fs.promises.readFile(args.path, 'utf8');
        const contents = [
          `const ${VAR_FILENAME} = ${JSON.stringify(args.path)};`,
          `const ${VAR_DIRNAME} = ${JSON.stringify(dirname(args.path))};`,
          `const ${VAR_IMPORT_META} = ${JSON.stringify(pathToFileURL(args.path).href)};`,
          '/* ACQUIRE TRANSFORM INJECTION */',
          file
        ].join('\n');

        return {
          contents,
          loader
        };

      });
    }
  };
};
