import { PartialDeep } from 'type-fest';
import { IConfig, IOptions } from 'types';
import { join } from 'path';
import { has } from 'rambdax';
import anymatch from 'anymatch';
import { normalPath } from 'shared/helpers';
import { isArray } from '../../shared/native';
import * as dirs from './dirs';

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user
 * defines the build directory input in directory paths
 * it will ensure it is formed correctly.
 */
export async function paths (config: PartialDeep<IConfig>, defaults: IOptions) {

  // Path normalize,
  const path = normalPath(config.dirs.input);

  // iterate over the define path mappings
  for (const key of [
    'assets',
    'config',
    'layout',
    'customers',
    'locales',
    'sections',
    'snippets',
    'templates',
    'metafields',
    'pages',
    'redirects'
  ]) {

    let uri: string[];

    if (key === 'customers') {

      uri = has(key, defaults.paths)
        ? isArray(defaults.paths[key])
          ? (defaults.paths[key] as string[]).map(path)
          : [ path(defaults.paths[key]) ]
        : [ path('templates/customers') ];

    } else if (has(key, defaults.paths)) {

      uri = isArray(defaults.paths[key])
        ? defaults.paths[key].map(path)
        : [ path(defaults.paths[key]) ];

      if (key === 'assets') {
        uri.push(join(config.dirs.output, 'assets/*'));
      }

    } else {

      uri = [ path(key) ];

    }

    config.watch.push(...uri);
    config.paths[key] = anymatch(uri);

  }

  return config;

}
