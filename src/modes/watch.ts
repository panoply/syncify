import { Syncify, File, Pages, StyleTransform, ScriptTransform } from 'types';
import chokidar from 'chokidar';
import { client } from '../requests/client';
import { compile as liquid } from '../transform/liquid';
import { styles } from '../transform/styles';
import { script } from '../transform/script';
import { compile as asset } from '../transform/asset';
import { compile as json } from '../transform/json';
import { compile as pages } from '../transform/pages';
import { is, isUndefined, from } from '../shared/native';
import { Kind, parseFile, Type } from '../process/files';
import { bundle } from '../options/index';
import { c, log } from '../logger';
import { socket, server } from './server';
import { event } from '../shared/utils';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function watch (callback: Syncify) {

  server(bundle);

  const wss = socket(bundle);
  const request = client(bundle.sync);
  const parse = parseFile(bundle.paths, bundle.dirs.output);
  const watcher = chokidar.watch(from(bundle.watch.values()), {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 50,
    binaryInterval: 100,
    ignored: [ '**/*.map' ]
  });

  event.on('script:watch', (d) => { });

  // console.log(bundle.watch);

  watcher.on('all', async function (event, path) {

    const file: File = parse(path);

    if (isUndefined(file)) return;

    // console.log(file);

    if (file.type !== Type.Spawn) log.changed(file);

    if (is(event, 'change') || is(event, 'add')) {

      try {

        let value: string | void | { title: any; body_html: any; } = null;

        if (file.type === Type.Script) {

          value = await script(file as File<ScriptTransform>, callback);

        } else if (file.type === Type.Style) {

          value = await styles(file as File<StyleTransform>, callback);

        } else if (file.type === Type.Section || file.type === Type.Layout || file.type === Type.Snippet) {

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

        }

        if (value !== null) {

          if (wss !== null) wss.assets();

          log.syncing(file.key);

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
