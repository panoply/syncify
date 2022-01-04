import { IAsset, IConfig, IMetafield, IStores, IThemes } from '../typings';
import * as asset from './assets';
import * as metas from './metafields';
import { mapFastAsync } from 'rambdax';

/**
 * Requests Map
 *
 * Curried asynchronous requests map. This
 * is passed to the request queues.
 */
export function request (
  data: any,
  sync: IThemes[] | IStores[],
  action: Function
) {

  return async () => mapFastAsync(store => action(store, data), sync);

}

/**
 * Request Client
 *
 * Wrapper requests handler. Acts as the client
 * interface from which we will dispatch requests.
 */
export function client ({
  sync: {
    stores,
    themes
  }
}: Partial<IConfig>) {

  return {
    get metafield () {
      return {
        get: (data: Partial<Pick<IMetafield, 'key' | 'namespace'>>) => asset.queue.add(
          request(
            data,
            themes,
            asset.get
          )
        ),
        list: (data: IMetafield) => metas.queue.add(
          request(
            data,
            stores,
            metas.list
          )
        ),
        update: (data: IMetafield) => metas.queue.add(
          request(
            data,
            stores,
            metas.write
          )
        )
      };
    },
    get asset () {
      return {
        list: (data: string) => asset.queue.add(
          request(
            data,
            themes,
            asset.list
          )
        ),
        get: (data: string) => asset.queue.add(
          request(
            data,
            themes,
            asset.get
          )
        ),
        remove: (key: string) => asset.queue.add(
          request(
            key,
            themes,
            asset.remove
          )
        ),
        update: (data: IAsset) => asset.queue.add(
          request(
            data,
            themes,
            asset.update
          )
        )
      };
    }
  };

}
