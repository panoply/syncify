/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */

import { IConfig, IFile, IStyle, Syncify } from 'types';
import { client, queue } from 'requests/client';
import { Type, isStyle, isMetafield, isSection, isAsset } from 'config/file';
import { compile as liquid } from 'transform/liquid';
import { transform as styles } from 'transform/styles';
import { compile as json } from 'transform/json';
import { is } from 'shared/native';
import { readFile } from 'fs-extra';
import * as log from 'cli/logs';

export const enum Events {
  Upload = 1,
  Update = 2,
  Delete = 3
}

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export const transforms = (config: IConfig, cb: typeof Syncify.hook) => {

  const request = client(config);

  return async (event: Events, file: IFile) => {

    if (is(event, Events.Update) || is(event, Events.Upload)) {

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
        const data = await liquid(section, config.transform.views.minify, cb);

        if (!data) return;

        await request.assets.queue('put', section, data);

      }

      /* -------------------------------------------- */
      /* LAYOUTS AND SNIPPETS                         */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Layout) || is(file.type, Type.Snippet)) {

        const data = await liquid(file, config.transform.views.minify, cb);

        if (!data) return;

        await request.assets.queue('put', file, data);

      }

      /* -------------------------------------------- */
      /* CONFIG AND LOCALES                           */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Config) || is(file.type, Type.Locale)) {

        const data = await json(file, config.transform.json, cb);

        if (!data) return;

        await request.assets.queue('put', file, data);

      }

      /* -------------------------------------------- */
      /* TEMPLATES                                    */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Template)) {

        const data = file.ext === '.json'
          ? await json(file, config.transform.json, cb)
          : await liquid(file, config.transform.views.minify, cb);

        if (!data) return;

        await request.assets.queue('put', file, data);

      }

      /* -------------------------------------------- */
      /* ASSETS                                       */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Asset)) {

        const read = await readFile(file.path);
        const data = isAsset(file, read, cb);

        if (!data) return;

        await request.assets.queue('put', file, data);

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
};
