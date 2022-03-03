import { queue } from 'requests/queue';
import { mapFastAsync } from 'rambdax';
import { IRequest, IStore, IFile, IThemes, Methods, IMetafield, IConfig, IPage } from 'types';
import { assets } from 'requests/assets';
import * as metafields from 'requests/metafields';
import * as pages from 'requests/pages';
import { assign, isUndefined } from 'utils/native';

/* -------------------------------------------- */
/* EXPORTED                                     */
/* -------------------------------------------- */
export { queue } from 'requests/queue';

export function client (config: IConfig) {

  const { stores, themes } = config.sync;

  return {

    assets: async (
      method: Methods,
      file: IFile,
      content?: any
    ) => {

      const payload: IRequest = isUndefined(content) ? {
        method,
        params: { 'asset[key]': file.key }
      } : {
        method,
        data: {
          asset: {
            key: file.key,
            value: content
          }
        }
      };

      const sync = await mapFastAsync<IThemes, any>(theme => (
        assets(
          theme,
          file,
          assign<any, any, IRequest>(
            { url: theme.url },
            stores[theme.store].client,
            payload
          )
        )
      ), themes);

      queue.add(() => sync);

    },

    pages: async (
      _method: Methods,
      content?: IPage
    ) => {

      await queue.add(() => mapFastAsync<IStore, any>(store => (pages.sync(store, content)), stores));

    },

    metafields: async (
      _method: Methods,
      content?: IMetafield
    ) => {

      await queue.add(() => mapFastAsync<IStore, any>(store => (metafields.sync(store, content)), stores));

    }

  };

}
