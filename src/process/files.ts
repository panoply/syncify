/* eslint-disable no-unused-vars */

import { join, parse, relative, extname } from 'node:path';
import { Bundle, File, Paths } from 'types';
import { assign, nil } from '~utils/native';
import { lastPath } from '~utils/paths';
import { Partial } from 'rambdax';
import * as context from '~process/context';
import { bundle } from '~config';
import { Tester } from 'anymatch';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

/**
 * File types are represented as numeric values.
 */
export const enum Type {
  Template = 1,
  Layout,
  Snippet,
  Section,
  Config,
  Locale,
  Style,
  Script,
  Svg,
  Redirect,
  File,
  Asset,
  Metafield,
  Page,
  Spawn
}

/**
 * File namespaces represent various identifiers, typically
 * passed to store synchronization requests.
 */
export const enum Namespace {
  Sections = 'sections',
  Snippets = 'snippets',
  Layout = 'layout',
  Templates = 'templates',
  Customers = 'templates/customers',
  Config = 'config',
  Locales = 'locales',
  Assets = 'assets',
  Metafields = 'metafields',
  Pages = 'pages'
}

/**
 * File kinds represent the processing types,
 * typicaly infers the tranform operation to
 * be applied.
 */
export const enum Kind {
  JSON = 'JSON',
  CSS = 'CSS',
  SASS = 'SASS',
  SCSS = 'SCSS',
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
  JSX = 'JSX',
  TSX = 'TSK',
  Font = 'Font',
  SVG = 'SVG',
  Sprite = 'SVG Sprite',
  PDF = 'PDF',
  Image = 'Image',
  Video = 'Video',
  Liquid = 'Liquid',
  HTML = 'HTML',
  Markdown = 'Markdown',
  Yaml = 'YAML',
}

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Renames the file by replacing namespaces with their inferred values.
 * If no namespaces are passed then the intended rename is applied.
 *
 * @param file The file context
 * @param rename The rename string
 */
export function renameFile<T> ({ name, dir, ext, namespace }: File<T>, rename: string): string {

  let newName = rename;

  if (/\[dir\]/.test(newName)) newName = newName.replace(/\[dir\]/g, dir);
  if (/\[file\]/.test(newName)) newName = newName.replace(/\[file\]/g, name);
  if (/\[ext\]/.test(newName)) newName = newName.replace(/\[ext\]/g, ext);

  // validate the rename extension
  if (namespace === 'snippets' && rename.endsWith('.liquid') === false) return newName + '.liquid';

  // validate the rename extension
  if (!rename.endsWith('.[ext]') || !rename.endsWith(ext)) {
    return /\.[a-z]+$/.test(rename)
      ? newName
      : newName + ext;
  }

  return newName;

}

/**
 * Path setter for in-process file handling. Returns a an object with important
 * information about the current file being processed.
 *
 * @param file The parsed file context information
 * @param input The file path which is being processed
 * @param output The output base directory path
 */
export function setFile (file: Partial<File>, input: string, output: string) {

  return <T extends unknown>(namespace: string, type: Type, kind?: Kind): File<T> => {

    let key: string;

    if (type === Type.Metafield || type === Type.Page) {
      key = join(lastPath(file.dir), file.base);
      output = null;
    } else {
      key = join(namespace, file.base);
      output = join(output, key);
    }

    return assign({}, file as File, {
      type,
      input,
      output,
      key,
      namespace,
      kind,
      relative: relative(bundle.cwd, input),
      config: undefined,
      size: NaN
    });

  };

};

/**
 * Parses the filename and returns a workable object that we will pass
 * into requests and transforms. The function returns file context.
 * Some files use an anymatch test to determine their handling whereas
 * others will determine handling based on extension name.
 *
 * @param paths The Anymatch tester
 * @param output The output base directory path
 */
export function parseFile (paths: Bundle['paths'], output: string) {

  return (path: string) => {

    const file: Partial<File> = parse(path);
    const merge = setFile(file, path, output);

    if (file.ext === '.liquid') {

      if (paths.sections(path)) {
        return context.section(merge('sections', Type.Section, Kind.Liquid));
      } else if (paths.snippets(path)) {
        return merge('snippets', Type.Snippet, Kind.Liquid);
      } else if (paths.layout(path)) {
        return merge('layout', Type.Layout, Kind.Liquid);
      } else if (paths.templates(path)) {
        return merge('templates', Type.Template, Kind.Liquid);
      } else if (paths.customers(path)) {
        return merge('templates/customers', Type.Template, Kind.Liquid);
      } else if (paths.transforms.has(path)) {
        switch (paths.transforms.get(path)) {
          case Type.Script: return context.script(merge('snippets', Type.Script, Kind.JavaScript));
          case Type.Style: return context.script(merge('snippets', Type.Style, Kind.CSS));
        }
      }

    } else if (file.ext === '.md' || file.ext === '.html') {

      return merge('pages', Type.Page, file.ext === '.html' ? Kind.HTML : Kind.Markdown);

    } else if (file.ext === '.json') {

      if (paths.metafields(path)) {
        return merge('metafields', Type.Metafield, Kind.JSON);
      } else if (paths.templates(path)) {
        return merge('templates', Type.Template, Kind.JSON);
      } else if (paths.config(path)) {
        return merge('config', Type.Config, Kind.JSON);
      } else if (paths.locales(path)) {
        return merge('locales', Type.Locale, Kind.JSON);
      } else if (paths.customers(path)) {
        return merge('templates/customers', Type.Template, Kind.JSON);
      }

    } else if (file.ext === '.svg') {
      return context.svg(merge('assets', Type.Svg, Kind.SVG));
    } else if (file.ext === '.css') {
      return context.style(merge('assets', Type.Style, Kind.CSS));
    } else if (file.ext === '.scss') {
      return context.style(merge('assets', Type.Style, Kind.SCSS));
    } else if (file.ext === '.sass') {
      return context.style(merge('assets', Type.Style, Kind.SASS));

    } else if (file.ext === '.js') {
      return context.script(merge('assets', Type.Script, Kind.JavaScript));
    } else if (file.ext === '.ts') {
      return context.script(merge('assets', Type.Script, Kind.TypeScript));
    } else if (file.ext === '.jsx') {
      return context.script(merge('assets', Type.Script, Kind.JSX));
    } else if (file.ext === '.tsx') {
      return context.script(merge('assets', Type.Script, Kind.TSX));

    } else if (paths.assets(path)) {

      if (bundle.spawn.invoked) {
        return merge('assets', Type.Spawn);
      } else if (file.ext === '.jpg' || file.ext === '.png' || file.ext === '.gif' || file.ext === '.pjpg') {
        return merge('assets', Type.Asset, Kind.Image);
      } else if (file.ext === '.mov' || file.ext === '.mp4' || file.ext === '.webm' || file.ext === '.ogg') {
        return merge('assets', Type.Asset, Kind.Video);
      } else if (file.ext === '.pdf') {
        return merge('assets', Type.Asset, Kind.PDF);
      } else if (file.ext === '.eot' || file.ext === '.ttf' || file.ext === '.woff' || file.ext === '.woff2') {
        return merge('assets', Type.Asset, Kind.Font);
      }
    }

    return undefined;
  };
};

/**
 * Import theme directory outputs used in _download_ mode to
 * write theme files to the intended sub directories.
 *
 * @param output The import directory base path
 */
export function importFile (output: string) {

  return (path: string) => {

    const file: Partial<File> = parse(path);
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

};

export const outputFile = (output: string) => (path: string) => {

  const file: Partial<File> = parse(path);
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
