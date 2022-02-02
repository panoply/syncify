import glob from 'glob';
import { readFile } from 'fs-extra';
import { client, queue } from 'requests/client';
import { IConfig, Syncify } from 'types';
import { mapFastAsync } from 'rambdax';
import { parseFile } from 'config/file';

export async function upload (config: IConfig, callback?: typeof Syncify.hook): Promise<void> {

  // let total: number = 0;

  // const { settings } = ignore(config);

  // const filter = settings?._?.[0] ? dirMatch : null;

  const files = glob.sync(`${config.output}/**`, { nodir: true });
  const parse = parseFile(config.paths, config.output);
  const transform = transforms(config, callback);
  const request = client(config, files.length * config.sync.themes.length);
  const parse = parseFile(config);

  // When using the CLI and passing in filter
  // if (filter) files = files.filter(file => filter.test(file));

  // const problems = [];

  // log.clear(true);

  await mapFastAsync(async (path: string) => {

    const file = parse(path);

    // if (has('ignore', settings)) {
    //  if (settings.ignore.length > 0) {
    //   if (any(settings.ignore, file.key)) return log.ignoring(file.key);
    // }
    // }

    const read = await readFile(path);

    if (queue.isPaused) queue.start();

    if (file.metafield) {

      const value = setMetafield(file, read, callback);

      if (value) {
        request.metafields.queue({
          method: 'put',
          data: {
            metafield: {
              namespace: file.namespace,
              key: file.key,
              value
            }
          }
        });
      }

    } else {

      request.assets.queue({
        method: 'put',
        data: {
          asset: {
            key: file.key,
            attachment: setAsset(file, read, callback)
          }
        }
      });

    }

    /* const print = log.stream({
      running: 'uploading',
      store: '',
      file: basename(file.key),
      size: items.length,
      errors: problems.length,
      output: directory,
      total: total += 1
    }); */

    // log.update(print, problems.length > 0 ? `\n${problems.join('\n')}` : '');

    // const report = log.error(e);

    // problems.push(chalk`{red Failed} '{red ${e.message}}'`, report);

  }, files);

  // log.uploaded(chalk`Uploaded: {green ${total}} files.`);
  // log.print(chalk`Problems: {red ${problems.length}}`);

}
