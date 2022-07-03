import { has, hasPath } from 'rambdax';
import { IConfig } from 'types';
import { isArray, isRegex } from 'shared/native';
import { terser, bundle } from './index';
import { c, tui } from 'cli/log';

/**
 * Minification Options
 *
 * Apply minification options for views. This will write
 * logic for both liquid and HTML terser minifier options.
 */
export function terserOptions (config: IConfig) {

  if (!hasPath('terser.rules', config)) return;

  const { rules } = config.terser;

  for (const key in rules) {

    if (
      key === 'minifyCSS' ||
      key === 'minifyJS' ||
      key === 'sortAttributes' ||
      key === 'sortClassName'
    ) {

      tui.warn(`Option is not allowed: '${c.gray(key)}'`);

      continue;
    }

    if (key === 'ignoreCustomFragments') continue;

    if (has(key, terser.liquid)) {
      terser.liquid[key] = rules[key];
    } else if (has(key, terser.html)) {
      terser.html[key] = rules[key];
    } else {
      terser.html[key] = rules[key];
    }
  }

  if (has('ignoreCustomFragments', config.terser.rules)) {

    const { ignoreCustomFragments } = config.terser.rules;

    if (isArray(ignoreCustomFragments)) {
      if (ignoreCustomFragments.length > 0) {
        const tags = ignoreCustomFragments.map((v: any) => isRegex(v) ? v : new RegExp(v));
        terser.html.ignoreCustomFragments.push(...tags);
      }
    } else {
      throw TypeError('Invalid value on "ignoreCustomFragments", option must be an array type');
    }

  }

  if (has('ignoreLiquidTags', config.terser.rules)) {

    const { ignoreLiquidTags } = config.terser.rules;

    if (isArray(ignoreLiquidTags)) {
      if (ignoreLiquidTags.length > 0) {
        const tags = new RegExp(`{%-?\\s*(?:(?!${ignoreLiquidTags.join('|')})[\\s\\S])*?%}`);
        terser.html.ignoreCustomFragments.push(tags);
      }
    } else {
      throw TypeError('Invalid value on "ignoreLiquidTags", option must be an array type');
    }

  }

  if (has('ignoreLiquidObjects', config.terser.rules)) {

    const { ignoreLiquidObjects } = config.terser.rules;

    if (isArray(ignoreLiquidObjects)) {
      if (ignoreLiquidObjects.length > 0) {
        const tags = new RegExp(`{{-?\\s*(?:(?!${ignoreLiquidObjects.join('|')})[\\s\\S])*?-?}}`);
        terser.html.ignoreCustomFragments.push(tags);
      }
    } else {
      throw TypeError('Invalid value on "ignoreLiquidObjects", option must be an array type');
    }

  }

  if (config.terser.html === 'never') {
    terser.minify.html = false;
  } else {
    terser.minify.html = (config.terser.html === 'always' ||
    (config.terser.html === 'prod' && bundle.prod === true) ||
    (config.terser.html === 'dev' && bundle.dev === true));
  }

  if (config.terser.json === 'never') {
    terser.minify.json = false;
  } else {
    terser.minify.json = (config.terser.json === 'always' ||
    (config.terser.json === 'prod' && bundle.prod === true) ||
    (config.terser.json === 'dev' && bundle.dev === true));
  }

  if (config.terser.pages === 'never') {
    terser.minify.pages = false;
  } else {
    terser.minify.pages = (config.terser.pages === 'always' ||
    (config.terser.pages === 'prod' && bundle.prod === true) ||
    (config.terser.pages === 'dev' && bundle.dev === true));
  }

  return config;

}
