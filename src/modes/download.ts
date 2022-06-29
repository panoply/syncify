import { Syncify } from 'types';
import { join } from 'path';
import { isNil, has } from 'rambdax';
import { writeFile } from 'fs-extra';
import * as request from 'requests/assets';
import { isFunction } from 'shared/native';
import * as timer from 'process/timer';
import { bundle } from 'options';

export const download = async (cb?: typeof Syncify.hook): Promise<void> => {

  timer.start();

  const hashook = isFunction(cb);

  for (const store of bundle.sync.stores) {

    const theme = bundle.sync.themes[store.domain];

    const req = !isNil(store) ? { headers: { 'X-Shopify-Access-Token': theme.token } } : {};

    const { assets } = await request.get(theme.url, req);

    for (const asset of assets) {

      try {

        const item = await request.assets('get', { 'asset[key]': asset.key });

        const path = join(bundle.dirs.import, theme.domain, theme.target, asset.key);

        const buffer = has('attachment', item.asset)
          ? Buffer.from(item.asset.attachment, 'base64')
          : Buffer.from(item.asset.value || null, 'utf8');

        await writeFile(path, buffer);

        console.log(`${asset.key} (${theme.domain})`);

      } catch (e) {

        console.log(e);
      }

    }

  }

  log.finish('download');

};
