import { ICache, IConfig, IOptions } from 'types';
import { mkdir, emptyDir, writeJson, pathExists } from 'fs-extra';
import { join } from 'path';
import { PartialDeep } from 'type-fest';
import { basePath } from 'shared/helpers';
import { isArray } from '../../shared/native';
import { has } from 'rambdax';
import { bundle } from './conf';

/**
 * Create Cache Directories
 *
 * Generates cache directories and references in
 * the `node_modules/.syncify` directory. This is a
 * fallback function and only runs is `postinstall`
 * was not triggered.
 */
export async function cacheDirs (path: string, options = { purge: false }): Promise<ICache> {

  const hasBase = await pathExists(path);

  if (!hasBase) {
    try {
      await mkdir(path);
    } catch (e) {
      throw new Error(e);
    }
  }

  const refs: PartialDeep<ICache> = {};

  for (const dir of [
    'styles',
    'icons',
    'metafields',
    'pages',
    'sections',
    'redirects',
    'vscode'
  ]) {

    const uri = join(path, dir);
    const has = await pathExists(uri);

    if (!has) {
      try {
        await mkdir(uri);
      } catch (e) {
        throw new Error(e);
      }
    } else {
      if (options.purge) await emptyDir(uri);
    }

    refs[dir] = {
      uri,
      maps: {}
    };
  }

  try {
    await writeJson(join(path, 'store.map'), refs, { spaces: 0 });
  } catch (e) {
    throw new Error(e);
  }

  return refs as ICache;

};

/**
 * Create Theme Directories
 *
 * Generates a Shopify theme structure within the
 * provided `basePath` uri location. Optionally purge
 * by passing `true` as second parameter.
 */
export async function themeDirs (basePath: string, clean = false) {

  const hasBase = await pathExists(basePath);

  if (hasBase && clean) {
    try {
      await emptyDir(basePath);
    } catch (e) {
      console.error(e);
    }
  } else {
    try {
      await mkdir(basePath);
    } catch (e) {
      throw new Error(e);
    }
  }

  for (const dir of [
    'templates',
    'templates/customers',
    'assets',
    'config',
    'layout',
    'customers',
    'locales',
    'sections',
    'snippets'
  ]) {

    const uri = join(basePath, dir);
    const has = pathExists(uri);

    if (!has) {
      try {
        await mkdir(uri);
      } catch (e) {
        throw new Error(e);
      }
    }

  }

};

/**
 * Create Imports
 *
 * Generates import directories when running `download`
 * mode. If the `--clean` flag is passed, existing dirs
 * are purged and then recreated.
 */
export async function importDirs ({ dirs, sync, mode }: PartialDeep<IConfig>) {

  const hasBase = await pathExists(dirs.import);

  if (!hasBase) {
    try {
      await mkdir(dirs.import);
    } catch (e) {
      throw new Error(e);
    }
  }

  for (const { store, target } of sync.themes) {

    const dir = join(dirs.import, store);
    const has = await pathExists(dir);

    if (has) {
      if (mode.clean) {
        try {
          await emptyDir(dir);
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      try {
        await mkdir(dir);
      } catch (e) {
        throw new Error(e);
      }
    }

    await themeDirs(join(dir, target));

  }

};

/**
 * Create Directories
 *
 * Generates directories from the provided paths. If the
 * path exists, creation will be skipped.
 */
export async function createDirs (path: string | string[]) {

  if (isArray(path)) {
    for (const uri of path) {

      const has = await pathExists(uri);

      if (!has) {
        try {
          await mkdir(uri);
        } catch (e) {
          throw new Error(e);
        }
      }
    }

  } else {

    const has = await pathExists(path);

    if (!has) {
      try {
        await mkdir(path);
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
