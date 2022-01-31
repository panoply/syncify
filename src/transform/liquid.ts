import { minify } from 'html-minifier-terser';
import { IFile, IViews, Syncify } from 'types';
import { join } from 'path';
import * as log from 'cli/logs';
import { readFile, writeFile } from 'fs-extra';
import { isType } from 'rambdax';
import { Type } from 'config/file';
import { is, isRegex } from 'utils/native';

export function htmlOpts (fragments: RegExp[] | string[], tags: string[]) {

  const liquid = new RegExp(`{%-?\\s*(?:(?!${tags.join('|')})[\\s\\S])*?%}`);
  const ignore = fragments.map((fragment: any) => {
    if (isRegex(fragment)) return fragment;
    return new RegExp(fragment);
  });

  ignore.push(
    // Ignore Inline Style
    /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,

    // Ignore <style></style>
    /<style[\s\S]*?<\/style>/,

    // Ignore content for header
    /{{-?\s*content_header[\s\S]*?}}/,

    // Ignore content for header
    /(?<={%-?\s{0,}style\s\s{0,}-?%})[\s\S]*?(?={%-?\s{0,}endstyle\s\s{0,}-?%})/,

    // Ignored liquid tags
    liquid

  );

  return ignore;

}

/**
 * Minify Section Schema
 *
 * Minfies the contents of a `{% schema %}` tag
 * from within sections.
 */
function minifySchema (file: IFile, content: string) {

  return content.replace(
    /({%-?\s*schema\s*-?%})([\s\S]*?)({%-?\s*endschema\s*-?%})/,
    (_, open, data, close) => {

      try {

        const parsed = JSON.parse(data);
        const minified = JSON.stringify(parsed, null, 0);

        return open + minified + close;

      } catch (e) {

        log.error(e);

        return open + data + close;

      }

    }
  );

}

/**
 * Remove Liquid Comments
 *
 * Strips Liquid comments from file content.
 * This is executed before passing to HTML terser.
 */
function stripNewlinesFromAttrs (content: string) {

  return content.replace(/(?<=["])[\s\S]*?(?=")/g, (match) => (
    match
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
  ));

}

/**
 * Remove Liquid Comments
 *
 * Strips Liquid comments from file content.
 * This is executed before passing to HTML terser.
 */
function removeComments (content: string) {

  return content.replace(
    /{%-?\s*comment\s*-?%}[\s\S]*?{%-?\s*endcomment\s*-?%}/g,
    ''
  );

}

function transform (file: IFile, config: IViews['minify']) {

  return async (data: string) => {

    if (is(file.type, Type.Section)) {
      if (config.liquid.minifySectionSchema) {
        data = minifySchema(file, data);
        log.json('minified {% schema %} in ' + file.base);
      }
    }

    if (config.liquid.removeLiquidComments) data = removeComments(data);
    if (config.liquid.removeAttributeNewlines) data = stripNewlinesFromAttrs(data);
    if (config.apply) data = await minify(data, config.terser);

    console.log(join(file.output, file.key));

    await writeFile(join(file.output, file.key), data);

    return Buffer.from(data).toString('base64');

  };
}

/**
 * Minifier
 *
 * Compiles file content and applies minification
 * returning the base64 processed string.
 */
export async function compile (file: IFile, config: IViews['minify'], callback: typeof Syncify.hook) {

  const read = await readFile(file.path);
  const edit = transform(file, config);
  const data = read.toString();

  if (!isType('Function', callback)) return edit(data);

  const update = callback.apply({ ...file }, data);

  if (isType('Undefined', update) || update === false) {

    return edit(data);

  } else if (isType('String', update)) {

    return edit(update);

  } else if (Buffer.isBuffer(update)) {

    return edit(update.toString());

  }

  return edit(data);

}
