import { pathExists, readFile, writeFile } from 'fs-extra';
import { basename } from 'node:path';
import { nl } from '../shared/native';
import { bundle } from '../config';
import { HOT_SNIPPET } from '../constants';
import * as request from '../requests/assets';
import { c } from '../logger';
import update from 'log-update';

const EXP = new RegExp(`{%-?\\s*render\\s+['"]${HOT_SNIPPET}['"][,\\slablsockvetr:0-9'"]+?-?%}\\s+`);

/**
 * Has Snippet
 *
 * Checks whether or not the theme contains
 * the HOT reload snippet both locally and remote.
 */
export async function injectSnippet () {

  const key = `snippets/${HOT_SNIPPET}`;
  const [ theme ] = bundle.sync.themes;

  const snippet = await readFile(bundle.hot.snippet);
  const upload = await request.upload(snippet.toString(), { theme, key });
  update(`${c.line}${c.italic.gray(`${key} uploaded snippet injection`)}`);
  return upload;

}

/**
 * Write Render Tag
 *
 * Inserts the HOT reload render tag snippet. The tag
 * is injected after the opening `<head>` tag.
 */
export function inject (content: string) {

  if (!EXP.test(content)) return writeRender(content);

}

/**
 * Remove Render Tag
 *
 * Removes the HOT reload snippet render tag. Parses
 * the provided string and strips the tokens. This is
 * used to clean up the hot client executable from layouts.
 */
export function removeRender (content: string) {

  const render = content.search(EXP);
  const start = content.slice(0, render);
  const slice = content.slice(content.indexOf('%}') + 2);

  return start + slice;

}

/**
 * Write Render Tag
 *
 * Inserts the HOT reload render tag snippet. The tag
 * is injected after the opening `<head>` tag.
 */
export function writeRender (content: string) {

  const ender = content.lastIndexOf('<head>') + 6;
  const start = content.slice(0, ender);
  return start + nl + bundle.hot.renderer + nl + content.slice(ender);

}

export async function injectRender (path: string) {

  const exists = await pathExists(path);

  if (!exists) return null;

  const local = await readFile(path);
  let content = local.toString();

  if (!EXP.test(content)) {
    content = writeRender(content);
    await writeFile(path, content);
    update(`${c.line}${c.italic.gray('injected render tag in output layout')}`);
  }

  const [ theme ] = bundle.sync.themes;
  const name = basename(path);
  const key = `layout/${name}`;
  const string = await request.find(`layout/${name}`, theme);

  if (EXP.test(string)) content = removeRender(content);

  const upload = await request.upload(content, { theme, key });

  if (upload) {
    update(`${c.line}${c.italic.gray(`${key} uploaded and inject render tag`)}`);
    return true;
  }

  return false;

}
