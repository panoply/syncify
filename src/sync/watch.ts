import path from 'path';
import { readFile } from 'fs-extra';
import { drop, has, isType, last } from 'rambdax';
import chokidar from 'chokidar';
import any from 'anymatch';
import { client } from '../client/request';
import { ignore } from '../config/utils';
import * as log from '../logs/console';
import { Callback, IConfig, IFile } from '../typings';
import * as assets from '../client/assets';
import * as metas from '../client/metafields';

/**
 * Parse File
 *
 * Parses the filename and returns a workable
 * object that we will pass into requests. Determines
 * whether or not we are working with metafield or asset
 * and vice-versa.
 */
function parseFile (dir: string, file: string): IFile {

  const parts = file.split(path.sep);
  const parent = drop(parts.lastIndexOf(dir) + 1, parts);
  const ext = file.slice(last(parts).lastIndexOf('.') + 1);

  return parent[0] === 'metafields' ? {
    ext,
    file,
    metafield: true,
    namespace: parent[1],
    key: parent[2].slice(0, 5)
  } : {
    ext,
    file,
    metafield: false,
    key: parent.join(path.sep)
  };

}

/**
 * Minify JSON
 *
 * Metafields are trimmed of whitespace
 * and comments. Syncify allows JSON with
 * comments be provided, this function strips
 * them and will push a minified to the store.
 */
function minifyJSON (data: string) {

  try {

    const parse = JSON.parse(data);

    return JSON.stringify(parse, null, 0);

  } catch (e) {

    return log.error(e);

  }

}

/**
 * Metafields Modifier
 *
 * Handler function for a content modifier
 * callback that one can optionally execute
 * from within scripts.
 */
function setMetafield (
  file: IFile,
  data: Buffer | string | object | any[],
  callback: typeof Callback
) {

  if (typeof callback !== 'function') return minifyJSON(data.toString());

  const update = callback.apply({ ...file, ...path.parse(file.file) }, data);

  if (isType('Undefined', update)) return minifyJSON(data.toString());
  if (isType('String', update) || isType('Array', update) || isType('Object', update)) {
    return minifyJSON(update);
  }

  return minifyJSON(data.toString());

}

/**
 * Asset Modifier
 *
 * Handler function for a content modifier
 * callback that one can optionally execute
 * from within scripts.
 */
function setAsset (
  file: IFile,
  data: Buffer | string | object | any[],
  callback: typeof Callback
) {

  if (typeof callback !== 'function') return data.toString('base64');

  const update = callback.apply({ ...file, ...path.parse(file.file) }, data);

  if (isType('Undefined', update)) return data.toString('base64');

  if (/\.(liquid|html|json|js|css|scss|sass|txt)/.test(file.ext)) {
    return update.toString('base64');
  }

  return data.toString('base64');

}

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export async function watch (config: Partial<IConfig>, callback: typeof Callback) {

  const request = client(config);
  const dir = config.dir || 'theme';
  const dirWatch = `./${dir}/`;
  const { settings, ignored } = ignore(config);
  const watcher = chokidar.watch(dirWatch, {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 50,
    binaryInterval: 100,
    cwd: config.cwd,
    ignored: ignored.files === null ? ignored.base : ignored.files
  });

  watcher.on('ready', () => log.watching(config));

  watcher.on('all', async (event, path) => {

    const file = parseFile(dir, path);

    if (has('ignore', settings)) {
      if (settings.ignore.length > 0) {
        if (any(settings.ignore, file.key)) return log.ignoring(file.key);
      }
    }

    if (event === 'change' || event === 'add') {

      const read = await readFile(path);

      if (file.metafield) {

        if (metas.queue.isPaused) metas.queue.start();

        const value = setMetafield(file, read, callback);

        console.log(config);
        if (value) {
          request.metafield.update({
            namespace: file.namespace,
            key: file.key,
            value
          });
        }

      } else {

        if (assets.queue.isPaused) assets.queue.start();

        request.asset.update({
          key: file.key,
          attachment: setAsset(file, read, callback)
        });

      }

    } else if (event === 'unlink') {

      request.asset.remove(file.key);

    }

  });

}
