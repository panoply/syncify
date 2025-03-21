import type { OnlineStoreThemeFilesUpsertFileInput, Theme } from 'types';

import { basename, join } from 'node:path';

import { readFileSync, writeFile } from 'fs-extra';

import { glue } from '@syncify/glue';

import { wss } from './socket';

import { warnOption } from '~cli/throws';
import { HOT_SNIPPET_KEY, REGEX_HOT_SNIPPET } from '~const';
import { event } from '~events';
import { themeFilesList, themeFilesUpsert } from '~http/themeFiles';
import { forEach, forMap, isString, m } from '~utils';

import { $, q } from '$';

/**
 * Injects user options into the snippet and and returns the modified string.
 * The snippet Liquid comment `# inject@options` will be targeted.
 */
export function setHotOptions (injection: string) {

  const { hot } = $;

  return injection.replace('# inject@options', glue.nl(
    `assign server = ${hot.server}`,
    `  assign socket = ${hot.socket}`,
    `  assign method = '${hot.method}'`,
    `  assign no-preview-bar = ${hot.flags['no-preview-bar']}`,
    `  assign no-web-pixels-manager = ${hot.flags['no-web-pixels-manager']}`,
    `  assign no-shopify-features = ${hot.flags['no-shopify-features']}`,
    `  assign no-checkout-preloads = ${hot.flags['no-checkout-preloads']}`,
    `  assign no-trekkie = ${hot.flags['no-trekkie']}`,
    `  assign no-perfkit = ${hot.flags['no-perfkit']}`
  ));

}

/**
 * Extracts the snippet version from the snippet contents.
 * The version reflects the package.json version of the `@syncify/hot`
 * module and is exposed as a line comment (e.g, `# v1.0.0`).
 *
 * - Returns `null` if version cannot be found
 * - Accepts the `content` string as parameter (optional)
 */
function getSnippetVersion (content?: string) {

  const source = content || readFileSync($.hot.source, 'utf8');
  const start = source.indexOf('# v') + 3;

  if (start > 2) {
    const ender = source.indexOf('\n', start);
    if (ender > -1) return source.slice(start, ender);
  }

  return null;

}

/**
 * Remove Render Tag
 *
 * Removes the HOT reload snippet render tag. Parses the provided string and
 * strips the tokens. This is used to clean up the hot client executable from layouts.
 */
function removeRenderTag (content: string) {

  const render = content.search(REGEX_HOT_SNIPPET);

  if (render > -1) {
    const start = content.slice(0, render);
    const slice = content.slice(content.indexOf('%}') + 2);
    return start.replace(/\n$/, '') + slice.replace(/^\n/, '');
  }

  return content;

}

/**
 * Inserts the HOT reload render tag snippet. The tag is injected after
 * the opening `<head>` tag.
 */
export function injectRenderSnippet (content: string) {

  const ender = content.indexOf('<head>') + 6;
  const start = content.slice(0, ender);

  return start + NWL + '{%- render \'hot.js\' -%}' + NWL + content.slice(ender);

}

/**
 * Whether or not render snippet exists within layouts. Uses the
 * {@link REGEX_HOT_SNIPPET} regular expression and will return a
 * boolean value of `true` when render snippet exists.
 */
export function hasSnippetInjection (content: string) {

  return REGEX_HOT_SNIPPET.test(content);

}

/**
 * Remove HOT Snippet Render
 *
 * Removes the HOT reload snippet render tag from the remote layout files.
 * The {@link removeRenderTag} will be used to extract the render.
 */
export function removeSnippetFromRemote () {

  const layouts = forMap(key => $.hot.alive.layouts[key] ? key : undefined, $.hot.cache.layouts);

  return new Promise((resolve) => {

    themeFilesList(layouts).then(request => {

      const input = forMap(({ body, filename }) => {

        if (!isString(body.content) || !REGEX_HOT_SNIPPET.test(body.content)) return undefined;

        return {
          filename,
          body: {
            type: 'TEXT',
            value: removeRenderTag(body.content)
          }
        };

      }, request.files);

      if (input.length > 0) themeFilesUpsert(input).then(resolve);

    });

  });

}

/**
 * Performs a removal of the render tag snippet within layout/s which are determined to contain the snippet.
 */
export function removeSnippetInjections () {

  const request = forMap<string, OnlineStoreThemeFilesUpsertFileInput>(key => ({
    filename: `layout/${basename(key)}`,
    body: {
      type: 'TEXT',
      value: readFileSync(key, 'utf8')
    }
  }), $.hot.cache.layouts);

  return new Promise<string[]>(resolve => {

    themeFilesUpsert(request).then(({ synced }) => {

      resolve(forMap(({ filename }) => filename, synced));

    });

  });

}

/**
 * This function executes during runtime and will obtain
 * all HOT related files from the remote theme. It is triggered
 * immeadiatly after {@link setSync} has composed the store and theme
 * request client instances.
 *
 * The function performs a non-blocking asynchronous operation which
 * will look return the `snippets/hot.js.liquid` file contents along with
 * all layout file contents, as per `hot.layouts[]` config.
 *
 * The {@link $.hot.alive} and {@link $.hot.version.remote} references will
 * be updated and the contents of each file will be assigned to this functions
 * `snippet.content` object.
 *
 * Finally, the `snippet.promise` value will be the asynchronoues request and
 * it will be awaited on during snippet injection operations.
 */
export async function snippet (theme: Theme) {

  const input = [ HOT_SNIPPET_KEY, ...$.hot.layouts.map(layout => `layout/${layout}`) ];

  const promise = new Promise((resolve, reject) => {

    themeFilesList({ input, onError: reject }).then(({ files, errors }) => {

      if (errors.length > 0) {
        const warn = warnOption('HOT');
        forEach(({ filename, message }) => warn(message, filename), errors);
      }

      const match = m<string, string>(files.map(file => [ file.filename, file.body.content ]));
      const upsert = forMap<string, OnlineStoreThemeFilesUpsertFileInput>(filename => {

        if (filename === HOT_SNIPPET_KEY) {

          $.hot.alive.snippet = match.has(filename);

          if (match.has(filename)) {
            const content = match.get(filename);
            $.hot.alive.snippet = true;
            $.hot.version.remote = getSnippetVersion(content);
            q.cache.add(() => writeFile($.hot.cache.snippet, content));
          }

          const source = readFileSync($.hot.source, 'utf8');

          return {
            filename,
            body: {
              type: 'TEXT',
              value: setHotOptions(source)
            }
          };

        } else if (match.has(filename)) {

          const cache = join($.hot.cache.root, basename(filename));
          const content = match.get(filename);
          const exists = $.hot.alive.layouts[filename] = hasSnippetInjection(content);

          $.hot.cache.layouts.push(cache);
          q.cache.add(() => writeFile(cache, exists ? removeRenderTag(content) : content));

          return exists ? undefined : {
            filename,
            body: {
              type: 'TEXT',
              value: injectRenderSnippet(content)
            }
          };

        } else {

          $.hot.alive.layouts[filename] = false;

        }

      }, input);

      themeFilesUpsert({ input: upsert, onError: reject }).then(() => {

        if ($.mode.align) {
          resolve('hot:active');
        } else {
          resolve('hot:active');
        }

      });

    });

  }).then(wss);

  await promise;

};
