/* eslint-disable brace-style */
import { IConfig, IFile, IStyle, Syncify } from 'types';
import { isMetafield, isSection, isStyle, parseFile, Type } from 'config/file';
import { compile as liquid } from 'transform/liquid';
import { transform as styles } from 'transform/styles';
import { compile as json } from 'transform/json';
import { glob } from 'glob';
import { is } from 'shared/native';
import * as log from 'cli/logs';

/**
 * Build Function
 *
 * Triggers a compile of the project
 */
export const build = async (config: IConfig, callback: typeof Syncify.hook) => {

  const { transform } = config;
  const parse = parseFile(config.paths, config.output);
  const source = config.watch.flatMap(path => {

    if (path[0] === '!') path = path.slice(1);

    return glob.sync(path, { cwd: config.cwd });

  }).filter(p => !/theme\//.test(p));

  for (const path of source) {

    const file: IFile = parse(path);

    if (!file) continue;

    log.fileChange(file);

    /* -------------------------------------------- */
    /* STYLES                                       */
    /* -------------------------------------------- */

    if (is(file.type, Type.Style)) {

      await styles(isStyle(file as IFile<IStyle>, transform.styles));

    }

    /* -------------------------------------------- */
    /* METAFIELDS                                   */
    /* -------------------------------------------- */

    else if (is(file.type, Type.Metafield)) {

      await json(isMetafield(file), transform.json, callback);

    }

    /* -------------------------------------------- */
    /* SECTIONS                                     */
    /* -------------------------------------------- */

    else if (is(file.type, Type.Section)) {

      await liquid(isSection(file, transform.views.sections), transform.views.minify, callback);

    }

    /* -------------------------------------------- */
    /* LAYOUTS AND SNIPPETS                         */
    /* -------------------------------------------- */

    else if (is(file.type, Type.Layout) || is(file.type, Type.Snippet)) {

      await liquid(file, transform.views.minify, callback);

    }

    /* -------------------------------------------- */
    /* CONFIG AND LOCALES                           */
    /* -------------------------------------------- */

    else if (is(file.type, Type.Config) || is(file.type, Type.Locale)) {

      await json(file, transform.json, callback);

    }

    /* -------------------------------------------- */
    /* TEMPLATES                                    */
    /* -------------------------------------------- */

    else if (is(file.type, Type.Template)) {
      if (file.ext === '.json') {
        await json(file, transform.json, callback);
      } else {
        await liquid(file, transform.views.minify, callback);
      }
    }

    /* -------------------------------------------- */
    /* ASSETS                                       */
    /* -------------------------------------------- */

    else if (is(file.type, Type.Asset)) {
      continue;
    }

  }

};
