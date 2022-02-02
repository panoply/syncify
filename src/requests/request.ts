import { AxiosRequestConfig } from 'axios';
import { queue } from 'requests/queue';
import { mapFastAsync } from 'rambdax';
import { IRequest, IStore, IFile, IThemes, Methods } from 'types';
import { is } from 'config/utils';
import { assets } from 'requests/assets';
import { metafields } from 'requests/metafields';
import { Type } from 'config/file';
import { assign } from 'utils/native';

/* -------------------------------------------- */
/* EXPORTED                                     */
/* -------------------------------------------- */

/**
 * Request Queue
 *
 * Maps queued requests, returning an array of
 * promises used for multiple storefront execution.
 */
export function request (list: any[]) {

  return (method: Methods, file: IFile, data: any) => {

    if (is(file.type, Type.Metafield)) {

      return queue.add(() => (
        is(list.length, 1)
          ? metafields(list[0].url.metafields, file, data)
          : mapFastAsync<IStore, void>(({ url }) => metafields(url.metafields, file, data), list)
      ));

    } else if (is(file.type, Type.Redirect)) {

      return null;

    }

    const config = assign<unknown, AxiosRequestConfig>(
      {
        method,
        responseType: 'json'
      }, data === false ? {
        params: {
          'asset[key]': file.key
        }
      } : {
        data: {
          asset: {
            key: file.key,
            attachment: data
          }
        }
      }
    );

    return queue.add(() => (
      is(list.length, 1)
        ? assets(list[0], file, config as IRequest)
        : mapFastAsync<IThemes, void>(store => assets(store, file, config as IRequest), list)
    ));

  };
}
