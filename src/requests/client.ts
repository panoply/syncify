import { IConfig } from 'types';
import { request } from 'requests/request';

export { queue } from 'requests/queue';

/**
 * Request Client
 *
 * Wrapper requests handler. Acts as the client
 * interface from which we will dispatch requests.
 */
export function client ({ sync: { stores, themes } }: IConfig) {

  return {
    queue: {
      metafields: request(stores),
      assets: request(themes),
      redirects: request(stores)
    },
    get request () {

      return {
        themes: {
          get: null,
          list: null,
          update: null,
          delete: null
        },
        metafields: {
          get: null,
          list: null,
          update: null,
          delete: null
        },
        assets: {
          get: null,
          list: null,
          update: null,
          delete: null
        },
        redirect: {
          get: null,
          list: null,
          update: null,
          delete: null
        }

      };
    }

  };

}
