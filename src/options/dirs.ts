import { Commands } from 'types';
import { has, uniq } from 'rambdax';
import { mkdir, emptyDir, writeJson, pathExists } from 'fs-extra';
import { join } from 'node:path';
import { assign, isArray, isString } from '~utils/native';
import { basePath } from '~utils/paths';
import { bundle, cache } from '~config';
import { CACHE_DIRS, THEME_DIRS, BASE_DIRS } from '~const';
import { typeError } from '~log/validate';

/**
 * Create Cache Directories
 *
 * Generates cache directories and references in
 * the `node_modules/.syncify` directory. This is a
 * fallback function and only runs is `postinstall`
 * was not triggered.
 */
export async function setCacheDirs (path: string, options = { purge: false }) {

  bundle.dirs.cache = `${path}/`;

  const hasBase = await pathExists(path);

  if (!hasBase) {
    try {
      await mkdir(path);
    } catch (e) {
      throw new Error(e);
    }
  }

  for (const dir of CACHE_DIRS) {

    if (dir === 'sections') {
      cache[dir] = [];
    } else {
      cache[dir] = {};

      const uri = join(path, dir, '/');
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
 * provided `basePath` uri location.
 */
export async function setThemeDirs (basePath: string) {

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

  for (const dir of THEME_DIRS) {

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
 * Set Base Directories
 *
 * Generates the base directory paths. The function
 * also normalizes paths to ensure the mapping is
 * correct.
 */
export function setBaseDirs (cli: Commands) {

  const { config, cwd, mode, dirs } = bundle;
  const base = basePath(cwd);

  for (const [ dir, def ] of BASE_DIRS) {

    let path: string | string[];

    if (dir === 'import') {

      if (mode.download) {
        if (has('output', cli)) {
          bundle.dirs[dir] = base(cli.output);
        } else {
          bundle.dirs[dir] = base(config.import);
        }
      } else {
        bundle.dirs[dir] = base(config.import);
      }

      continue;

    } else if (dir === 'export') {

      if (mode.download) {
        if (has('output', cli)) {
          bundle.dirs[dir] = base(cli.output);
        } else {
          bundle.dirs[dir] = base(config.export);
        }
      } else {
        bundle.dirs[dir] = base(config.export);
      }

      continue;

    } else if (has(dir, cli) && cli[dir] === def) {

      if (config[dir] === def) {
        bundle.dirs[dir] = base(cli[dir]);
        continue;
      } else {
        path = config[dir];
      }

    } else if (isString(cli[dir])) {
      path = cli[dir];
    } else {
      path = config[dir];
    }

    if (isArray(path)) {
      const roots = uniq(path.map(base));
      dirs[dir] = roots.length === 1 ? roots[0] : roots;
    } else if (isString(path)) {
      dirs[dir] = base(path);
    } else {
      console.log(path, dir, def);
      typeError({
        option: 'config',
        name: dir,
        provided: path,
        expects: 'string'
      });
    }
  }

  bundle.watch.add(bundle.file.path); // add config file to watch

};

/**
 * Create Imports
 *
 * Generates import directories when running `download`
 * mode. If the `--clean` flag is passed, existing dirs
 * are purged and then recreated.
 */
export async function setImportDirs () {

  const { dirs, sync, mode } = bundle;

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
