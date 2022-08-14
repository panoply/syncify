import { Config, ENV, Package } from 'types';
import { join } from 'path';
import { pathExists, readFile, readJson } from 'fs-extra';
import { bundleRequire } from 'bundle-require';
import { jsonc } from '../shared/utils';
import { bundle } from '.';

/**
 * Config Files
 *
 * Looks for syncify configuration files within
 * the users project. Looks for a `syncify.config.js`
 * file, if one does not exists it will look for a
 * `syncify.json` file, if none found, returns `null`.
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

      bundle.file = path;
      const json = await readFile(path);

      return jsonc<Config>(json.toString());

    } else {

      bundle.file = path;
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

}

/**
 * Package.json File
 *
 * Resolves `package.json` file. This is triggered
 * at runtime, the module requires the existence of
 * a `package.json` file.
 */
export async function pkgJson (cwd: string): Promise<Package> {

  // Save path reference of package
  const uri = join(cwd, 'package.json');
  const has = await pathExists(uri);

  if (!has) throw new Error('Missing "package.json" file');

  try {

    const pkg: Package = await readJson(uri);
    return pkg;

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
