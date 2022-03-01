/* eslint-disable brace-style */
import { ChildProcessWithoutNullStreams as ChildProcess } from 'child_process';
import { IConfig, IFile, IStyle, Syncify } from 'types';
import { isMetafield, isSection, isStyle, parseFile, Type } from 'config/file';
import { compile as liquid } from 'transform/liquid';
import { transform as styles } from 'transform/styles';
import { compile as json } from 'transform/json';
import { glob } from 'glob';
import { from, is } from 'shared/native';
import { spawns } from 'cli/spawn';
import * as time from 'cli/timer';
import anymatch from 'anymatch';
import { last } from 'rambdax';
import * as log from 'cli/logs';

/**
 * Build Function
 *
 * Triggers a compile of the project
 */
const trigger = (config: IConfig, callback: typeof Syncify.hook) => {

  time.start('build');

  const { transform } = config;
  const parse = parseFile(config.paths, config.output);
  const match = anymatch(config.watch);
  const paths = glob.sync(config.source + '/**', { cwd: config.cwd });
  const source = paths.filter(match).sort();

  return async () => {

    for (const path of source) {

      const file: IFile = parse(path);

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

      else if (is(file.type, Type.Layout)) {

        await liquid(file, transform.views.minify, callback);

      }

      else if (is(file.type, Type.Snippet)) {

        await liquid(file, transform.views.minify, callback);

      }

      /* -------------------------------------------- */
      /* CONFIG AND LOCALES                           */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Config)) {

        await json(file, transform.json, callback);

      }

      else if (is(file.type, Type.Locale)) {

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

    log.finish('build');

  };
};

/**
 * Build Function
 *
 * Triggers a compile of the project
 */
export const build = (config: IConfig, cb?: typeof Syncify.hook) => {

  const compile = trigger(config, cb);

  if (is(spawns.size, 0)) return compile();

  const child = from(spawns);
  const spawn = last(child)[1] as ChildProcess;

  return spawn.on('close', compile);

};
