import { Config } from 'types';
import { has, isEmpty, isNil } from 'rambdax';
import { isBoolean, isObject, isRegex } from '~utils/native';
import { $ } from '~state';
import { throwError, typeError, unknownError, warnOption } from '~options/validate';
import { ESBUILD_NOT_INSTALLED } from '~const';
import { getResolvedPaths } from './utilities';

/**
 * Minification Options
 *
 * Apply minification options for views. This will write
 * logic for both liquid and HTML terser minifier options.
 */
export function setMinifyOptions (config: Config) {

  const { terser, mode } = $;

  // Do not terse
  if (isBoolean(config.terser)) {
    if (mode.terse === false && config.terser === false) return;
    if (mode.terse === false && config.terser === true) mode.terse = true;
  }

  const warn = warnOption('terser configuration');

  if (typeof config.terser === 'object') {

    for (const key in config.terser) {

      // We don't care if false, or is nil, we can carry on as normal
      if (config.terser[key] === false || isNil(config.terser[key])) {
        if ($.mode.terse === true) $.terse[key] = true;
        continue;
      }

      if (key === 'script') {

        if ($.processor.esbuild.installed === false && (
          (
            isObject(config.terser[key]) &&
            isEmpty(config.terser[key]) === false
          ) || (
            isBoolean(config.terser[key]) &&
            config.terser[key] === true
          )
        )) {

          throwError('esbuild is not installed', ESBUILD_NOT_INSTALLED);
        }

      }

      if (isBoolean(config.terser[key])) {

        // use defaults when true
        $.terser[key] = config.terser[key];

      } else if (isObject(terser[key])) {

        if (isEmpty(terser[key])) continue;

        for (const opt in config.terser[key]) {

          if (opt === 'exclude') {
            if (!isEmpty(config.terser[key][opt])) {
              terser[key][opt] = getResolvedPaths(config.terser[key][opt]);
            }

            continue;
          }

          if (!has(opt, terser[key])) unknownError(`terser.${key}`, opt);

          if (opt === 'mangleProps') {

            if (!isNil(config.terser[key][opt]) && !isRegex(terser[key][opt])) {

              typeError({
                option: `terser.${key}`,
                name: opt,
                provided: `${typeof config.terser[key][opt]} (${config.terser[key][opt]})`,
                expects: 'Regex | string | undefined'
              });
            }

          } else {

            if (!isNil(config.terser[key][opt]) && typeof terser[key][opt] !== typeof config.terser[key][opt]) {
              typeError({
                option: `terser.${key}`,
                name: opt,
                provided: typeof config.terser[key][opt],
                expects: typeof terser[key][opt]
              });
            }
          }

          if (opt === 'collapseWhitespace') {
            terser.markup.collapseWhitespace = config.terser[key][opt];
          } else {
            terser[key][opt] = config.terser[key][opt];
          }

        }

      } else {

        warn('unkown option provided', key);

      }
    }

  }

};
