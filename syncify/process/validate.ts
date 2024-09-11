/* eslint-disable no-unused-vars */
import { join, parse, relative } from 'node:path';
import * as c from '@syncify/ansi';
import { $ } from 'syncify:state';
import { glob } from 'fast-glob';
import { throwError } from 'syncify:log/throws';
import { Stats } from 'types';
import * as log from 'syncify:log';
import { DSH } from '@syncify/ansi';

export const enum Mismatch {
  /**
   * No template mismatches, proceed as normal
   */
  None = 1,
  /**
   * Cancelled via prompts
   */
  Cancel
}

export async function hasTemplateMismatch (cwd: string): Promise<Mismatch | Set<string>> {

  const files = await glob('templates/*', { cwd, absolute: true });

  const exclude: Set<string> = new Set();
  const exists: Set<string> = new Set();

  for (const file of files) {

    const { name } = parse(file);
    const templates = files.filter(path => parse(path).name === name);

    if (templates.length > 1 && !exists.has(name)) exists.add(name);
  }

  if (exists.size === 0) return Mismatch.None;

  if (exists.size > 1) {
    log.write(`${c.bold(`${exists.size}`)} mismatch template files`, {
      suffix: 'error',
      type: 'error'
    });
  } else {
    log.write(`${c.bold(`${exists.size}`)} mismatch template file`, {
      suffix: 'error',
      type: 'error'
    });
  }

  const resume = log.prompt(`select ${c.bold('.json')} or ${c.bold('.liquid')} template`, {
    title: 'Export Error',
    message: 'Multiple templates detected'
  });

  const { action } = await prompts([
    {
      name: 'action',
      type: 'select',
      message: 'Select an Option',
      hint: ' ',
      instructions: false,
      choices: [
        {
          title: 'Select Templates',
          description: 'Choose which templates to export',
          value: 'select'
        },
        {
          title: 'Export .json Templates',
          description: 'Exports the .json templates',
          value: 'json'
        },
        {
          title: 'Export .liquid Templates',
          description: 'Exports the .liquid templates',
          value: 'liquid'
        },
        {
          title: 'Cancel Export',
          value: 'cancel'
        }
      ]
    }
  ]);

  if (action === 'select') {

    const choices: prompts.PromptObject[] = [];

    for (const name of exists) {

      choices.push({
        name: 'choice',
        type: 'toggle',
        message: 'templates',
        hint: ' ',
        active: `${name}.json`,
        inactive: `${name}.liquid`,
        onState: ({ value }) => {
          if (value) {
            exclude.add(join(cwd, 'templates', `${name}.liquid`));
          } else {
            exclude.add(join(cwd, 'templates', `${name}.json`));
          }
        }
      });

    }

    await prompts(choices).then(() => resume());

    return exclude;

  } else if (action === 'json') {

    for (const name of exists) {
      exclude.add(join(cwd, 'templates', `${name}.json`));
    }

    resume();

    return exclude;

  } else if (action === 'liquid') {

    for (const name of exists) {
      exclude.add(join(cwd, 'templates', `${name}.liquid`));
    }

    resume();

    return exclude;

  } else if (action === 'cancel') {

    resume();

  }

  return Mismatch.Cancel;

}

/**
 * Checks whether or not the output directory contains files.
 */
export function isEmptyOutputDir (stats?: Stats) {

  if (
    stats.assets === 0 &&
    stats.config === 0 &&
    stats.templates === 0 &&
    stats.layout === 0 &&
    stats.snippets === 0 &&
    stats.sections === 0) {

    throwError('Empty output directory', [
      `There are no files within ${c.neonCyan(relative($.cwd, $.dirs.output) + '/**')}`,
      `You may need to run the ${c.neonCyan.bold('syncify build')} command and try again.`
    ]);

  }

}

/**
 * Validates the generated `output` theme structure.
 * This is done at the pre-build level.
 */
export function hasMissingFiles (stats: Stats) {

  if (stats.layout === 0) {

    throwError(`Missing ${c.neonCyan('layout')} files/s`, [
      `There are no layout files ${c.neonCyan(relative($.cwd, $.dirs.output + '/layout') + '/*.liquid')}`,
      `Theme exports require a layout (${c.neonCyan.bold('theme.liquid')}) to be provided.`
    ]);

  }

  if (stats.locales === 0) {

    throwError('Missing locales/s', [
      `There are no locale files ${c.neonCyan(relative($.cwd, $.dirs.output + '/locale') + '/*.json')}`,
      `Theme exports require at least ${c.bold('1')} of the following locale JSON files:`,
      '',
      `${DSH} ${c.yellowBright('en.default.json')}`,
      ''
    ]);

  }

  if (stats.config === 0) {

    throwError('Missing config/s', [
      `There are no config files ${c.neonCyan(relative($.cwd, $.dirs.output + '/config') + '/*.json')}`,
      `Theme exports require at least ${c.bold('1')} of the following setting JSON files:`,
      '',
      `${DSH} ${c.yellowBright('settings_schema.json')}`,
      `${DSH} ${c.yellowBright('settings_data.json')}`,
      ''
    ]);

  }

  if (stats.templates === 0) {

    throwError('Missing template/s', [
      `There are no templates files ${c.neonCyan(relative($.cwd, $.dirs.output + '/templates') + '/**')}`,
      'Theme exports should include the below list of templates to exist:',
      '',
      `${DSH} ${c.yellowBright('index.json')} or ${c.yellowBright('index.liquid')})`,
      `${DSH} ${c.yellowBright('product.json')} or ${c.yellowBright('product.liquid')})`,
      `${DSH} ${c.yellowBright('collection.json')} or ${c.yellowBright('collection.liquid')})`,
      `${DSH} ${c.yellowBright('cart.json')} or ${c.yellowBright('cart.liquid')})`,
      `${DSH} ${c.yellowBright('search.json')} or ${c.yellowBright('search.liquid')})`,
      `${DSH} ${c.yellowBright('password.json')} or ${c.yellowBright('password.liquid')})`,
      `${DSH} ${c.yellowBright('404.json')} or ${c.yellowBright('404.liquid')})`,
      `${DSH} ${c.yellowBright('page.json')} or ${c.yellowBright('page.liquid')})`,
      `${DSH} ${c.yellowBright('gift_card.json')} or ${c.yellowBright('gift_card.liquid')})`,
      ''

    ]);

  }

}
