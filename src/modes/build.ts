import anymatch from 'anymatch';
import { IFile, IStyle, Syncify } from 'types';
import { glob } from 'glob';
import { compile as assets } from 'transform/asset';
import { compile as liquid } from 'transform/liquid';
import { compile as json } from 'transform/json';
import { styles } from 'transform/styles';
import { isUndefined } from 'shared/native';
import { parseFile, Type } from 'process/files';
import { bundle } from 'options';
import { logger } from 'cli/stdout';
import { clean } from './clean';

/**
 * Build Function
 *
 * Triggers a compile of the project
 */
export async function build (callback?: typeof Syncify.hook) {

  if (bundle.mode.clean) await clean();

  const parse = parseFile(bundle.paths, bundle.dirs.output);
  const match = anymatch(bundle.watch);
  const paths = glob.sync(bundle.dirs.input + '**', { nodir: true });
  const source = paths.filter(match).sort();

  for (const path of source) {

    try {

      const file: IFile = parse(path);

      if (isUndefined(file)) continue;

      if (file.type === Type.Style) {

        await styles(file as IFile<IStyle>);

      } else if (file.type === Type.Section || file.type === Type.Layout || file.type === Type.Snippet) {

        await liquid(file, callback);

      } else if (file.type === Type.Locale || file.type === Type.Config) {

        await json(file, callback);

      } else if (file.type === Type.Metafield) {

        await json(file, callback);

      } else if (file.type === Type.Template) {

        if (file.ext === '.json') {
          await json(file, callback);
        } else {
          await liquid(file, callback);
        }

      } else if (file.type === Type.Asset) {

        await assets(file, callback);

      }

    } catch (error) {

      throw new Error(error);

    }
  }

  await logger(bundle.spawn, { clear: true });

};
