import { Syncify, Requests } from 'types';
import { join } from 'path';
import { has } from 'rambdax';
import { writeFile } from 'fs-extra';
import { isFunction, isUndefined, isString, isBuffer } from '../utils/native';
import { $ } from '~state';
import { log, c } from '~log';
import * as timer from '~utils/timer';
import * as request from '~requests/assets';
import merge from 'mergerino';

export async function download (cb?: Syncify): Promise<void> {

  $.cache.lastResource = 'download';

  timer.start();

  const hashook = isFunction(cb);

  for (const theme of $.sync.themes) {

    const store = $.sync.stores[theme.sidx];
    const { assets } = await request.get<Requests.Assets>(theme.url, store.client);

    for (const { key } of assets) {

      try {

        const data = merge(store.client, { params: { 'asset[key]': key } });
        const { asset } = await request.get<Requests.Asset>(theme.url, data);
        const output = join($.dirs.import, store.domain, theme.target, key);
        const buffer = has('attachment', asset)
          ? Buffer.from(asset.attachment, 'base64')
          : Buffer.from(asset.value || null, 'utf8');

        log.write(`${c.neonCyan(key)}`);

        if (hashook) {

          const update = cb.apply({ asset, output }, buffer);

          if (isUndefined(update) || update === false) {
            await writeFile(output, buffer);
          } else if (isString(update) || isBuffer(update)) {
            await writeFile(output, update);
          } else {
            await writeFile(output, buffer);
          }

        } else {

          await writeFile(output, buffer);

        }

      } catch (e) {

        log.failed(key);

      }

    }

  }

};
