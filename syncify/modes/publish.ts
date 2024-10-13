import type { Stores, Syncify } from 'types';
import * as request from 'syncify:requests/publish';
import { timer } from 'syncify:timer';
import * as log from 'syncify:log';
import { exporting } from 'syncify:modes/export';
import { $ } from 'syncify:state';
import { isObject } from 'syncify:utils';

export async function publish (cb?: Syncify) {

  await exporting(cb);

  timer.start('publish');

  log.title('Publishing');

  const hasThemes = $.sync.themes.length > 0;

  for (const store of $.sync.stores) {

    const { id } = await request.publish(store);

    if (hasThemes) {

      const syncify = $.pkg.syncify;

      if (isObject<Stores>(syncify.stores)) {

        if (store.domain.startsWith(syncify.stores.domain)) {

          for (const theme in syncify.stores.themes) {

            if (syncify.stores.themes[theme] === -1) {
              syncify.stores.themes[theme] = id;
            }
          }

        }

        // @ts-expect-error
        await $.package.update({ syncify }).save();

      }
    }
  }

}
