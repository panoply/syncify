import type { Commands } from 'types';
import { has } from 'rambdax';
import { blue, bold, white } from '~log';
import { invalidCommand } from '~options/validate';
import * as u from '~utils/native';
import { $ } from '~state';

/**
 * CLI Filtering
 *
 * Sets the filtering logic of command line arguments
 */
export async function setFilters (cli: Commands) {

  if (!has('filter', cli)) return;

  const exp = new RegExp(`^(${[
    'assets',
    'config',
    'locales',
    'metafields',
    'layout',
    'pages',
    'customers',
    'templates',
    'snippets',
    'sections'
  ].join('|')})`);

  const parse = cli.filter.replace(/\s+/g, ' ').trim();

  if (parse.indexOf(',') > -1) {

    const multiple = parse
      .split(',')
      .filter(Boolean)
      .map(entry => entry.trim());

    for (const cmd of multiple) {

      if (cmd[0] === '!') {

        if (!exp.test(cmd.slice(1))) throwCommandError('dir', cmd);

        // TODO - Support ignore filters

      } else if (cmd[0] === '*' || cmd[0] === '/' || cmd[0] === '.') {

        throwCommandError('pattern', parse);

      } else {

        if (!exp.test(cmd)) throwCommandError('dir', cmd);

        if (cmd.indexOf('/') > -1) {

          // TODO - Support file anymatches

        } else {

          if (!u.isArray($.filters[cmd])) $.filters[cmd] = [];

          $.filters[cmd].push(cmd);

        }
      }
    }

  } else if (parse[0] === '*' || parse[0] === '/' || parse[0] === '.') {

    throwCommandError('pattern', parse);

  } else if (parse.indexOf('/') > -1) {

    // const globs =
    // const match = glob();
    // TODO - Support file anymatches

  } else {

    if (!u.isArray($.filters[parse])) $.filters[parse] = [];

    $.filters[parse].push(parse);

  }

  function throwCommandError (type: 'pattern' | 'dir', cmd: string) {

    const pattern: string[] = [];

    if (type === 'pattern') {

      pattern.push(`Invalid ${blue('--filter')} pattern provided. You cannot pass starting point`);

      if (cmd[0] === '*') {
        pattern.push(`glob (${blue('*')}) stars as filters, Syncify does not support this.`);
      } else if (cmd[0] === '/') {
        pattern.push(`path (${blue('/')}) roots as filters, Syncify does not support this.`);
      } else if (cmd[0] === '.') {
        pattern.push(`dot paths (${blue('.')})  as filters, Syncify does not support this.`);
      }

      pattern.push(
        `Use a starting point directory name based on the ${blue('paths')} key property`,
        `in your ${blue($.file.base)} file.`
      );

    } else {

      pattern.push(
        `Invalid directory provided. The ${blue('--filter')} pattern expects the starting point`,
        'directory path be one of the following:',
        '',
        `${white('-')} ${blue('assets')}`,
        `${white('-')} ${blue('config')}`,
        `${white('-')} ${blue('locales')}`,
        `${white('-')} ${blue('metafields')}`,
        `${white('-')} ${blue('layout')}`,
        `${white('-')} ${blue('pages')}`,
        `${white('-')} ${blue('customers')}`,
        `${white('-')} ${blue('templates')}`,
        `${white('-')} ${blue('snippets')}`,
        `${white('-')} ${blue('sections`')}`,
        ''
      );

    }

    invalidCommand({
      message: pattern,
      expected: '--filter <dir>',
      fix: [
        `The ${blue('--filter')} (or ${blue('-f')}) flag command argument expects you`,
        'provide a theme output directory as the starting point. Filtering begins with',
        'a Shopify output directory name, for example:',
        '',
        `${white('$')} ${white(`syncify --filter ${blue('sections/file.liquid')}`)}`,
        `${white('$')} ${white(`syncify --filter ${blue('snippets/*')}`)}`,
        `${white('$')} ${white(`syncify --filter ${blue('templates/*.json')}`)}`,
        `${white('$')} ${white(`syncify --filter ${blue('!assets/some-file.ext')}`)}`,
        '',
        `Syncify will automatically resolve files from within your defined ${bold('input')} directory`,
        'based on the starting point directory name. You can pass glob star matches following the',
        `directory namespace or starting point ignores (${blue('!')}) as long the directory can match.`
      ]
    });

  }

  console.log($.filters);

}
