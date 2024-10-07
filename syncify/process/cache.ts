/* eslint-disable no-unused-vars */

import type { Cache, Resource } from 'types';
import { hasPath, isEmpty } from 'rambdax';
import { join } from 'node:path';
import { existsSync, mkdirSync, readFileSync } from 'fs-extra';
import Queue from 'p-queue';
import zlib from 'node:zlib';
import cbor from 'cbor';
import writeFileAtomic from 'write-file-atomic';
import { CACHE_REFS } from 'syncify:const';
import { JSONTemplatesSchema, SettingsSchema } from 'types/internal';
import { has, object } from 'syncify:utils';
import { $ } from 'syncify:state';
import { create } from 'syncify:native';

/**
 * Cache Queue Instance
 */
const cq = new Queue();

/**
 * Read Cache
 *
 * Reads a cache record from disk and applies decompression
 */
function decode <T = any> (uri: string): T {

  const content = readFileSync(uri);
  const gunzip = zlib.gunzipSync(content);

  return cbor.decode(gunzip);

}

/**
 * Write Cache
 *
 * Saves a cache record to disk and applies compression
 */
function save (uri: string, data: any) {

  return async () => {

    const encoded = await cbor.encodeAsync(data, {
      omitUndefinedProperties: true,
      canonical: true
    });

    const gzip = zlib.gzipSync(encoded);

    gzip[9] = 0x03;

    await writeFileAtomic(uri, gzip);

  };

}

/**
 * Setup Cache
 *
 * Called during the runtime define and is responsible for setting up the cache references.
 */
export async function getCache () {

  $.cache.uri = create(null);

  const cachdir = join($.cwd, 'node_modules', '.cache');

  if (!existsSync(cachdir)) mkdirSync(cachdir);

  const root = join(cachdir, 'syncify');

  if (!existsSync(root)) mkdirSync(root);

  for (const file of CACHE_REFS) {

    $.cache.uri[file] = join(root, `${file}.bin`);

    if (existsSync($.cache.uri[file])) {
      $.cache[file] = decode($.cache.uri[file]);
    } else {
      $.cache[file] = {};
      cq.add(save($.cache.uri[file], $.cache[file]));
    }
  }

  if ($.cmd.cache) {
    return clearCache();
  }
}

export function clearCache (id: keyof Cache.Model = null) {

  if (id === null) {

    for (const key of CACHE_REFS) {
      if (!isEmpty($.cache[key])) {
        $.cache[key] = object();
        cq.add(save($.cache.uri[key], $.cache[key]));
      }
    }

    return cq.onIdle();

  }

  $.cache[id] = <any>{};

  return cq.add(save($.cache.uri[id], $.cache[id]));

}

/**
 * Whether or not cache has completed writing
 */
export function cacheDone () {

  return cq.onIdle();

}

/**
 * Save Cache
 *
 * Saves the cache to disk. Optionally pass a cache key
 * id to perform a specific cache save. If the param is omitted
 * or undefined all caches are updated.
 */
export function saveCache (id: Cache.Keys = null) {

  if (id === null) {

    for (const key of CACHE_REFS) {
      if (!isEmpty($.cache[key])) {
        cq.add(save($.cache.uri[key], $.cache[key]));
      }
    }

    return cq.onIdle();

  } else {

    return cq.add(save($.cache.uri[id], $.cache[id]));

  }
}

export function getSettingsCache (domain: string, themeId: number) {

  const store = domain.endsWith('.myshopify.com')
    ? domain.slice(0, domain.indexOf('.myshopify.com')).toLowerCase()
    : domain.toLowerCase();

  if (hasPath(`${store}.${themeId}`, $.cache.settings)) return $.cache.settings[store][themeId];

  if (!has(store, $.cache.settings)) {
    $.cache.settings[store] = { [themeId]: <SettingsSchema>{} };
  } else {
    $.cache.settings[store][themeId] = <SettingsSchema>{};
  }

  cq.add(save($.cache.uri.settings, $.cache.settings));

  return $.cache.settings[store][themeId];

}

/**
 * Get Page Cache
 *
 * Returns a page resource from the cache, when no page cache exits
 * for the provided parameters, the record is created and cache file
 * updates (via queue). Optionally pass in a page id to return a specific
 * page reference, if no page exists for that id an empty object is returned.
 */
export function getPageCache (domain: string, pageId: number = NaN) {

  const store = domain.endsWith('.myshopify.com')
    ? domain.slice(0, domain.indexOf('.myshopify.com')).toLowerCase()
    : domain.toLowerCase();

  if (isNaN(pageId) === false) {

    if (hasPath(`${store}.${pageId}`, $.cache.pages)) {
      return $.cache.pages[store][pageId];
    }

    if (!has(store, $.cache.pages)) {
      $.cache.pages[store] = { [pageId]: <Resource.Page>{} };
    } else {
      $.cache.pages[store][pageId] = <Resource.Page>{};
    }

    cq.add(save($.cache.uri.pages, $.cache.pages));

    return $.cache.pages[store][pageId];

  } else {

    if (!has(store, $.cache.pages)) {
      $.cache.pages[store] = {};
      cq.add(save($.cache.uri.pages, $.cache.pages));
    }

  }

  return $.cache.pages[store];

}

/**
 * Set Page Cache
 *
 * Create or update page resource cache and returns the the page model.
 */
export function setPageCache (domain: string, data: Resource.Page) {

  const store = domain.endsWith('.myshopify.com')
    ? domain.slice(0, domain.indexOf('.myshopify.com')).toLowerCase()
    : domain.toLowerCase();

  if (!has(store, $.cache.pages)) {
    $.cache.pages[store] = { [data.id]: data };
  } else {
    $.cache.pages[store][data.id] = data;
  }

  cq.add(save($.cache.uri.pages, $.cache.pages));

  return $.cache.pages[store][data.id];

}

export function getTemplateCache (domain: string, themeId: number, path: string) {

  const store = domain.endsWith('.myshopify.com')
    ? domain.slice(0, domain.indexOf('.myshopify.com')).toLowerCase()
    : domain.toLowerCase();

  if (hasPath(`${store}.${themeId}.${path}`, $.cache.templates)) {
    return $.cache.templates[store][themeId][path];
  }

  if (!has(store, $.cache.templates)) {
    $.cache.templates[store] = { [themeId]: { [path]: <JSONTemplatesSchema>{} } };
  } else if (!has(`${themeId}`, $.cache.templates[store])) {
    $.cache.templates[store][themeId] = { [path]: <JSONTemplatesSchema>{} };
  } else if (!has(path, $.cache.templates[store][themeId])) {
    $.cache.templates[store][themeId][path] = <JSONTemplatesSchema>{};
  }

  cq.add(save($.cache.uri.templates, $.cache.templates));

  return $.cache.templates[store][themeId][path];

}
