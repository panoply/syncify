import { File, Syncify } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { isType } from 'rambdax';
import { isFunction, isBuffer, isUndefined } from '~utils/native';
import { Type } from '~process/files';
import { error } from '~log';

/* -------------------------------------------- */
/* EXPORTED FUNCTION                            */
/* -------------------------------------------- */

/**
 * Pass~through
 *
 * Catches spawned generated files and determines whether
 * the file should be written or just fall through.
 */
const passthrough = (file: File) => async (data: Buffer | string) => {

  if (file.type !== Type.Spawn) {

    await writeFile(file.output, data).catch(
      error.write('Error writing asset to output', {
        file: file.relative,
        source: file.relative
      })
    );
  } ;

  return data;

};

/**
 * Minifier
 *
 * Compiles file content and applies minification
 * returning the base64 processed string.
 */
export async function compile (file: File, cb: Syncify) {

  const copy = passthrough(file);
  const data = await readFile(file.input).catch(
    error.write('Error reading asset file', {
      file: file.relative,
      source: file.relative
    })
  );

  if (data) {

    if (!isFunction(cb)) return copy(data);

    const update = cb.apply({ ...file }, data);

    if (isUndefined(update) || update === false) {
      return copy(data);
    } else if (isType(update)) {
      return copy(update);
    } else if (isBuffer(update)) {
      return copy(update.toString());
    }

    return copy(data);

  }
};
