import type { BundleRequire, BundleResolve } from 'types/internal';
import { pathToFileURL } from 'node:url';
import { readFile, unlink, existsSync, readFileSync, writeFileSync } from 'fs-extra';
import { isAbsolute, dirname, extname, join, parse, resolve } from 'pathe';
import { build, BuildResult, Plugin } from 'esbuild';
import { has } from 'rambdax';
import { inferLoader, dynamicImport, uuid, isRegex, jsonc, isArray, glue } from 'syncify:utils';
import { assign, keys } from 'syncify:native';
import { REGEX_EXTJS } from 'syncify:const';
import { $ } from 'syncify:state';

function findUp (name: string, startDir: string, stopDir = parse(startDir).root) {

  let dir: string = startDir;

  while (dir !== stopDir) {

    const file = join(dir, name);

    if (existsSync(file)) return file;
    if (extname(file) !== '.json') {
      const path = file + '.json';
      if (existsSync(path)) return path;
    }

    dir = dirname(dir);

  }

  return null;

};

function getTSConfigFromFile (cwd: string, filename: string) {

  if (!existsSync(join(cwd, filename))) return null;

  return isAbsolute(filename)
    ? existsSync(filename) ? filename : null
    : findUp(filename, cwd);

};

function getTSConfigFromExtends (cwd: string, name: string) {

  if (isAbsolute(name)) return existsSync(name) ? name : null;
  if (name.startsWith('.')) return findUp(name, cwd);

  return require.resolve(name, { paths: [ cwd ] });

};

export type Loaded = {
  /** Path to the nearest config file */
  path: string
  /** Merged config data */
  data: any
  /** Discovered config files */
  files: string[]
}

function getTSConfig (dir = process.cwd(), name = 'tsconfig.json', isExtends = false): Loaded | null {

  dir = resolve(dir);

  const id = isExtends
    ? getTSConfigFromExtends(dir, name)
    : getTSConfigFromFile(dir, name);

  if (!id) return null;

  const data: {
    extends?: string | string[]
    [k: string]: any
  } = jsonc(readFileSync(id, 'utf-8'));

  const configDir = dirname(id);

  if (has('baseURL', data.compilerOptions)) {

    data.compilerOptions.baseUrl = join(configDir, data.compilerOptions.baseUrl);

  }

  const extendsFiles: string[] = [];

  if (data.extends) {

    const extendsList = isArray(data.extends) ? data.extends : [ data.extends ];
    const extendsData: Record<string, any> = {};

    for (const name of extendsList) {

      const parentConfig = getTSConfig(configDir, name, true);

      if (parentConfig) {

        assign(extendsData, {
          ...parentConfig?.data,
          compilerOptions: {
            ...extendsData.compilerOptions,
            ...parentConfig?.data?.compilerOptions
          }
        });

        extendsFiles.push(...parentConfig.files);

      }
    }

    assign(data, {
      ...extendsData,
      ...data,
      compilerOptions: {
        ...extendsData.compilerOptions,
        ...data.compilerOptions
      }
    });

  }

  delete data.extends;

  return {
    path: id,
    data,
    files: [ ...extendsFiles, id ]
  };
};

export function loadTSConfig (dir: string, name?: string) {

  return getTSConfig(dir, name);

}

/**
 * Use a random path to avoid import cache
 */
function defaultGetOutputFile (path: string, format: 'esm' | 'cjs'): string {

  return path.replace(REGEX_EXTJS, `.bundled_${uuid()}.${format === 'esm' ? 'mjs' : 'cjs'}`);

}

/**
 * CommonJS or ESM module
 */
function isCommonJSorESM (inputFile: string): 'esm' | 'cjs' {

  if (typeof jest === 'undefined') return 'cjs';

  const ext = extname(inputFile);

  if (ext === '.js') {
    return $.pkg.type === 'module' ? 'esm' : 'cjs';
  } else if (ext === '.ts') {
    return 'esm';
  } else if (ext === '.mjs') {
    return 'esm';
  }

  return 'cjs';

}

function tsconfigPathsToRegExp (paths: Record<string, any>) {

  return paths === null ? null : keys(paths || {}).map((key) => new RegExp(`^${key.replace(/\*/, '.*')}$`));

};

function match (id: string, patterns?: (string | RegExp)[]) {

  if (!patterns) return false;

  return patterns.some((p) => {
    if (isRegex(p)) return p.test(id);
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
} = {}): Plugin {

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

export function injectFileScopePlugin (): Plugin {
  return {
    name: 'bundle-require:inject-file-scope',
    setup (ctx) {

      ctx.initialOptions.define = {
        ...ctx.initialOptions.define,
        __dirname: '__injected_dirname__',
        __filename: '__injected_filename__',
        'import.meta.url': '__injected_import_meta_url__'
      };

      ctx.onLoad({ filter: REGEX_EXTJS }, async (args) => {

        const contents = await readFile(args.path, 'utf-8');

        const injectLines = [
          `const __injected_filename__ = ${JSON.stringify(args.path)};`,
          `const __injected_dirname__ = ${JSON.stringify(dirname(args.path))};`,
          `const __injected_import_meta_url__ = ${JSON.stringify(pathToFileURL(args.path).href)};`
        ];

        return {
          contents: glue(injectLines) + contents,
          loader: inferLoader(extname(args.path))
        };
      });
    }
  };
};

export async function bundleRequire<T = any> (options: BundleRequire): BundleResolve<T> {

  if (!REGEX_EXTJS.test(options.filepath)) {
    throw new Error(`${options.filepath} is not a valid JS file`);
  }

  const preserveTemporaryFile = options.preserveTemporaryFile ?? !!process.env.BUNDLE_REQUIRE_PRESERVE;
  const cwd = options.cwd || $.cwd;
  const format = options.format ?? isCommonJSorESM(options.filepath);
  const tsc = options.tsconfig === null ? null : loadTSConfig(cwd, options.tsconfig);
  const resolvePaths = tsconfigPathsToRegExp(tsc?.data.compilerOptions?.paths || {});

  async function extractResult (result: BuildResult) {

    if (!result.outputFiles) {
      throw new Error('[bundle-require] no output files');
    }

    const { text } = result.outputFiles[0];
    const getOutputFile = options.getOutputFile || defaultGetOutputFile;
    const outfile = join($.dirs.cache, getOutputFile(options.filepath, format));

    writeFileSync(outfile, text, 'utf8');

    let mod: any;
    const req = options.require || dynamicImport;

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
      ...(has('plugins', options.esbuildOptions) ? options.esbuildOptions.plugins : []),
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
