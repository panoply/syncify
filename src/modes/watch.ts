/* eslint-disable brace-style */

import chokidar from 'chokidar';
import { Syncify, IFile, IStyle, IPages } from 'types';
import { client } from '../requests/client';
import { compile as liquid } from 'transform/liquid';
import { styles } from 'transform/styles';
import { compile as asset } from 'transform/asset';
import { compile as json } from 'transform/json';
import { compile as pages } from 'transform/pages';
import { is, isUndefined } from 'shared/native';
import { parseFile, Type } from 'process/files';
import { bundle } from '../options/index';
import { log } from 'cli/logger';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function watch (callback: Syncify) {

  const request = client(bundle.sync);
  const parse = parseFile(bundle.paths, bundle.dirs.output);
  const watcher = chokidar.watch(bundle.watch, {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 50,
    binaryInterval: 100,
    ignored: [ '*.map' ]
  });

  watcher.on('all', async function (event, path) {

    const file: IFile = parse(path);

    if (isUndefined(file)) return;

    if (is(event, 'change') || is(event, 'add')) {

      try {

        log.watch();

        let value: string | void | { title: any; body_html: any; } = null;

        if (file.type === Type.Style) {

          log.group('styles').file(file.base);

          value = await styles(file as IFile<IStyle>, callback);

        } else if (file.type === Type.Section || file.type === Type.Layout || file.type === Type.Snippet) {

          value = await liquid(file, callback);

        } else if (file.type === Type.Locale || file.type === Type.Config) {

          value = await json(file, callback);

        } else if (file.type === Type.Metafield) {

          value = await json(file, callback);

          log.unwatch();

          return request.metafields({ value, namespace: file.namespace, key: file.key });

        } else if (file.type === Type.Template && file.ext === '.json') {

          value = await json(file, callback);

        } else if (file.type === Type.Template && file.ext === '.liquid') {

          value = await liquid(file, callback);

        } else if (file.type === Type.Asset) {

          value = await asset(file, callback);

        } else if (file.type === Type.Page) {

          log.group('pages').file(file.base);

          value = await pages(file as IFile<IPages>, callback);

          console.log(value);
          //  log.unwatch();

          return;

          // return request.pages(value);
        }

        if (value !== null) {

          return request.assets('put', file, value);

        }

        log.unwatch();

      } catch (error) {

        log.unwatch();

        console.error(error);

      }

    } else if (is(event, 'delete')) {

      /* -------------------------------------------- */
      /* DELETED FILE                                 */
      /* -------------------------------------------- */

      return request.assets('delete', file);

    }

  });

};
