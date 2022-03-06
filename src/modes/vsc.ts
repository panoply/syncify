import { mkdir, pathExistsSync, readJson, writeJson } from 'fs-extra';
import { join } from 'path';
import { allTrue, has } from 'rambdax';
import { IBundle } from 'types';
import * as tui from 'cli/tui';
import * as c from 'cli/ansi';
import * as timer from 'process/timer';

/**
 * Create `.vscode` directory
 *
 * Returns the `settings.json` path
 */
export async function createVSCodeDir (config: IBundle) {

  const vsc = join(config.cwd, '.vscode');

  if (!pathExistsSync(vsc)) {
    await mkdir(vsc);
  }

  return join(vsc, 'settings.json');

}

export const vsc = async (config: IBundle, log: (...messsage: string[]) => void) => {

  timer.start('clean');

  const file = await createVSCodeDir(config);

  log(tui.task(c.blueBright(`${c.bold('+')} created ${c.bold('.vscode')} directory`)));

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

    log(
      tui.task(
        c.greenBright(`✓ applied ${c.bold('File Associations')} to ${c.bold('.vscode/settings.json')} file`)
      ),
      tui.task(
        c.greenBright(`✓ applied ${c.bold('JSON Schemas')} to ${c.bold('.vscode/settings.json')} file`)
      ),
      tui.footer(
        c.gray('Completed Sucessfully')
      )
    );

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

    log(
      tui.task(c.yellowBright(`${c.bold('!')} JSON Schemas exists`)),
      tui.footer(c.gray('Generation Skipped'))
    );

    return true;
  }

  if (!rcfile) {
    settings['json.schemas'].push(
      {
        fileMatch: [ 'package.json' ],
        url: 'https://schema.liquify.dev/syncifypkg.json'
      }
    );

    log(
      tui.task(c.magentaBright(`✓ extended ${c.bold('package.json')} Syncify schema`))
    );
  }

  if (!schema) {

    settings['json.schemas'].push(
      {
        fileMatch: [ '.syncifyrc', '.syncifyrc.json' ],
        url: 'https://schema.liquify.dev/syncifyrc.json'
      }
    );

    log(
      tui.task(c.magentaBright(`✓ extended ${c.bold('package.json')} Syncify schema`))
    );
  }

  if (!has('file.associations')) settings['file.associations'] = {};
  if (!has('.syncifyrc', settings['file.associations'])) {
    settings['file.associations']['.syncifyrc'] = 'json';
    log(
      tui.task(
        c.greenBright(`✓ applied ${c.bold('File Associations')} to ${c.bold('.vscode/settings.json')} file`)
      )
    );
  }

  await writeJson(file, settings);

  log(tui.footer(c.gray('Completed Sucessfully')));

  return true;

};
