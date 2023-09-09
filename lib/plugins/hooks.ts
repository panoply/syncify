import type { File, Methods } from 'types';
import { isUndefined, isBuffer, isString } from 'syncify:utils';

export async function onAsset <T> (
  file: File<T>,
  input: any,
  update: any,
  request: <T>(
    method: Methods,
    file: File<T>,
    content?: any
  ) => Promise<void>
) {

  if (isUndefined(update) || update === false) {
    await request('put', file, input);
  } else if (isString(update)) {
    await request('put', file, update);
  } else if (isBuffer(update)) {
    await request('put', file, update.toString());
  } else {
    await request('put', file, input);
  }

}
