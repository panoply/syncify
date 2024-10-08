import type { ChokidorEvents, Syncify } from 'types';
import { client } from 'syncify:requests/client';
import { compile as liquid } from 'syncify:transform/liquid';
import { compile as styles } from 'syncify:transform/style';
import { compile as script } from 'syncify:transform/script';
import { compile as asset } from 'syncify:transform/asset';
import { compile as json } from 'syncify:transform/json';
import { compile as pages } from 'syncify:transform/pages';
import { compile as svgs } from 'syncify:transform/svg';
import { compile as schema } from 'syncify:transform/schema';
import { isUndefined } from 'syncify:utils';
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

  //  $.watch.add($.file.path)

  $.watch.on('all', onchange);

  function onchange (event: ChokidorEvents, path: string) {

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

  };

  async function handler (file: File) {

    try {

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

          return styles(file, request.assets, callback);

        case Type.Layout:
        case Type.Snippet:

          return liquid(file, request.assets, callback);

        case Type.Metaobject:
        case Type.Template:
        case Type.Section:

          return file.kind === Kind.JSON
            ? json(file, request.assets, callback)
            : liquid(file, request.assets, callback);

        case Type.Config:
        case Type.Locale:

          return json(file, request.assets, callback);

        case Type.Metafield:

          // @ts-expect-error
          return json(file, request.metafields, callback);

      }

    } catch (e) {

      console.error(e);
      log.error(e);

    }

  }

};
