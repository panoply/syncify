import { queue } from 'requests/queue';
import { mapFastAsync } from 'rambdax';
import { IRequest, IStore, IFile, IThemes, Methods, IMetafield } from 'types';
import { assets } from 'requests/assets';
import { metafields } from 'requests/metafields';
import { redirects } from 'requests/redirects';
import { Type } from 'config/file';
import { is, isUndefined } from 'shared/native';

/* -------------------------------------------- */
/* EXPORTED                                     */
/* -------------------------------------------- */

/**
 * Request Queue
 *
 * Maps queued requests, returning an array of
 * promises used for multiple storefront execution.
 */
export const request = (list: any[]) => (method: Methods, file?: IFile, content?: any | IMetafield) => {

  if (isUndefined(file)) return null;

  if (is(file.type, Type.Metafield)) {

    if (is(list.length, 1)) {
      queue.add(
        () => metafields(list[0].url.metafields, file, content)
      );
    } else {
      queue.add(
        () => mapFastAsync<IStore, any>(v => metafields(v.url.metafields, file, content), list)
      );
    };

  } else if (is(file.type, Type.Redirect)) {

    if (is(list.length, 1)) {
      queue.add(
        () => redirects(list[0].url.redirects, file, content)
      );
    } else {
      queue.add(
        () => mapFastAsync<IStore, any>(v => redirects(v.url.redirects, file, content), list)
      );
    };

  } else {

    const config: IRequest = isUndefined(content) ? {
      method,
      params: { 'asset[key]': file.key },
      headers: {}
    } : {
      method,
      headers: {},
      data: {
        asset: {
          key: file.key,
          value: content
        }
      }
    };

    if (is(list.length, 1)) {
      queue.add(
        () => assets(list[0], file, config)
      );
    } else {
      queue.add(
        () => mapFastAsync<IThemes, any>(store => assets(store, file, config), list)
      );
    }

  };
};
