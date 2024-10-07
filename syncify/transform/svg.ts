import type { SVGBundle, Syncify, SVGSpriteConfig, SVGOConfig, ClientParam } from 'types';
import type { SVGSpriter } from 'svg-sprite';
import Svgo from 'svgo';
import SVGSprite from 'svg-sprite';
import { join, relative } from 'node:path';
import { readFile, writeFile } from 'fs-extra';
import { toArray, assign } from 'syncify:utils/native';
import { Kind, File, Namespace } from 'syncify:file';
import { renameFile } from 'syncify:process/files';
import { sizeDiff, byteSize } from 'syncify:sizes';
import { plural } from 'syncify:utils/utils';
import { timer } from 'syncify:timer';
import * as c from '@syncify/ansi';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import { $ } from 'syncify:state';
import pMap from 'p-map';

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

async function getFile (path: string): Promise<[path: string, svg: string, size: number]> {

  const svg = await readFile(path);

  return [
    path,
    svg.toString(),
    byteSize(svg)
  ];
}

/**
 *
 */
function getSprite (sprite: SVGSpriter): Promise<string> {

  return new Promise(function (resolve, reject) {

    sprite.compile((error, svg) => {

      if (error) return reject(error);

      for (const m in svg) {
        for (const p in svg[m]) {
          resolve(svg[m][p].contents.toString());
        }
      }
    });

  });
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
export function compileSprite (
  context: File<SVGBundle[]>,
  request: ClientParam<SVGBundle[]>,
  _cb: Syncify
) {

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

    const options = (config.sprite === true ? $.processor.sprite : config.sprite) as SVGSpriteConfig;
    const sprite = new SVGSprite(options);
    const items = await pMap(toArray(config.input), getFile).catch(
      error.write('Error reading an SVG file', {
        file: file.base,
        source: file.relative
      })
    );

    if (items) {

      const svgs = items.filter(([ path, svg ]) => {

        if (hasLiquid(svg)) {
          log.skipped(relative($.cwd, path), 'Liquid Detected');
          return false;
        }

        return true;

      });

      file.size = 0;

      for (const [ path, svg, size ] of svgs) {
        sprite.add(path, null, svg);
        file.size = file.size + size;
      }

      const content = await getSprite(sprite);
      const length = svgs.length;

      log.process('SVG Sprite', `${length} ${plural('SVG', length)}`, timer.stop());

      await writeFile(file.output, content).catch(
        error.write('Error writing SVG Sprite', {
          file: file.key,
          caller: context.relative
        })
      );

      const size = sizeDiff(content, file.size);

      if (size.isSmaller) {
        log.transform(`${file.kind} ${size.before}`, `gzip ${size.gzip}`);
      } else {
        log.minified(file.kind, size.before, size.after, size.saved);
      }

      if (request) {
        log.syncing(file.key);
        await request('put', file, content);
      }
    }
  };

  return run;

}

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

    const before = `${c.gray(`<${c.white('path')}>`)}`;
    const after = `${c.neonGreen(`<${c.white('path')} />`)}`;

    log.transform('SVG', before, after, 'patched solidus');

    return svg.replace(/(<path[^>]*[a-zA-Z"'\s])(>)(?!\s*<\/path>)/g, '$1 /$2');
  }

  return svg;
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
export function compileInline (
  context: File<SVGBundle[]>,
  request: ClientParam<SVGBundle[]>,
  _cb: Syncify
) {

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

    let svg: Svgo.Output;

    try {

      svg = Svgo.optimize(patch, options);

    } catch (e) {

      log.error(file.relative, {
        notify: {
          title: 'Transform Error',
          message: `SVGO failed to optimize ${file.key}`
        }
      });

      error.throws(e, {
        source: file.relative,
        output: file.key,
        processor: 'SVGO'
      });

      return null;

    }

    log.process('SVGO', timer.stop());

    const { data } = svg;

    const size = sizeDiff(data, file.size);

    if (size.isSmaller) {
      log.transform(`${file.kind} ${size.before} → gzip ${size.gzip}`);
    } else {
      log.minified(file.kind, size.before, size.after, size.saved);
    }

    await writeFile(file.output, data).catch(
      error.write('Error writing SVG', {
        file: file.key,
        caller: context.relative
      })
    );

    if (request) {
      log.syncing(file.key);
      await request('put', file, data);
    }

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
export async function compile (file: File<SVGBundle[]>, request?: ClientParam, cb?: Syncify) {

  if ($.mode.watch) timer.start();

  const sprite = compileSprite(file, request, cb);
  const inline = compileInline(file, request, cb);
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
