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
    themes: {
      get: null,
      list: null,
      update: null,
      delete: null
    },
    metafields: {
      queue: request(stores),
      get: null,
      list: null,
      update: null,
      delete: null
    },
    assets: {
      queue: request(themes),
      get: null,
      list: null,
      update: null,
      delete: null
    },
    redirect: {
      queue: request(stores),
      get: null,
      list: null,
      update: null,
      delete: null
    }
  };

}
