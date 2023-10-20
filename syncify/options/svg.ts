import type { SVGBundle, SVGSprite, SVGFile, SVGTransform } from 'types';
import type { Merge } from 'type-fest';
import type { Tester } from 'anymatch';
import { extname, relative } from 'pathe';
import merge from 'mergerino';
import { cyan } from 'syncify:colors';
import { load } from 'syncify:svg';
import { getTransform, getModules } from 'syncify:utils/options';
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

  const { sprite, svgo } = $.processor;
  const warn = e.warnOption('SVG Transform');

  svgo.installed = getModules($.pkg, 'svgo');

  // Load SVGO module
  if (svgo.installed) {
    const loaded = await load('svgo');
    if (!loaded) {
      e.throwError('Unable to dynamically import SVGO', [
        'Ensure you have installed svgo'
      ]);
    }
  }

  sprite.installed = getModules($.pkg, 'svg-sprite');

  // Load SVG Sprite module
  if (sprite.installed) {

    const loaded = await load('svg-sprite');

    if (!loaded) {
      e.throwError('Unable to dynamically import SVG Sprite', [
        'Ensure you have installed svg-sprite'
      ]);
    }
  }

  if (sprite.installed === false && svgo.installed === false) {
    e.missingDependency([
      'svgo',
      'svg-sprite'
    ]);
  }

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

        if (!svgo.installed) e.missingDependency('svgo');

        bundle.format = 'file';
        bundle.svgo = u.isObject(svg.svgo) ? merge(svgo.config, svg.svgo) : true;

      } else if (has('sprite')) {

        if (!sprite.installed) e.missingDependency('svg-sprite');

        bundle.format = 'sprite';
        bundle.sprite = u.isObject(svg.sprite) ? merge(sprite.config, svg.sprite) : true;

      } else {

        if (svgo.installed && sprite.installed) {

          e.missingOption(
            {
              option: 'transform.svg',
              key: 'format',
              expects: 'sprite | file',
              reason: [
                `SVG transforms require you to define ${cyan('format')} when both SVGO and SVG Sprite`,
                'processors are installed. Syncify needs to knows how is should handle the input and',
                'which processor to use for the transform.'
              ]
            }
          );

        } else if (svgo.installed && !sprite.installed) {

          bundle.format = 'file';
          bundle.svgo = true;

        } else if (sprite.installed && !svgo.installed) {

          bundle.format = 'sprite';
          bundle.sprite = true;

        } else {

          e.unknownError(
            'transform > svg',
            'Cannot resolve processor, try defining a format.'
          );

        }
      }

    } else {

      if (svg.format === 'file' || svg.format === 'sprite') {

        bundle.format = svg.format;

        if (svg.format === 'file') {

          bundle.svgo = true;

          if (!svgo.installed) e.missingDependency('svgo');

        } else {

          bundle.sprite = true;

          if (!sprite.installed) e.missingDependency('svg-sprite');
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
