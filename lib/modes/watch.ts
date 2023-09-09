import type { Syncify, File, WatchBundle } from 'types';
import { isNil } from 'rambdax';
import { client, queue } from 'syncify:requests/client';
import { compile as liquid } from 'syncify:transform/liquid';
import { compile as styles } from 'syncify:transform/styles';
import { compile as script } from 'syncify:transform/script';
import { compile as asset } from 'syncify:transform/asset';
import { compile as json } from 'syncify:transform/json';
import { compile as pages } from 'syncify:transform/pages';
import { compile as svgs } from 'syncify:transform/svgs';
import { isUndefined } from 'syncify:utils';
import { Kind, parseFile, Type } from 'syncify:process/files';
import { log } from 'syncify:log';
import { $ } from 'syncify:state';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function watch (callback: Syncify) {

  $.cache.lastResource = 'watch';

  const { sync, watch, mode, paths, wss, dirs } = $;

  const request = client(sync);
  const parse = parseFile(paths, dirs.output);

  if (mode.hot) $.wss.connected();

  (watch as WatchBundle).on('all', function (event, path) {

    const file: File = parse(path);

    if (isUndefined(file)) return;

    if (file.base === $.file.base) return log.configChanges();
    if (file.type !== Type.Spawn) log.changed(file);

    if (event === 'change' || event === 'add') {

      handler(file);

    } else if (event === 'unlink') {

      /* -------------------------------------------- */
      /* DELETED FILE                                 */
      /* -------------------------------------------- */

      if (file.type === Type.Page) {
        return request.pages('delete', file);
      } else {
        return request.assets('delete', file);
      }
    }

  });

  async function handler (file: File) {

    try {

      let value: Buffer | string | void | { title: any; body_html: any; } = null;

      /* -------------------------------------------- */
      /* DISPATCH REQUEST IN TRANSFORM                */
      /* -------------------------------------------- */

      if (file.type === Type.Script) {

        return script(file, request.assets, callback);

      } else if (file.type === Type.Page) {

        return pages(file, callback);

      } else if (file.type === Type.Svg) {

        return svgs(file, request.assets, callback);

      } else if (file.type === Type.Asset || file.type === Type.Spawn) {

        return asset(file, request.assets, callback);

      }

      if (file.type === Type.Style) {

        value = await styles(file, callback);

      } else if (file.type === Type.Section && file.kind === Kind.Liquid) {

        value = await liquid(file, callback);

      } if (file.type === Type.Section && file.kind === Kind.JSON) {

        value = await json(file, callback);

      } else if (file.type === Type.Layout) {

        value = await liquid(file, callback);

      } else if (file.type === Type.Snippet) {

        value = await liquid(file, callback);

      } else if (file.type === Type.Locale || file.type === Type.Config) {

        value = await json(file, callback);

      } else if (file.type === Type.Metafield) {

        value = await json(file, callback);

        return request.metafields({ value, namespace: file.namespace, key: file.key });

      } else if (file.type === Type.Template && file.kind === Kind.JSON) {

        value = await json(file, callback);

      } else if (file.type === Type.Template && file.kind === Kind.Liquid) {

        value = await liquid(file, callback);

      }

      if (!isNil(value)) {

        log.syncing(file.key);

        await request.assets('put', file, value);

        if (mode.hot) {

          if (file.type === Type.Section) {

            wss.section(file.name);

          } else if (file.type !== Type.Script && file.type !== Type.Style) {

            await queue.onIdle().then(() => wss.replace());

          }
        }
      }

    } catch (e) {

      console.error(e);
      log.err(e);

    }

  }

};
