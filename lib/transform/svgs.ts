import type { SVGBundle, File, Syncify, SVGSpriteConfig, SVGOConfig, ClientParam } from 'types';
import type { SVGSpriter, SVGSpriterConstructor } from 'svg-sprite';
import type SVGO from 'svgo';
import { join, relative } from 'node:path';
import { readFile, writeFile } from 'fs-extra';
import { isNil, mapAsync } from 'rambdax';
import { toArray, assign } from '~utils/native';
import { log, error, c } from '~log';
import { bundle, processor } from '~config';
import { Kind, renameFile } from '~process/files';
import { byteSize, fileSize, plural } from '~utils/utils';
import * as timer from '~utils/timer';
/* -------------------------------------------- */
/* DYNAMIC IMPORTS                              */
/* -------------------------------------------- */

/**
 * SVGO Module
 */
export let Svgo: typeof SVGO = null;

/**
 * SVG Sprite Module
 */
export let SVGSprite: SVGSpriterConstructor = null;

/**
 * Load SVG Sprite / SVGO
 *
 * Dynamically imports SVG Sprite and SVGO. Assigns the modules to
 * lettings `sprite` and/or `svgo`. This allows users to optionally
 * include modules in the build.
 */
export async function load (id: 'svg-sprite' | 'svgo') {

  if (id === 'svg-sprite') {
    SVGSprite = (await import('svg-sprite')).default;
    return isNil(SVGSprite) === false;
  }

  if (id === 'svgo') {
    Svgo = (await import('svgo')).default;
    return isNil(Svgo) === false;
  }

};

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

    if (bundle.mode.watch) timer.start();

    file.kind = Kind.Sprite;

    if (config.snippet) {
      file.namespace = 'snippets';
      file.key = join('snippets', renameFile(file, config.rename));
      file.output = join(bundle.dirs.output, file.key);
    } else {
      file.key = join('assets', renameFile(file, config.rename));
      file.output = join(bundle.dirs.output, file.key);
    }

    const options = (config.sprite === true ? processor.sprite.config : config.sprite) as SVGSpriteConfig;
    const sprite = new SVGSprite(options);
    const items = await mapAsync(getFile, toArray(config.input)).catch(
      error.write('Error reading an SVG file', {
        file: file.base,
        source: file.relative
      })
    );

    if (items) {

      const svgs = items.filter(([ path, svg ]) => {

        if (hasLiquid(svg)) {
          log.skipped(relative(bundle.cwd, path), 'Liquid Detected');
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

      const size = fileSize(content, file.size);

      if (size.isSmaller) {
        log.transform(`${file.kind} ${size.before} → gzip ${size.gzip}`);
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
 * Quickly validates SVGs for occurances of Liquid synxtax.
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
    const before = `${c.redBright(`<${c.white('path')}>`)}`;
    const after = `${c.greenBright(`<${c.white('path')} />`)}`;
    log.transform(`${before} ${c.ARR} ${after} ${c.TLD} ${c.gray('patched solidus')}`);
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

    if (bundle.mode.watch) timer.start();

    if (config.snippet) {
      file.namespace = 'snippets';
      file.key = join('snippets', renameFile(file, config.rename));
      file.output = join(bundle.dirs.output, file.key);
    } else {
      file.key = join('assets', renameFile(file, config.rename));
      file.output = join(bundle.dirs.output, file.key);
    }

    const options = (config.svgo === true ? processor.svgo : config.svgo) as SVGOConfig;
    const read = await readFile(file.input);
    const node = read.toString();

    if (hasLiquid(node)) {
      log.skipped(file, 'Liquid Detected');
      return null;
    }

    const patch = patchPathVoids(node);

    file.size = byteSize(patch);

    let svg: SVGO.Output;

    try {

      svg = Svgo.optimize(patch, options);

    } catch (error) {

      log.err(error.toString());

      return null;

    }

    log.process('SVGO', timer.stop());

    const { data } = svg;

    const size = fileSize(data, file.size);

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
export async function compile (file: File<SVGBundle[]>, request?: ClientParam<SVGBundle[]>, cb?: Syncify) {

  if (bundle.mode.watch) timer.start();

  const sprite = compileSprite(file, request, cb);
  const inline = compileInline(file, request, cb);
  const length = file.data.length;

  for (let i = 0; i < length; i++) {

    const config = file.data[i];

    if (i > 0 && bundle.mode.watch) log.changed(file);

    if (config.format === 'sprite') {
      await sprite(config);
    }

    if (config.format === 'file') {
      await inline(config);
    }

  }

}
