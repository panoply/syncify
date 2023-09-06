import type { Commands } from 'types';
import { has } from 'rambdax';
import { join } from 'pathe';
import { PATH_KEYS, THEME_DIRS } from '~const';
import { blue, bold, log, white, yellow } from '~log';
import { invalidCommand } from '~log/validate';
import { isArray } from '~utils';
import { $ } from '~state';

/**
 * Throws filter error
 *
 * When an invalid filter is passed, an error is thrown
 * which is generated below.
 */
function throwCommandError (type: 'pattern' | 'dir', cmd: string) {

  const pattern: string[] = [];
  const ref: {
    base?: string;
    from?: string;
    dirs?: string[];
    fix?: string[]
  } = { };

  if ($.mode.upload) {

    ref.base = 'output';
    ref.from = 'output';
    ref.dirs = THEME_DIRS.map(dir => `${white('-')} ${blue(dir)}`);
    ref.fix = [
      `The ${blue('--filter')} (or ${blue('-f')}) flag command argument expects you`,
      'provide a theme output directory as the starting point. Filtering begins with',
      'a Shopify output directory name, for example:',
      '',
      `${white('$')} ${white(`syncify --filter ${blue('sections/file.liquid')}`)}`,
      `${white('$')} ${white(`syncify --filter ${blue('snippets/*')}`)}`,
      `${white('$')} ${white(`syncify --filter ${blue('templates/*.json')}`)}`,
      `${white('$')} ${white(`syncify --filter ${blue('!assets/some-file.ext')}`)}`,
      '',
      `Syncify will automatically resolve files from within your defined ${bold(ref.base)} directory`,
      'based on the starting point directory name. You can pass glob star matches following the',
      `directory namespace or starting point ignores (${blue('!')}) as long the directory can match.`
    ];

  } else {

    ref.base = 'input';
    ref.from = 'paths';
    ref.dirs = PATH_KEYS.map(dir => `${white('-')} ${blue(dir)}`);
    ref.fix = [
      `The ${blue('--filter')} (or ${blue('-f')}) flag command argument expects you`,
      `provide a ${yellow.bold('paths')} key name as the starting point. Filtering begins with`,
      'a Shopify output directory name, for example:',
      '',
      `${white('$')} ${white(`syncify --filter ${blue('sections/file.liquid')}`)}`,
      `${white('$')} ${white(`syncify --filter ${blue('snippets/*')}`)}`,
      `${white('$')} ${white(`syncify --filter ${blue('templates/*.json')}`)}`,
      `${white('$')} ${white(`syncify --filter ${blue('!assets/some-file.ext')}`)}`,
      '',
      `Syncify will automatically resolve files from within your defined ${bold(ref.base)} directory`,
      `based on the starting point ${bold('paths')} name. You can pass glob star matches following the`,
      `starting point or ignores (${blue('!')}) as long the reference can match.`
    ];

  }

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
      `Use a starting point reference name based on the ${blue(ref.from)} key property`,
      `in your ${blue($.file.base)} file.`
    );

  } else {

    pattern.push(
      `Invalid directory provided. The ${blue('--filter')} pattern expects the starting point`,
      'directory path be one of the following:',
      '',
      ...ref.dirs,
      ''
    );

  }

  invalidCommand({
    message: pattern,
    expected: '--filter <dir>',
    fix: ref.fix
  });

}

/**
 * Filter Validator
 *
 * Utility function for checking the passed filter and ensuring
 * it is correct. Accepts either a string list in cases where
 * comma separated filters are passed or alternatively a string.
 *
 * The `regexp` is determined according to
 */
function parseFilter (base: string, input: string, regexp: RegExp) {

  // Step 1
  //
  // Invalid starter patterns - Filters should start with reference
  // Example of failures:
  //
  // --filter *
  // --filter /
  // --filter .
  //
  // Filters need to begin with base paths, eg:
  //
  // --filter snippets/
  // --filter templates/
  //
  // etc etc
  //
  if (input[0] === '*' || input[0] === '/' || input[0] === '.') {
    throwCommandError('pattern', input);
  }

  // Step 2
  //
  // Ignore filter, eg: --filter !snippets/file.liquid
  //
  if (input[0] === '!') {

    // Step 2.1
    // Throw is starting reference is not a valid reference
    //
    if (!regexp.test(input.slice(1))) throwCommandError('dir', input);

    return; // TODO - Support ignore filters

  }

  // Step 3
  //
  // Validate starting reference is a valid directory
  // For example:
  //
  // --filter snippets/
  //
  // The starting reference but either be a path property
  // name as per syncify.config.ts or and output theme directory
  // name. The regexp matcher will differ depending on mode executed.
  //
  if (!regexp.test(input)) throwCommandError('dir', input);

  const path = input.slice(0, input.indexOf('/'));

  // Step 4
  //
  // If we get here we will add the filter value into
  // state model. The filter will be a valid directory
  //
  if (!isArray($.filters[path])) $.filters[path] = [];

  $.filters[path].push(join(base, input));

}

/**
 * CLI Filtering
 *
 * Sets the filtering logic of command line arguments
 */
export async function setFilters (cli: Commands) {

  if (!has('filter', cli)) return;

  const base = $.mode.upload ? $.dirs.output : $.dirs.input;
  const filter = cli.filter.replace(/\s+/g, ' ').trim();
  const regexp = $.mode.upload
    ? new RegExp(`^(${THEME_DIRS.join('|')})`)
    : new RegExp(`^(${PATH_KEYS.join('|')})`);

  if (filter.indexOf(',') > -1) {

    const multiple = filter
      .split(',')
      .filter(Boolean)
      .map(entry => entry.trim());

    for (const input of multiple) parseFilter(base, input, regexp);

  } else {

    parseFilter(base, filter, regexp);

  }

  log.out($.filters);

}
