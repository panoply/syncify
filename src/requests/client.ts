import { queue } from 'requests/queue';
import { mapFastAsync } from 'rambdax';
import { IRequest, IStore, IFile, Methods, ISync, Requests } from 'types';
import { assets } from 'requests/assets';
import * as metafields from 'requests/metafields';
import * as pages from 'requests/pages';
import { assign, isUndefined, create } from 'shared/native';

/* -------------------------------------------- */
/* EXPORTED                                     */
/* -------------------------------------------- */
export { queue } from 'requests/queue';

export function client ({ stores, themes }: ISync) {

  return {

    assets: (method: Methods, file: IFile, content?: any) => {

      const payload: IRequest = create(null);

      payload.method = method;

      if (isUndefined(content)) {
        payload.params = create(null);
        payload.params['asset[key]'] = file.key;
      } else {
        payload.data = create(null);
        payload.data = { asset: { key: file.key, value: content } };
      }

      return queue.add(() => mapFastAsync<IStore, any>(store => {
        payload.url = themes[store.domain].url;
        return assets(themes[store.domain], file, assign(create(null), store.client, payload));
      }, stores));

    },

    pages: (_method: Methods, content?: Requests.IPage) => {

      return queue.add(() => mapFastAsync<IStore, any>(store => {
        return pages.sync(store, content);
      }, stores));

    },

    metafields: async (_method: Methods, content?: Requests.IMetafield) => {

      await queue.add(() => mapFastAsync<IStore, any>(store => (metafields.sync(store, content)), stores));

    }

  };

}
