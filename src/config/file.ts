/* eslint-disable no-unused-vars */

import { join, parse, ParsedPath, basename } from 'path';
import { isType } from 'rambdax';
import * as log from '../cli/console';
import { Syncify, IFile, IConfig, IStyles, IViews } from 'types';
import { Merge } from 'type-fest';
import { assign, is, lastPath } from 'config/utils';
import * as view from 'transform/liquid';
import { writeFile } from 'fs-extra';

/**
 * File types are represented as numeric values.
 * The infer the following:
 *
 */
export const enum Type {

  /* VIEWS -------------------------------------- */
  Template = 1,
  Layout,
  Snippet,
  Section,

  /* JSON --------------------------------------- */
  Config,
  Locale,
  Metafield,

  /* STYLES ------------------------------------- */
  Style,
  CSS,
  SASS,

  /* ICONS -------------------------------------- */
  Icon,
  Sprite,

  /* ASSETS ------------------------------------- */

  Asset,

  /* OTHER -------------------------------------- */
  Redirect,
}

function setProps (path: string, output: string) {

  const file: Partial<IFile> = assign(parse(path), { output });

  return {
    file,
    merge: (namespace: string, type: Type): IFile => {
      return assign(file as IFile, {
        idx: -1,
        namespace,
        type,
        path,
        key: join(namespace, file.base)
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

async function findAsyncSeq<T> (
  array: T[],
  predicate: (t: T) => Promise<boolean>
): Promise<number> {

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (await predicate(element)) {
      return i;
    }

  }

  return -1;
}

/**
 * Augment the file configuration to accept
 * style types.
 */
export function isStyle (file: IFile, transform: IStyles) {

  const idx = transform.compile.findIndex(x => x.watch(file.path));
  const style = transform.compile[idx];

  return assign({}, file as IFile, {
    idx,
    path: style.input,
    key: style.output,
    type: file.ext === '.css' ? Type.CSS : Type.SASS,
    namespace: file.namespace === 'snippets' ? 'snippets' : file.namespace
  });

}

/**
 * Augment the file configuration to accept
 * metafield types.
 */
export function isMetafield (file: IFile) {

  return assign(file as IFile, { key: file.base });

}

/**
 * Augment the file configuration to accept
 * metafield types.
 */
export function isSection (file: IFile, transform: IViews['sections']) {

  if (!transform.allowPrefix) return file;

  if (!transform.globals.includes(file.namespace)) {
    file.key = join('sections', transform.prefixSeparator + file.base);
  }

  return assign(file as IFile, { key: file.base });

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

  if (isType('Undefined', update)) return data;

  if (/\.(liquid|html|json|js|css|scss|sass|txt|svg)/.test(file.ext)) {
    return update.toString();
  }

  return data.toString();

}
