import type { Syncify } from 'types';
import { client, queue } from 'syncify:requests/client';
import { compile as liquid } from 'syncify:transform/liquid';
import { compile as styles } from 'syncify:transform/style';
import { compile as script } from 'syncify:transform/script';
import { compile as asset } from 'syncify:transform/asset';
import { compile as json } from 'syncify:transform/json';
import { compile as pages } from 'syncify:transform/pages';
import { compile as svgs } from 'syncify:transform/svg';
import { compile as schema } from 'syncify:transform/schema';
import { isUndefined, isNil } from 'syncify:utils';
import { File, Type, Kind } from 'syncify:file';
import { parseFile } from 'syncify:process/files';
import * as log from 'syncify:log';
import { $ } from 'syncify:state';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export function watch (callback: Syncify) {

  const request = client($.sync);
  const parse = parseFile($.paths, $.dirs.output);

  if ($.mode.hot) $.wss.connected();

  $.watch.on('all', function (event, path) {

    const file = parse(path);

    if (isUndefined(file)) return;

    if (file.base === $.file.base) return; // log.configChanges();
    if (file.type !== Type.Spawn) log.changed(file);

    if (event === 'change' || event === 'add') {

      handler(<File>file);

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

      switch (file.type) {
        case Type.Script:

          return script(file, request.assets, callback);

        case Type.Page:

          return pages(file, callback);

        case Type.Svg:

          return svgs(file, request.assets, callback);

        case Type.Asset:
        case Type.Spawn:

          return asset(file, request.assets, callback);

        case Type.Schema:

          return schema(file, request.assets, callback);

        case Type.Style:

          value = await styles(file, callback);

          break;
        case Type.Layout:
        case Type.Snippet:

          value = await liquid(file, callback);

          break;
        case Type.Section:

          if (file.kind === Kind.JSON) {
            value = await json(file, callback);
          } else {
            value = await liquid(file, callback);
          }

          break;

        case Type.Template:

          if (file.kind === Kind.JSON) {
            value = await json(file, callback);
          } else {
            value = await liquid(file, callback);
          }

          break;
        case Type.Config:
        case Type.Locale:

          value = await json(file, callback);

          break;
        case Type.Metafield:

          value = await json(file, callback);
          return request.metafields({ value, namespace: file.namespace, key: file.key });

      }

      if (!isNil(value)) {

        log.syncing(file.key);

        await request.assets('put', file, value);

        if ($.mode.hot) {
          if (file.type === Type.Section) {
            $.wss.section(file.name);
          } else if (file.type !== Type.Style) {
            await queue.onIdle().then(() => $.wss.replace());
          }
        }
      }

    } catch (e) {

      console.error(e);
      log.error(e);

    }

  }

};
