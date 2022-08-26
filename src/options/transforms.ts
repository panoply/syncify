import { Config, Package, Processors, SVGInline, SVGSprite } from 'types';
import anymatch from 'anymatch';
import { forEach, has } from 'rambdax';
import merge from 'mergerino';
import { getModules, readConfigFile } from '../shared/options';
import { lastPath, normalPath } from '../shared/paths';
import { typeError, unknownError, invalidError } from './validate';
import { bundle } from './index';
import * as u from '../shared/native';
import { Merge } from 'type-fest';

/**
 * Section Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export const setViewOptions = (config: Config) => {

  if (!has('sections', config.views)) return;

  const { sections } = config.views;

  // Ensure the section option is an object
  if (!u.isObject(config.views.sections)) {
    unknownError('sections', config.views.sections);
  }

  // Iterate over all the properties in sections option
  for (const option in bundle.section) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, sections)) unknownError('sections', option);

    // Validate the boolean type values of the option
    if (option === 'prefixDir') {
      if (u.isBoolean(sections[option])) {
        bundle.section[option] = sections[option];
        continue;
      } else {
        typeError('sections', option, sections[option], 'boolean');
      }
    }

    // Validate the prefix separator option, in Shopify sections
    // We cannot use dot prefixes, we ensure only accepts values are defined.
    if (option === 'separator') {
      if (u.isString(sections[option])) {

        // Only these character can be prefixers
        if (/[@:_-]/.test(sections[option])) {
          bundle.section[option] = sections[option];
          continue;
        } else {
          invalidError('sections', option, sections[option], '@ | _ | : | -');
        }
      } else {
        typeError('sections', option, sections[option], 'string');
      }
    }

    // Validate the global globs which should have no prefixes applied.
    if (option === 'global') {

      const globals = u.isString(sections[option]) ? [ sections[option] ] : sections[option];

      if (u.isArray(globals)) {
        bundle.section[option] = new RegExp(`${globals.join('|')}`);
        continue;
      } else {
        typeError('sections', option, sections[option], 'string | string[]');
      }
    }
  }

};

export function setPageOptions (config: Config) {

  if (has('pages', config.views)) return;

  const { pages } = config.views;

  // Ensure the section option is an object
  if (!u.isObject(pages)) unknownError('pages', pages);

  // Iterate over all the properties in sections option
  for (const option in pages) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, bundle.page)) unknownError('pages', option);

    if (option === 'language') {
      if (u.isString(pages[option])) {
        if (pages[option] === 'markdown' || pages[option] === 'html') {
          bundle.page[option] = pages[option];
          continue;
        } else {
          invalidError('pages', option, pages[option], 'markdown | html');
        }
        continue;
      } else {
        typeError('pages', option, pages[option], 'string');
      }
    }

    if (option === 'author') {
      if (u.isString(pages[option])) {
        bundle.page[option] = pages[option];
        continue;
      } else {
        typeError('pages', option, pages[option], 'string');
      }
    }

    if (option === 'markdown') {
      if (u.isObject(pages[option])) {
        u.assign(bundle.page[option], pages[option]);
        continue;
      } else {
        typeError('pages', option, pages[option], 'object');
      }
    }
  }

}

/**
 * JSON Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export function setJsonOptions (config: Config) {

  if (!has('json', config.transforms)) return;

  const { json } = config.transforms;

  // Ensure the section option is an object
  if (!u.isObject(json)) unknownError('json', json);

  // Iterate over all the properties in sections option
  for (const option in json) {

    // Validate theindent number
    if (option === 'indent') {
      if (u.isNumber(json[option])) {
        bundle.json[option] = json[option];
        continue;
      } else {
        typeError('json', option, json[option], 'number');
      }
    }

    // Validate the useTabs options, when true we indent with tabs
    if (option === 'useTab') {
      if (u.isBoolean(json[option])) {
        bundle.json[option] = json[option];
        continue;
      } else {
        typeError('json', option, json[option], 'boolean');
      }
    }

    // Validate the global globs which should have no prefixes applied.
    if (option === 'exclude') {

      const exclude = u.isString(json[option]) ? [ json[option] ] : json[option];

      if (u.isArray(exclude)) {
        bundle.json[option] = anymatch(exclude as string[]);
        continue;
      } else {
        typeError('exclude', option, exclude[option], 'string | string[]');
      }
    }

  }

}

/**
 * SVG Icon Transforms
 *
 * Build the icons configuration for generating
 * SVG sprites and snippets.
 */
export async function SvgOptions (config: Config, pkg: Package) {

  if (!has('svg', config.transforms)) return;

  const { svgo, sprite } = bundle.processor;
  // const warn = warnOption('SVG Option');

  svgo.installed = getModules(pkg, 'svgo');
  sprite.installed = getModules(pkg, 'svg-sprite');

  if (svgo.installed) {
    const csvgo = await readConfigFile<Processors['svgo']>('svgo.config');
    if (csvgo !== null) {
      svgo.configFile = csvgo.path;
      svgo.config = csvgo.config;
    }
  }

  const svgs = u.isArray(config.transforms.svg)
    ? config.transforms.svg
    : [ config.transforms.svg ];

  forEach(svg => {

    const path = normalPath(lastPath(svg.input));
    const override = u.isObject(svg.svgo);

    if (((u.isUndefined(svg.sprite) || (
      u.isBoolean(svg.sprite) && svg.sprite === false)) && override === true) || (
      u.isBoolean(svg.svgo) && svg.svgo === true)
    ) {

      bundle.svg.inline.push({
        input: path(svg.input),
        type: 'inline',
        rename: has('rename', svg)
          ? svg.rename
          : null,
        snippet: has('snippet', svg)
          ? svg.snippet
          : true,
        svgo: override
          ? merge(svg.svgo as Processors['svgo'], svgo.config)
          : svg.svgo
      });

    } else if ((u.isUndefined(svg.svgo) ||
      (u.isBoolean(svg.svgo) && svg.svgo === false)) ||
      (u.isBoolean(svg.sprite) && svg.sprite === true) ||
      (u.isObject(svg.sprite))
    ) {

      const input = path(svg.input);

      bundle.svg.sprite.push({
        input: u.isArray(input)
          ? input
          : [ input ],
        type: 'sprite',
        rename: has('rename', svg)
          ? svg.rename
          : null,
        snippet: has('snippet', svg)
          ? svg.snippet
          : true,
        sprite: u.isObject(svg.sprite)
          ? merge(svg.sprite as Processors['sprite'], sprite.config)
          : svg.sprite
      });

    }

  }, svgs as Merge<SVGInline, SVGSprite>[]);

}
