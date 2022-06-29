import { IBundle } from 'types';
import { mkdir, emptyDir, writeJson, pathExists } from 'fs-extra';
import { join } from 'path';
import { PartialDeep } from 'type-fest';
import { assign, isArray } from 'shared/native';
import { bundle, cache } from 'options';

/**
 * Create Cache Directories
 *
 * Generates cache directories and references in
 * the `node_modules/.syncify` directory. This is a
 * fallback function and only runs is `postinstall`
 * was not triggered.
 */
export async function cacheDirs (path: string, options = { purge: false }) {

  bundle.dirs.cache = `${path}/`;

  const hasBase = await pathExists(path);

  if (!hasBase) {
    try {
      await mkdir(path);
    } catch (e) {
      throw new Error(e);
    }
  }

  for (const dir of [
    'styles',
    'icons',
    'metafields',
    'pages',
    'sections',
    'redirects',
    'vscode'
  ]) {

    if (dir === 'sections') {
      cache[dir] = [];
    } else if (dir === 'pages') {
      cache[dir] = {};
    } else {

      const uri = join(path, dir);
      const has = await pathExists(uri);

      if (!has) {

        try {
          await mkdir(uri);
        } catch (e) {
          throw new Error(e);
        }

        assign(cache[dir], { uri, data: {} });

      } else {
        if (options.purge) await emptyDir(uri);
      }

      assign(cache[dir], { uri, data: {} });
    }

  }

  writeJson(join(path, 'store.map'), cache, { spaces: 0 }, (e) => {

    if (e) throw e;

  });

};

/**
 * Create Theme Directories
 *
 * Generates a Shopify theme structure within the
 * provided `basePath` uri location. Optionally purge
 * by passing `true` as second parameter.
 */
export async function themeDirs (basePath: string) {

  const hasBase = await pathExists(basePath);

  if (hasBase) {
    if (bundle.mode.clean) {
      try {
        await emptyDir(basePath);
      } catch (e) {
        console.error(e);
      }
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
    'locales',
    'sections',
    'snippets'
  ]) {

    const uri = join(basePath, dir);
    const has = await pathExists(uri);

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
export async function importDirs ({ dirs, sync, mode }: PartialDeep<IBundle>) {

  if (!mode.download) return;

  const hasBase = await pathExists(dirs.import);

  if (!hasBase) {
    try {
      await mkdir(dirs.import);
    } catch (e) {
      throw new Error(e);
    }
  }

  for (const theme in sync.themes) {

    const { store, target } = sync.themes[theme];

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
