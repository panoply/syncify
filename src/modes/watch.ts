import chokidar from 'chokidar';
import { Syncify, IFile, IStyle, IPages } from 'types';
import { client, queue } from '../requests/client';
import { compile as liquid } from '../transform/liquid';
import { styles } from '../transform/styles';
import { compile as asset } from '../transform/asset';
import { compile as json } from '../transform/json';
import { compile as pages } from '../transform/pages';
import { is, isUndefined, ws } from '../shared/native';
import { parseFile, Type } from '../process/files';
import { bundle } from '../options/index';
import { c, log } from '../logger';
import { Server } from 'ws';
/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function watch (callback: Syncify) {

  const wss = new Server({ port: 8090, path: '/ws' });
  const request = client(bundle.sync);
  const parse = parseFile(bundle.paths, bundle.dirs.output);
  const watcher = chokidar.watch(bundle.watch, {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 50,
    binaryInterval: 100,
    ignored: [ '**/*.map' ]
  });

  wss.on('connection', v => {
    wss.on('assets', () => v.send('assets'));
    wss.on('reload', () => v.send('reload'));
    wss.on('replace', () => v.send('replace'));
  });

  wss.emit('assets');

  watcher.on('all', async function (event, path) {

    const file: IFile = parse(path);

    if (isUndefined(file)) return;

    if (file.type !== Type.Spawn) log.changed(file);

    if (is(event, 'change') || is(event, 'add')) {

      try {

        let value: string | void | { title: any; body_html: any; } = null;

        if (file.type === Type.Style) {

          value = await styles(file as IFile<IStyle>, callback);

        } else if (file.type === Type.Section || file.type === Type.Layout || file.type === Type.Snippet) {

          value = await liquid(file, callback);

        } else if (file.type === Type.Locale || file.type === Type.Config) {

          value = await json(file, callback);

        } else if (file.type === Type.Metafield) {

          value = await json(file, callback);

          return request.metafields({ value, namespace: file.namespace, key: file.key });

        } else if (file.type === Type.Template && file.ext === '.json') {

          value = await json(file, callback);

        } else if (file.type === Type.Template && file.ext === '.liquid') {

          value = await liquid(file, callback);

        } else if (file.type === Type.Page) {

          value = await pages(file as IFile<IPages>, callback);

          return;

          // return request.pages(value);
        } else if (file.type === Type.Asset || file.type === Type.Spawn) {

          value = await asset(file, callback);

        }

        if (value !== null) {

          wss.emit('assets');
          // if (queue.isPaused) queue.start();

          log.syncing(c.bold(`${file.key}`));

          await request.assets('put', file, value);

        }

      } catch (e) {

        log.throws(e);

      }

    } else if (is(event, 'delete')) {

      /* -------------------------------------------- */
      /* DELETED FILE                                 */
      /* -------------------------------------------- */

      return request.assets('delete', file);

    }

  });

};
