import { IConfig, Syncify } from 'types';
import { join } from 'path';
import { isNil, has } from 'rambdax';
import { writeFile } from 'fs-extra';
import { client } from 'requests/client';
// import * as log from 'cli/logs';

export const download = async (config: IConfig, cb?: typeof Syncify.hook): Promise<void> => {

  log.time.start('download');

  const request = client(config);

  for (const theme of config.sync.themes) {

    const req = !isNil(theme.token) ? { headers: { 'X-Shopify-Access-Token': theme.token } } : {};

    const { assets } = await request.assets.get(theme.url, req);

    for (const asset of assets) {

      try {

        const item = await request.assets.get(theme.url, { ...req, params: { 'asset[key]': asset.key } });
        const path = join(config.cwd, config.import, theme.domain, theme.target, asset.key);
        const buffer = has('attachment', item.asset)
          ? Buffer.from(item.asset.attachment, 'base64')
          : Buffer.from(item.asset.value || null, 'utf8');

        await writeFile(path, buffer);

        log.fileTouch(`${asset.key} (${theme.domain})`);

      } catch (e) {

        console.log(e);
      }

    }

  }

  log.finish('download');

};
