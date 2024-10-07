import type { ClientParam, Syncify } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { isType } from 'rambdax';
import { AssetRequest } from 'syncify:requests/client';
import { File, Kind, Type } from 'syncify:file';
import { isFunction, isBuffer, isUndefined, isEmptyString } from 'syncify:utils';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import { $ } from 'syncify:state';
import { basename } from 'node:path';

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

  const { type, relative, kind, key, output } = file;

  return async (data: string) => {

    if (type !== Type.Spawn) {

      if ($.mode.watch) {

        // Remove non-spawn references from watch mode
        // this will prevent infinite loops from occuring.
        //
        $.watch.unwatch(output);

      }

      await writeFile(output, data).catch(
        error.write('Error writing asset to output directory', {
          file: relative,
          source: relative
        })
      );

    };

    if ($.mode.hot) {

      log.syncing(key, { hot: true });

      if (kind === Kind.JavaScript) {
        $.wss.script(file.uuid, basename(key));
      } else if (kind === Kind.CSS) {
        $.wss.stylesheet(file.uuid, basename(key));
      }
    }

    if ($.env.sync !== 0 && $.mode.build === false) {

      await sync('put', file, data);

    }

  };
};

/**
 * Assets Pass Through
 *
 * Applies a copy operation for files marked as
 * assets. No transformation will apply.
 */
export async function compile (file: File, sync: ClientParam, cb: Syncify) {

  const copy = passthrough(file, sync);
  const data = await readFile(file.input).catch(
    error.write('Error reading asset file', {
      file: file.relative,
      source: file.relative
    })
  );

  if (data) {

    const value = data.toString();

    if (isEmptyString(value)) {
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

    await copy(value);

  }

  return null;

};
