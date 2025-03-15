import type { Output as SvgoOutput } from 'svgo';
import type { SVGBundle, SVGOConfig } from 'types';

import { basename, join } from 'node:path';

import { readFile, writeFile } from 'fs-extra';
import { $import } from 'modules';
import pMap from 'p-map';

import * as _ from '@syncify/ansi';
import { timer } from '@syncify/timer';

import { log } from '~cli/log';
import { error } from '~errors';
import { File, Kind, Namespace } from '~file';
import { themeFilesUpsertMap } from '~http/themeFiles';
import { renameFile } from '~process/files';
import { assign, byteSize, plur, sizeDiff, toArray } from '~utils';

import { $ } from '$';

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

/**
 * Has Liquid
 *
 * Quickly validates SVGs for occurances of Liquid syntax.
 * SVGO cannot digest such occurances, so we will skip tokens
 * which contain Liquid code.
 *
 * Again, the animals who created Dawn popularized this shit,
 * so nothing but workarounds. smh.
 */
function hasLiquid (svg: string) {

  return /^(?:{{[\s\S]+?}}|{%[\s\S]+?%})|[^"'](?:{{[\s\S]+?}}|{%[\s\S]+?%})[^'"]/m.test(svg);

}

/**
 * Patch Solidus
 *
 * Fixes invalid paths on SVGs, converting unclosed `<path>` occurances
 * with `<path />` self closers. SVGO apparently couldn't digest these
 * and Dawn being the absolute shit show that it is was shipping unclosed
 * SVG tokens, which despite being valid was causing headaches.
 */
function patchPathVoids (svg: string) {

  const patch = /<path[^>]*[a-zA-Z"'\s](>)(?!\s*<\/path>)/g;

  if (patch.test(svg)) {

    const before = `${_.gray(`<${_.white('path')}>`)}`;
    const after = `${_.neonGreen(`<${_.white('path')} />`)}`;

    log.transform('SVG', before, after, 'patched solidus');

    return svg.replace(/(<path[^>]*[a-zA-Z"'\s])(>)(?!\s*<\/path>)/g, '$1 /$2');
  }

  return svg;
}

function createSymbol (id: string, code: string) {

  // Normalize input - collapse whitespace, lowercase tags
  code = code.replace(/\s+/g, ' ').replace(/\s*>\s*/g, '>').replace(/\s*\/>/g, '/>').trim();

  // Extract viewBox
  const viewBoxMatch = code.match(/viewBox=["']([^"']*)["']/i);
  let viewBox = viewBoxMatch ? viewBoxMatch[1] : '';

  // Extract width and height if no viewBox exists
  if (!viewBox) {

    const widthMatch = code.match(/width=["'](\d*\.?\d+(?:px)?)["']/i);
    const heightMatch = code.match(/height=["'](\d*\.?\d+(?:px)?)["']/i);
    const width = widthMatch ? parseFloat(widthMatch[1]) : null;
    const height = heightMatch ? parseFloat(heightMatch[1]) : null;

    // If both width and height are found, create a viewBox
    if (width !== null && height !== null) {
      viewBox = `0 0 ${width} ${height}`;
    }
  }

  // Extract title as fallback
  const titleMatch = code.match(/<title[^>]*>([^<]*)<\/title>/i);
  const symbolId = id || (titleMatch ? titleMatch[1].trim() : id);

  // Get inner content (everything between <svg> and </svg>)
  let content = code
  .replace(/<svg[^>]*>/, '')
  .replace(/<\/svg>.*$/, '')
  .replace(/<title[^>]*>([^<]*)<\/title>/i, '') // Remove title tag
  .trim();

  // Handle self-closing tags and normalize spaces
  content = content
  .replace(/(\S)\s+(\S)/g, '$1 $2')
  .replace(/\s*\/>/g, '/>');

  const xmlns = 'xmlns="http://www.w3.org/2000/svg"';

  // Construct symbol (use empty viewBox if none was derived)
  return `<symbol ${xmlns} id="${symbolId}"${viewBox ? ` viewBox="${viewBox}"` : ''}>${content}</symbol>`;
}

function createSprite (symbols: string[]) {

  const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
  const xlink = 'xmlns:xlink="http://www.w3.org/1999/xlink"';
  const style = 'style="display:none;"';

  return `<svg ${xmlns} ${xlink} ${style}>${symbols.join(NIL)}</svg>`;

}

/**
 * Compile Sprite
 *
 * Generates an sprite using SVG Sprite. Upon completion will invoke an
 * upload of the output asset/file.
 *
 * @param context The file context for the changed SVG
 * @param request The Shipify request client
 * @param cb The Syncify callback hook for API usage
 */
export function compileSprite (context: File<SVGBundle[]>) {

  async function run (config: SVGBundle) {

    const file = assign({}, context); // clone the file context

    if ($.mode.watch) timer.start();

    file.kind = Kind.Sprite;

    if (config.snippet) {
      file.namespace = Namespace.Snippets;
      file.key = join('snippets', renameFile(file, config.rename));
      file.output = join($.dirs.output, file.key);
    } else {
      file.key = join('assets', renameFile(file, config.rename));
      file.output = join($.dirs.output, file.key);
    }

    const options = config.svgo === true ? $.processor.svgo : config.svgo;
    const items = await pMap(toArray(config.input), async (path: string) => {

      const id = 'svg-' + basename(path, '.svg');
      const svg = await readFile(path, 'utf-8');

      if (hasLiquid(svg)) {
        return {
          path,
          id,
          svg: createSymbol(id, svg),
          size: byteSize(svg),
          skipped: true
        };
      }

      const patch = patchPathVoids(svg);

      try {

        const transform = $import.svgo.optimize(patch, options);

        return {
          path,
          id,
          svg: createSymbol(id, transform.data),
          size: byteSize(svg),
          skipped: false

        };

      } catch (e) {

        log.error(file.relative, {
          notify: {
            title: 'Transform Error',
            message: `SVGO failed to optimize ${file.key}`
          }
        });

        error.throw(e, {
          source: file.relative,
          output: file.key,
          processor: 'SVGO'
        });

        return null;

      }

    });

    if (items) {

      file.size = 0;

      const skipped = items.filter(({ skipped, size }) => {

        file.size = file.size + size;
        return skipped;

      });

      if (skipped.length > 0) {

        if (skipped.length === 1) {
          log.skipped(file, ' Liquid Detected');
        } else {
          log.skipped(`${skipped.length}`, ' Files with Liquid Detected');
        }
      }

      file.value = createSprite(items.map(({ svg }) => svg));

      const length = items.length;

      log.process('SVG Sprite', `${length} ${plur('SVG', length)}`, timer.stop());

      writeFile(file.output, file.value).catch(
        error.write('Error writing SVG Sprite', {
          file: file.key,
          caller: context.relative
        })
      );

      log.syncing(file.key);

      if ($.mode.build) return file;

      await themeFilesUpsertMap(file);

    }
  };

  return run;

}

/**
 * Compile Sprite
 *
 * Generates an sprite using SVG Sprite. Upon completion will invoke an
 * upload of the output asset/file.
 *
 * @param context The file context for the changed SVG
 * @param request The Shipify request client
 * @param cb The Syncify callback hook for API usage
 */
export function compileInline (context: File<SVGBundle[]>) {

  const file = assign({}, context); // clone the file context

  async function run (config: SVGBundle) {

    if ($.mode.watch) timer.start();

    if (config.snippet) {
      file.namespace = Namespace.Snippets;
      file.key = join('snippets', renameFile(file, config.rename));
      file.output = join($.dirs.output, file.key);
    } else {
      file.key = join('assets', renameFile(file, config.rename));
      file.output = join($.dirs.output, file.key);
    }

    const options = (config.svgo === true ? $.processor.svgo : config.svgo) as SVGOConfig;
    const read = await readFile(file.input);
    const node = read.toString();

    if (hasLiquid(node)) {

      log.skipped(file, 'Liquid Detected');

      return null;

    }

    const patch = patchPathVoids(node);

    file.size = byteSize(patch);

    let svg: SvgoOutput;

    try {

      svg = $import.svgo.optimize(patch, options);

    } catch (e) {

      log.error(file.relative, {
        notify: {
          title: 'Transform Error',
          message: `SVGO failed to optimize ${file.key}`
        }
      });

      error.throw(e, {
        source: file.relative,
        output: file.key,
        processor: 'SVGO'
      });

      return null;

    }

    log.process('SVGO', timer.stop());

    file.value = svg.data;
    const size = sizeDiff(file.value, file.size);

    if (size.isSmaller) {
      log.transform(`${file.kind} ${size.before} → brotli ${size.brotli}`);
    } else {
      log.minified(file.kind, size.before, size.after, size.saved);
    }

    writeFile(file.output, file.value).catch(
      error.write('Error writing SVG', {
        file: file.key,
        caller: context.relative
      })
    );

    log.syncing(file.key);

    if ($.mode.build) return file;

    await themeFilesUpsertMap(file);

  };

  return run;

}

/**
 * SVG Compiler
 *
 * Transforms SVG files into either a sprite on inline file.
 *
 * @param file The file context for the changed SVG
 * @param request The Shipify request client
 * @param cb The Syncify callback hook for API usage
 */
export async function SvgTransform (file: File<SVGBundle[]>) {

  if ($.mode.watch) timer.start();

  const sprite = compileSprite(file);
  const inline = compileInline(file);
  const length = file.data.length;

  for (let i = 0; i < length; i++) {

    const config = file.data[i];

    if (i > 0 && $.mode.watch) {

      log.changed(file);

    }

    if (config.format === 'sprite') {

      await sprite(config);

    } else if (config.format === 'file') {

      await inline(config);

    }

  }

}
