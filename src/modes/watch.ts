import { Syncify, File, Pages, StyleTransform, ScriptTransform } from 'types';
import chokidar from 'chokidar';
import { inject } from '../hot/inject';
import { client, queue } from '../requests/client';
import { compile as liquid } from '../transform/liquid';
import { styles } from '../transform/styles';
import { script } from '../transform/script';
import { compile as asset } from '../transform/asset';
import { compile as json } from '../transform/json';
import { compile as pages } from '../transform/pages';
import { is, isUndefined, from, ws } from '../shared/native';
import { Kind, parseFile, Type } from '../process/files';
import { bundle } from '../config';
import { log } from '../logger';
import { socket } from './server';
import { event } from '../shared/utils';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function watch (callback: Syncify) {

  const wss = socket();
  const request = client(bundle.sync);
  const parse = parseFile(bundle.paths, bundle.dirs.output);
  const watcher = chokidar.watch(from(bundle.watch.values()), {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 75,
    binaryInterval: 100,
    ignored: [ '**/*.map' ]
  });

  event.on('script:watch', (d) => { });

  watcher.on('all', async function (event, path) {

    const file: File = parse(path);

    if (isUndefined(file)) return;

    if (file.type !== Type.Spawn) log.changed(file);

    if (is(event, 'change') || is(event, 'add')) {

      try {

        let value: string | void | { title: any; body_html: any; } = null;

        if (file.type === Type.Script) {

          value = await script(file as File<ScriptTransform>, callback);

          wss.script(file.key);

        } else if (file.type === Type.Style) {

          value = await styles(file as File<StyleTransform>, callback);

          wss.stylesheet(file.key);

        } else if (file.type === Type.Section) {

          value = await liquid(file, callback);

        } else if (file.type === Type.Layout) {

          value = await liquid(file, callback);

          if (bundle.hot) value = inject(value);

        } else if (file.type === Type.Snippet) {

          value = await liquid(file, callback);

        } else if (file.type === Type.Locale || file.type === Type.Config) {

          value = await json(file, callback);

        } else if (file.type === Type.Metafield) {

          value = await json(file, callback);

          return request.metafields({ value, namespace: file.namespace, key: file.key });

        } else if (file.type === Type.Template && file.kind === Kind.JSON) {

          value = await json(file, callback);

        } else if (file.type === Type.Template && file.kind === Kind.Liquid) {

          value = await liquid(file, callback);

        } else if (file.type === Type.Page) {

          value = await pages(file as File<Pages>, callback);

          return;

          // return request.pages(value);
        } else if (file.type === Type.Asset || file.type === Type.Spawn) {

          value = await asset(file, callback);

          // wss.assets(file.key);

        }

        if (value !== null) {

          log.syncing(file.key);

          await request.assets('put', file, value);

          if (file.type === Type.Section) {
            wss.section(file.name);
          } else if (file.type !== Type.Script && file.type !== Type.Style) {
            await queue.onIdle().then(() => wss.replace());
          }

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
