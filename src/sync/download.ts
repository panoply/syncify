import glob from 'glob';
import any from 'anymatch';
import { readFile } from 'fs-extra';
import { client, queue } from '../requests/client';
import { ignore } from '../config/utils';
import * as log from '../logs/console';
import { IConfig, Callback } from '../typings';
import { has, mapFastAsync } from 'rambdax';
import { parseFile, setMetafield, setAsset } from '../config/file';

export async function upload (
  config: Partial<IConfig>,
  callback?: typeof Callback
): Promise<void> {

  let total = 0;

  const request = client(config);

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

  await mapAsync(async ({ key }) => {

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

      const print = boxen((
        chalk`{magenta  Running}{dim :} {white downloading}\n` +
        chalk`{magenta    Store}{dim :} {dim.underline ${target.domain}.myshopify.com}\n` +
        chalk`{magenta     File}{dim :} {cyan ${basename(key)}}\n` +
        chalk`{magenta Progress}{dim :} {cyan ${total += 1}} of {cyan ${files.length}}\n` +
        chalk`{magenta   Output}{dim :} {dim ${dirName}/}{cyan ${dirname(key)}}\n` +
        chalk`{magenta   Errors}{dim :} {red ${problems.length}}`
      ), {
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

  }, files).finally(() => {

    log.print(chalk`Uploaded: {green ${total}} files.`);
    log.print(chalk`Problems: {red ${problems.length}}`);

  });
  ;

}
