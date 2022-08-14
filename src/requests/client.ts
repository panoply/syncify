import { Request, IStore, IFile, Methods, ISync, Requests, IThemes } from 'types';
import { mapFastAsync } from 'rambdax';
import { queue } from '../requests/queue';
import { assign, isUndefined } from '../shared/native';
import * as asset from '../requests/assets';
import * as metafields from '../requests/metafields';
// import * as pages from '../requests/pages';

/* -------------------------------------------- */
/* EXPORTED                                     */
/* -------------------------------------------- */
export { queue } from '../requests/queue';

export const client = ({ stores, themes }: ISync) => ({

  assets: (method: Methods, file: IFile, content?: any) => {

    const payload: Request = isUndefined(content) ? {
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

    return queue.add(() => mapFastAsync<IThemes, any>(theme => {

      return asset.sync(theme, file, assign<any, any, Request>(
        { url: theme.url },
        stores[theme.sidx].client,
        payload
      ));

    }, themes));

  },
  pages: (content?: Requests.Page) => {

    return queue.add(function () {

      return mapFastAsync<IStore, any>(async function (store) {

        //  await pages.sync(store, content);

      }, stores);

    });

  },

  metafields: (content?: Requests.Metafield) => {

    return queue.add(function () {

      return mapFastAsync<IStore, any>(async function (store) {

        await metafields.sync(store, content);

      }, stores);

    });

  }

});
