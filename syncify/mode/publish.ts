import type { Stores } from 'types';

import { Create, gray } from '@syncify/ansi';
import { kill } from '@syncify/kill';
import { timer } from '@syncify/timer';

import { log } from '~cli/log';
import { event } from '~events';
import { Pack } from '~mode/pack';
import { setPkg } from '~options/define/package';
// import themes from '~requests/themes';
import { isObject } from '~utils';

import { $ } from '$';

export async function Publish () {

  $.running = true;

  await Pack();

  timer.start('publish');

  const stdout = Create().Header('Publishing Theme');
  const progress = log.progress(300);

  event.on('publish:progress', ({ task, step }) => {

    progress.increment(step);

    log.update(
      stdout
      .Header(task, gray)
      .Insert(progress.render())
      .toString()
    );

  });

  const hasThemes = $.target.length > 0;

  for (const target of $.target) {

    const { id } = await request.publish(target.store);

    console.log(id);

    if (hasThemes) {

      const syncify = $.pkg.syncify;

      if (isObject<Stores>(syncify.stores)) {

        if (target.store.domain.startsWith(syncify.stores.domain)) {

          for (const target in syncify.stores.themes) {

            if (syncify.stores.themes[target] === -1) {

              syncify.stores.themes[target] = id;

            }
          }

        }

        $.pkg.syncify = syncify;

        await setPkg($.pkg);

      }
    }
  }

  kill.exit(0);

}
