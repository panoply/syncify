import type { Config, SVGBundle, SVGOConfig, SVGSprite, SVGFile, SVGSpriteConfig } from 'types';
import type { Merge } from 'type-fest';
import type { Tester } from 'anymatch';
import { extname, relative } from 'pathe';
import { has } from 'rambdax';
import merge from 'mergerino';
import { cyan } from 'syncify:ansi';
import { load } from 'syncify:transform/svgs';
import { getTransform, getModules } from 'syncify:utils/options';
import { uuid, isObject } from 'syncify:utils';
import { $ } from 'syncify:state';
import * as e from 'syncify:log/throws';

/**
 * SVG Icon Transforms
 *
 * Build the icons configuration for generating
 * SVG sprites and snippets.
 */
export async function setSvgOptions (config: Config) {

  if (!has('svg', config.transforms)) return;

  const { sprite, svgo } = $.processor;
  const warn = e.warnOption('svg transform');

  svgo.installed = getModules($.pkg, 'svgo');

  // Load SVGO module
  if (svgo.installed) {
    const loaded = await load('svgo');
    if (!loaded) e.throwError('Unable to dynamically import SVGO', 'Ensure you have installed svgo');
  }

  sprite.installed = getModules($.pkg, 'svg-sprite');

  // Load SVG Sprite module
  if (sprite.installed) {
    const loaded = await load('svg-sprite');
    if (!loaded) e.throwError('Unable to dynamically import SVG Sprite', 'Ensure you have installed svg-sprite');
  }

  if (!sprite.installed && !svgo.installed) {
    e.missingDependency([ 'svgo', 'svg-sprite' ]);
  }

  // Convert to an array if styles is using an object
  // configuration model, else just shortcut the options.
  const svgs = getTransform<SVGTransform[]>(config.transforms.svg, {
    addWatch: true,
    flatten: false
  });

  for (const svg of svgs as Merge<SVGFile, SVGSprite & { match: Tester }>[]) {

    const files = (svg.input as string[]).filter(path => {
      if (extname(path) !== '.svg') {
        warn('Excluded file which is not an SVG type', relative($.cwd, path));
        return false;
      } else {
        return true;
      }
    });

    if (files.length === 0) {
      warn('No SVG file paths were resolved');
      continue;
    }

    const o: SVGBundle = {
      uuid: uuid(),
      input: new Set(files),
      match: svg.match,
      format: null,
      rename: svg.rename,
      snippet: svg.snippet
    };

    if (has('svgo', svg) && has('sprite', svg)) {
      e.invalidError('transform', 'svg', 'svgo AND sprite', 'svgo OR sprite');
    }

    if (!has('format', svg)) {

      if (has('svgo', svg)) {

        if (!svgo.installed) e.missingDependency('svgo');

        o.format = 'file';
        o.svgo = isObject(svg.svgo)
          ? merge(svgo.config as SVGOConfig, svg.svgo)
          : true;

      } else if (has('sprite', svg)) {

        if (!sprite.installed) e.missingDependency('svg-sprite');

        o.format = 'sprite';
        o.sprite = isObject(svg.sprite)
          ? merge(sprite.config as SVGSpriteConfig, svg.sprite)
          : true;

      } else {

        if (svgo.installed && sprite.installed) {
          e.missingOption(
            'transform.svg', 'format',
            'sprite | file',
            [
            `SVG transforms require you to define ${cyan('format')} when both SVGO and SVG Sprite`,
            'processors are installed. Syncify needs to knows how is should handle the input and',
            'which processor to use for the transform.'
            ]
          );
        } else if (svgo.installed && !sprite.installed) {

          o.format = 'file';
          o.svgo = true;

        } else if (sprite.installed && !svgo.installed) {

          o.format = 'sprite';
          o.sprite = true;

        } else {
          e.unknownError(
            'transform > svg',
            'Cannot resolve processor, try defining a format.'
          );
        }
      }
    } else {

      if (svg.format === 'file' || svg.format === 'sprite') {

        o.format = svg.format;

        if (svg.format === 'file') {

          o.svgo = true;
          if (!svgo.installed) e.missingDependency('svgo');

        } else {

          o.sprite = true;

          if (!sprite.installed) e.missingDependency('svg-sprite');
        }

      } else {
        e.invalidError(
          'transform > svg',
          'format',
          svg.format,
          '"sprite" | "file"'
        );
      }

    }

    $.svg.push(o);

  };

}
