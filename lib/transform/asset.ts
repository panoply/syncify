import { ClientParam, File, Syncify, WatchBundle } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { isEmpty, isType } from 'rambdax';
import { isFunction, isBuffer, isUndefined } from '~utils/native';
import { Kind, Type } from '~process/files';
import { error, log } from '~log';
import { $ } from '~state';
import { AssetRequest } from '~requests/client';

/* -------------------------------------------- */
/* EXPORTED FUNCTION                            */
/* -------------------------------------------- */

/**
 * Pass~through
 *
 * Catches spawned generated files and determines whether
 * the file should be written or just fall through.
 */
function passthrough (file: File, sync: ClientParam<AssetRequest>) {

  const { wss, mode, watch, env } = $;
  const { type, relative, kind, key, output } = file;

  return async (data: string) => {

    if (type !== Type.Spawn) {

      if (mode.watch) {

        // Remove non-spawn references from watch mode
        // this will prevent infinite loops from occuring.
        //
        (watch as WatchBundle).unwatch(output);

      }

      await writeFile(output, data).catch(
        error.write('Error writing asset to output', {
          file: relative,
          source: relative
        })
      );

    };

    if (mode.hot) {

      log.syncing(key, true);

      if (kind === Kind.JavaScript) {
        wss.script(key);
      } else if (kind === Kind.CSS) {
        wss.stylesheet(key);
      }

    }

    if (env.sync !== 0) {
      return sync('put', file, data);
    }
  };
};

/**
 * Minifier
 *
 * Compiles file content and applies minification
 * returning the base64 processed string.
 */
export async function compile (file: File, sync: ClientParam<AssetRequest>, cb: Syncify) {

  const copy = passthrough(file, sync);
  const data = await readFile(file.input).catch(
    error.write('Error reading asset file', {
      file: file.relative,
      source: file.relative
    })
  );

  if (data) {

    const value = data.toString();

    if (isEmpty(value)) {
      if ($.mode.watch) log.skipped(file, 'empty file');
      return null;
    }

    if (!isFunction(cb)) return copy(value);

    const update = cb.apply({ ...file }, value);

    if (isUndefined(update) || update === false) {
      return copy(value);
    } else if (isType(update)) {
      return copy(update);
    } else if (isBuffer(update)) {
      return copy(update.toString());
    }

    return copy(value);

  }

  return null;

};
