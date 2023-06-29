import { Config, MinifyConfig } from 'types';
import { has, isEmpty, isNil } from 'rambdax';
import { isBoolean, isObject, isRegex } from '~utils/native';
import { bundle, minify, processor } from '~config';
import { throwError, typeError, unknownError, warnOption } from '~log/validate';
import { ESBUILD_NOT_INSTALLED } from '~const';
import { getResolvedPaths } from './utilities';

/**
 * Minification Options
 *
 * Apply minification options for views. This will write
 * logic for both liquid and HTML terser minifier options.
 */
export function setMinifyOptions (config: Config) {

  // Do not minify
  if (isBoolean(config.minify)) {
    if (bundle.mode.minify === false && config.minify === false) return;
    if (bundle.mode.minify === false && config.minify === true) {
      bundle.mode.minify = true;
    }
  }

  const warn = warnOption('minify configuration');

  if (isObject(config.minify)) {

    for (const key in config.minify as MinifyConfig) {

      // We don't care if false, or is nil, we can carry on as normal
      if (config.minify[key] === false || isNil(config.minify[key])) {
        if (bundle.mode.minify === true) bundle.minify[key] = true;
        continue;
      }

      if (key === 'script') {

        if (processor.esbuild.installed === false && (
          (
            isObject(config.minify[key]) &&
            isEmpty(config.minify[key]) === false
          ) || (
            isBoolean(config.minify[key]) &&
            config.minify[key] === true
          )
        )) {

          throwError('esbuild is not installed', ESBUILD_NOT_INSTALLED);
        }

      }

      if (isBoolean(config.minify[key])) {

        // use defaults when true
        bundle.minify[key] = config.minify[key];

      } else if (isObject(minify[key])) {

        if (isEmpty(minify[key])) continue;

        for (const opt in config.minify[key]) {

          const p = key === 'views' ? 'liquid' : key;

          if (!has(opt, minify[p])) unknownError(`minify.${key}`, opt);

          if (opt === 'mangleProps') {

            if (!isNil(config.minify[key][opt]) && !isRegex(minify[p][opt])) {
              typeError({
                option: `minify.${key}`,
                name: opt,
                provided: `${typeof config.minify[key][opt]} (${config.minify[key][opt]})`,
                expects: 'Regex | string | undefined'
              });
            }

          } else {

            if (!isNil(config.minify[key][opt]) && typeof minify[p][opt] !== typeof config.minify[key][opt]) {
              typeError({
                option: `minify.${key}`,
                name: opt,
                provided: typeof config.minify[key][opt],
                expects: typeof minify[p][opt]
              });
            }
          }

          if (opt === 'exclude' && !isEmpty(config.minify[key][opt])) {
            minify[key][opt] = getResolvedPaths(config.minify[key][opt]);
          } else if (opt === 'collapseWhitespace') {
            minify.html.collapseWhitespace = config.minify[key][opt];
          } else {
            minify[key][opt] = config.minify[key][opt];
          }

        }
      } else {

        warn('unkown option provided', key);

      }
    }

  }

};
