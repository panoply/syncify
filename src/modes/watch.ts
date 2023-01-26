import type { Syncify, File, Pages, StyleTransform, SVGBundle } from 'types';
import chokidar from 'chokidar';
import { inject } from '~hot/inject';
import { client, queue } from '~requests/client';
import { compile as liquid } from '~transform/liquid';
import { compile as styles } from '~transform/styles';
import { compile as script } from '~transform/script';
import { compile as asset } from '~transform/asset';
import { compile as json } from '~transform/json';
import { compile as pages } from '~transform/pages';
import { compile as svgs } from '~transform/svgs';
import { isUndefined, toArray } from '~utils/native';
import { Kind, parseFile, Type } from '~process/files';
import { bundle } from '~config';
import { log } from '~log';
import { socket } from '~hot/server';
import { isNil } from 'rambdax';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function watch (callback: Syncify) {

  const wss = socket();
  const request = client(bundle.sync);
  const parse = parseFile(bundle.paths, bundle.dirs.output);
  const watcher = chokidar.watch(toArray(bundle.watch.values()), {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 75,
    binaryInterval: 100,
    ignored: [ '**/*.map' ]
  });

  watcher.on('all', function (event, path) {

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

      if (file.type === Type.Script) {

        return script.apply(wss, [ file, request.assets, callback ]);

      } else if (file.type === Type.Page) {

        return pages(file as File<Pages>, callback);

      } else if (file.type === Type.Svg) {

        return svgs(file as File<SVGBundle[]>, request.assets, callback);

      } else if (file.type === Type.Style) {

        value = await styles(file as File<StyleTransform>, callback);

        if (bundle.mode.hot) {

          wss.stylesheet(file.key);

        }

      } else if (file.type === Type.Section) {

        value = await liquid(file, callback);

      } else if (file.type === Type.Layout) {

        value = await liquid(file, callback);

        if (bundle.mode.hot) {

          value = inject(value);

        };

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
          if (file.type === Type.Section) {
            wss.section(file.name);
          } else if (file.type !== Type.Script && file.type !== Type.Style) {
            await queue.onIdle().then(() => wss.replace());
          }
        }
      }

    } catch (e) {

      log.err(e);

      console.error(e);

    }

  }

};
