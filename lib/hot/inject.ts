import { pathExists, readFile, writeFile } from 'fs-extra';
import { basename } from 'pathe';
import { log, tui } from '~log';
import { $ } from '~state';
import * as request from '~requests/assets';

const EXP = /{%-?\s*render\s+['"]hot\.js['"]/;

/**
 * Uploads Snippet
 *
 * Uploading the required HOT snippet to the store. This will execute at runtime.
 */
export async function injectSnippet () {

  const key = 'snippets/hot.js.liquid';
  const [ theme ] = $.sync.themes;
  const snippet = await readFile($.hot.snippet);
  const upload = await request.upload(snippet.toString(), { theme, key });

  log.update(tui.message('gray', `${key} uploaded snippet injection`));

  return upload;

}

/**
 * Whether or not render snippet exists
 *
 * Sugar helper for testing if string content containsa HOT snippet injection already or not.
 */
export function hasSnippet (content: string) {

  return EXP.test(content);

}

/**
 * Write Render Tag
 *
 * Inserts the HOT reload render tag snippet. The tag is injected after the opening
 * `<head>` tag in layout file/s.
 */
export function inject (content: string) {

  if (!hasSnippet(content)) return writeRender(content);

}

/**
 * Remove Render Tag
 *
 * Removes the HOT reload snippet render tag. Parses the provided string and
 * strips the tokens. This is used to clean up the hot client executable from layouts.
 */
export function removeRender (content: string) {

  const render = content.search(EXP);

  if (render > -1) {

    const start = content.slice(0, render);
    const slice = content.slice(content.indexOf('%}') + 2);

    return start + slice;

  }

  return content;

}

/**
 * Write Render Tag
 *
 * Inserts the HOT reload render tag snippet. The tag is injected after
 * the opening `<head>` tag.
 */
export function writeRender (content: string) {

  const ender = content.indexOf('<head>') + 6;
  const start = content.slice(0, ender);

  return start + NWL + $.hot.renderer + NWL + content.slice(ender);

}

/**
 * Eject Injection
 *
 * Performs a removal of the render tag snippet within layout/s which are
 * determined to contain the snippet.
 */
export async function ejectRender (path: string) {

  const exists = await pathExists(path);

  if (!exists) return null;

  const local = await readFile(path);

  let content = local.toString();

  const [ theme ] = $.sync.themes;
  const name = basename(path);
  const key = `layout/${name}`;
  const string = await request.find(`layout/${name}`, theme);

  if (EXP.test(string)) {

    content = removeRender(content);

    const removed = await request.upload(content, { theme, key });

    return removed;

  }

  return true;

}

/**
 * Upload Injection
 *
 * Performs an upload of the layout/s which contain the render tag.
 */
export async function injectRender (path: string) {

  const exists = await pathExists(path);

  if (!exists) return null;

  const local = await readFile(path);

  let content = local.toString();

  if (!EXP.test(content)) {
    content = writeRender(content);
    await writeFile(path, content);
    log.update(tui.message('gray', 'injected render tag in output layout'));
  }

  const [ theme ] = $.sync.themes;
  const name = basename(path);
  const key = `layout/${name}`;
  const string = await request.find(`layout/${name}`, theme);

  if (EXP.test(string)) content = removeRender(content);

  const upload = await request.upload(content, { theme, key });

  if (upload) {
    log.update(tui.message('gray', 'uploaded and inject render tag'));
    return true;
  }

  return false;

}
