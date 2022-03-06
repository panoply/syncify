/* eslint-disable brace-style */

import chokidar from 'chokidar';
import { Syncify, IConfig, IFile, IStyle } from 'types';
import { readFile } from 'fs-extra';
import { client, queue } from 'requests/client';
import { compile as liquid } from 'transform/liquid';
import { styles } from 'transform/styles';
import { compile as json } from 'transform/json';
import { compile as pages } from 'transform/pages';
import { is } from 'shared/native';
import { parseFile, Type } from 'process/files';
import { bundle } from 'options';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function watch (callback: typeof Syncify.hook) {

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

  watcher.on('all', async (event, path) => {

    const file: IFile = parse(path);

    if (is(event, 'change') || is(event, 'add')) {

      switch (file.type) {
        case Type.Style:

          await styles(file as IFile<IStyle>);

          break;

        case Type.Section:
        case Type.Layout:
        case Type.Snippet:

          await liquid(file, callback);

          break;

        case Type.Locale:
        case Type.Config:
        case Type.Metafield:

          await json(file, callback);

          break;

        case Type.Template:

          if (file.ext === '.json') {
            await json(file, callback);
          } else {
            await liquid(file, callback);
          }

          break;

        case Type.Asset:

          break;
      }

    } else if (is(event, 'delete')) {

      /* -------------------------------------------- */
      /* DELETED FILE                                 */
      /* -------------------------------------------- */

      // log.pr(file);

      await request.assets('delete', file);

    }

  });

};
