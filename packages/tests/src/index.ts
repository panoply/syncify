import { copyFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';
import { argv } from 'node:process';
import { parseArgs } from 'node:util';

import ansis from 'ansis';

// const delay = (ms: number = 250) => new Promise(resolve => setTimeout(resolve, ms));

const cwd = process.cwd();

const args = parseArgs({
  args: argv.slice(2),
  options: {
    dir: {
      type: 'string',
      default: ''
    },
    'bulk-add': {
      type: 'string',
      default: ''
    },
    'bulk-remove': {
      type: 'boolean',
      default: false
    }
  }
});

const dir = args.values.dir;

if (args.values['bulk-add'].length > 0) {

  const type = args.values['bulk-add'];
  const samplePath = join(cwd, 'tests', 'samples', 'bulk', type);
  const samples = readdirSync(samplePath);
  const sourcePath = join(cwd, 'tests', dir);

  async function add () {

    let i = 0;
    for (const filename of samples) {

      const path = join(sourcePath, filename);

      if (!existsSync(path)) {
        copyFileSync(join(samplePath, filename), path);
        console.log(ansis.greenBright(`  ${++i} ${ansis.bold('added')} ${relative(cwd, path)}`));
      }
    }

    console.log('');

  }

  add();
}

if (args.values['bulk-remove']) {

  const sourcePath = join(cwd, 'tests', dir);
  const sourceFiles = readdirSync(sourcePath);

  async function remove () {

    for (const filename of sourceFiles) {
      const path = join(sourcePath, filename);
      rmSync(path, { force: true });
      console.log(ansis.magentaBright(`  ${ansis.bold('removed')} ${relative(cwd, path)}`));
    }

    console.log('');

  }

  remove();

}
