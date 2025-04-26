import type { Cache, PathRename, Resource, SchemaTemplates, SettingsSchema } from 'types';

import { basename, join } from 'node:path';
import { promisify } from 'node:util';
import zlib from 'node:zlib';

import cbor from 'cbor';
import { readFile } from 'fs-extra';
import writeFileAtomic from 'write-file-atomic';

import { throws } from '~cli/throws';
import { CACHE_FILES } from '~const';
import { extractKeyDirName, renameCorrect } from '~options/utils';
import { checksum, has, hasPath, isEmpty, isUndefined, m } from '~utils';

import { $, q } from '$';

/**
 * Asynchronous Gunzip
 */
const gunzipAsync = promisify(zlib.gunzip);

/**
 * Asynchronous Gzip
 */
const gzipAsync = promisify(zlib.gzip);

/**
 * Read Cache
 *
 * Reads a cache record from disk and applies decompression
 */
export async function decode <T = any> (uri: string): Promise<T> {

  const content = await readFile(uri);
  const gunzip = await gunzipAsync(content);

  return cbor.decode(gunzip, {
    preferMap: uri.endsWith('paths')
  });

};

/**
 * Write Cache
 *
 * Saves a cache record to disk and applies compression
 */
export function save (uri: Cache.UriKeys, data?: any) {

  return async () => {

    if ($.mode.init === false && $.file.project === null) {

      throws([ 'Project cache has not been created' ]);

      return;
    }

    if (!/[/]/.test(uri)) {
      uri = $.cache.uri[uri];
      if (!data) data = $.cache[uri];
    }

    const encoded = await cbor.encodeAsync(data, {
      omitUndefinedProperties: true,
      canonical: true
    });

    const gzip = await gzipAsync(encoded);

    gzip[9] = 0x03;

    await writeFileAtomic(uri, gzip);

  };

}

export function clearCache (id: keyof Cache.Model = null) {

  if (id === null) {

    for (const key of CACHE_FILES) {
      if (key === 'paths') {
        if ($.cache[key] instanceof Map) {
          $.cache[key].clear();
          q.cache.add(save($.cache.uri[key], $.cache[key]));
        }
      } else {
        if (!isEmpty($.cache[key])) {
          $.cache[key] = {};
          q.cache.add(save($.cache.uri[key], $.cache[key]));
        }
      }
    }

    return q.cache.onIdle();

  }

  $.cache[id] = id === 'paths'
    ? m()
    : <any>{};

  return q.cache.add(save($.cache.uri[id], $.cache[id]));

}

/**
 * Whether or not cache has completed writing
 */
export function cacheDone () {

  return q.cache.onIdle();

}

/**
 * Run Checksum
 *
 * Compares and generates file checksums.
 *
 * > Return `true` when checksums match
 * >
 * > Return `false` when checksums do not match
 */
export function runChecksum (input: string, value: string): boolean {

  const hash = checksum(value);

  if (has(input, $.cache.checksum) && $.cache.checksum[input] === hash) return true;

  $.cache.checksum[input] = hash;
  q.cache.add(save($.cache.uri.checksum, $.cache.checksum));

  return false;

}

/**
 * Save Cache
 *
 * Saves the cache to disk. Optionally pass a cache key id to perform
 * a specific cache save. If the param is omitted or undefined all caches are updated.
 */
export function saveCache (id: Cache.Keys = null) {

  if (id === null) {

    for (const key of CACHE_FILES) {
      if (!isEmpty($.cache[key])) {
        q.cache.add(save($.cache.uri[key], $.cache[key]));
      }
    }

    return q.cache.onIdle();

  } else {

    return q.cache.add(save($.cache.uri[id], $.cache[id]));

  }
}

export function getSettingsCache (domain: string, themeId: number) {

  const store = domain.endsWith('.myshopify.com')
    ? domain.slice(0, domain.indexOf('.myshopify.com')).toLowerCase()
    : domain.toLowerCase();

  if (hasPath(`${store}.${themeId}`, $.cache.settings)) {
    return $.cache.settings[store][themeId];
  }

  if (!has(store, $.cache.settings)) {
    $.cache.settings[store] = { [themeId]: <SettingsSchema>{} };
  } else {
    $.cache.settings[store][themeId] = <SettingsSchema>{};
  }

  q.cache.add(save($.cache.uri.settings, $.cache.settings));

  return $.cache.settings[store][themeId];

}

/**
 * Get Page Cache
 *
 * Returns a page resource from the cache. When no page cache exits
 * for the provided parameters, the record is created and cache file
 * updated (via queue).
 *
 * Optionally pass in a page id to return a specific page reference,
 * if no page exists for that id an empty object is returned.
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

    q.cache.add(save($.cache.uri.pages, $.cache.pages));

    return $.cache.pages[store][pageId];

  } else {

    if (!has(store, $.cache.pages)) {
      $.cache.pages[store] = {};
      q.cache.add(save($.cache.uri.pages, $.cache.pages));
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

  q.cache.add(save($.cache.uri.pages, $.cache.pages));

  return $.cache.pages[store][data.id];

}

/**
 * Set Template Cache
 *
 * Create or update template resource cache and returns the template model.
 */
export function setTemplateCache (
  domain: string,
  themeId: number,
  path: string,
  data: SchemaTemplates
) {

  const store = domain.endsWith('.myshopify.com')
    ? domain.slice(0, domain.indexOf('.myshopify.com')).toLowerCase()
    : domain.toLowerCase();

  if (!has(store, $.cache.templates)) {

    $.cache.templates[store] = { [themeId]: { [path]: data } };

  } else if (!has(`${themeId}`, $.cache.templates[store])) {

    $.cache.templates[store][themeId] = { [path]: data };

  } else {

    $.cache.templates[store][themeId][path] = data;

  }

  q.cache.add(save($.cache.uri.templates, $.cache.templates));

  return $.cache.templates[store][themeId][path];

}

/**
 * Get Template Cache
 *
 * Returns the template cache model.
 */
export function getTemplateCache (domain: string, themeId: number, path: string) {

  const store = domain.endsWith('.myshopify.com')
    ? domain.slice(0, domain.indexOf('.myshopify.com')).toLowerCase()
    : domain.toLowerCase();

  return hasPath(`${store}.${themeId}.${path}`, $.cache.templates)
    ? $.cache.templates[store][themeId][path]
    : setTemplateCache(domain, themeId, path, <SchemaTemplates>{});

}

/**
 * Set Paths Cache
 *
 * Create or update the paths cache
 */
export function setPathCache (input: string, output: string, rename?: PathRename) {

  let update: 0 | 1 = 0;

  if (!has('paths', $.cache)) $.cache.paths = m();

  if (rename && rename.length > 0) {

    const find = rename.find(({ match }) => match(input));

    if (!isUndefined(find)) {

      const correct = renameCorrect(input, output, find.pattern);
      output = correct.output;

      if (!$.cache.paths.has(correct.key)) {
        $.cache.paths.set(correct.key, input);
        update = 1;
      }

      if ($.cache.paths.get(correct.key) !== input) {
        $.cache.paths.set(correct.key, input);
        update = 1;
      }
    }

  } else {

    const dir = extractKeyDirName(output);
    const key = join(dir, basename(input));

    if (!$.cache.paths.has(key)) {
      $.cache.paths.set(key, input);
      update = 1;
    }

    if ($.cache.paths.get(key) !== input) {
      $.cache.paths.set(key, input);
      update = 1;
    }

  }

  if (!$.cache.paths.has(input)) {
    $.cache.paths.set(input, output);
    update = 1;
  }

  if ($.cache.paths.get(input) !== output) {
    $.cache.paths.set(input, output);
    update = 1;
  }

  if (!$.cache.paths.has(output)) {
    $.cache.paths.set(output, input);
    update = 1;
  }

  if ($.cache.paths.get(output) !== input) {
    $.cache.paths.set(output, input);
    update = 1;
  }

  if (update > 0) {

    return q.cache.add(save($.cache.uri.paths, $.cache.paths));

  }

}
