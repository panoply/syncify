import { copyFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';

import ansis from 'ansis';

import { log } from '../utils';

/**
 * Adds and removes a bulk amount of files from a directory, replicating a bulk operation
 */
export function BulkTests (args: { dir: string; 'bulk-add': string; 'bulk-remove': boolean; }) {

  const cwd = process.cwd();
  const sourcePath = join(cwd, 'tests', args.dir);

  if (args['bulk-add'].length > 0) {

    const type = args['bulk-add'];
    const samplePath = join(cwd, 'tests', 'samples', 'bulk', type);
    const samples = readdirSync(samplePath);
    const add = async () => {
      for (let i = 0; i < samples.length; i++) {
        const filename = samples[i];
        const path = join(sourcePath, filename);
        if (!existsSync(path)) {
          copyFileSync(join(samplePath, filename), path);
          log(ansis.greenBright(`${++i} ${ansis.bold('added')} ${relative(cwd, path)}`));
        }
      }
    };

    add();
  }

  if (args['bulk-remove']) {

    const sourcePath = join(cwd, 'tests', args.dir);
    const sourceFiles = readdirSync(sourcePath);
    const remove = async () => {
      for (let i = 0; i < sourceFiles.length; i++) {
        const filename = sourceFiles[i];
        const path = join(sourcePath, filename);
        rmSync(path, { force: true });
        log(ansis.magentaBright(`${ansis.bold('removed')} ${relative(cwd, path)}`));
      }
    };

    remove();
  }

}
