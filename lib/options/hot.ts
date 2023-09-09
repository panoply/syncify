import type { Config, HOTConfig } from 'types';
import { join } from 'pathe';
import { allFalse, isNil, isEmpty, has } from 'rambdax';
import { socket } from 'syncify:hot/server';
import { isObject, isBoolean } from 'syncify:utils';
import { warnOption, typeError, unknownError, invalidError } from 'syncify:log/throws';
import { $ } from 'syncify:state';

/**
 * Hot Reloading Setup
 *
 * Validates the hot reload configuration
 * defined options.
 */
export async function setHotReloads (config: Config) {

  if ($.mode.watch !== true) return;
  if ($.mode.hot === false && config.hot === false) return;
  if ($.mode.hot === false && config.hot === true) $.mode.hot = true;

  const warn = warnOption('HOT Reloads');

  if ($.env.sync > 1) {
    warn('HOT Reloads can only be used on 1 store');
    return;
  } else if ($.sync.themes.length > 1) {
    warn('HOT Reloads can only be used on 1 theme');
    return;
  }

  if (allFalse(
    isObject(config.hot),
    isBoolean(config.hot),
    isNil(config.hot)
  )) {
    typeError({
      option: 'config',
      name: 'hot',
      provided: config.hot,
      expects: 'boolean | {}'
    });
  }

  const { hot } = $;

  if (isObject(config.hot) && isEmpty(config.hot) === false) {

    for (const prop in config.hot as HOTConfig) {

      if (!has(prop, $.hot)) unknownError(`hot.${prop}`, config.hot[prop]);

      if (prop === 'label') {

        if (config.hot[prop] === 'visible' || config.hot[prop] === 'hidden') {
          hot[prop] = config.hot[prop];
        } else {
          invalidError('hot', prop, config.hot[prop], 'visible | hidden');
        }

      } else if (prop === 'strategy') {

        if (config.hot[prop] === 'hydrate' || config.hot[prop] === 'replace') {
          hot[prop] = config.hot[prop];
        } else {
          invalidError('hot', prop, config.hot[prop], 'hydrate | replace');
        }

      } else if (prop === 'method') {

        if (config.hot[prop] === 'hot' || config.hot[prop] === 'refresh') {
          hot[prop] = config.hot[prop];
        } else {
          invalidError('hot', prop, config.hot[prop], 'hot | refresh');
        }

      } else if (prop === 'scroll') {

        if (config.hot[prop] === 'preserved' || config.hot[prop] === 'top') {
          hot[prop] = config.hot[prop];
        } else {
          invalidError('hot', prop, config.hot[prop], 'preserved | top');
        }

      } else if (typeof hot[prop] === typeof config.hot[prop]) {

        hot[prop] = config.hot[prop];

      } else {

        typeError({
          option: 'hot',
          name: prop,
          provided: config.hot[prop],
          expects: typeof hot[prop]
        });

      }

    }
  }

  hot.snippet = join($.cwd, 'node_modules', '@syncify/cli', 'hot.js.liquid');
  hot.output = join($.dirs.output, 'snippets', 'hot.js.liquid');

  for (const layout of hot.layouts) {
    hot.alive[join($.dirs.output, 'layout', layout)] = false;
  }

  hot.renderer = '{% render \'hot.js\'' + [

    ''
    , `server: ${hot.server}`
    , `socket: ${hot.socket}`
    , `strategy: "${hot.strategy}"`
    , `scroll: "${hot.scroll}"`
    , `label: "${hot.label}"`
    , `history: "${hot.history}`
    , `method: "${hot.method}"`

  ].join(', ') + ' %}';

  $.wss = socket();

}
