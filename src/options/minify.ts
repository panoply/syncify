import { has, hasPath } from 'rambdax';
import { Config } from 'types';
import { isArray, isRegex } from '../shared/native';
import { bundle, minify } from './index';
import { typeError, warnOption } from './validate';

const presets = {
  caseSensitive: false,
  collapseBooleanAttributes: false,
  collapseInlineTagWhitespace: false,
  conservativeCollapse: false,
  keepClosingSlash: false,
  noNewlinesBeforeTagClose: false,
  preventAttributesEscaping: false,
  removeEmptyAttributes: false,
  removeEmptyElements: false,
  removeOptionalTags: false,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  collapseWhitespace: true,
  continueOnParseError: true,
  removeComments: true,
  trimCustomFragments: true,
  ignoreCustomFragments: [
    /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,
    /<style[\s\S]*?<\/style>/,
    /{%[\s\S]*?%}/,
    /{{[\s\S]*?}}/
  ]
};

/**
 * Minification Options
 *
 * Apply minification options for views. This will write
 * logic for both liquid and HTML terser minifier options.
 */
export const setMinifyOptions = (config: Config) => {

  if (!hasPath('minify', config)) return;

  let warn: (message: string, value: string) => void = warnOption('Minify');

  for (const key in config.minify) {

    if (bundle.minify[key] === false) continue;
    if (config.minify[key] === false) continue;

    warn = warnOption(`${key.toUpperCase()} Minify Rule`);

    for (const rule in config.minify[key]) {

      if (key === 'html') {

        if (
          rule === 'minifyCSS' ||
          rule === 'minifyJS' ||
          rule === 'sortAttributes' ||
          rule === 'sortClassName'
        ) {

          warn('Option is not allowed', key);
          continue;
        }

        if (rule === 'ignoreCustomFragments') continue;
      }

      if (typeof config.minify[key][rule] === typeof minify[key][rule]) {
        bundle.minify[key][rule] = config.minify[key][rule];
      } else {
        warn('Option type is invalid', rule);
      }

    }
  }

  if (has('ignoreCustomFragments', config.minify.html) && typeof config.minify.html === 'object') {

    const { ignoreCustomFragments } = config.minify.html;

    if (isArray(ignoreCustomFragments)) {
      if (ignoreCustomFragments.length > 0) {
        const tags = ignoreCustomFragments.map((v: any) => isRegex(v) ? v : new RegExp(v));
        bundle.minify.html.ignoreCustomFragments.push(...tags);
      }
    } else {
      typeError('minify', ignoreCustomFragments, 'option must be an array type', 'string[]');
    }

  }

  if (typeof bundle.minify.liquid === 'object') {

    if (has('ignoreTags', bundle.minify.liquid)) {

      const { ignoreTags } = bundle.minify.liquid;

      if (isArray(ignoreTags)) {
        if (ignoreTags.length > 0) {
          const tags = new RegExp(`{%-?\\s*(?:(?!${ignoreTags.join('|')})[\\s\\S])*?%}`);
          bundle.minify.html.ignoreCustomFragments.push(tags);
        }
      } else {
        typeError('minify', ignoreTags, 'option must be an array type', 'string[]');
      }

    }

    if (has('ignoreObjects', bundle.minify.liquid)) {

      const { ignoreObjects } = bundle.minify.liquid;

      if (isArray(ignoreObjects)) {
        if (ignoreObjects.length > 0) {
          const tags = new RegExp(`{{-?\\s*(?:(?!${ignoreObjects.join('|')})[\\s\\S])*?-?}}`);
          bundle.minify.html.ignoreCustomFragments.push(tags);
        }
      } else {
        typeError('minify', ignoreObjects, 'option must be an array type', 'string[]');
      }

    }

  }

  return config;

};
