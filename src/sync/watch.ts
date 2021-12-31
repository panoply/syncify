import path from 'path';
import { readFile } from 'fs-extra';
import { drop, has } from 'rambdax';
import chokidar from 'chokidar';
import any from 'anymatch';
import { client } from '../config/request';
import { ignore } from '../config/utils';
import * as log from '../logs/console';
import { Callback, IConfig } from '../typings';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export async function watch (config: Partial<IConfig>, callback: typeof Callback) {

  const request = client(config);
  const directory = config.dir || 'theme';
  const dirMatch = new RegExp(`^${directory}`);
  const dirWatch = [ `./${directory}/` ];
  const { settings, ignored } = ignore(config);
  const watcher = chokidar.watch(dirWatch, {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 50,
    binaryInterval: 100,
    cwd: config.cwd,
    ignored: ignored.files === null ? ignored.base : ignored.files,
  });

  watcher
  .on('ready', () => log.watching(config))
  .on('all', async (event, file) => {

    const parts = file.split(path.sep);
    const key = drop(parts.lastIndexOf(directory) + 1, parts).join(path.sep);

    if (!dirMatch.test(file) || /^\..*$/.test(file)) {
      return log.issue(`Issue in match "/^..*$/" at: ${file}"`);
    }

    if (has('ignore', settings)) {
      if(settings.ignore.length > 0) {
        if(any(settings.ignore, file)) return log.ignoring(file);
      }
    }

    const parse = path.parse(file);

    if (event === 'change' || event === 'add') {

      let data = await readFile(file);

      if (typeof callback === 'function') {

        const update = callback.apply(parse, data);

        if(typeof update === 'undefined') {

          log.modified(file);

          if (Buffer.isBuffer(update)) {
            data = update;
          } else if (typeof update === 'string') {
            data = Buffer.from(update);
          } else {
            return log.issue('Modifier can only return a type string or Buffer')
          }

        }
      }

      try {

        await request('themes', {
          method: 'PUT',
          data: {
            asset: {
              key: key,
              attachment: data.toString('base64')
            }
          }
        });

        if(event === 'add') {
          log.creation(file);
        } else {
          log.uploaded(file);
        }
      } catch(e) {

        log.error(e)

      }

    } else if (event === 'unlink') {

      try {

        await request('themes', {
          method: 'DELETE',
          params: { 'asset[key]': key.split(path.sep).join('/') }
        });

        log.deletion(file);

      } catch(e) {

        log.error(e)

      }
    }

  });

}
