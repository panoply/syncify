/* eslint-disable no-unused-vars */

import { writeJson, writeJsonSync } from 'fs-extra';
import { has } from 'rambdax';
import { Requests } from 'types';
import { $ } from '~state';
import { isObject } from '~utils/native';

export enum Cached {
  /**
   * A new cache record was created
   */
  Created = 1,
  /**
   * An exisiting cache record was updated.
   */
  Updated

}

/**
 * Update Cache Sync
 *
 * Updates the `store.map` cache synchronously.
 */
export async function updateCacheSync () {

  $.cache.updated = Date.now();

  try {

    writeJsonSync($.cache.uri, $.cache, { spaces: 0 });

  } catch (e) {

    throw console.error(e);

  }

}

/**
 * Update Pages
 *
 * Update or create page cache reference. Requires the `$.sync` (`store.domain`)
 * the page `handle` and the remote Shopify page response. Returns a enum describing
 * what operation took place.
 */
export async function pages (domain: string, record: Requests.Page) {

  if (!has(domain, $.cache.pages)) {
    $.cache.pages[domain] = { [record.id]: record };
    await update();
    return Cached.Created;
  }

  if (!(record.id in $.cache.pages[domain])) {
    $.cache.pages[domain][record.id] = record;
    await update();
    return Cached.Created;
  }

  $.cache.pages[domain][record.id] = record;

  await update();

  return Cached.Updated;

}

/**
 * Update Cache
 *
 * Updates the `store.map` cache. Optionally accepts a cache dir reference to
 * be updated, when provided the cache `data` of the this store will be updated
 * and then from here the `store.map`
 */
export async function update () {

  $.cache.updated = Date.now();

  try {

    await writeJson($.cache.uri, $.cache, { spaces: 0 });

  } catch (e) {

    throw console.error(e);

  }

}
