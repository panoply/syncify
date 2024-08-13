import type { SVGBundle, SVGSprite, SVGFile, SVGTransform } from 'types';
import type { Merge } from 'type-fest';
import type { Tester } from 'anymatch';
import { extname, relative } from 'pathe';
import { cyan } from 'syncify:colors';
import { getTransform } from 'syncify:utils/options';
import { $ } from 'syncify:state';
import * as u from 'syncify:utils';
import * as e from 'syncify:log/throws';

/**
 * SVG Icon Transforms
 *
 * Build the icons configuration for generating SVG sprites and snippets.
 */
export async function setSvgOptions () {

  if (!u.has('svg', $.config.transform)) return;
  if (!$.config.transform.svg || u.isEmpty($.config.transform.svg)) return;

  const warn = e.warnOption('SVG Transform');

  // Convert to an array if styles is using an object
  // configuration model, else just shortcut the options.
  const svgs = getTransform<SVGTransform[]>($.config.transform.svg, {
    addWatch: true,
    flatten: false
  });

  for (const svg of svgs as Merge<SVGFile, SVGSprite & { input: string[]; match: Tester }>[]) {

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
    const bundle = u.object<SVGBundle>();

    bundle.uuid = u.uuid();
    bundle.input = new Set(files);
    bundle.format = null;
    bundle.match = svg.match;
    bundle.rename = svg.rename;
    bundle.snippet = svg.snippet;

    if (has('svgo') && has('sprite')) {

      e.invalidError(
        {
          option: 'transform',
          name: 'svg',
          value: 'svgo AND sprite',
          expects: 'svgo OR sprite'
        }
      );

    }

    if (!has('format')) {

      if (has('svgo')) {

        bundle.format = 'file';
        bundle.svgo = u.isObject(svg.svgo) ? u.merge($.processor.svgo, svg.svgo) : true;

      } else if (has('sprite')) {

        bundle.format = 'sprite';
        bundle.sprite = u.isObject(svg.sprite) ? u.merge($.processor.sprite, svg.sprite) : true;

      } else {

        e.missingOption(
          {
            option: 'transform.svg',
            key: 'format',
            expects: 'sprite | file',
            reason: [
              `SVG transforms require you to define ${cyan('format')} Syncify needs to knows how`,
              'it should handle the input and which processor to use for the transform.'
            ]
          }
        );

      }

    } else {

      if (svg.format === 'file' || svg.format === 'sprite') {

        bundle.format = svg.format;

        if (svg.format === 'file') {
          bundle.svgo = true;
        } else {
          bundle.sprite = true;
        }

      } else {

        e.invalidError(
          {
            option: 'transform > svg',
            name: 'format',
            value: svg.format,
            expects: '"sprite" | "file"'
          }
        );

      }

    }

    $.svg.push(bundle);

  };

}
