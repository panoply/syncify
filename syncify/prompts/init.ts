import { join, resolve } from 'node:path';

import { pathExists, stat, writeFile } from 'fs-extra';

import * as _ from '@syncify/ansi';

import * as throws from '~cli/throws';
import { createCaches } from '~options/define/caches';
import { getEnv } from '~options/define/env';
import { createProject } from '~options/define/project';
import { Action, getTargets } from '~options/define/store';
import { SaveKeychain } from '~prompts/create';
import { PromptCredentialsFile } from '~prompts/credentials';
import { PromptStorage } from '~prompts/targets';
import { plur } from '~utils';

import { $ } from '$';

export async function Init () {

  if (
    $.file.project !== null &&
    $.project.credentials !== null &&
    $.project.targetSource !== null) return throws.projectExists();

  if (await isFlatStructure()) return throws.flatStructure();

  const tasks: string[] = [];

  if ($.project.credentials === null) {

    const access = await PromptCredentialsFile({ greeting: true, keychain: true });

    $.project.credentials = access.method === 'env' ? 'env' : 'kc';
    $.project.createdAt = Date.now();

    await createCaches($.hash);
    await createProject(join($.root, $.project.name));

    tasks.push('Created cache reference for project');

    /* CREATE CREDENTIALS ------------------------- */

    if (access.method === 'keychain') {

      await SaveKeychain(access);

      tasks.push('Project credentials stored in keychain');

    } else {

      $.file.env = join($.cwd, '.env');

      await writeFile($.file.env, access.env);
      await getEnv();

      tasks.push('Project credentials stored in .env file');
    }

  }

  if ($.file.targets === null || $.project.targetSource === null) {

    const hasPKG = $.pkg !== null;
    const method = await PromptStorage();

    if (method === 'package.json') {
      if (!hasPKG) tasks.push('Generated a package.json file in project');
      tasks.push('Project targets stored in package.json file');
    } else {
      tasks.push(`Project targets stored in ${method} file`);
    }

    await getTargets({
      method,
      action: Action.PROMPT_THEMES,
      banner: true,
      oninit: false
    });

    tasks.push(`Linked ${$.target.length} ${plur('theme', $.target.length)} from store`);

  }

  const write = _.Create().Newline();

  if (tasks.length > 0) {
    write.Each(tasks, function (task) { this.Line(`${_.CHK} ${task}`); }).Newline();
  }

  write
  .End($.log.group)
  .Break()
  .toLog();

  process.exit(0);

}

/**
 * Checks for the existence of theme directories in the location where
 * `sy init` was executed. When boolean `true` we are in a
 */
async function isFlatStructure () {

  try {

    for (const dir of [
      'assets',
      'config',
      'layout',
      'locales',
      'sections',
      'snippets',
      'templates'
    ]) {

      const dirPath = resolve(dir);
      const exists = await pathExists(dirPath);

      if (!exists) return false;

      const stats = await stat(dirPath);

      if (!stats.isDirectory()) return false;
    }

    return true;

  } catch (e) {

    throws.errorRuntime(e, {
      message: `Error checking directories when performing ${_.blue('sy init')} tasks.`,
      solution: [
        'This error was thrown during fs operations. It is typically rare and likely',
        'unrelated to Syncify. Please report the issue on github.'
      ]
    });

    return false;

  }
}
