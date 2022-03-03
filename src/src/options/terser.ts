import { has, hasPath } from 'rambdax';
import { IOptions } from 'types';
import { isArray, isRegex } from '../utils/native';
import { terser } from './config/conf';

/**
 * Minification Options
 *
 * Apply minification options for views. This will write
 * logic for both liquid and HTML terser minifier options.
 */
export function terserOptions (config: IOptions) {

  if (!hasPath('terser.rules', config)) return;

  const { rules } = config.terser;

  for (const key in rules) {

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
      const tags = ignoreCustomFragments.map((v: any) => isRegex(v) ? v : new RegExp(v));
      terser.html.ignoreCustomFragments.push(...tags);
    } else {
      throw TypeError('Invalid value on "ignoreCustomFragments", option must be an array type');
    }

  }

  if (has('ignoreLiquidTags', config.terser.rules)) {

    const { ignoreLiquidTags } = config.terser.rules;

    if (isArray(ignoreLiquidTags)) {
      const tags = new RegExp(`{%-?\\s*(?:(?!${ignoreLiquidTags.join('|')})[\\s\\S])*?%}`);
      terser.html.ignoreCustomFragments.push(tags);
    } else {
      throw TypeError('Invalid value on "ignoreLiquidTags", option must be an array type');
    }

  }

  if (has('ignoreLiquidObjects', config.terser.rules)) {

    const { ignoreLiquidObjects } = config.terser.rules;

    if (isArray(ignoreLiquidObjects)) {
      const tags = new RegExp(`{{-?\\s*(?:(?!${ignoreLiquidObjects.join('|')})[\\s\\S])*?-?}}`);
      terser.html.ignoreCustomFragments.push(tags);
    } else {
      throw TypeError('Invalid value on "ignoreLiquidObjects", option must be an array type');
    }

  }

  return config;

}
