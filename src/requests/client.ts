import { Request, Store, File, Methods, Sync, Requests, Theme } from 'types';
import { mapAsync, mapParallelAsync } from 'rambdax';
import { queue } from '../requests/queue';
import { assign, isUndefined } from '../utils/native';
import * as asset from '../requests/assets';
import * as metafields from '../requests/metafields';
import merge from 'mergerino';
// import * as pages from '../requests/pages';

/* -------------------------------------------- */
/* EXPORTED                                     */
/* -------------------------------------------- */

export { queue } from '../requests/queue';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

export type AssetRequest = (method: Methods, file: File, content?: any) => Promise<any[]>

/* -------------------------------------------- */
/* CLIENT                                       */

export function client ({ stores, themes }: Sync) {

  return ({

    assets: async <T>(method: Methods, file: File<T>, content?: any) => {

      const payload: Partial<Request> = isUndefined(content) ? {
        method,
        params: {
          'asset[key]': file.key
        }
      } : {
        method,
        data: {
          asset: {
            key: file.key,
            value: content
          }
        }
      };

      await queue.add(() => mapAsync<Theme, any>(async function (theme) {

        await asset.sync(
          theme,
          file,
          assign<any, any, Partial<Request>>(
            { url: theme.url },
            stores[theme.sidx].client,
            payload
          )
        );

      }, themes));

    },
    pages: (content?: Requests.Page) => {

      return queue.add(function () {

        return mapParallelAsync<Store, any>(async function (store) {

          //  await pages.sync(store, content);

        }, stores);

      });

    },

    metafields: (content?: Requests.Metafield) => {

      return queue.add(function () {

        return mapParallelAsync<Store, any>(async function (store) {

          await metafields.sync(store, content);

        }, stores);

      });

    }

  });

};
