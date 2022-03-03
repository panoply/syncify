/* eslint-disable brace-style */
import { ChildProcessWithoutNullStreams as ChildProcess } from 'child_process';
import { IFile, IStyle, Syncify } from 'types';
import anymatch from 'anymatch';
import { last } from 'rambdax';
import { glob } from 'glob';
import { compile as liquid } from 'transform/liquid';
// import { transform as styles } from 'transform/styles';
import { compile as json } from 'transform/json';
import { from, is } from 'utils/native';
import { isMetafield, isSection, isStyle, parseFile, Type } from 'utils/files';
import { spawns } from 'cli/spawn';
import * as time from 'utils/timer';
import { footer } from 'cli/tui';
import { bundle } from 'options';

/**
 * Build Function
 *
 * Triggers a compile of the project
 */
const trigger = (callback: typeof Syncify.hook) => {

  time.start('build');

  const parse = parseFile(bundle.paths, bundle.dirs.output);
  const match = anymatch(bundle.watch);
  const paths = glob.sync(bundle.dirs.input + '/**', { cwd: bundle.cwd }).sort();
  const source = paths.filter(match);

  console.log(source);

  return async () => {

    for (const path of source) {

      const file: IFile = parse(path);

      /* -------------------------------------------- */
      /* STYLES                                       */
      /* -------------------------------------------- */

      if (is(file.type, Type.Style)) {

        // await styles(isStyle(file as IFile<IStyle>));

      }

      /* -------------------------------------------- */
      /* METAFIELDS                                   */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Metafield)) {

        await json(isMetafield(file), callback);

      }

      /* -------------------------------------------- */
      /* SECTIONS                                     */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Section)) {

        await liquid(isSection(file), callback);

      }

      /* -------------------------------------------- */
      /* LAYOUTS AND SNIPPETS                         */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Layout)) {

        await liquid(file, callback);

      }

      else if (is(file.type, Type.Snippet)) {

        await liquid(file, callback);

      }

      /* -------------------------------------------- */
      /* CONFIG AND LOCALES                           */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Config)) {

        await json(file, callback);

      }

      else if (is(file.type, Type.Locale)) {

        await json(file, callback);

      }

      /* -------------------------------------------- */
      /* TEMPLATES                                    */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Template)) {
        if (file.ext === '.json') {
          await json(file, callback);
        } else {
          await liquid(file, callback);
        }
      }

      /* -------------------------------------------- */
      /* ASSETS                                       */
      /* -------------------------------------------- */

      else if (is(file.type, Type.Asset)) {

        continue;

      }

    }

    footer('build');

  };
};

/**
 * Build Function
 *
 * Triggers a compile of the project
 */
export const build = (cb?: typeof Syncify.hook) => {

  const compile = trigger(cb);

  if (is(spawns.size, 0)) return compile();

  const child = from(spawns);
  const spawn = last(child)[1] as ChildProcess;

  return spawn.on('close', compile);

};
