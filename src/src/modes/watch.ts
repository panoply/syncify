/* eslint-disable brace-style */

import chokidar from 'chokidar';
import { Syncify, IConfig, IFile, IStyle } from 'types';
import { parseFile, Type, isStyle, isMetafield, isSection, isAsset } from 'config/file';
import { client, queue } from 'requests/client';
import { compile as liquid } from 'transform/liquid';
import { transform as styles } from 'transform/styles';
import { compile as json } from 'transform/json';
import { compile as pages } from 'transform/pages';
import { is } from 'shared/native';
import { readFile } from 'fs-extra';
import * as log from 'cli/logs';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function watch (config: IConfig, cb: typeof Syncify.hook) {

  const request = client(config);
  const parse = parseFile(config.paths, config.output);
  const watcher = chokidar.watch(config.watch, {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 50,
    binaryInterval: 100,
    cwd: config.cwd,
    ignored: [
      '*.map'
    ]
  });

  watcher.on('all', async (event, path) => {

    const file: IFile = parse(path);

    if (is(event, 'change') || is(event, 'add')) {

      log.fileChange(file);

      if (is(file.type, Type.Style)) {

        /* -------------------------------------------- */
        /* STYLES                                       */
        /* -------------------------------------------- */

        const style = isStyle(file as IFile<IStyle>, config.transform.styles);
        const data = await styles(style);

        if (!data) return;

        await request.assets('put', style, data);

      } else if (is(file.type, Type.Page)) {

        /* -------------------------------------------- */
        /* PAGES                                        */
        /* -------------------------------------------- */

        if (queue.isPaused) queue.start();

        const data = await pages(file, config.transform.markdown, cb);

        await request.pages('put', data);

      } else if (is(file.type, Type.Metafield)) {

        /* -------------------------------------------- */
        /* METAFIELDS                                   */
        /* -------------------------------------------- */

        if (queue.isPaused) queue.start();

        const metafield = isMetafield(file);
        const data = await json(metafield, config.transform.json, cb);

        await request.metafields('put', {
          namespace: file.namespace,
          key: file.key,
          value: data
        });

      } else if (is(file.type, Type.Section)) {

        /* -------------------------------------------- */
        /* SECTIONS                                     */
        /* -------------------------------------------- */

        const section = isSection(file, config.transform.views.sections);
        const data = await liquid(section, config.transform.views.minify, cb);

        if (!data) return;

        await request.assets('put', section, data);

      } else if (is(file.type, Type.Layout) || is(file.type, Type.Snippet)) {

        /* -------------------------------------------- */
        /* LAYOUTS AND SNIPPETS                         */
        /* -------------------------------------------- */

        const data = await liquid(file, config.transform.views.minify, cb);

        if (!data) return;

        await request.assets('put', file, data);

      } else if (is(file.type, Type.Config) || is(file.type, Type.Locale)) {

        /* -------------------------------------------- */
        /* CONFIG AND LOCALES                           */
        /* -------------------------------------------- */

        const data = await json(file, config.transform.json, cb);

        if (!data) return;

        await request.assets('put', file, data);

      } else if (is(file.type, Type.Template)) {

        /* -------------------------------------------- */
        /* TEMPLATES                                    */
        /* -------------------------------------------- */

        const data = file.ext === '.json'
          ? await json(file, config.transform.json, cb)
          : await liquid(file, config.transform.views.minify, cb);

        if (!data) return;

        await request.assets('put', file, data);

      } else if (is(file.type, Type.Asset)) {

        /* -------------------------------------------- */
        /* ASSETS                                       */
        /* -------------------------------------------- */

        const read = await readFile(file.path);
        const data = isAsset(file, read, cb);

        if (!data) return;

        await request.assets('put', file, data);

      }

    } else if (is(event, 'delete')) {

      /* -------------------------------------------- */
      /* DELETED FILE                                 */
      /* -------------------------------------------- */

      log.fileRemove(file);

      await request.assets('delete', file);

    }

  });

};
