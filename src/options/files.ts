import { Config, ENV, Tsconfig } from 'types';
import { join, relative, basename } from 'node:path';
import { pathExists, readFile, readJson } from 'fs-extra';
import { bundleRequire } from '~utils/require';
import { jsonc } from '~utils/utils';
import { bundle } from '~config';
import stripJsonComments from 'strip-json-comments';

/**
 * Config Files
 *
 * Looks for syncify configuration files within
 * the users project. Looks for a `syncify.config.js`
 * file, if one does not exists it will look for a
 * `syncify.config.json` file, if none found, returns `null`.
 *
 * > When `null` is returned, the `package.json` file is
 * assumed to contain configuration requirements.
 */
export async function configFile (cwd: string): Promise<Config> {

  let path: string = null;

  for (const file of [
    'syncify.config.js',
    'syncify.config.mjs',
    'syncify.config.cjs',
    'syncify.config.ts',
    'syncify.config.json'
  ]) {

    path = join(cwd, file);
    const exists = await pathExists(path);
    if (exists) break;
    path = null;

  }

  if (path === null) return null;

  try {

    if (path.endsWith('.json')) {

      bundle.file.path = path;
      bundle.file.relative = relative(cwd, path);
      bundle.file.base = basename(path);

      const json = await readFile(path);

      return jsonc<Config>(json.toString());

    } else {

      bundle.file.path = path;
      bundle.file.relative = relative(cwd, path);
      bundle.file.base = basename(path);

      const config = await bundleRequire({ filepath: path });

      return config.mod.syncify || config.mod.default || config.mod;

    }

  } catch (e) {

    console.log(e);

    const jsonconfig = join(cwd, 'syncify.config.json');
    const hasFile = await pathExists(jsonconfig);

    if (hasFile) return readJson(jsonconfig);

    return null;
  }

};

/**
 * Parse tsconfig.json / jsconfig.json
 *
 * Resolves `tsconfig.json` or `jsconfig.json` files for usage
 * with _script_ transforms and esbuild to support different
 * capabilities like path aliases.
 */
export async function getTSConfig (cwd: string): Promise<Tsconfig> {

  let uri: string;

  // Save path reference of package
  uri = join(cwd, 'tsconfig.json');

  const tsconfig = await pathExists(uri);

  if (!tsconfig) {
    uri = join(cwd, 'jsconfig.json');
    const jsconfig = await pathExists(uri);
    if (!jsconfig) return null;
  }

  try {

    const file = await readFile(uri);
    const config = stripJsonComments(file.toString());

    return JSON.parse(config);

  } catch (e) {
    throw new Error(e);
  }

};

/**
 * Package.json File
 *
 * Resolves `package.json` file. This is triggered
 * at runtime, the module requires the existence of
 * a `package.json` file.
 */
export async function getPackageJson (cwd: string) {

  // Save path reference of package
  const uri = join(cwd, 'package.json');
  const has = await pathExists(uri);

  if (!has) throw new Error('Missing "package.json" file');

  try {
    bundle.pkg = await readJson(uri);
  } catch (e) {
    throw new Error(e);
  }

};

/**
 * Read rcfile
 *
 * Looks for the existence of a `.syncifyenv` or
 * `.syncifyrc.json` file. This file can optionally
 * include credential information.
 */
export async function rcFile (cwd: string): Promise<ENV.RCFile> {

  let rcconfig = join(cwd, '.syncifyenv');
  let rcexists = await pathExists(rcconfig);

  if (!rcexists) {
    rcconfig += '.json';
    rcexists = await pathExists(rcconfig);
    if (!rcexists) return null;
  }

  return readJson(rcconfig);

};
