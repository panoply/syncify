import { minify } from 'html-minifier-terser';

import { log } from '~cli/log';
import { File } from '~file';

import { $ } from '$';

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

    log.error(file.relative);

    console.error(e);

    return null;

  }

};
