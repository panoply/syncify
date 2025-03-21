import ParcelWatcher, { subscribe } from '@parcel/watcher';
import pMap from 'p-map';

import { log } from '~cli/log';
import { stdin } from '~cli/stdin';
import { event } from '~events';
import { File, Kind, Type } from '~file';
import { themeFilesDeleteMap } from '~http/themeFiles';
import { parse } from '~process/files';
import { AssetTransform } from '~transform/asset';
import { JsonTransform } from '~transform/json';
import { LiquidTransform } from '~transform/liquid';
import { PagesTransform } from '~transform/pages';
import { SchemaTransform } from '~transform/schema';
import { ScriptTransform } from '~transform/script';
import { StyleTransform } from '~transform/style';
import { SvgTransform } from '~transform/svg';
import { getChunk, isObject, reduce } from '~utils';

import { $, q } from '$';

/**
 * Watch Mode ~ `sy watch`
 */
export function Watch () {

  stdin.watch.listen();

  event.on('watch', log.upsert);

  $.running = true;

  subscribe($.dirs.input, (e, changes) => {

    stdin.errors.isAttached && event.emit('stdin:dispose');

    changes.length > 1 ? Bulk(changes) : Change(changes);

  }).then(({ unsubscribe }) => {

    event.on('restart', (Define: () => Promise<void>) => {

      unsubscribe().then(() => Define().then(Watch));

    });

  });

};

/**
 * Change Handler
 *
 * Used during `watch` mode and handles single file changes.
 */
async function Change (changes: ParcelWatcher.Event[]) {

  const [ change ] = changes;
  const file = parse(change.path);

  if (isObject(file) && file.input !== $.file.config) {

    q.change.add(async () => {

      log.changed(file);

      if (change.type === 'delete') {

        await themeFilesDeleteMap(file);

      } else {

        await Transform(file);

      }
    });
  }
}

/**
 * Bulk Handler
 *
 * Used during `watch` mode and handles bulk changes.
 */
async function Bulk <T extends { delete: File[], update: File[] }> (changes: ParcelWatcher.Event[]) {

  if (!$.mode.bulk) $.mode.bulk = true;

  const change = reduce<ParcelWatcher.Event, T>(changes, (state, { type, path }) => {

    state[type === 'delete' ? 'delete' : 'update'].push(parse(path));

    return state;

  }, <T>{ delete: [], update: [] });

  if (change.update.length > 0) {

    $.bulk.files += change.update.length;
    $.bulk.type = 'uploaded';

    log.group('update').bulk();

    await q.bulk.add(async () => await pMap(change.update, Transform));
  }

  if (change.delete.length > 0) {

    $.bulk.files += change.delete.length;
    $.bulk.type = 'deleted';

    log.group('delete').bulk();

    await q.bulk.add(async () => await pMap(getChunk(change.delete, 4), themeFilesDeleteMap));
  }

  await q.bulk.onIdle().then(() => log.bulk.complete());

}

/**
 * Transform Dispatch
 *
 * Dispatch the file to its relative transform handler. This function can be called
 * in isolation and expects a {@link File} type parameter. Errors will be handled
 * in each respective transform operation.
 */
export async function Transform (file: File) {

  switch (file.type) {

    case Type.Schema:

      return SchemaTransform(file);

    case Type.Layout:
    case Type.Snippet:
    case Type.Section:
    case Type.Block:

      return LiquidTransform(file);

    case Type.Template:
    case Type.Metaobject:

      return file.kind === Kind.JSON ? JsonTransform(file) : LiquidTransform(file);

    case Type.Config:
    case Type.Locale:
    case Type.Group:
    case Type.Metafield:

      return JsonTransform(file);

    case Type.Style:

      return StyleTransform(file);

    case Type.Script:

      return ScriptTransform(file);

    case Type.Svg:

      return SvgTransform(file);

    case Type.Page:

      return PagesTransform(file);

    case Type.Asset:
    case Type.Spawn:

      return AssetTransform(file);

  }

}
