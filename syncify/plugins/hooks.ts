import type { File, Methods } from 'types';
import { isUndefined, isBuffer, isString } from 'syncify:utils';

/**
 * The callback function
 */
type RequestFunction = <T>(method: Methods, file: File, content?: any) => Promise<T>

export async function onAsset <T> (file: File<T>, input: any, update: any, request: RequestFunction) {

  if (isUndefined(update) || update === false) {

    return request('put', file, input);

  } else if (isString(update)) {

    return request('put', file, update);

  } else if (isBuffer(update)) {

    return request('put', file, update.toString());

  } else {

    return request('put', file, input);

  }

}
