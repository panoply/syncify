import type { SVGBundle, File, Syncify } from 'types';
import type { SVGSpriter } from 'svg-sprite';
import type { OptimizedSvg } from 'svgo';
import { basename } from 'node:path';
import { readFile } from 'fs-extra';
import { isNil } from 'rambdax';
import { processor } from '~config';
// import { log } from '../logs/screen';

/**
 * SVG Spriter Module
 */
export let Spriter: SVGSpriter = null;

/**
 * SVGO Module
 */
export let svgo: OptimizedSvg = null; // eslint-disable-line

/**
 * Load SVG Sprite / SVGO
 *
 * Dynamically imports SVG Sprite and SVGO. Assigns the modules to
 * lettings `sprite` and/or `svgo`. This allows users to optionally
 * include modules in the build.
 */
export async function load (id: 'svg-sprite' | 'svgo') {

  if (id === 'svg-sprite') {
    const isprite = await import('svg-sprite') as any;
    Spriter = isprite.default as unknown as SVGSpriter;
    return isNil(Spriter) === false;
  }

  if (id === 'svgo') {
    const isvgo = await import('svgo');
    svgo = isvgo.default as unknown as OptimizedSvg;
    return isNil(svgo) === false;
  }

};

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

export async function files (icons: string[]) {

  for (const svg of icons) {
    const icon = await readFile(svg);
    sprite.add(svg, null, icon.toString());
  }

  sprite.compile(function (error, result) {

    if (error) console.log(error);

    /* Write `result` files to disk (or do whatever with them ...) */
    for (const mode in result) {
      for (const resource in result[mode]) {

        console.log(result[mode][resource].contents);
      }
    }
  });
}

export async function compile (file: File<SVGBundle>, cb: Syncify) {

  const { config } = file;

  if (config.format === 'sprite') {

    const sprite = new Spriter(config.sprite === true ? processor.sprite : config.sprite);

    for (const svg of config.input) {
      const icon = await readFile(svg);
      sprite.add(svg, null, icon.toString());
    }

    console.log(sprite);
    sprite.compile(function (error, result) {

      if (error) console.log(error);

      console.log(JSON.stringify(result, null, 3));
      /* Write `result` files to disk (or do whatever with them ...) */
      for (const mode in result) {
        for (const resource in result[mode]) {

          console.log(result[mode][resource].contents);
        }
      }
    });
  }

}
