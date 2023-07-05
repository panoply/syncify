import { Bundle } from 'types';
import { mkdir, pathExistsSync, readJson, writeJson } from 'fs-extra';
import { join } from 'path';
import { allTrue, has } from 'rambdax';
import { log, c } from '~log';
import * as timer from '~utils/timer';

/**
 * Create `.vscode` directory
 *
 * Returns the `settings.json` path
 */
export async function createVSCodeDir (config: Bundle) {

  const vsc = join(config.cwd, '.vscode');

  if (!pathExistsSync(vsc)) {
    await mkdir(vsc);
  }

  return join(vsc, 'settings.json');

}

export async function vsc (config: Bundle) {

  timer.start();

  const file = await createVSCodeDir(config);

  log.write(c.blueBright(`${c.bold('+')} created ${c.bold('.vscode')} directory`));

  if (!pathExistsSync(file)) {

    await writeJson(file, {
      'file.associations': {
        '.syncifyrc': 'json'
      },
      'json.schemas': [
        {
          fileMatch: [ 'syncify.json' ],
          url: 'https://schema.liquify.dev/syncify.json'
        },
        {
          fileMatch: [ 'package.json' ],
          url: 'https://schema.liquify.dev/syncifypkg.json'
        },
        {
          fileMatch: [ '.syncifyrc', '.syncifyrc.json' ],
          url: 'https://schema.liquify.dev/syncifyrc.json'
        }
      ]
    }, {
      spaces: 2
    });

    log.write(c.greenBright(`✓ applied ${c.bold('File Associations')} to ${c.bold('.vscode/settings.json')} file`));
    log.write(c.greenBright(`✓ applied ${c.bold('File Associations')} to ${c.bold('.vscode/settings.json')} file`));
    log.write(c.gray('Completed Sucessfully'));

    return true;

  }

  const settings: {
    'json.schemas'?: Array<{
      fileMatch: string[],
      url: string
    }>
  } = await readJson(file);

  if (!has('json.schemas')) settings['json.schemas'] = [];

  let rcfile: boolean = false;
  let schema: boolean = false;

  if (settings['json.schemas'].length > 0) {
    for (let i = 0; i < settings['json.schemas'].length; i++) {

      const record = settings['json.schemas'][i];

      if (allTrue(rcfile, schema)) break;

      if (record.url === 'https://schema.liquify.dev/syncifypkg.json') {
        schema = true;
        continue;
      }

      if (record.url === 'https://schema.liquify.dev/syncifyrc.json') {
        rcfile = true;
        continue;
      }

    }
  }

  if (allTrue(rcfile, schema)) {

    log.write(c.yellowBright(`${c.bold('!')} JSON Schemas exists`));
    log.write(c.gray('Generation Skipped'));

    return true;
  }

  if (!rcfile) {
    settings['json.schemas'].push(
      {
        fileMatch: [ 'package.json' ],
        url: 'https://schema.liquify.dev/syncifypkg.json'
      }
    );

    log.write(c.magentaBright(`✓ extended ${c.bold('package.json')} Syncify schema`));

  }

  if (!schema) {

    settings['json.schemas'].push(
      {
        fileMatch: [ '.syncifyrc', '.syncifyrc.json' ],
        url: 'https://schema.liquify.dev/syncifyrc.json'
      }
    );

    log.write(c.magentaBright(`✓ extended ${c.bold('package.json')} Syncify schema`));

  }

  if (!has('file.associations')) settings['file.associations'] = {};
  if (!has('.syncifyrc', settings['file.associations'])) {
    settings['file.associations']['.syncifyrc'] = 'json';
    log.write(c.greenBright(`✓ applied ${c.bold('File Associations')} to ${c.bold('.vscode/settings.json')} file`));
  }

  await writeJson(file, settings);

  log.write(c.gray('Completed Sucessfully'));

  return true;

};
