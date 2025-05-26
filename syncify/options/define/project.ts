import type { ValueOf } from 'type-fest';
import type { Project } from 'types';

import { execSync } from 'child_process';
import { basename, join } from 'node:path';

import { existsSync, readFile, readJSONSync, remove, writeJSONSync } from 'fs-extra';
import writeFileAtomic from 'write-file-atomic';

import { runtime } from '~cli/runtime';
import { getFuture, has, isEmpty } from '~utils';

import { $, q } from '$';

export async function createProject (path: string) {

  $.file.project = path;

  await writeFileAtomic($.file.project, JSON.stringify($.project));

  if (!($.project.dir in $.projects)) {
    $.projects[$.project.dir] = $.hash;
    await writeFileAtomic($.file.projects, JSON.stringify($.projects, null, 2));
  }

}

/**
 * Update project references and write atomic
 */
export function updateProject () {
  if ($.file.project !== null) {
    q.cache.add(async () => {
      await writeFileAtomic($.file.project, JSON.stringify($.project, null, 2));
    });
  }
}

export function projectProxy (model: Project) {

  // Add new augmentations etc to project reference here
  //
  if (!has('hash', model)) model.hash = $.hash;
  if (!has('cache', model)) model.cache = $.dirs.cache;

  return new Proxy(model, {
    set: (target: Project, prop: string, value: ValueOf<Project>) => {

      if (has(prop, target) && target[prop] !== value) {
        target[prop] = value;
        updateProject();
      }

      return true;
    }
  });

};

/**
 * The {@link $.project} model holds cached data that is
 * stored in User home path. Each update to the `$.project` store
 * must be atomically written to the external file as it will be
 * re-used and the contents of `$.project` help speed up runtime.
 *
 * The object model is a `Proxy` for this purpose, as {@link setProjectCache}
 * is executed on new writes which have changed.
 *
 * **RUNTIME CALLS**
 *
 * This function will trigger:
 *
 * - {@link runtime.startup}
 */
export function project () {

  runtime.startup();

  // Setup Requirement
  // Creates or populates the projects reference
  //
  if (!existsSync($.file.projects)) {
    $.projects = {};
    writeJSONSync($.file.projects, $.projects);
  } else {
    $.projects = readJSONSync($.file.projects);
  }

  const dir = $.cwd;
  const name = basename(dir);
  const date = Date.now();

  if (existsSync($.root)) {

    $.file.project = join($.root, name);
    $.project = projectProxy(readJSONSync($.file.project));
    $.project.lastRunAt = date;

    // trigger a prune if cache has expired
    $.mode.prune = $.mode.prune === false && $.project.expires > date;

  } else {

    $.project = projectProxy({
      name,
      dir,
      hash: $.hash,
      cache: $.dirs.cache,
      syncifyVersion: VERSION,
      hotVersion: HOT_VERSION,
      configVersion: null,
      themeVersion: null,
      targetSource: null,
      textEditor: null,
      gitRemote: null,
      syncifyConfig: null,
      expires: getFuture(3),
      credentials: null,
      createdAt: date,
      lastRunAt: date,
      lastVersionCheck: date
    });

    if (!$.project.gitRemote) getGitAddress();

  }

  // We need to perform cache checks to remove any stale references
  // to ensure caches are always reflective. This is tad expensive
  // and not something I very much like, but it is what it is, the
  // operation executed in a task queue so it shouldn't interfere with
  // other runtime operations and conclude by the time we are done.
  //
  // Both the .keychain and the .projects stores will be updated whenever
  // stale or removed projects are determined.
  //
  q.tasks.add(async () => {

    if (isEmpty($.projects)) return;

    const modified: string[] = [];

    for (const [ uri, dir ] of Object.entries($.projects)) {
      if (!(existsSync(uri))) {
        const path = join($.home, dir);
        await remove(path);
        delete $.projects[uri];
        modified.push(dir);
      }
    }

    if (modified.length > 0) {

      await writeFileAtomic($.file.projects, JSON.stringify($.projects, null, 2));

      let keychain = await readFile($.file.keychain, 'utf-8');

      if (keychain.trim() === '{}') {

        $.keychain = JSON.parse(keychain);

      } else {

        let changes: boolean = false;

        for (const token of modified) {
          const regex = new RegExp(`"${token}",?`, 'g');
          if (regex.test(keychain)) {
            keychain = keychain.replace(new RegExp(`"${token}",?`, 'g'), '');
            if (!changes) changes = true;
          }
        }

        if (changes) {
          keychain = keychain.replace(/,\s*\]/g, ']').replace(/\[\s*\]/g, '[]');
          await writeFileAtomic($.file.keychain, keychain);
        }

        $.keychain = JSON.parse(keychain);

      }

    }

  });

}

/**
 * Get Git Address
 *
 * Returns the remote Git origin of the project.
 */
export function getGitAddress () {

  try {
    $.project.gitRemote = execSync('git config --get remote.origin.url').toString().trim();
  } catch {
    $.project.gitRemote = null;
    return false;
  }

}
