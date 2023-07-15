import type { Config } from 'types';
import glob from 'fast-glob';
import anymatch from 'anymatch';
import { join, relative } from 'node:path';
import { has } from 'rambdax';
import { normalPath } from '~utils/paths';
import { warnOption } from '~options/validate';
import { PATH_KEYS } from '~const';
import { $ } from '~state';
import * as u from '~utils/native';

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user
 * defines the build directory input in directory paths
 * it will ensure it is formed correctly.
 */
export async function setPaths (config: Config) {

  // Path normalize,
  const path = normalPath($.dirs.input);
  const warn = warnOption('path resolution');

  // iterate over the defined path mappings
  for (const key of PATH_KEYS) {

    let uri: string[];

    if (key === 'customers') {

      uri = has(key, config.paths)
        ? u.isArray(config.paths[key])
          ? (config.paths[key] as string[]).map(path)
          : [ path(config.paths[key]) ]
        : [ path('templates/customers') ];

    } else if (has(key, config.paths)) {

      uri = u.isArray(config.paths[key])
        ? config.paths[key].map(path)
        : [ path(config.paths[key]) ];

      if (key === 'assets') uri.push(join($.dirs.output, 'assets/*'));

    } else if (key === 'redirects' && has(key, config.paths)) {

      uri = [ join($.cwd, config.paths[key]) ];

    } else {

      uri = [ path(key) ];

    }

    for (const p of uri) {

      // TODO
      // ENABLE WHEN SUPPORTED
      // SKIPPING THESE PREVENTS WARNINGS FROM SHOWING
      if (p.endsWith('metafields') || p.endsWith('pages') || p.endsWith('redirects')) continue;

      const exists = await glob(p);

      if (exists.length === 0) warn('No files could be resolved in', relative($.cwd, p));

      if (!$.watch.has(p)) $.watch.add(p);

    }

    $.paths[key] = anymatch(uri);

  }

}
