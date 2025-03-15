import type { PackageConfig, PKG, Store } from 'types';

import { join } from 'node:path';

import { pathExists, pathExistsSync, readFile, readFileSync } from 'fs-extra';
import { updatePackage, writePackage } from 'write-package';

import { parse } from '@syncify/json';

import { error } from '~cli/errors';
import { has, isArray, isEmpty, isString, keys, merge } from '~utils';

import { $ } from '$';

/**
 * Get package.json (sync)
 */
export function getPkgSync () {

  if (pathExistsSync($.file.pkg)) {

    try {

      $.pkg = parse(readFileSync($.file.pkg, 'utf-8'));

    } catch (e) {

      throw error.json(e, { relative: 'package.json' });

    }

  }

}

/**
 * Get package.json (async)
 *
 * Reads a `package.json` and returns the contents as JSON whenever the `cwd`
 * argument is provided. If the `cwd` argument is undefined, the {@link $.pkg}
 * reference is reset.
 *
 * When the function returns `null` it indicates that no `package.json` was found.
 */
export async function getPkg (cwd?: string) {

  const path = cwd ? join(cwd, 'package.json') : $.file.pkg;

  if (await pathExists(path)) {

    try {

      const read = await readFile(path, 'utf8');
      const json = parse<PKG>(read);

      if (isString(cwd) && cwd !== $.cwd) return json;

      $.pkg = json;

    } catch (e) {

      throw error.json(e, { base: 'package.json' });

    }

  }

}

/**
 * Set package.json (async)
 *
 * Updates or creates a `package.json` file, returning the content when successful.
 * The `cwd` argument when undefined will apply a reset to the {@link $.pkg} value.
 * Passing a `cwd` value will prevent {@link $.pkg} from updating and instead treat
 * the write in isolation.
 */
export async function setPkg (json: PKG, cwd?: string) {

  try {

    if (cwd) {

      await writePackage(join(cwd, 'package.json'), json);

      return getPkg(cwd);

    } else {

      await updatePackage($.file.pkg, json);

      return getPkg();

    }

  } catch (e) {

    throw error.json(e, { base: 'package.json' });

  }

}

/**
 * Set `"syncify": {}` reference in Package.json
 *
 * This is a fallback workaround in situations where an `.env` file exists
 * and has containing store references, but no stores have been defined within
 * the users package.json file.
 */
export async function setPkgSyncify (pkg: PKG = $.pkg) {

  const syncify = has('syncify', pkg) ? pkg.syncify : <PackageConfig>{};

  // Lets attempt to write stores within package.json based on the .env values
  if ($.file.env !== null && isEmpty($.env.vars) === false) {

    const props = keys($.env.vars);
    const stores = has('stores', syncify)
      ? isArray(syncify.stores)
        ? syncify.stores
        : [ syncify.stores ]
      : [];

    for (const name of props) {

      const match = name.match(/^([a-zA-Z0-9-]+)_api_(token|key)$/);

      if (match !== null) {

        if (stores.some(({ domain }) => domain === `${match[1]}.myshopify.com`)) continue;

        if (match[2] === 'token') {

          // value is _api_token, we will assume Shopify reference
          stores.push(<Store>{ domain: match[1], themes: {} });

        } else if (match[2] === 'key' && has(`${match[1]}_api_secret`, $.env.vars)) {

          // when value is _api_key we can confirm shopify reference by checking for secret
          stores.push(<Store>{ domain: match[1], themes: {} });

        }
      }
    }

    if (stores.length > 0) {

      const updatePkg = merge<any>(pkg, {
        syncify: {
          stores: stores.length > 1 ? stores : stores[0]
        }
      });

      await setPkg(updatePkg);

      return true;

    }

  }

  return false;
}

/**
 * Set Package.json Version
 *
 * Resolves `package.json` file and overwrites the
 * version number, while preserving the JSON indentation.
 * Applies a reparse following the write, updating the the state `$.pkg` reference.
 */
export async function setPkgVersion (current: string, version: string) {

  try {

    if ($.pkg.version === version) {
      await setPkg({ version });
      return true;
    } else {
      return false;
    }

  } catch (e) {

    throw new Error(e);
  }

};
