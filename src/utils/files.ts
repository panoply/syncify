/* eslint-disable no-unused-vars */

import { join, parse } from 'path';
import { Syncify, IFile, IBundle, IStyle, ISections, IPaths } from 'types';
import { assign, isRegex, isUndefined } from './native';
import { lastPath } from './paths';
import { transform } from 'options';

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
  Page,
  PageHTML,
  Style,
  CSS,
  SASS,
  Icon,
  Sprite,
  Asset
}

/**
 * Set Path
 *
 * Path setter for in-process file handling. Returns a
 * an object with important information about the
 * current file being processed.
 */
export const setFile = (file: Partial<IFile>, path: string, output: string) => {

  return (namespace: string, type: Type): IFile => (
    assign(file as IFile, {
      namespace,
      type,
      path,
      output,
      parent: lastPath(file.dir),
      key: join(namespace, file.base),
      config: null,
      size: NaN
    })
  );

};

/**
 * Import File
 *
 * Returns the import
 */
export const importFile = (output: string) => (path: string) => {

  const file: Partial<IFile> = parse(path);
  const merge = setFile(file, path, output);

  if (path.startsWith('sections/')) {
    return merge('sections', Type.Section);
  } else if (path.startsWith('snippets/')) {
    return merge('snippets', Type.Snippet);
  } else if (path.startsWith('layout/')) {
    return merge('layout', Type.Layout);
  } else if (path.startsWith('templates/')) {
    return merge('templates', Type.Template);
  } else if (path.startsWith('customers/', 10)) {
    return merge('templates/customers', Type.Template);
  } else if (path.startsWith('config/')) {
    return merge('config', Type.Config);
  } else if (path.startsWith('locales/')) {
    return merge('locales', Type.Locale);
  } else if (path.startsWith('assets/')) {
    return merge('assets', Type.Asset);
  }

};

export const outputFile = (output: string) => (path: string) => {

  const file: Partial<IFile> = parse(path);
  const merge = setFile(file, path, output);

  switch (lastPath(file.dir)) {
    case 'sections':
      return merge('sections', Type.Section);
    case 'snippets':
      return merge('snippets', Type.Snippet);
    case 'layout':
      return merge('layout', Type.Layout);
    case 'templates':
      return merge('templates', Type.Template);
    case 'customers':
      return merge('templates/customers', Type.Template);
    case 'config':
      return merge('config', Type.Config);
    case 'locales':
      return merge('locales', Type.Locale);
    case 'assets':
      return merge('assets', Type.Asset);
  }

};

/**
 * Parse File
 *
 * Parses the filename and returns a workable
 * object that we will pass into requests. Determines
 * whether or not we are working with metafield or asset
 * and vice-versa.
 */
export const parseFile = (paths: IPaths, output: string) => (path: string) => {

  const file: Partial<IFile> = parse(path);
  const merge = setFile(file, path, output);

  if (file.ext === '.liquid') {
    if (paths.sections(path)) {
      return merge('sections', Type.Section);
    } else if (paths.snippets(path)) {
      return merge('snippets', Type.Snippet);
    } else if (paths.layout(path)) {
      return merge('layout', Type.Layout);
    } else if (paths.templates(path)) {
      return merge('templates', Type.Template);
    } else if (paths.customers(path)) {
      return merge('templates/customers', Type.Template);
    }
  } else if (/\.(?:md|html)/.test(file.ext)) {
    return merge(lastPath(file.dir), Type.Page);
  } else if (file.ext === '.json') {
    if (paths.metafields(path)) {
      return merge(lastPath(file.dir), Type.Metafield);
    } else if (paths.templates(path)) {
      return merge('templates', Type.Template);
    } else if (paths.config(path)) {
      return merge('config', Type.Config);
    } else if (paths.locales(path)) {
      return merge('locales', Type.Locale);
    } else if (paths.customers(path)) {
      return merge('templates/customers', Type.Template);
    }
  } else if (/\.(?:css|scss|sass)/.test(file.ext)) {
    return merge('assets', Type.Style);
  } else if (paths.assets(path)) {
    return merge('assets', Type.Asset);
  }

};

/**
 * Augment the file configuration to accept
 * style types.
 */
export const isStyle = (file: IFile<IStyle>) => {

  const item = { ...file };

  item.config = transform.find(x => x.watch(file.path));
  item.type = item.ext === '.css' ? Type.CSS : Type.SASS;
  item.output = join(item.output, item.config.output);
  item.namespace = item.namespace === 'snippets' ? 'snippets' : item.namespace;
  item.key = item.config.rename;

  return item;

};

/**
 * Augment the file configuration to accept
 * metafield types.
 */
export const isMetafield = (file: IFile) => {

  file.key = file.name;

  return file;

};

/**
 * Augment the file configuration to accept
 * metafield types.
 */
export const isSection = (file: IFile) => {

  const { sections } = transform;

  if (!sections.directoryPrefixing) {
    file.key = join(file.namespace, file.base);
  } else {
    if (isRegex(sections.global)) {
      if (sections.globals.test(file.parent)) {
        file.key = join(file.namespace, file.base);
      } else {
        file.key = join(file.namespace, `${file.parent}${sections.prefixSeparator}${file.base}`);
      }
    } else {
      file.key = join(file.namespace, `${file.parent}${sections.prefixSeparator}${file.base}`);
    }
  }

  return file;

};

/**
 * Asset Modifier
 *
 * Handler function for a content modifier
 * callback that one can optionally execute
 * from within scripts.
 */
export const isAsset = (file: IFile, data: Buffer | string | object | any[], cb: typeof Syncify.hook) => {

  if (typeof cb !== 'function') return data.toString();

  const update = cb.call({ ...file }, data);

  if (isUndefined(update)) return data;

  if (/\.(liquid|html|json|js|css|scss|sass|txt|svg)/.test(file.ext)) {
    return update.toString();
  }

  return data.toString();

};
