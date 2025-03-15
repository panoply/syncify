import { join } from 'node:path';

import { ensureDir, ensureDirSync, mkdirSync, pathExists, pathExistsSync } from 'fs-extra';

import { updateProject } from './project';

import { unknownProject } from '~cli/throws';
import { CACHE_FILES, READ_WRITE_OWNER } from '~const';
import { clearCache, decode, save } from '~process/cache';
import { forEach, o } from '~utils';

import { $, q } from '$';

/**
 * Syncify requires hard-caches which are generated and installed
 * in the users OS home directory contained within a `.syncify` folder.
 *
 * The `.syncify` directory is generated during `postinstall` operations,
 * but can also be created programmatically. The project specific directories
 * use checksum hashed names and will be created only when one the following set
 * of conditions and met:
 *
 * - User has ran `$ sy create` wherein project was generated
 * - User has ran `$ sy setup` and setup syncify on project
 * - User has ran `$ sy keychain` and applied store association
 * - Project has a `.env` file present with correct storefront token.
 *
 * In some situations, the correct files maybe present in current CWD which signals
 * that we need to generate caches because conditions have been met in another manner.
 * We can acheive this by passing `{ create: true }` parameter.
 */
export function caches ({ create = false } = {}) {

  const generate = () => {

    forEach(ensureDirSync, [
      $.root,
      $.dirs.cache,
      $.dirs.hot,
      $.dirs.temp,
      $.dirs.sourcemaps.root,
      $.dirs.sourcemaps.scripts,
      $.dirs.sourcemaps.styles
    ]);

    if ($.file.project === null) {
      $.file.project = join($.root, $.project.name);
      updateProject();
    }

  };

  if (create) generate();

}

/**
 * Recreates or creates caches for the project.
 * Accepts a hash parameter for recreation situations.
 * The `$` reference paths are updated in this operation.
 */
export async function createCaches (hash?: string) {

  if (!pathExistsSync($.home)) mkdirSync($.home);
  if (hash) $.hash = hash;

  $.root = join($.home, $.hash);

  $.dirs.cache = join($.root, 'cache');
  $.dirs.temp = join($.root, 'temp');
  $.dirs.hot = join($.root, 'hot');
  $.dirs.sourcemaps.root = join($.root, 'sourcemaps');
  $.dirs.sourcemaps.scripts = join($.dirs.sourcemaps.root, 'scripts');
  $.dirs.sourcemaps.styles = join($.dirs.sourcemaps.root, 'styles');

  for (const path of [
    $.root,
    $.dirs.cache,
    $.dirs.temp,
    $.dirs.sourcemaps.root,
    $.dirs.sourcemaps.scripts,
    $.dirs.sourcemaps.styles,
    $.dirs.hot
  ]) {

    await ensureDir(path, { mode: READ_WRITE_OWNER });

  }

  for (const file of CACHE_FILES) {

    const path = join($.dirs.cache, file);
    const alive = await pathExists(path);

    if (alive !== true) {

      await save(path, {})();

    }

  }

}

/**
 * Called during the runtime define and is responsible for setting up
 * the cache references.
 *
 * This function is important because in cases where syncify is is ran,
 * but its execution location is of an unknown origin (does not exist in cache).
 * It will throw
 *
 * This check ensures that if the situation was to arise where syncify is called
 * unexpectedly, that a new hard-cache is not generated needlessly.
 */
export async function getCaches () {

  // First, we are going to analyse the execution performed
  // Only when init mode is false and project file is null
  //
  if ($.mode.init === false && $.file.project === null) {
    if ($.project.credentials !== null) {
      caches({ create: true });
    } else {
      unknownProject();
      return;
    }
  }

  $.cache.uri = o();

  for (const file of CACHE_FILES) {

    $.cache.uri[file] = join($.dirs.cache, file);

    if (await pathExists($.cache.uri[file])) {
      q.cache.add(async () => {
        $.cache[file] = await decode($.cache.uri[file]);
      });
    } else {
      $.cache[file] = {};
      q.cache.add(save($.cache.uri[file], $.cache[file]));
    }

  }

  if ($.mode.prune) {
    q.cache.onIdle().then(() => clearCache());
  }
}
