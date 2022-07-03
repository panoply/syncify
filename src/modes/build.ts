import anymatch from 'anymatch';
import { IFile, IPages, IStyle, Syncify } from 'types';
import { glob } from 'glob';
import { compile as assets } from 'transform/asset';
import { compile as liquid } from 'transform/liquid';
import { compile as json } from 'transform/json';
import { compile as pages } from 'transform/pages';
import { styles } from 'transform/styles';
import { isUndefined } from 'shared/native';
import { parseFile, Type } from 'process/files';
import { bundle } from '../options/index';
import { clean } from './clean';

/**
 * Build Function
 *
 * Triggers a compile of the project. Build mode will filter
 * and process each file group within a project in a sequential manner.
 * Upload will not be invoked until the build has completed.
 */
export async function build (callback?: Syncify) {

  if (bundle.mode.clean) await clean();

  const parse = parseFile(bundle.paths, bundle.dirs.output);
  const match = anymatch(bundle.watch);
  const paths = glob.sync(bundle.dirs.input + '**', { nodir: true });
  const source = paths.filter(match).reduce((acc, path) => {

    const file = parse(path);

    if (isUndefined(file)) return acc;

    switch (file.type) {
      case Type.Style:
        acc.style.push(file); break;
      case Type.Section:
        acc.section.push(file); break;
      case Type.Layout:
        acc.layout.push(file); break;
      case Type.Snippet:
        acc.layout.push(file); break;
      case Type.Locale:
        acc.locale.push(file); break;
      case Type.Config:
        acc.config.push(file); break;
      case Type.Template:
        acc.template.push(file); break;
      case Type.Page:
        acc.page.push(file); break;
      case Type.Asset:
        acc.asset.push(file); break;
      case Type.Metafield:
        acc.metafield.push(file); break;
    }

    return acc;

  }, {
    style: [],
    section: [],
    layout: [],
    snippet: [],
    locale: [],
    page: [],
    config: [],
    metafield: [],
    template: [],
    asset: []
  });

  /* -------------------------------------------- */
  /* STYLES                                       */
  /* -------------------------------------------- */

  for (const file of source.style) {
    try {
      await styles(file as IFile<IStyle>, callback);
    } catch (error) {
      console.error('ERROR', error);
    }
  }

  /* -------------------------------------------- */
  /* SECTIONS                                     */
  /* -------------------------------------------- */

  for (const file of source.section) {
    try {
      await liquid(file as IFile<IStyle>, callback);
    } catch (error) {
      console.error('ERROR', error);
    }
  }

  /* -------------------------------------------- */
  /* LAYOUTS                                      */
  /* -------------------------------------------- */

  for (const file of source.layout) {
    try {
      await liquid(file as IFile<IStyle>, callback);
    } catch (error) {
      console.error('ERROR', error);
    }
  }

  /* -------------------------------------------- */
  /* TEMPLATES                                    */
  /* -------------------------------------------- */

  for (const file of source.template) {
    try {
      if (file.ext === '.json') {
        await json(file, callback);
      } else {
        await liquid(file, callback);
      }
    } catch (error) {
      console.error('ERROR', error);
    }
  }

  /* -------------------------------------------- */
  /* SNIPPETS                                     */
  /* -------------------------------------------- */

  for (const file of source.snippet) {
    try {
      await liquid(file as IFile<IStyle>, callback);
    } catch (error) {
      console.error('ERROR', error);
    }
  }

  /* -------------------------------------------- */
  /* LOCALES                                      */
  /* -------------------------------------------- */

  for (const file of source.locale) {
    try {
      await json(file as IFile<IStyle>, callback);
    } catch (error) {
      console.error('ERROR', error);
    }
  }

  /* -------------------------------------------- */
  /* CONFIG                                       */
  /* -------------------------------------------- */

  for (const file of source.config) {
    try {
      await json(file as IFile<IStyle>, callback);
    } catch (error) {
      console.error('ERROR', error);
    }
  }

  /* -------------------------------------------- */
  /* METAFIELDS                                   */
  /* -------------------------------------------- */

  for (const file of source.page) {
    try {
      await pages(file as IFile<IPages>, callback);
    } catch (error) {
      console.error('ERROR', error);
    }
  }

  /* -------------------------------------------- */
  /* METAFIELDS                                   */
  /* -------------------------------------------- */

  for (const file of source.metafield) {
    try {
      await json(file as IFile<IStyle>, callback);
    } catch (error) {
      console.error('ERROR', error);
    }
  }

  /* -------------------------------------------- */
  /* ASSETS                                       */
  /* -------------------------------------------- */

  for (const file of source.asset) {
    try {
      await assets(file as IFile<IStyle>, callback);
    } catch (error) {
      console.error('ERROR', error);
    }
  }

  // await logger(bundle.spawn, { clear: true });

};
