// @ts-expect-error
import { loadTsConfig } from 'load-tsconfig';
import { readFile, unlink, writeFile } from 'fs-extra';
import { isAbsolute, dirname, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build, BuildOptions, BuildFailure, BuildResult, Plugin as EsbuildPlugin } from 'esbuild';
import { inferLoader, dynamicImport, uuid } from './utils';
import { keys } from './native';
import { bundle } from '~config';
import { DIRNAME_VAR_NAME, FILENAME_VAR_NAME, IMPORT_META_URL_VAR_NAME, REGEX_EXTJS } from '~const';

/**
 * Use a random path to avoid import cache
 */
function defaultGetOutputFile (filepath: string, format: 'esm' | 'cjs'): string {

  return filepath.replace(REGEX_EXTJS, `.bundled_${uuid()}.${format === 'esm' ? 'mjs' : 'cjs'}`);

}

/**
 * CommonJS or ESM module
 */
function isCommonJSorESM (inputFile: string): 'esm' | 'cjs' {

  // @ts-expect-error
  if (typeof jest === 'undefined') return 'cjs';

  const ext = extname(inputFile);

  if (ext === '.js') {
    return bundle.pkg.type === 'module' ? 'esm' : 'cjs';
  } else if (ext === '.ts') {
    return 'esm';
  } else if (ext === '.mjs') {
    return 'esm';
  }

  return 'cjs';

}

function tsconfigPathsToRegExp (paths: Record<string, any>) {

  return keys(paths || {}).map((key) => new RegExp(`^${key.replace(/\*/, '.*')}$`));

};

function match (id: string, patterns?: (string | RegExp)[]) {

  if (!patterns) return false;

  return patterns.some((p) => {
    if (p instanceof RegExp) return p.test(id);
    return id === p || id.startsWith(p + '/');
  });

};

/**
 * An esbuild plugin to mark node_modules as external
 */
export function externalPlugin ({
  external,
  notExternal
}: {
  external?: (string | RegExp)[]
  notExternal?: (string | RegExp)[]
} = {}): EsbuildPlugin {

  return {
    name: 'bundle-require:external',
    setup ({ onResolve }) {

      onResolve({ filter: /.*/ }, async (args) => {

        // Fallback to default
        if (args.path.charCodeAt(0) === 46 || isAbsolute(args.path)) return;

        if (match(args.path, external)) return { external: true };

        // Should be resolved by esbuild
        if (match(args.path, notExternal)) return;

        // Most like importing from node_modules, mark external
        return { external: true };

      });
    }
  };
};

export function injectFileScopePlugin (): EsbuildPlugin {
  return {
    name: 'bundle-require:inject-file-scope',
    setup (ctx) {

      ctx.initialOptions.define = {
        ...ctx.initialOptions.define,
        __dirname: DIRNAME_VAR_NAME,
        __filename: FILENAME_VAR_NAME,
        'import.meta.url': IMPORT_META_URL_VAR_NAME
      };

      ctx.onLoad({ filter: REGEX_EXTJS }, async (args) => {

        const contents = await readFile(args.path, 'utf-8');

        const injectLines = [
          `const ${FILENAME_VAR_NAME} = ${JSON.stringify(args.path)};`,
          `const ${DIRNAME_VAR_NAME} = ${JSON.stringify(dirname(args.path))};`,
          `const ${IMPORT_META_URL_VAR_NAME} = ${JSON.stringify(pathToFileURL(args.path).href)};`
        ];

        return {
          contents: injectLines.join('') + contents,
          loader: inferLoader(extname(args.path))
        };
      });
    }
  };
};

export async function bundleRequire<T = any> (
  options: {
    cwd?: string
    /**
     * The filepath to bundle and require
     */
    filepath: string
    /**
     * The `require` function that is used to load the output file
     * Default to the global `require` function
     * This function can be asynchronous, i.e. returns a Promise
     */
    require?: (
      outfile: string,
      ctx: { format: 'cjs' | 'esm' },
    ) => any
    /**
     * esbuild options
     */
    esbuildOptions?: BuildOptions
    /**
     * Get the path to the output file
     * By default we simply replace the extension with `.bundled_{randomId}.js`
     */
    getOutputFile?: (filepath: string, format: 'esm' | 'cjs') => string
    /**
     * Enable watching and call the callback after each rebuild
     */
    onRebuild?: (ctx: {
      err?: BuildFailure
      mod?: any
      dependencies?: string[]
    }) => void

    /** External packages */
    external?: (string | RegExp)[]

    /** A custom tsconfig path to read `paths` option */
    tsconfig?: string

    /**
     * Preserve compiled temporary file for debugging
     * Default to `process.env.BUNDLE_REQUIRE_PRESERVE`
     */
    preserveTemporaryFile?: boolean

    /**
     * Provide bundle format explicitly
     * to skip the default format inference
     */
    format?: 'cjs' | 'esm'
  }
): Promise<{ mod: T; dependencies: string[] }> {

  if (!REGEX_EXTJS.test(options.filepath)) throw new Error(`${options.filepath} is not a valid JS file`);

  const preserveTemporaryFile = options.preserveTemporaryFile ?? !!process.env.BUNDLE_REQUIRE_PRESERVE;
  const cwd = options.cwd || process.cwd();
  const format = options.format ?? isCommonJSorESM(options.filepath);
  const tsc = loadTsConfig(cwd, options.tsconfig);
  const resolvePaths = tsconfigPathsToRegExp(tsc?.data.compilerOptions?.paths || {});

  async function extractResult (result: BuildResult) {

    if (!result.outputFiles) throw new Error('[bundle-require] no output files');

    const { text } = result.outputFiles[0];
    const getOutputFile = options.getOutputFile || defaultGetOutputFile;
    const outfile = getOutputFile(options.filepath, format);

    await writeFile(outfile, text, 'utf8');

    let mod: any;

    const req: (
      outfile: string,
      ctx: { format: 'cjs' | 'esm' },
    ) => any = options.require || dynamicImport;

    try {

      mod = await req(format === 'esm' ? pathToFileURL(outfile).href : outfile, { format });

    } finally {

      // Remove the outfile after executed
      if (!preserveTemporaryFile) await unlink(outfile);

    }

    return {
      mod,
      dependencies: result.metafile ? keys(result.metafile.inputs) : []
    };

  };

  const ctx = await build({
    ...options.esbuildOptions,
    entryPoints: [ options.filepath ],
    absWorkingDir: cwd,
    outfile: 'out.js',
    format,
    write: false,
    platform: 'node',
    sourcemap: 'inline',
    bundle: true,
    metafile: true,
    plugins: [
      ...(options.esbuildOptions?.plugins || []),
      externalPlugin({
        external: options.external,
        notExternal: resolvePaths
      }),
      injectFileScopePlugin()
    ]
  });

  const extract = await extractResult(ctx);

  return extract;

}
