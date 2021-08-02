import drop from 'lodash.drop';
import lastIndexOf from 'lodash.lastindexof';
import { parse, basename, sep, dirname } from 'path';
import glob from 'glob';
import anymatch from 'anymatch';
import chalk from 'chalk';
import { readFile } from 'fs-extra';
import { request, asyncForEach, waitFor } from '../config/request';
import { readConfig } from '../config/config';
import { getTarget } from '../config/target';
import { ignore } from '../config/utils';
import boxen from 'boxen';
import * as log from '../config/logger';
import { CLIOptions, Callback } from '../index.d';

export async function upload (
  options: CLIOptions,
  callback: typeof Callback
): Promise<void> {

  let total: number = 0;

  const config = await readConfig();
  const target = await getTarget(config, options);

  if (!options.file) Object.assign(options, config);

  const directory = options.dir || 'theme';

  let dirMatch: RegExp | string = `^${directory}`;

  if (Array.isArray(options?._)) {
    dirMatch = new RegExp(`${dirMatch}/${options._[0]}`);
  } else {
    dirMatch = new RegExp(dirMatch);
  }

  const { settings } = ignore(options);
  const filter = settings?._?.[0] ? dirMatch : null;

  let files = glob.sync(`${directory}/**/*`, { nodir: true });

  // When using the CLI and passing in filter
  if (filter) files = files.filter(file => filter.test(file));

  // When using API and has `ignore`
  // We will exclude all ignores
  if (settings?.ignore?.length > 0) {
    files = files.filter(file => !anymatch(settings.ignore, file));
  }

  const items = files.map(file => {

    const pathParts = file.split(sep);
    const trimmedParts = drop(pathParts, (lastIndexOf(pathParts, directory) + 1));
    const filepath = trimmedParts.join(sep);

    return {
      key: filepath,
      name: basename(filepath),
      path: file
    };

  });

  const logUpdate = log.update.create(process.stdout);
  const problems = [];

  log.clear(true);

  return asyncForEach(items, async (file: { path: string, key: string }) => {

    await waitFor(100);

    const content = await readFile(file.path);

    try {

      await request(target, {
        method: 'put',
        url: `/admin/themes/${target.theme_id}/assets.json`,
        data: {
          asset: {
            key: file.key,
            attachment: content.toString('base64')
          }
        }
      });

    } catch (e) {

      const level_1 = problems.length === 0
        ? chalk`{grey.dim ┌──} {redBright Failed} '{red ${e.message}}'`
        : chalk`{grey.dim ├──} {redBright Failed} '{red ${e.message}}'`;

      const level_2 = Array.isArray(e.data) ? e.data.map(
        (value: string, index: number) => (
          Object.is(e.data.length - 1, index)
            ? chalk`{grey.dim │  └──} {dim ${value}}`
            : chalk`{grey.dim │  ├──} {dim ${value}}`
        )
      ).join('\n') : chalk`{yellow.dim.italic ${e.data}}`;

      problems.push(level_1, level_2);

    }

    const result = [
      chalk`{magenta    Store}{dim :} {dim.underline ${target.primary_domain}}     `,
      chalk`{magenta     File}{dim :} {cyan ${basename(file.key)}}`,
      chalk`{magenta Progress}{dim :} {cyan ${total += 1}} of {cyan ${items.length}}`,
      chalk`{magenta   Output}{dim :} {dim ${directory}/}{cyan ${dirname(file.key)}}`,
      chalk`{magenta   Errors}{dim :} {red ${problems.length}}`
    ].join('\n');

    const print = boxen(result, {
      padding: 1,
      borderColor: 'gray',
      dimBorder: true,
      borderStyle: 'round'
    });

    logUpdate(print, problems.length > 0 ? `\n${problems.join('\n')}` : '');

    if (typeof callback === 'function') {
      callback.apply({ file: parse(file.path), content });
    }

  }).finally(() => {

    log.print(chalk`Uploaded: {green ${total}} files.`);
    log.print(chalk`Problems: {red ${problems.length}}`);

  });

}
