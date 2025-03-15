import type { AcquireOptions } from './types';
import type { BuildContext } from 'esbuild';

import fs from 'fs';
import { basename } from 'path';

import { build, BuildOptions, BuildResult, context } from 'esbuild';

import { REGEX_EXTJS, REGEX_NODE_MODULES } from './const';
import { AcquireError } from './error';
import { esbuildExternalPlugin, esbuildInjectionPlugin } from './plugins';
import { $tsconfig, tsconfigPaths } from './tsconfig';
import { $import, CJSorESM, outfile } from './utils';

export { $import, $require } from './utils';
export { $tsconfig };

export function acquire<T = any> (options: AcquireOptions): Promise<T> {

  options.preserve = 'preserve' in options ? options.preserve : false;
  options.tsconfig = 'tsconfig' in options ? options.tsconfig : 'tsconfig.json';

  return new Promise((resolve, reject) => {

    if (!REGEX_EXTJS.test(options.file)) {
      throw new AcquireError('Invalid javascript file', {
        type: 'file',
        error: null,
        entries: {
          file: options.file,
          details: 'The file extension must be: mjs, cjs, ts or js'
        }
      });
    }

    /* -------------------------------------------- */
    /* PRESETS                                      */
    /* -------------------------------------------- */

    const cwd = options.cwd || process.cwd();
    const onError = typeof options.onError === 'function';
    const onWarning = typeof options.onWarning === 'function';
    const onRebuild = typeof options.onRebuild === 'function';
    const format = CJSorESM(options.file, options.type);
    const name = typeof options.named === 'string' ? options.named : false;
    const tsconfig = options.tsconfig === false
      ? undefined
      : typeof options.tsconfig === 'string'
        ? $tsconfig(cwd, options.tsconfig as string)
        : { data: options.tsconfig, path: undefined };

    const esbuild: BuildOptions = {
      entryPoints: [ options.file ],
      absWorkingDir: cwd,
      format,
      platform: 'node',
      sourcemap: false,
      bundle: true,
      logLevel: 'silent',
      splitting: false,
      metafile: true,
      write: false,
      ...(tsconfig?.path)
        ? { tsconfig: tsconfig.path }
        : { tsconfigRaw: tsconfig?.data || {} },
      plugins: [
        esbuildExternalPlugin({
          external: options.external,
          externalNodeModules: options.externalNodeModules ?? !options.file.match(REGEX_NODE_MODULES),
          notExternal: [
            ...(options.noExternal || []),
            ...tsconfigPaths(tsconfig?.data?.compilerOptions?.paths || {})
          ]
        }),
        esbuildInjectionPlugin()
      ]
    };

    /* -------------------------------------------- */
    /* COMPILE                                      */
    /* -------------------------------------------- */

    return compile().catch(reject);

    /* -------------------------------------------- */
    /* FUNCTIONS                                    */
    /* -------------------------------------------- */

    /**
     * Compile
     *
     * Triggers esbuild build or content (depending on whether onRebuild) was called.
     */
    async function compile () {

      if (onRebuild) {

        esbuild.plugins.push({
          name: 'acquire:rebuild',
          setup (context) {
            let count = 0;
            context.onEnd(async result => {
              if (count++ === 0) {
                result.errors.length > 0
                  ? errors(result)
                  : resolve(await bundle(result));
              } else {
                result.errors.length > 0
                  ? errors(result)
                  : options.onRebuild(await bundle(result));
              }
            });
          }
        });

        const rebuild = await context(esbuild);

        await rebuild.watch();

        acquire.isWatching = true;
        acquire.modules.set(name || basename(options.file), rebuild);

      } else {

        const result = await build(esbuild);
        const handle = await bundle<T>(result);

        resolve(handle);

      }

    };

    /**
     * Remove generated bundle file
     */
    async function unlink (path: string) {

      if (!options.preserve) {

        await fs.promises.unlink(path); // Remove the outfile after executed

      }

    }

    /**
     * Bundle Errors
     *
     * Triggers `options.error` callback (if defined) and return `null` on resolution
     */
    function errors (result: BuildResult) {

      return onError ? options.onError(result.errors) : null;

    }

    /**
     * Bundle
     *
     * Processes the ESBuild result, writes temporary file, applies the correct
     * import resolution and reports on warnings or errors.
     *
     * Returns the module itself.
     */
    async function bundle <T> (result: BuildResult): Promise<T> {

      const output = outfile(options.file, format);

      if (!result.outputFiles) {

        await unlink(output);

        throw new AcquireError('No output files', {
          type: 'build',
          error: null,
          entries: {
            file: options.file,
            output,
            details: 'ESBuild executed the build but failed to return output'
          }
        });

      }

      const { text } = result.outputFiles[0];

      await fs.promises.writeFile(output, text, 'utf8');

      let $module: any;

      try {

        $module = await $import(output, { format });

      } finally {

        await unlink(output);

      }

      if (onWarning && result.warnings.length > 0) {
        options.onWarning(result.warnings);
      }

      return name
        ? name in $module ? $module[name] : $module.default || $module
        : $module.default || $module;

    };

  });
};

acquire.modules = new Map<string, BuildContext>();
acquire.isWatching = true;

/**
 * Acquire Cancel
 *
 * Applies build cancellation in rebuild context
 */
acquire.cancel = function (name: string) {

  if (acquire.modules.has(name)) {
    return acquire.modules.get(name).cancel();
  }

};

/**
 * Acquire Disposal
 *
 * Applies disposal of a rebuild context.
 */
acquire.dispose = function (name: string) {

  if (acquire.modules.has(name)) {
    return acquire.modules.get(name).dispose();
  }

};
