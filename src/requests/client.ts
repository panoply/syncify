import { IConfig } from 'types';
import { queue } from './queue';
import { write } from './metafields';
export { requests as queue } from './queue';

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
}: IConfig, size?: number) {

  return {
    metafields: {
      queue: queue(stores, write)
    },
    assets: {
      queue: queue(themes)
    },
    redirects: {
      queue: queue(stores)
    }
  };

}
