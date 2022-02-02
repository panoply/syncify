import { AxiosRequestConfig } from 'axios';
import { queue } from 'requests/queue';
import { mapFastAsync } from 'rambdax';
import { IRequest, IStore, IFile, IThemes, Methods, IMetafield } from 'types';
import { is } from 'config/utils';
import { assets } from 'requests/assets';
import { metafields } from 'requests/metafields';
import { Type } from 'config/file';
import { assign, isBuffer, isUndefined } from 'utils/native';

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

  return (method: Methods, file: IFile, content?: Buffer | IMetafield | unknown) => {

    if (is(file.type, Type.Metafield)) {

      return is(list.length, 1) ? queue.add(
        async () => {
          await metafields(list[0].url.metafields, file, content);
        }
      ) : queue.add(
        async () => {
          await mapFastAsync<IStore, any>(({ url }) => metafields(url.metafields, file, content), list);
        }
      );

    } else if (is(file.type, Type.Redirect)) {

      return null;

    } else {

      const config = assign<unknown, AxiosRequestConfig>({ method }, isUndefined(content) ? {
        params: {
          'asset[key]': file.key
        }
      } : {
        data: {
          asset: {
            key: file.key,
            attachment: isBuffer(content)
              ? content.toString('base64')
              : content
          }
        }
      });

      return is(list.length, 1) ? queue.add(
        async () => {
          await assets(list[0], file, config as IRequest);
        }
      ) : queue.add(
        async () => {
          await mapFastAsync<IThemes, any>(store => assets(store, file, config as IRequest), list);
        }
      );

    };
  };
}
