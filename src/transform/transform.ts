/* eslint-disable no-unused-vars */

import { IConfig, IFile, Syncify } from 'types';
import { client } from 'requests/client';
import { Type, isStyle, isMetafield, isSection, asset } from 'config/file';
import { join } from 'path';
import * as metas from 'requests/metafields';
import { compile as liquid } from 'transform/liquid';
import { compile as styles } from 'transform/styles';
import { compile as json } from 'transform/json';
import { is } from 'config/utils';
import { readFile, writeFile } from 'fs-extra';

export const enum Events {
  Update = 2,
  Delete = 3
}

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function transforms (req: ReturnType<typeof client>, opts: IConfig, cb: typeof Syncify.hook) {

  return async (event: Events, file: IFile) => {

    let data: string | Buffer;

    if (is(event, Events.Update)) {

      /* -------------------------------------------- */
      /* STYLES                                       */
      /* -------------------------------------------- */

      if (is(file.type, Type.Style)) {

        const style = isStyle(file, opts.transform.styles);
        const data = await readFile(style.path);

        return styles(style, data.toString(), opts.transform.styles, req.assets);

        /* -------------------------------------------- */
        /* METAFIELDS                                   */
        /* -------------------------------------------- */

      } else if (is(file.type, Type.Metafield)) {

        if (metas.queue.isPaused) metas.queue.start();

        file = isMetafield(file);
        data = await json(file, opts.transform.json, cb);

        return req.metafields.queue(
          {
            method: 'put',
            data: {
              metafield: {
                namespace: file.namespace,
                key: file.key,
                value: data
              }
            }
          }
        );

        /* -------------------------------------------- */
        /* SECTIONS                                     */
        /* -------------------------------------------- */

      } else if (is(file.type, Type.Section)) {

        file = isSection(file, opts.transform.views.sections);
        data = await liquid(file, opts.transform.views.minify, cb);

        return req.assets.queue(
          {
            method: 'put',
            data: {
              asset: {
                key: file.key,
                attachment: asset(file, data, cb)
              }
            }
          }
        );

        /* -------------------------------------------- */
        /* LAYOUTS AND SNIPPETS                         */
        /* -------------------------------------------- */

      } else if (is(file.type, Type.Layout) || is(file.type, Type.Snippet)) {

        const data = await liquid(file, opts.transform.views.minify, cb);

        req.assets.queue(
          {
            method: 'put',
            data: {
              asset: {
                key: file.key,
                attachment: asset(file, data, cb)
              }
            }
          }
        );

        /* -------------------------------------------- */
        /* CONFIG AND LOCALES                           */
        /* -------------------------------------------- */

      } else if (is(file.type, Type.Config) || is(file.type, Type.Locale)) {

        data = await json(file, opts.transform.json, cb);

        req.assets.queue(
          {
            method: 'put',
            data: {
              asset: {
                key: file.key,
                attachment: asset(file, data, cb)
              }
            }
          }
        );

        /* -------------------------------------------- */
        /* TEMPLATES                                    */
        /* -------------------------------------------- */

      } else if (is(file.type, Type.Template)) {

        data = file.ext === '.json'
          ? await json(file, opts.transform.json, cb)
          : await liquid(file, opts.transform.views.minify, cb);

        req.assets.queue(
          {
            method: 'put',
            data: {
              asset: {
                key: file.key,
                attachment: asset(file, data, cb)
              }
            }
          }
        );

      } else if (is(file.type, Type.Asset)) {

        const data = await readFile(file.path);

        req.assets.queue(
          {
            method: 'put',
            data: {
              asset: {
                key: file.key,
                attachment: asset(file, data, cb)
              }
            }
          }
        );
      }

    } else if (is(event, Events.Delete)) {

      req.assets.queue(
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
