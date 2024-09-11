import glob from 'fast-glob';
import anymatch from 'anymatch';
import { dirname } from 'node:path';
import { PATH_KEYS } from 'syncify:const';
import { isArray, isEmpty, isNil, isObject, isString } from 'syncify:utils';
import { lastPath, normalPath } from 'syncify:utils/paths';
import { typeError, warnOption } from 'syncify:log/throws';
import { $ } from 'syncify:state';
import { ARR } from '@syncify/ansi';

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user defines the
 * build directory input in directory paths it will ensure it is formed correctly.
 */
export async function setPaths () {

  const path = normalPath($.dirs.input);
  const warn = warnOption('paths');

  const getGlobs = (key: string, files: string | string[], fallback: string): string[] => {

    if (isNil(files)) return [ path(fallback) ];
    if (isArray<string[]>(files)) return files.map(path);
    if (isString(files)) return [ path(files) ];

    typeError({
      option: 'paths',
      expects: 'string | string[]',
      provided: files,
      name: key
    });

  };

  const renameGlobs = (key: 'sections' | 'snippets', fallback: string): string[] => {

    const files = $.config.paths[key];

    // sections and snippets accept glob rename objects, so we need to
    // do a little extra work in order to find resolution correctly.
    if (isObject<Record<string, string | string[]>>(files)) {

      if (isEmpty(files)) {

        warn(`Undefined ${key} paths, using fallback`, '{}');
        return [ path(fallback) ];

      }

      const paths: string[] = [];

      for (const rename in files) {

        if (isArray<string[]>(files[rename])) {

          paths.push(...files[rename]);

        } else if (isString(files)) {

          paths.push(files[rename]);

        } else if (isNil(files[rename])) {

          typeError({
            option: `paths ${ARR} ${key}`,
            expects: 'string | string[]',
            provided: files[rename],
            name: rename
          });

        }

      }

      if (paths.length === 0) {
        warn(`Unresolved ${key} paths, using fallback`, '{}');
        return [ path(fallback) ];
      }

      return paths.map(path);

    } else {

      return getGlobs(key, files, fallback);

    }
  };

  // Loop through each path type
  for (const key of PATH_KEYS) {

    let paths: string[] = [];

    if (key === 'snippets' || key === 'sections') {

      // snippets and sections accepts object rename structures
      paths = renameGlobs(key, `${key}/*`);

      // base directory paths
      paths.forEach(p => $[key.slice(0, -1)].baseDir.add(lastPath(dirname(p))));

    } else if (key === 'customers' || key === 'metaobject') {

      // These paths as defaults are sudirectories of the themes templates
      paths = getGlobs(key, $.config.paths[key], `templates/${key}/*`);

    } else {

      // all other paths with either be glob string or glob array
      paths = getGlobs(key, $.config.paths[key], `${key}/*`);

    }

    $.paths[key].match = anymatch(paths);

    if (key !== 'metafields' && key !== 'redirects') {

      if ($.paths[key].input === null) {

        $.paths[key].input = new Set(paths);

        paths.forEach(p => $.watch.add(p));

      } else {

        (await glob(paths, { cwd: $.cwd })).forEach(p => {
          $.paths[key].input.add(p);
          $.watch.add(p);
        });

      }

    }

  }

}
