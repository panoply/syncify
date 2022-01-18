import { IConfig } from 'types';
import { queue } from './queue';
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
      queue: queue(stores)
    },
    assets: {
      queue: queue(themes, size)
    }
  };

}
