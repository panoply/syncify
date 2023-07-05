import { Request, Store, File, Methods, Sync, Requests } from 'types';
import pMap from 'p-map';
import { mapParallelAsync } from 'rambdax';
import { queue } from '../requests/queue';
import { isUndefined } from '../utils/native';
import * as asset from '../requests/assets';
import * as metafields from '../requests/metafields';
import merge from 'mergerino';
import { bundle } from '~config';
import * as timer from '~utils/timer';
// import merge from 'mergerino';
// import * as pages from '../requests/pages';

/* -------------------------------------------- */
/* EXPORTED                                     */
/* -------------------------------------------- */

export { queue } from '../requests/queue';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

export type AssetRequest = (method: Methods, file: File, content?: any) => Promise<any[]>

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

      await queue.add(() => pMap(themes, async (theme) => {

        if (bundle.mode.upload) {
          timer.start();
        }

        await asset.sync(
          theme,
          file,
          merge({ url: theme.url }, stores[theme.sidx].client, payload)
        );

      }));

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
