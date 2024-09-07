import type { Paths, PathsInput } from 'types';
import glob from 'fast-glob';
import anymatch from 'anymatch';
import { dirname, join } from 'pathe';
import { PATH_KEYS } from 'syncify:const';
import { isArray, has, isObject } from 'syncify:utils';
import { lastPath, normalPath } from 'syncify:utils/paths';
// import { warnOption } from 'syncify:log/throws';
import { $ } from 'syncify:state';

const getPaths = (paths: Paths) => {

  const path = normalPath($.dirs.input);

  return (key: string, fallback: string): string[] => {

    const files = $.config.paths[key];

    if (!has('paths', $.config)) return [ path(fallback) ];

    if (isArray<string[]>(files)) {
      return files.map(path);
    }

    if (isObject<PathsInput>(files) && files.input) {

      return isArray(files.input) ? files.input.map(path) : [ path(files.input) ];

    }

    return [ path(files) ];

  };
};

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user
 * defines the build directory input in directory paths
 * it will ensure it is formed correctly.
 */
export async function setPaths () {

  const path = normalPath($.dirs.input);

  const getPaths = (key: string, fallback: string): string[] => {

    const files = $.config.paths[key];

    if (!files) {
      return [ path(fallback) ];
    }

    if (isArray<string[]>(files)) {
      return files.map(path);
    }

    if (isObject<PathsInput>(files) && files.input) {

      return isArray(files.input) ? files.input.map(path) : [ path(files.input) ];

    }

    return [ path(files) ];

  };

  // Loop through each path type
  for (const key of PATH_KEYS) {

    let paths: string[] = [];

    switch (key) {
      case 'customers':
        paths = getPaths(key, 'templates/customers/*'); break;
      case 'metaobject':
        paths = getPaths(key, 'templates/metaobject/*'); break;
      case 'schema':
        paths = getPaths(key, 'schema/*'); break;
      default:
        if ($.config.paths[key]) paths = getPaths(key, '');
    }

    // Special handling for certain keys
    if (key === 'snippets' || key === 'sections') {
      paths.forEach(p => $[key].baseDir.add(lastPath(dirname(p))));
    } else if (key === 'assets') {
      paths.push(join($.dirs.output, 'assets/*'));
    }

    // Process each path
    for (const p of paths) {
      if (key !== 'metafields' && key !== 'redirects') {
        const foundPaths = await glob(p, { cwd: $.cwd });
        if (foundPaths.length) {
          foundPaths.forEach(entry => $.paths[key].input.add(entry));
          $.watch.add(p);
        } else if (key !== 'assets' || p !== join($.dirs.output, 'assets/*')) {
          // Optionally log or handle the case where no files are found
        }
      }
      $.paths[key].match = anymatch(paths);
    }
  }
}
