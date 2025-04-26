import { resolve } from 'node:path';

import { pathExists, readdir, stat } from 'fs-extra';

import * as _ from '@syncify/ansi';

import { throws } from '~cli/throws';

import { $ } from '$';

/**
 * Checks for the existence of Syncify directories, specifically
 * a `source` (input) directory.
 */
export async function hasDirsInit () {

  // Read the contents of the current directory
  const items = await readdir($.cwd, { withFileTypes: true });

  return items.filter(item => item.isDirectory()).length > 2;

}

/**
 * Checks for the existence of theme directories in the location where
 * `sy init` was executed. When boolean `true` we are in a
 */
export async function isFlatStructure () {

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

    throws([
      `Error checking directories when performing ${_.blue('sy init')} tasks.`
    ], [
      'This error was thrown during fs operations. It is typically rare and likely',
      'unrelated to Syncify. Please report the issue on github.'
    ]);

    return false;

  }
}
