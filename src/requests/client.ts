import { Request, IStore, IFile, Methods, ISync, Requests } from 'types';
import { mapFastAsync } from 'rambdax';
import { queue } from '../requests/queue';
import { assign, isUndefined, create } from '../shared/native';
import * as asset from '../requests/assets';
import * as metafields from '../requests/metafields';
import * as pages from '../requests/pages';

/* -------------------------------------------- */
/* EXPORTED                                     */
/* -------------------------------------------- */
export { queue } from 'requests/queue';

export const client = ({ stores, themes }: ISync) => ({

  assets (method: Methods, file: IFile, content?: any) {

    const payload: Request = create(null);

    payload.method = method;

    if (isUndefined(content)) {
      payload.params = create(null);
      payload.params['asset[key]'] = file.key;
    } else {
      payload.data = create(null);
      payload.data = { asset: { key: file.key, value: content } };
    }

    return queue.add(function () {

      return mapFastAsync<IStore, any>(function (store) {

        payload.url = themes[store.domain].url;

        return asset.sync(themes[store.domain], file, assign({}, store.client, payload));

      }, stores);

    });
  },

  pages (content?: Requests.Page) {

    return queue.add(function () {

      return mapFastAsync<IStore, any>(async function (store) {

        await pages.sync(store, content);

      }, stores);

    });

  },

  metafields (content?: Requests.Metafield) {

    return queue.add(function () {

      return mapFastAsync<IStore, any>(async function (store) {

        await metafields.sync(store, content);

      }, stores);

    });

  }

});
