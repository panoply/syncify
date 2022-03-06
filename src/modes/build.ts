import anymatch from 'anymatch';
import { IFile, IStyle, Syncify } from 'types';
import { glob } from 'glob';
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

  if (bundle.mode.clean) {
    await clean();
  }

  const parse = parseFile(bundle.paths, bundle.dirs.output);
  const match = anymatch(bundle.watch);
  const paths = glob.sync(bundle.dirs.input + '/**');
  const source = paths.filter(match).sort();

  for (const path of source) {

    const file: IFile = parse(path);

    if (isUndefined(file)) continue;

    switch (file.type) {
      case Type.Style:

        await styles(file as IFile<IStyle>);

        break;

      case Type.Section:
      case Type.Layout:
      case Type.Snippet:

        await liquid(file, callback);

        break;

      case Type.Locale:
      case Type.Config:
      case Type.Metafield:

        await json(file, callback);

        break;

      case Type.Template:

        if (file.ext === '.json') {
          await json(file, callback);
        } else {
          await liquid(file, callback);
        }

        break;

      case Type.Asset:

        continue;
    }

  }

  await logger(bundle.spawn, { clear: true });

};
