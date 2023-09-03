import { Request, Store, File, Methods, Sync, Requests } from 'types';
import pMap from 'p-map';
import { mapParallelAsync } from 'rambdax';
import { queue } from '../requests/queue';
import { isUndefined } from '../utils/native';
import * as asset from '../requests/assets';
import * as pages from '../requests/pages';
import * as metafields from '../requests/metafields';
import merge from 'mergerino';
import { $ } from '~state';
import * as timer from '~utils/timer';
import { Type } from '~process/files';
import { assign } from 'markdown-it/lib/common/utils';
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

      /**
       * Create Request Payload
       *
       * When `content` parameter is undefined request is
       * either `GET` or `DELETE` but when `content` is passed
       * the request will be either `POST` or `PUT`
       */
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

        if ($.mode.upload || $.mode.download) timer.start();

        await asset.sync(theme, file, assign(
          { url: theme.url },
          stores[theme.sidx].client,
          payload
        ));

      }));

    },

    pages: async <T>(method: Methods, file: File<T>, content?: any) => {

      await queue.add(() => pMap(stores, async (store) => {

        if ($.mode.upload) timer.start();

        console.log(content);

        //   await pages.sync(store, content);

      }));

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
