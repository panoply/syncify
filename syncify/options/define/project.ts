import type { ValueOf } from 'type-fest';
import type { Project } from 'types';

import { execSync } from 'child_process';
import { basename, join } from 'node:path';

import { existsSync, readJSONSync } from 'fs-extra';
import writeFileAtomic from 'write-file-atomic';

import { runtime } from '~cli/runtime';
import { getFuture, has } from '~utils';

import { $, q } from '$';

export async function createProject (path: string) {

  $.file.project = path;

  await writeFileAtomic($.file.project, JSON.stringify($.project));

}

/**
 * Update project references and write atomic
 */
export function updateProject () {

  q.cache.add(async () => {
    if ($.file.project !== null) {
      await writeFileAtomic($.file.project, JSON.stringify($.project));
    }
  });

}

export function projectProxy (model: Project) {

  return new Proxy(model, {
    set: (target: Project, prop: string, value: ValueOf<Project>) => {
      if (has(prop, target)) {
        const current = target[prop];
        if (current !== value) {
          target[prop] = value;
          updateProject();
        }
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
      syncifyVersion: VERSION,
      hotVersion: HOT_VERSION,
      configVersion: null,
      themeVersion: null,
      targetSource: null,
      textEditor: null,
      gitRemote: null,
      expires: getFuture(3),
      credentials: null,
      createdAt: date,
      lastRunAt: date,
      lastVersionCheck: date
    });

    getGitAddress();

  }
}

/**
 * Get Git Address
 *
 * Returns the remote Git origin of the project.
 */
export function getGitAddress () {

  if (!$.project.gitRemote) {

    try {
      $.project.gitRemote = execSync('git config --get remote.origin.url').toString().trim();
    } catch {
      return false;
    }

  }
}
