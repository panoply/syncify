import type { SVGBundle, File, Syncify, SVGSpriteConfig, SVGOConfig } from 'types';
import type { SVGSpriter, SVGSpriterConstructor } from 'svg-sprite';
import type { AssetRequest } from '~requests/client';
import SVGO from 'svgo';
import { join } from 'node:path';
import { readFile, writeFile } from 'fs-extra';
import { isNil, mapParallelAsync } from 'rambdax';
import { toArray, assign } from '~utils/native';
import { log, error } from '~log';
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
      for (const m in svg) for (const p in svg[m]) resolve(svg[m][p].contents.toString());
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
export function compileSprite (context: File<SVGBundle[]>, request: AssetRequest, cb: Syncify) {

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
    const svgs = await mapParallelAsync(getFile, toArray(config.input)).catch(
      error.write('Error reading an SVG file', {
        file: file.base,
        source: file.relative
      })
    );

    if (svgs) {

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

      log.syncing(file.key);

      await request('put', file, content);

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
export function compileInline (context: File<SVGBundle[]>, request: AssetRequest, cb: Syncify) {

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

    file.size = byteSize(read);

    let svg: SVGO.Output;

    try {
      svg = Svgo.optimize(read.toString(), options);
    } catch (error) {
      log.err(error.toString());
      return null;
    }

    if (bundle.mode.watch) log.process('SVGO', timer.stop());

    const { data } = svg;

    if (!bundle.mode.build) {

      const size = fileSize(data, file.size);

      if (size.isSmaller) {
        log.transform(`${file.kind} ${size.before} → gzip ${size.gzip}`);
      } else {
        log.minified(file.kind, size.before, size.after, size.saved);
      }
    }

    await writeFile(file.output, data).catch(
      error.write('Error writing SVG', {
        file: file.key,
        caller: context.relative
      })
    );

    log.syncing(file.key);

    await request('put', file, data);

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
export async function compile (file: File<SVGBundle[]>, request: AssetRequest, cb: Syncify) {

  if (bundle.mode.watch) timer.start();

  const sprite = compileSprite(file, request, cb);
  const inline = compileInline(file, request, cb);
  const length = file.config.length;

  for (let i = 0; i < length; i++) {

    const config = file.config[i];

    if (i > 0) log.changed(file);

    if (config.format === 'sprite') {
      await sprite(config);
    }

    if (config.format === 'file') {
      await inline(config);
    }

  }

}
