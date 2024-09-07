import { minify } from 'html-minifier-terser';
import { $ } from 'syncify:state';
import * as log from 'syncify:log';
import { File } from 'syncify:file';

/**
 * HTML Minfication
 *
 * Executes html terser on remaining document contents
 * and applied rules that were previously setup in config.
 */
export async function htmlMinify (file: File, content: string) {

  try {

    const htmlmin = await minify(content, $.liquid.terse.markup);
    return htmlmin;

  } catch (e) {

    log.invalid(file.relative);

    console.error(e);

    return null;

  }

};
