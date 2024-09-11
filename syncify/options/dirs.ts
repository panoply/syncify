import type { Commands } from 'types/internal';
import { mkdir, emptyDir, pathExists, readdirSync } from 'fs-extra';
import { join } from 'node:path';
import { isArray, isString, has } from 'syncify:utils';
import { basePath } from 'syncify:utils/paths';
import { THEME_DIRS, BASE_DIRS } from 'syncify:const';
import { typeError } from 'syncify:log/throws';
import { create } from 'syncify:native';
import { $ } from 'syncify:state';

/**
 * Set Cache
 *
 * Resolves the cache mapping records, which will exist within
 * the `node_modules/.syncify` directory. This file holds important
 * information about the users project. If no maps are found, they
 * will be generated.
 */
export async function setCacheDirs () {

  await createDirs($.dirs.cache);
  await createDirs($.dirs.sourcemaps.root);

  return Promise.all(
    [
      createDirs($.dirs.sourcemaps.scripts),
      createDirs($.dirs.sourcemaps.styles)
    ]
  );

};

/**
 * Create Theme Directories
 *
 * Generates a Shopify theme structure within the
 * provided `basePath` uri location.
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
export async function setBaseDirs (cli: Commands) {

  const base = basePath($.cwd);

  for (const [ dir, def ] of BASE_DIRS) {

    if (dir === 'cache') {

      $.dirs[dir] = join($.cwd, def, '.syncify');
      $.dirs.sourcemaps = create(null);
      $.dirs.sourcemaps.root = join($.dirs[dir], 'sourcemaps');
      $.dirs.sourcemaps.scripts = join($.dirs.sourcemaps.root, 'scripts');
      $.dirs.sourcemaps.styles = join($.dirs.sourcemaps.root, 'styles');

      continue;

    } if (dir === 'import') {

      $.dirs[dir] = base($.mode.import && has('output', cli) ? cli.output : $.config.import);

      continue;

    } else if (dir === 'export') {

      $.dirs[dir] = base($.mode.export && has('output', cli) ? cli.output : $.config.export);

      continue;

    } else if (has(dir, cli) && cli[dir] === def && $.config[dir] === def) {

      $.dirs[dir] = base(cli[dir]);

      continue;

    }

    const path = isString(cli[dir]) ? cli[dir] : $.config[dir];

    if (isString(path)) {

      $.dirs[dir] = base(path);

    } else {

      typeError({
        option: 'config',
        name: dir,
        provided: path,
        expects: 'string'
      });

    }
  }

  $.watch.add($.file.path); // add config file to watch

};

/**
 * Create Imports
 *
 * Generates import directories when running `download`
 * mode. If the `--clean` flag is passed, existing dirs
 * are purged and then recreated.
 */
export async function setImportDirs () {

  const { dirs, sync, mode } = $;

  if (!mode.import) return;

  if (!(await pathExists(dirs.import))) {
    try {
      await mkdir(dirs.import);
    } catch (e) {
      throw new Error(e);
    }
  }

  for (const theme in sync.themes) {

    const { store, target } = sync.themes[theme];
    const dir = join(dirs.import, store);

    if (await pathExists(dir)) {
      if (mode.clean) {
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
