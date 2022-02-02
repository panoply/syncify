/* eslint-disable no-unused-vars */

import { join, parse } from 'path';
import { Syncify, IFile, IConfig, IStyles, IViews, IStyle } from 'types';
import { assign, isRegex, isUndefined } from 'utils/native';
import { lastPath } from 'utils/helpers';

/**
 * File types are represented as numeric values.
 * The infer the following:
 *
 */
export const enum Type {
  Template = 1,
  Layout,
  Snippet,
  Section,
  Config,
  Locale,
  Metafield,
  Style,
  CSS,
  SASS,
  Icon,
  Sprite,
  Asset,
  Redirect,
}

function setProps (path: string, output: string) {

  const file: Partial<IFile> = parse(path);

  return {
    file,
    merge: (namespace: string, type: Type): IFile => {
      return assign(file as IFile, {
        namespace,
        type,
        path,
        output,
        parent: lastPath(file.dir),
        key: join(namespace, file.base),
        config: null
      });
    }
  };

}

/**
 * Parse File
 *
 * Parses the filename and returns a workable
 * object that we will pass into requests. Determines
 * whether or not we are working with metafield or asset
 * and vice-versa.
 */
export function parseFile (paths: IConfig['paths'], output: string) {

  return (path: string) => {

    const { file, merge } = setProps(path, output);

    if (/\.liquid/.test(file.ext)) {

      if (paths.sections(path)) {
        return merge('sections', Type.Section);
      }
      if (paths.snippets(path)) {
        return merge('snippets', Type.Snippet);
      }
      if (paths.layout(path)) {
        return merge('layout', Type.Layout);
      }
      if (paths.templates(path)) {
        return merge('templates', Type.Template);
      }
      if (paths.customers(path)) {
        return merge('templates/customers', Type.Template);
      }

    } else if (/\.json/.test(file.ext)) {

      if (paths.metafields(path)) {
        return merge(lastPath(file.dir), Type.Metafield);
      }
      if (paths.templates(path)) {
        return merge('templates', Type.Template);
      }
      if (paths.config(path)) {
        return merge('config', Type.Config);
      }
      if (paths.locales(path)) {
        return merge('locales', Type.Locale);
      }
      if (paths.customers(path)) {
        return merge('templates/customers', Type.Template);
      }

    } else if (/\.(?:css|scss|sass)/.test(file.ext)) {

      return merge('assets', Type.Style);

    } else if (paths.assets(path)) {

      return merge('assets', Type.Asset);

    }

  };

}

/**
 * Augment the file configuration to accept
 * style types.
 */
export function isStyle (file: IFile<IStyle>, transform: IStyles) {

  const config = transform.compile.find(x => x.watch(file.path));

  return assign({}, file, {
    config,
    type: file.ext === '.css' ? Type.CSS : Type.SASS,
    output: join(file.output, config.output),
    namespace: file.namespace === 'snippets' ? 'snippets' : file.namespace,
    key: config.output
  });

}

/**
 * Augment the file configuration to accept
 * metafield types.
 */
export function isMetafield (file: IFile) {

  return assign(file as IFile, { key: file.name });

}

/**
 * Augment the file configuration to accept
 * metafield types.
 */
export function isSection (file: IFile, transform: IViews['sections']) {

  if (!transform.allowPrefix) {
    file.key = join(file.namespace, file.base);
  } else {
    if (isRegex(transform.globals)) {
      if (transform.globals.test(file.parent)) {
        file.key = join(file.namespace, file.base);
      } else {
        file.key = join(file.namespace, file.parent + transform.prefixSeparator + file.base);
      }
    } else {
      file.key = join(file.namespace, file.parent + transform.prefixSeparator + file.base);
    }
  }

  return file;

}

/**
 * Asset Modifier
 *
 * Handler function for a content modifier
 * callback that one can optionally execute
 * from within scripts.
 */
export function asset (
  file: IFile,
  data: Buffer | string | object | any[],
  callback: typeof Syncify.hook
) {

  if (typeof callback !== 'function') return data.toString();

  const update = callback.apply({ ...file }, data);

  if (isUndefined(update)) return data;

  if (/\.(liquid|html|json|js|css|scss|sass|txt|svg)/.test(file.ext)) {
    return update.toString();
  }

  return data.toString();

}
