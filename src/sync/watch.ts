import { readFile } from 'fs-extra';
import chokidar from 'chokidar';
// import { ignore } from '../config/utils';
import { IConfig, Syncify } from 'types';
import { client, queue } from 'requests/client';
import { parseFile, setMetafield, setAsset } from 'config/file';
import * as metas from 'requests/metafields';
import { compile as styles } from 'transform/styles';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export async function watch (config: IConfig, callback: typeof Syncify.hook) {

  const request = client(config);
  // const { settings, ignored } = ignore(config);
  const watcher = chokidar.watch(config.output, {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 50,
    binaryInterval: 100,
    cwd: config.cwd
    // ignored: ignored.files === null ? ignored.base : ignored.files
  });

  // watcher.on('ready', () => log.watching(config));
  watcher.on('all', async (event, path) => {

    const file = parseFile(config.input, path);
    console.log(file);
    // if (has('ignore', settings)) {
    // if (settings.ignore.length > 0) {
    // if (any(settings.ignore, file.key)) return log.ignoring(file.key);
    // }
    // }

    let read: string | Buffer;

    if (event === 'change' || event === 'add') {

      if (file.ext === '.scss' || file.ext === '.sass') {

        // @ts-ignore
        read = styles(config.transform.styles, file);

        if (!read) return null;

      } else {

        read = await readFile(path);

      }

      if (file.metafield) {

        if (metas.queue.isPaused) metas.queue.start();

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

        if (queue.isPaused) queue.start();

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

    } else if (event === 'unlink') {

      request.assets.queue({
        method: 'delete',
        params: {
          'asset[key]': file.key
        }
      });

    }

  });

}
