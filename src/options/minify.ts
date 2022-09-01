import { Config, MinifyConfig } from 'types';
import { has, isEmpty, isNil } from 'rambdax';
import { isBoolean, isObject } from '../utils/native';
import { bundle, minify, processor } from '../config';
import { invalidError, throwError, typeError, unknownError } from '../log/validate';
import { ESBUILD_NOT_INSTALLED } from '../const';
import { getResolvedPaths } from './utilities';

/**
 * Minification Options
 *
 * Apply minification options for views. This will write
 * logic for both liquid and HTML terser minifier options.
 */
export const setMinifyOptions = (config: Config) => {

  if (bundle.mode.minify === false && config.minify === false) return;
  if (bundle.mode.minify === false && config.minify === true) bundle.mode.minify = true;

  if (isBoolean(config.minify) && config.minify === true) {

    if (!processor.esbuild.installed) {
      throwError('esbuild is not installed', ESBUILD_NOT_INSTALLED);
    }

  } else if (isObject(config.minify)) {

    for (const key in config.minify as MinifyConfig) {

      // We don't care if false, or is nil, we can carry on as normal
      if (config.minify[key] === false || isNil(config.minify[key])) continue;

      if (key === 'script') {
        if (!processor.esbuild.installed) {
          throwError('esbuild is not installed', ESBUILD_NOT_INSTALLED);
        }
      }

      if (isBoolean(config.minify[key])) {

        // use defaults when true
        bundle.minify[key] = true;

      } else if (isObject(minify[key]) && isEmpty(minify[key]) === false) {

        for (const opt in config.minify[key]) {

          const p = key === 'views' ? 'liquid' : key;

          if (!has(opt, minify[p])) unknownError(`minify > ${key}`, opt);

          if (!isNil(config.minify[key][opt]) && typeof minify[p][opt] !== typeof config.minify[key][opt]) {
            typeError(
              `minify > ${key}`,
              opt,
              typeof config.minify[key][opt],
              typeof minify[p][opt]
            );
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
        invalidError('minify', key, typeof minify[key], 'boolean | {}');
      }
    }

  }

};
