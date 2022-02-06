/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */

import { IConfig, IFile, IStyle, Syncify } from 'types';
import { client, queue } from 'requests/client';
import { Type, isStyle, isMetafield, isSection, asset } from 'config/file';
import { compile as liquid } from 'transform/liquid';
import { transform as styles } from 'transform/styles';
import { compile as json } from 'transform/json';
import { is } from 'config/utils';
import { readFile } from 'fs-extra';
import * as log from 'cli/logs';

export const enum Events {
  Update = 2,
  Delete = 3
}

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function transforms (config: IConfig, cb: typeof Syncify.hook) {

  const request = client(config);

  return async (event: Events, file: IFile) => {

    if (is(event, Events.Update)) {

      log.fileChange(file);

      /* -------------------------------------------- */
      /* STYLES                                       */
      /* -------------------------------------------- */

      if (is(file.type, Type.Style)) {

        const style = isStyle(file as IFile<IStyle>, config.transform.styles);
        const data = await styles(style);

        if (!data) return;

        await request.assets.queue('put', style, data);

      }

      /* -------------------------------------------- */
      /* METAFIELDS                                   */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Metafield)) {

        if (queue.isPaused) queue.start();

        const metafield = isMetafield(file);
        const data = await json(metafield, config.transform.json, cb);

        await request.metafields.queue('put', metafield, {
          namespace: file.namespace,
          key: file.key,
          value: data
        });

      }

      /* -------------------------------------------- */
      /* SECTIONS                                     */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Section)) {

        const section = isSection(file, config.transform.views.sections);
        const attachment = await liquid(section, config.transform.views.minify, cb);

        await request.assets.queue('put', section, attachment);

      }

      /* -------------------------------------------- */
      /* LAYOUTS AND SNIPPETS                         */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Layout) || is(file.type, Type.Snippet)) {

        const attachment = await liquid(file, config.transform.views.minify, cb);

        await request.assets.queue('put', file, attachment);

      }

      /* -------------------------------------------- */
      /* CONFIG AND LOCALES                           */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Config) || is(file.type, Type.Locale)) {

        const attachment = await json(file, config.transform.json, cb);

        await request.assets.queue('put', file, attachment);

      }

      /* -------------------------------------------- */
      /* TEMPLATES                                    */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Template)) {

        const attachment = file.ext === '.json'
          ? await json(file, config.transform.json, cb)
          : await liquid(file, config.transform.views.minify, cb);

        await request.assets.queue('put', file, attachment);

      }

      /* -------------------------------------------- */
      /* ASSETS                                       */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Asset)) {

        const data = await readFile(file.path);
        const attachment = asset(file, data, cb);

        await request.assets.queue('put', file, attachment);

      }

    }

    /* -------------------------------------------- */
    /* DELETED FILE                                 */
    /* -------------------------------------------- */

    else if (is(event, Events.Delete)) {

      log.fileRemove(file);

      await request.assets.queue('delete', file);

    }

  };
}
