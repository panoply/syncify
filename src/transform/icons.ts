import { readFile, readFileSync } from 'fs-extra';
import SVGSpriter, { } from 'svg-sprite';
// import { log } from '../logs/screen';

const sprite = new SVGSpriter({});

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
