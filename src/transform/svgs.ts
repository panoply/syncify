import type { SVGBundle, File, Syncify, SVGSpriteConfig } from 'types';
import type { SVGSpriter, SVGSpriterConstructor } from 'svg-sprite';
import type SVGO from 'svgo';
import type { client } from '~requests/client';
import { basename, relative, join } from 'node:path';
import { readFile, writeFile } from 'fs-extra';
import { isNil, mapFastAsync } from 'rambdax';
import { isArray, isObject, toArray, isString } from '~utils/native';
import { log, error } from '~log';
import { bundle, processor } from '~config';
import { Kind } from '~process/files';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

type SVGFile = File<SVGBundle>

/* -------------------------------------------- */
/* DYNAMIC IMPORTS                              */
/* -------------------------------------------- */

/**
 * SVGO Module
 */
export let svgo: typeof SVGO = null;

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
    return isNil(svgo) === false;
  }

  if (id === 'svgo') {
    svgo = (await import('svgo')).default;
    return isNil(svgo) === false;
  }

};

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

async function getFile (path: string): Promise<[path: string, svg: string]> {

  const svg = await readFile(path);

  return [
    path,
    svg.toString()
  ];
}

/**
 *
 */
function getSprite (sprite: SVGSpriter): Promise<string[]> {

  return new Promise(function (resolve, reject) {

    const svgs: string[] = [];

    sprite.compile((error, svg) => {
      if (error) return reject(error);
      for (const m in svg) for (const p in svg[m]) svgs.push(svg[m][p].contents.toString());
      resolve(svgs);
    });
  });
}

/**
 * Compile Sprite
 *
 * Generates an sprite using SVG Sprite. Upon completion will invoke an
 * upload of the output asset/file.
 *
 * @param file
 * The file context for the changed SVG
 *
 * @param request
 * The Shipify request client
 */
export async function compileSprite (file: SVGFile, request: ReturnType<typeof client>, cb: Syncify) {

  const { config } = file;
  const options = (config.sprite === true ? processor.sprite : config.sprite) as SVGSpriteConfig;
  const sprite = new SVGSprite(options);
  const svgs = await mapFastAsync(getFile, toArray(config.input)).catch(
    error.write('Error reading an SVG file', {
      file: file.base,
      source: file.relative
    })
  );

  if (svgs) {

    for (const [ path, svg ] of svgs) sprite.add(path, null, svg);

    const files = await getSprite(sprite);

    for (const file of files) {

      await writeFile(file);

    }
  }

}

/**
 * SVG Compiler
 *
 * Transforms SVG files into either a sprite on inline file.
 *
 * @param file
 * The file context for the changed SVG
 * @param request
 * The Shipify request client
 * @param cb
 * The Syncify callback hook for API usage
 */
export async function compile (
  file: File<SVGBundle | SVGBundle[]>,
  request: ReturnType<typeof client>,
  cb: Syncify
) {

  if (isArray(file.config)) {

    for (const config of file.config) {

      if (config.snippet) {
        file.namespace = 'snippets';
        file.key = join('snippets', config.rename);
      } else {
        file.key = join('assets', config.rename);
      }

      if (file.config.rename !== basename(file.output)) {
        if (config.snippet) {
          file.output = join(bundle.dirs.output, file.key);
        } else {
          file.output = join(parentPath(file.output), file.config.rename);
        }
      }

      if (config.format === 'sprite') {
        file.kind = Kind.Sprite;
        await compileSprite(file as SVGFile, request);
      }

    }

  } else if (isObject(file.config)) {

    const { config } = file as unknown as File<SVGBundle>;

    if (config.format === 'sprite') {
      return compileSprite(config, request);
    }
  }

}
