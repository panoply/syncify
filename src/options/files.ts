import { IConfig, IPackage } from 'types';
import { join } from 'path';
import { pathExists, readJson } from 'fs-extra';
import { readConfig } from '@web/config-loader';

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
export async function configFile (uri: string): Promise<IConfig> {

  try {

    const jsconfig = await readConfig('syncify.config', null, uri);

    return jsconfig;

  } catch (e) {

    const jsonconfig = join(uri, 'syncify.json');
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
export async function pkgJson (cwd: string): Promise<IPackage> {

  // Save path reference of package
  const uri = join(cwd, 'package.json');
  const has = await pathExists(uri);

  if (!has) throw new Error('Missing "package.json" file');

  try {

    const pkg: IPackage = await readJson(uri);
    return pkg;

  } catch (e) {
    throw new Error(e);
  }

};

/**
 * Read rcfile
 *
 * Looks for the existence of a `.syncifyrc` or
 * `.syncifyrc.json` file. This file can optionally
 * include credential information.
 */
export async function rcFile (cwd: string) {

  let rcconfig = join(cwd, '.syncifyrc');
  let rcexists = await pathExists(rcconfig);

  if (!rcexists) {
    rcconfig += '.json';
    rcexists = await pathExists(rcconfig);
    if (!rcexists) return null;
  }

  return readJson(rcconfig);

};
