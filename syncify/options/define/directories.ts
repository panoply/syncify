import { join } from 'node:path';

import { emptyDir, mkdir, pathExists, readdirSync } from 'fs-extra';

import { typeError } from '~cli/throws';
import { BASE_DIRS, THEME_DIRS } from '~const';
import { has, isArray, isString } from '~utils';
import { basePath } from '~utils/paths';

import { $ } from '$';

/**
 * Create Theme Directories
 *
 * Generates a Shopify theme structure within the provided `basePath` uri location.
 */
export async function setThemeDirs (basePath?: string) {

  if (!basePath) basePath = $.dirs.output;

  if (await pathExists(basePath)) {

    if ($.mode.clean) {

      try {
        await emptyDir(basePath);
      } catch (e) {
        throw new Error(e);
      }

    }

  } else {

    try {
      await mkdir(basePath);
    } catch (e) {
      throw new Error(e);
    }

  }

  for (const dir of THEME_DIRS) {

    const uri = join(basePath, dir);
    const name = dir.startsWith('templates/') ? dir.slice(10) : dir;

    if (!(await pathExists(uri))) {

      try {

        await mkdir(uri);

        $.stats[name] = 0;

      } catch (e) {

        throw new Error(e);

      }

    } else {

      $.stats[name] = readdirSync(uri).length;

    }

  }

};

/**
 * Set Base Directories
 *
 * Generates the base directory paths. The function also normalizes paths to
 * ensure the mapping is correct.
 */
export async function setBaseDirs () {

  if ($.running) return;

  const base = basePath($.cwd);

  for (const [ key, dir ] of BASE_DIRS) {

    if (has(key, $.cmd) && $.cmd[key] === dir && $.config[key] === dir) {

      $.dirs[key] = base($.cmd[key]);

      continue;

    }

    const path = has(key, $.cmd) && isString($.cmd[key]) ? $.cmd[key] : $.config[key];

    if (isString(path)) {

      $.dirs[key] = base(path);

    } else {

      typeError({
        option: 'config',
        name: key,
        provided: path,
        expects: 'string'
      });

    }
  }

};

/**
 * Create Imports
 *
 * Generates import directories when running `download` mode.
 * If the `--clean` flag is passed, existing dirs are purged and then recreated.
 */
export async function setImportDirs () {

  return;

  if (!(await pathExists($.dirs.import))) {
    try {
      await mkdir($.dirs.import);
    } catch (e) {
      throw new Error(e);
    }
  }

  for (const { store, target } of $.target) {

    const dir = join($.dirs.import, store.domain);

    if (await pathExists(dir)) {
      if ($.mode.clean) {
        try {
          await emptyDir(dir);
        } catch (e) {
          throw new Error(e);
        }
      }
    } else {
      try {
        await mkdir(dir);
      } catch (e) {
        throw new Error(e);
      }
    }

    await setThemeDirs(join(dir, target));

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

      if (!(await pathExists(uri))) {
        try {
          await mkdir(uri);
        } catch (e) {
          throw new Error(e);
        }
      }
    }

  } else {

    if (!(await pathExists(path))) {

      try {

        await mkdir(path);

      } catch (e) {

        throw new Error(e);

      }
    }
  }
};
