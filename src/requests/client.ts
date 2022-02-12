import { IConfig, IFile, IThemes } from 'types';
import { request } from 'requests/request';
import { get } from 'requests/assets';

/* -------------------------------------------- */
/* RE-EXPORT                                    */
/* -------------------------------------------- */

export { queue } from 'requests/queue';

/**
 * Request Client
 *
 * Wrapper requests handler. Acts as the client
 * interface from which we will dispatch requests.
 */
export const client = ({ sync: { stores, themes } }: IConfig) => ({
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
    get: get,
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
});
