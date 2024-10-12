/* eslint-disable no-unused-vars */
import type { PathBundle } from 'types';
import { join, parse, relative, basename } from 'node:path';
import { schema, script, section, snippet, style, svg } from 'syncify:process/context';
import { lastPath } from 'syncify:utils/paths';
import { uuid } from 'syncify:utils';
import { assign } from 'syncify:native';
import { File, Kind, Type, Namespace } from 'syncify:file';
import { Partial } from 'rambdax';
import { $ } from 'syncify:state';

/**
 * File Kind
 *
 * Expects a file extension as parameter and will return the
 * file **Kind** enum reference. Mainly used for Imports (downloads).
 */
function getFileKind (ext: string) {

  switch (ext) {
    case '.liquid':
      return Kind.Liquid;
    case '.json':
      return Kind.JSON;
    case '.html':
      return Kind.HTML;
    case '.md':
      return Kind.Markdown;
    case '.js':
    case '.mjs':
      return Kind.JavaScript;
    case '.jsx':
      return Kind.JSX;
    case '.ts':
      return Kind.TypeScript;
    case '.tsx':
      return Kind.TSX;
    case '.svg':
      return Kind.SVG;
    case '.css':
      return Kind.CSS;
    case '.scss':
      return Kind.SCSS;
    case '.sass':
      return Kind.SASS;
    case '.mov':
    case '.mp4':
    case '.webm':
    case '.ogg':
      return Kind.Video;
    case '.ico':
    case '.jpg':
    case '.png':
    case '.gif':
    case '.pjpg':
    case '.webp':
      return Kind.Image;
    case '.eot':
    case '.ttf':
    case '.woff':
    case '.woff2':
      return Kind.Font;
    case '.pdf':
      return Kind.PDF;
    case '.yaml':
    case '.yml':
      return Kind.Yaml;
  }

  return Kind.Unknown;

}

/**
 * Renames the file by replacing namespaces with their inferred values.
 * If no namespaces are passed then the intended rename is applied.
 *
 * @param file The file context
 * @param rename The rename string
 */
export function renameFile ({ name, dir, ext, namespace }: File, rename: string): string {

  let newName = rename;

  if (/\[dir\]/.test(newName)) newName = newName.replace(/\[dir\]/g, dir);
  if (/\[name\]/.test(newName)) newName = newName.replace(/\[name\]/g, name);
  if (/\[file\]/.test(newName)) newName = newName.replace(/\[file\]/g, name);
  if (/\[ext\]/.test(newName)) newName = newName.replace(/\[ext\]/g, ext);

  // validate the rename extension
  if (namespace === 'snippets' && rename.endsWith('.liquid') === false) return newName + '.liquid';

  // validate the rename extension
  if (!rename.endsWith('.[ext]') || !rename.endsWith(ext)) {
    return /\.[a-z]+$/.test(rename) ? newName : newName + ext;
  }

  return newName;

}

/**
 * Path setter for in-process file handling. Returns an object with important
 * information about the current file being processed.
 *
 * @param file The parsed file context information
 * @param input The file path which is being processed
 * @param output The output base directory path
 */
export function setFile (file: File, input: string, output: string) {

  file.size = NaN;

  return function <T extends unknown> (
    namespace: Namespace,
    type: Type,
    kind?: Kind | -1
  ): File<T> {

    let key: string;

    if (type === Type.Metafield || type === Type.Page) {
      key = join(lastPath(file.dir), file.base);
      output = null;
    } else {
      key = join(namespace, file.base);
      output = join(output, key);
    }

    if (kind === -1) input = $.cache.paths[input];

    file.uuid = uuid();
    file.type = type;
    file.key = key;
    file.namespace = namespace;
    file.kind = kind as Kind;
    file.input = input;
    file.output = output;
    file.relative = input ? relative($.cwd, input) : $.cwd;

    return file;

  };

};

/**
 * Path setter for imports (downloads). Import file references use the
 * remote asset key for determination and will write a partial File reference.
 * the `input` property is excluded in import file references.
 *
 * @param file The parsed file context information
 * @param input The file path which is being processed
 * @param output The output base directory path
 */
export function setImportFile (parsedFile: Partial<File>, output: string) {

  const file = <File>parsedFile;

  return (key: string, namespace: Namespace): File => {

    return assign({}, file, {
      uuid: uuid(),
      key,
      namespace,
      output,
      kind: getFileKind(file.ext),
      relative: relative($.cwd, output)
    });

  };
}

export function parseFileQuick <T> (path: string): File<T> {

  return <File<T>> parseFile($.paths, $.dirs.output)(path);

}

/**
 * Parses the filename and returns a workable object that we will pass
 * into requests and transforms. The function returns file context
 * Some files use an anymatch test to determine their handling whereas
 * others will determine handling based on extension name.
 *
 * @param paths The Anymatch tester
 * @param output The output base directory path
 */
export function parseFile (paths: PathBundle, output: string) {

  return function fn (path: string) {

    const file = new File(parse(path));
    const define = setFile(file, path, output);

    if (file.ext === '.liquid') {

      if (paths.sections.match(path)) {

        return section(define(Namespace.Sections, Type.Section, Kind.Liquid));

      } else if (paths.snippets.match(path)) {

        return snippet(define(Namespace.Snippets, Type.Snippet, Kind.Liquid));

      } else if (paths.layout.match(path)) {

        return define(Namespace.Layout, Type.Layout, Kind.Liquid);

      } else if (paths.templates.match(path)) {

        return define(Namespace.Templates, Type.Template, Kind.Liquid);

      } else if (paths.customers.match(path)) {

        return define(Namespace.Customers, Type.Template, Kind.Liquid);

      } else if (paths.metaobject.match(path)) {

        return define(Namespace.Metaobject, Type.Template, Kind.Liquid);

      } else if (paths.transforms.get(path) === Type.Style) {

        return style(define(Namespace.Snippets, Type.Style, Kind.CSS));

      }

    } else if (file.ext === '.schema' && paths.schema.match(path)) {

      return schema(fn, define(Namespace.Schema, Type.Schema, Kind.JSON));

    } else if (file.ext === '.json') {

      if (paths.metafields.match(path)) {

        return define(Namespace.Metafields, Type.Metafield, Kind.JSON);

      } else if (paths.sections.match(path)) {

        return section(define(Namespace.Sections, Type.Section, Kind.JSON));

      } else if (paths.templates.match(path)) {

        return define(Namespace.Templates, Type.Template, Kind.JSON);

      } else if (paths.config.match(path)) {

        return define(Namespace.Config, Type.Config, Kind.JSON);

      } else if (paths.locales.match(path)) {

        return define(Namespace.Locales, Type.Locale, Kind.JSON);

      } else if (paths.customers.match(path)) {

        return define(Namespace.Customers, Type.Template, Kind.JSON);

      } else if (paths.metaobject.match(path)) {

        return define(Namespace.Metaobject, Type.Template, Kind.JSON);

      } else if (paths.schema.match(path)) {

        return schema(fn, define(Namespace.Schema, Type.Schema, Kind.JSON));

      }

    }

    if (paths.assets.match(path)) {

      if ($.spawn.invoked) return define(Namespace.Assets, Type.Spawn);

      switch (file.ext) {
        case '.js':
        case '.mjs':
          return define(Namespace.Assets, Type.Asset, Kind.JavaScript);
        case '.json':
          return define(Namespace.Assets, Type.Asset, Kind.JSON);
        case '.svg':
          return define(Namespace.Assets, Type.Asset, Kind.SVG);
        case '.css':
          return define(Namespace.Assets, Type.Asset, Kind.CSS);
        case '.ico':
        case '.jpg':
        case '.png':
        case '.gif':
        case '.webp':
        case '.pjpg':
          return define(Namespace.Assets, Type.Asset, Kind.Image);
        case '.mov':
        case '.mp4':
        case '.webm':
        case '.ogg':
          return define(Namespace.Assets, Type.Asset, Kind.Video);
        case '.pdf':
          return define(Namespace.Assets, Type.Asset, Kind.PDF);
        case '.eot':
        case '.ttf':
        case '.woff':
        case '.woff2':
          return define(Namespace.Assets, Type.Asset, Kind.Font);
      }

    }

    switch (file.ext) {
      case '.js':
      case '.mjs':
        return script(define(Namespace.Assets, Type.Script, Kind.JavaScript));
      case '.ts':
        return script(define(Namespace.Assets, Type.Script, Kind.TypeScript));
      case '.tsx':
        return script(define(Namespace.Assets, Type.Script, Kind.TSX));
      case '.jsx':
        return script(define(Namespace.Assets, Type.Script, Kind.JSX));
      case '.svg':
        return svg(define(Namespace.Assets, Type.Svg, Kind.SVG));
      case '.css':
        return style(define(Namespace.Assets, Type.Style, Kind.CSS));
      case '.scss':
        return style(define(Namespace.Assets, Type.Style, Kind.SCSS));
      case '.sass':
        return style(define(Namespace.Assets, Type.Style, Kind.SASS));
      case '.md':
        return define(Namespace.Pages, Type.Page, Kind.Markdown);
      case '.html':
        return define(Namespace.Pages, Type.Page, Kind.HTML);
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
export function importFile (key: string, outputPath: string): File {

  const path = join(outputPath, key);
  const file = new File(parse(path));
  const define = setImportFile(file, path);

  if (key.startsWith('sections/')) {
    return define(key, Namespace.Sections);
  } else if (key.startsWith('snippets/')) {
    return define(key, Namespace.Snippets);
  } else if (key.startsWith('layout/')) {
    return define(key, Namespace.Layout);
  } else if (key.startsWith('customers/', 10)) {
    return define(key, Namespace.Customers);
  } else if (key.startsWith('metaobject/', 10)) {
    return define(key, Namespace.Metaobject);
  } else if (key.startsWith('templates/')) {
    return define(key, Namespace.Templates);
  } else if (key.startsWith('config/')) {
    return define(key, Namespace.Config);
  } else if (key.startsWith('locales/')) {
    return define(key, Namespace.Locales);
  } else if (key.startsWith('assets/')) {
    return define(key, Namespace.Assets);
  }

};

export const outputFile = (output: string) => (path: string) => {

  const file = new File(parse(path));
  const merge = setFile(file, path, output);

  switch (basename(file.dir)) {
    case 'sections': return merge(Namespace.Sections, Type.Section, -1);
    case 'snippets': return merge(Namespace.Snippets, Type.Snippet, -1);
    case 'layout': return merge(Namespace.Layout, Type.Layout);
    case 'templates': return merge(Namespace.Templates, Type.Template, -1);
    case 'customers': return merge(Namespace.Customers, Type.Template, -1);
    case 'metaobject': return merge(Namespace.Metaobject, Type.Template, -1);
    case 'config': return merge(Namespace.Config, Type.Config, -1);
    case 'locales': return merge(Namespace.Locales, Type.Locale, -1);
    case 'assets': return merge(Namespace.Assets, Type.Asset, -1);
  }

};
