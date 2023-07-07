import type { Syncify, File, WatchBundle } from 'types';
import { client, queue } from '~requests/client';
import { compile as liquid } from '~transform/liquid';
import { compile as styles } from '~transform/styles';
import { compile as script } from '~transform/script';
import { compile as asset } from '~transform/asset';
import { compile as json } from '~transform/json';
import { compile as pages } from '~transform/pages';
import { compile as svgs } from '~transform/svgs';
import { isUndefined } from '~utils/native';
import { Kind, parseFile, Type } from '~process/files';
import { bundle } from '~config';
import { log } from '~log';
import { isNil } from 'rambdax';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function watch (callback: Syncify) {

  const request = client(bundle.sync);
  const parse = parseFile(bundle.paths, bundle.dirs.output);

  (bundle.watch as WatchBundle).on('all', async function (event, path) {

    const file: File = parse(path);

    if (isUndefined(file)) return;

    if (file.type !== Type.Spawn) log.changed(file);

    if (event === 'change' || event === 'add') {

      handler(file);

    } else if (event === 'unlink') {

      /* -------------------------------------------- */
      /* DELETED FILE                                 */
      /* -------------------------------------------- */

      return request.assets('delete', file);

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

      } else if (file.type === Type.Asset || file.type === Type.Spawn) {

        value = await asset(file, callback);

      }

      if (!isNil(value)) {

        log.syncing(file.key);

        await request.assets('put', file, value);

        if (bundle.mode.hot) {
          if (file.type === Type.Section && file.kind === Kind.Liquid) {

            bundle.wss.section(file.name);

          } else if (file.type !== Type.Script && file.type !== Type.Style) {

            await queue.onEmpty().then(() => bundle.wss.replace());

          }
        }
      }

    } catch (e) {

      console.error(e);
      log.err(e);

    }

  }

};
