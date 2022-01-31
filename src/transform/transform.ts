/* eslint-disable no-unused-vars */

import { IConfig, IFile, IStyle, Syncify } from 'types';
import { client } from 'requests/client';
import { Type, isStyle, isMetafield, isSection, asset } from 'config/file';
import * as metas from 'requests/metafields';
import { compile as liquid } from 'transform/liquid';
import { compile as styles } from 'transform/styles';
import { compile as json } from 'transform/json';
import { is } from 'config/utils';
import { readFile } from 'fs-extra';

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

      /* -------------------------------------------- */
      /* STYLES                                       */
      /* -------------------------------------------- */

      if (is(file.type, Type.Style)) {

        const style = isStyle(file as IFile<IStyle>, config.transform.styles);
        const data = await readFile(style.config.input);

        return styles(style, data.toString(), request.assets);

      }

      /* -------------------------------------------- */
      /* METAFIELDS                                   */
      /* -------------------------------------------- */

      if (is(file.type, Type.Metafield)) {

        if (metas.queue.isPaused) metas.queue.start();

        const metafield = isMetafield(file);
        const data = await json(metafield, config.transform.json, cb);

        return request.metafields.queue(
          {
            namespace: file.namespace,
            key: file.key,
            value: data
          }
        );

      }

      /* -------------------------------------------- */
      /* SECTIONS                                     */
      /* -------------------------------------------- */

      if (is(file.type, Type.Section)) {

        const section = isSection(file, config.transform.views.sections);
        const attachment = await liquid(section, config.transform.views.minify, cb);

        return request.assets.queue(
          {
            method: 'put',
            data: {
              asset: {
                key: file.key,
                attachment
              }
            }
          }
        );

      }

      /* -------------------------------------------- */
      /* LAYOUTS AND SNIPPETS                         */
      /* -------------------------------------------- */

      if (is(file.type, Type.Layout) || is(file.type, Type.Snippet)) {

        const attachment = await liquid(file, config.transform.views.minify, cb);

        return request.assets.queue(
          {
            method: 'put',
            data: {
              asset: {
                key: file.key,
                attachment
              }
            }
          }
        );

      }

      /* -------------------------------------------- */
      /* CONFIG AND LOCALES                           */
      /* -------------------------------------------- */

      if (is(file.type, Type.Config) || is(file.type, Type.Locale)) {

        const attachment = await json(file, config.transform.json, cb);

        return request.assets.queue(
          {
            method: 'put',
            data: {
              asset: {
                key: file.key,
                attachment
              }
            }
          }
        );

      }

      /* -------------------------------------------- */
      /* TEMPLATES                                    */
      /* -------------------------------------------- */

      if (is(file.type, Type.Template)) {

        const attachment = file.ext === '.json'
          ? await json(file, config.transform.json, cb)
          : await liquid(file, config.transform.views.minify, cb);

        return request.assets.queue(
          {
            method: 'put',
            data: {
              asset: {
                key: file.key,
                attachment
              }
            }
          }
        );

      }

      /* -------------------------------------------- */
      /* ASSETS                                       */
      /* -------------------------------------------- */

      if (is(file.type, Type.Asset)) {

        const data = await readFile(file.path);
        const attachment = asset(file, data, cb);

        return request.assets.queue(
          {
            method: 'put',
            data: {
              asset: {
                key: file.key,
                attachment
              }
            }
          }
        );
      }

    }

    /* -------------------------------------------- */
    /* DELETED FILE                                 */
    /* -------------------------------------------- */

    if (is(event, Events.Delete)) {

      return request.assets.queue(
        {
          method: 'delete',
          params: {
            'asset[key]': file.key
          }
        }
      );

    }

  };
}
