/* eslint-disable brace-style */

import chokidar from 'chokidar';
import { Syncify, IFile, IStyle } from 'types';
import { client } from '../requests/client';
import { compile as liquid } from 'transform/liquid';
import { styles } from 'transform/styles';
import { compile as asset } from 'transform/asset';
import { compile as json } from 'transform/json';
// import { compile as pages } from 'transform/pages';
import { is, isUndefined } from 'shared/native';
import { parseFile, Type } from 'process/files';
import { bundle } from '../options/index';

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

        } else if (file.type === Type.Template) {

          if (file.ext === '.json') {
            value = await json(file, callback);
          } else {
            value = await liquid(file, callback);
          }

        } else if (file.type === Type.Asset) {

          value = await asset(file, callback);

        } else if (file.type === Type.Page) {

          //  value = await pages(file, callback);

          // return request.pages('put', value);
        }

        if (value !== null) {

          return request.assets('put', file, value);

        }

      } catch (error) {

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
