import type { Tester } from 'anymatch';
import type { Merge } from 'type-fest';
import type { SVGBundle, SVGSprite, SVGTransform } from 'types';

import { extname, relative } from 'node:path';

import { $import } from 'modules';

import { cyan } from '@syncify/ansi';

import { throws } from '~cli/throws';
import { warnOption } from '~cli/warnings';
import { getTransform } from '~options/utils';
import * as u from '~utils';

import { $ } from '$';

/**
 * SVG Icon Transforms
 *
 * Build the icons configuration for generating SVG sprites and snippets.
 */
export function setSvgOptions () {

  if (!u.has('svg', $.config.transform)) return;
  if (!$.config.transform.svg || u.isEmpty($.config.transform.svg)) return;

  $import('svgo');

  const warn = warnOption('SVG Transform');

  // Convert to an array if styles is using an object
  // configuration model, else just shortcut the options.
  const svgs = getTransform<SVGTransform[]>($.config.transform.svg, { flatten: false });

  for (const svg of svgs as Merge<SVGTransform, & {
    input: string[];
    match: Tester;
    sprite?: SVGSprite['sprite']
  }>[]) {

    const files = svg.input.filter(path => {

      if (extname(path) === '.svg') return true;

      warn('Excluded file which is not an SVG type', relative($.cwd, path));

      return false;

    });

    if (files.length === 0) {
      warn('No SVG file paths were resolved');
      continue;
    }

    const has = u.hasProp(svg);
    const bundle = u.o<SVGBundle>();

    bundle.uuid = u.uuid();
    bundle.input = u.s(files);
    bundle.format = null;
    bundle.match = svg.match;
    bundle.rename = svg.rename;
    bundle.snippet = svg.snippet;
    bundle.sprite = {
      attrs: [],
      symbols: {
        id: 'svg-[name]',
        xmlns: false
      }
    };

    if (has('format')) {

      bundle.format = svg.format;
      bundle.svgo = u.isObject(svg.svgo) ? u.merge($.processor.svgo, svg.svgo) : true;

      if (bundle.format === 'sprite') {

        if (u.isObject(svg.sprite)) {

          const hasSvgProp = u.hasProp(svg.sprite);

          if (hasSvgProp('attrs') && u.isEmpty(svg.sprite.attrs) === false) {
            if (u.isArray(svg.sprite.attrs)) {
              for (let i = 0; i < svg.sprite.attrs.length; i++) {

                const attr = svg.sprite.attrs[i];

                if (u.isArray(attr)) {
                  bundle.sprite.attrs.push(attr.join(NIL));
                } else {
                  throws.typeError(
                    {
                      option: 'transform.script',
                      name: `attrs[${i}]`,
                      provided: attr,
                      expects: 'string[]'
                    }
                  );
                }
              }

            } else {

              throws.typeError(
                {
                  option: 'transform.svg.sprite',
                  name: 'attrs',
                  provided: svg.sprite.attrs,
                  expects: '[ [ name: string, value: string ] ]'
                }
              );
            }
          }

          if (hasSvgProp('symbols')) {
            if (u.isObject(svg.sprite.symbols)) {

              const hasSymbolProp = u.hasProp(svg.sprite.symbols);

              if (hasSymbolProp('id')) {
                if (u.isString(svg.sprite.symbols.id)) {
                  bundle.sprite.symbols.id = svg.sprite.symbols.id;
                } else {
                  throws.typeError({
                    option: 'transform.svg.sprite.symbols',
                    name: 'id',
                    expects: 'string',
                    provided: svg.sprite.symbols.id
                  });
                }
              }

              if (hasSymbolProp('xmlns')) {
                if (u.isBoolean(svg.sprite.symbols.xmlns)) {
                  bundle.sprite.symbols.xmlns = svg.sprite.symbols.xmlns;
                } else {
                  throws.typeError({
                    option: 'transform.svg.sprite.symbols',
                    name: 'xmlns',
                    expects: 'true | false',
                    provided: svg.sprite.symbols.xmlns
                  });
                }
              }

            } else {

              throws.typeError({
                option: 'transform.svg.sprite',
                name: 'symbols',
                expects: '{}',
                provided: svg.sprite.symbols
              });

            }
          }
        }
      }

    } else {
      throws.option({
        option: 'transform.svg',
        name: 'format',
        value: 'undefined',
        expects: 'sprite | file',
        reason: [
          `SVG transforms require you to provide a ${cyan('format')}. Syncify needs to knows how`,
          'it should handle the SVG input and what to generate as an output.'
        ]
      });
    }

    $.svg.push(bundle);

  };

}
