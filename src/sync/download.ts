import anymatch from 'anymatch';
import { join, parse, dirname, basename } from 'path';
import { writeFile, mkdirp } from 'fs-extra';
import chalk from 'chalk';
import { readConfig } from '../config/config';
import { getTarget } from '../config/target';
import { ignore } from '../config/utils';
import { request, asyncForEach, waitFor } from '../config/request';
import { Buffer } from 'buffer';
import * as log from '../config/logger';
import boxen from 'boxen';
import { CLIOptions, Callback } from '../index.d';

/**
 * Download
 */
export async function download (options: CLIOptions, callback: typeof Callback) {

  let total = 0;

  const config = await readConfig();
  const target = await getTarget(config, options);

  if (!options.file) Object.assign(options, config);

  const problems = [];
  const cwd = process.cwd();
  const dirName = options.dir || 'theme';
  const filter = options._?.[0] ? new RegExp(dirName) : null;
  const { settings } = ignore(options);
  const { assets } = await request(target, {
    method: 'GET',
    url: `/admin/themes/${target.theme_id}/assets.json`
  });

  let files: Array<{ key: string, name: string, path: string}>;

  if (filter) files = assets.filter((file: string) => filter.test(file));

  files = settings?.ignore?.length > 0
    ? assets.filter(({ key }) => !anymatch(settings.ignore, key))
    : files || assets;

  log.clear(true);

  return asyncForEach(files, async ({ key }) => {

    await waitFor(100);

    try {

      const { asset } = await request(target, {
        method: 'GET',
        url: `/admin/themes/${target.theme_id}/assets.json`,
        params: { 'asset[key]': key }
      });

      const encode = asset.attachment ? 'base64' : 'utf8';
      const content = asset.attachment || asset.value;
      const buffer = Buffer.from(content, encode);
      const path = join(cwd, dirName, key || null);

      await mkdirp(join(cwd, dirName, dirname(key)));
      await writeFile(path, buffer);

      if (typeof callback === 'function') {
        callback.apply({
          file: parse(path),
          content
        });
      }

      const result = [
        chalk`{magenta    Store}{dim :} {dim.underline ${target.primary_domain}}     `,
        chalk`{magenta     File}{dim :} {cyan ${basename(key)}}`,
        chalk`{magenta Progress}{dim :} {cyan ${total += 1}} of {cyan ${files.length}}`,
        chalk`{magenta   Output}{dim :} {dim ${dirName}/}{cyan ${dirname(key)}}`
      ].join('\n');

      const print = boxen(result, {
        padding: 1,
        margin: 1,
        borderColor: 'gray',
        dimBorder: true,
        borderStyle: 'round'
      });

      log.update(print, problems.length > 0 ? `\n${problems.join('\n')}` : '');

    } catch (error) {

      const report = Array.isArray(error.data)
        ? error.data.map((value: string) => chalk`{red >} {white.dim ${value}}`)
        : chalk`{yellow.dim.italic ${error.data}}`;

      problems.push(chalk`{red Failed} '{red ${error.message}}'`, report);

    }

  }).finally(() => {

    log.print(chalk`Uploaded: {green ${total}} files.`);
    log.print(chalk`Problems: {red ${problems.length}}`);

  });
  ;

}
