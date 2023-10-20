import type { Commands } from 'types';
import { mkdir, emptyDir, pathExists, readdirSync } from 'fs-extra';
import { join } from 'pathe';
import { isArray, isString, has } from 'syncify:utils';
import { basePath } from 'syncify:utils/paths';
import { THEME_DIRS, BASE_DIRS } from 'syncify:const';
import { typeError } from 'syncify:log/throws';
import { create } from 'syncify:native';
import { $ } from 'syncify:state';

/**
 * Read Cache
 *
 * Populates the cache references and assigns them
 * to the `$.cache` model.
 */
// export async function getCacheFiles () {

//   // Populate the store specifics records
//   //
//   if (dir === 'page' || dir === 'metafield' || dir === 'redirect') {

//     const stores = isArray($.config.stores) ? $.config.stores : [ $.config.stores ];

//     for (const { domain } of stores) {

//       const myshopify = `${domain}.myshopify.com`;
//       const uri = join(path, myshopify);
//       const has = await pathExists(uri);

//       $.cache[dir as string] = { [myshopify]: create(null) };

//       if (!has) {

//         try {
//           await mkdir(uri);
//         } catch (e) {
//           throw new Error(e);
//         }

//       } else {

//         const files = await glob(join(path, '*'));

//         if (files.length > 0) {

//           for (const file of files) {

//             const name = basename(file, extname(file));

//             try {

//               const data = await readJson(file);

//               defineProperty($.cache[dir as string][myshopify], name, {
//                 get () {
//                   return data;
//                 }
//               });

//             } catch (e) {
//               throw new Error(e);
//             }
//           }
//         }
//       }
//     }

//   } else if (dir === 'style' || dir === 'script') {

//     const files = await glob(join(path, '*'));

//     if (files.length > 0) {

//       for (const file of files) {

//         const name = basename(file, extname(file));

//         try {

//           $.cache[dir as string] = create(null);
//           $.cache[dir][name] = file;

//         } catch (e) {

//           throw new Error(e);
//         }
//       }
//     }

//   } else {

//     console.log(dir, path);
//     const files = await glob(join(path, '*.json'));

//     if (files.length > 0) {

//       for (const file of files) {

//         // const name = basename(file, '.json');

//         try {

//           const data = await readJson(file);

//           defineProperty($.cache, dir, {
//             get () {
//               return data;
//             }
//           });

//         } catch (e) {

//           throw new Error(e);
//         }
//       }
//     }

//   }

// }

/**
 * Set Cache
 *
 * Resolves the cache mapping records, which will exist within
 * the `node_modules/.syncify` directory. This file holds important
 * information about the users project. If no maps are found, they
 * will be generated.
 */
export async function setCacheDirs () {

  const { dirs } = $;

  await createDirs(dirs.cache);
  await createDirs(dirs.sourcemaps.root);

  return Promise.all([
    createDirs(dirs.sourcemaps.scripts),
    createDirs(dirs.sourcemaps.styles)
  ]);

};

/**
 * Create Theme Directories
 *
 * Generates a Shopify theme structure within the
 * provided `basePath` uri location.
 */
export async function setThemeDirs (basePath?: string) {

  if (!basePath) basePath = $.dirs.output;

  const hasBase = await pathExists(basePath);

  if (hasBase) {

    if ($.mode.clean) {

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
    const name = dir.startsWith('templates/') ? dir.slice(10) : dir;

    if (!has) {

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
 * Generates the base directory paths. The function
 * also normalizes paths to ensure the mapping is correct.
 */
export function setBaseDirs (cli: Commands) {

  const base = basePath($.cwd);

  for (const [ dir, def ] of BASE_DIRS) {

    let path: string | string[];

    if (dir === 'cache') {

      $.dirs[dir] = join($.cwd, def, '.syncify');
      $.dirs.sourcemaps = create(null);
      $.dirs.sourcemaps.root = join($.dirs[dir], 'sourcemaps');
      $.dirs.sourcemaps.scripts = join($.dirs.sourcemaps.root, 'scripts');
      $.dirs.sourcemaps.styles = join($.dirs.sourcemaps.root, 'styles');

      continue;

    } if (dir === 'import') {

      if ($.mode.import) {
        if (has('output', cli)) {
          $.dirs[dir] = base(cli.output);
        } else {
          $.dirs[dir] = base($.config.import);
        }
      } else {
        $.dirs[dir] = base($.config.import);
      }

      continue;

    } else if (dir === 'export') {

      if ($.mode.export) {
        if (has('output', cli)) {
          $.dirs[dir] = base(cli.output);
        } else {
          $.dirs[dir] = base($.config.export);
        }
      } else {
        $.dirs[dir] = base($.config.export);
      }

      continue;

    } else if (has(dir, cli) && cli[dir] === def) {

      if ($.config[dir] === def) {
        $.dirs[dir] = base(cli[dir]);
        continue;
      } else {
        path = $.config[dir];
      }

    } else if (isString(cli[dir])) {

      path = cli[dir];

    } else {

      path = $.config[dir];

    }

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
