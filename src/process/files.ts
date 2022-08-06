/* eslint-disable no-unused-vars */

import { join, parse } from 'path';
import { IFile, IPaths } from 'types';
import { assign } from '../shared/native';
import { lastPath } from 'shared/paths';
import { Partial } from 'rambdax';
import * as context from './context';
import { bundle } from '../options/index';

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
  Style,
  Redirect,
  File,
  Icon,
  Asset,
  Metafield,
  Page,
  Spawn
}

export const enum Kind {
  JSON = 1,
  CSS,
  SASS,
  SVG,
  PDF,
  Image,
  Video,
  Liquid,
  HTML,
  Yaml,
  Markdown,
  Sprite
}

/**
 * Set Path
 *
 * Path setter for in-process file handling. Returns a
 * an object with important information about the
 * current file being processed.
 */
export function setFile (file: Partial<IFile>, input: string, output: string) {

  return <T extends unknown>(namespace: string, type: Type): IFile<T> => {

    let key: string;

    if (type === Type.Metafield || type === Type.Page) {
      key = join(lastPath(file.dir), file.base);
      output = null;
    } else {
      key = join(namespace, file.base);
      output = join(output, key);
    }

    if (bundle.build.spawn === 1 && type !== Type.Asset) bundle.build.spawn = 2;

    return assign({}, file as IFile, {
      type,
      input,
      output,
      key,
      namespace,
      config: undefined,
      size: NaN
    });

  };

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
      return context.section(merge('sections', Type.Section));
    } else if (paths.snippets(path)) {
      return merge('snippets', Type.Snippet);
    } else if (paths.layout(path)) {
      return merge('layout', Type.Layout);
    } else if (paths.templates(path)) {
      return merge('templates', Type.Template);
    } else if (paths.customers(path)) {
      return merge('templates/customers', Type.Template);
    }

  } else if (file.ext === '.md' || file.ext === '.html') {

    return merge('pages', Type.Page);

  } else if (file.ext === '.json') {

    if (paths.metafields(path)) {
      return merge('metafields', Type.Metafield);
    } else if (paths.templates(path)) {
      return merge('templates', Type.Template);
    } else if (paths.config(path)) {
      return merge('config', Type.Config);
    } else if (paths.locales(path)) {
      return merge('locales', Type.Locale);
    } else if (paths.customers(path)) {
      return merge('templates/customers', Type.Template);
    }
  } else if (file.ext === '.css' || file.ext === '.scss' || file.ext === '.scss') {
    return context.style(merge('assets', Type.Style));
  } else if (paths.assets(path)) {
    return merge('assets', Type.Asset);
  }

  return undefined;

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
    case 'sections': return merge('sections', Type.Section);
    case 'snippets': return merge('snippets', Type.Snippet);
    case 'layout': return merge('layout', Type.Layout);
    case 'templates': return merge('templates', Type.Template);
    case 'customers': return merge('templates/customers', Type.Template);
    case 'config': return merge('config', Type.Config);
    case 'locales': return merge('locales', Type.Locale);
    case 'assets': return merge('assets', Type.Asset);
  }

};
