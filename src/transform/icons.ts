import { readFile, readFileSync } from 'fs-extra';
import { SVGSpriter } from 'svg-sprite';
import { OptimizedSvg } from 'svgo';
// import { log } from '../logs/screen';

/**
 * SVG Spriter Module
 */
let sprite: SVGSpriter = null;

/**
 * SVGO Module
 */
let svgo: OptimizedSvg = null;

/**
  * Loads PostCSS
  *
  * This is executed and the `postcss` variable is
  * assigned upon initialization.
  */
export function processers (module: 'svg-sprite' | 'svgo', path: string) {

  if (module === 'svg-sprite') {
    sprite = require('svg-sprite')(require(path));
  } else {
    svgo = require('svg-sprite')(require(path));
  }
}

export function setup () {

}

export async function files (icons: string[]) {

  for (const file of icons) {
    const icon = await readFile(file);
    sprite.add(file, null, icon.toString());
    // log(file);

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

export function transform () {

}
