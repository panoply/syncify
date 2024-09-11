import type { HOTBundle } from 'types';
import { join } from 'node:path';
import { allFalse } from 'rambdax';
import { socket } from 'syncify:hot/server';
import { isObject, isBoolean, hasProp, isNil, isEmpty } from 'syncify:utils';
import { warnOption, typeError, unknownError, invalidError } from 'syncify:log/throws';
import { $ } from 'syncify:state';
import { ejectRender } from 'syncify:hot/inject';

/**
 * Hot Reloading Setup
 *
 * Validates the hot reload configuration
 * defined options.
 */
export async function setHotReloads () {

  if ($.mode.watch !== true) {

    if ($.cache.build.hotSnippet.length > 0) {
      for (const path of $.cache.build.hotSnippet) await ejectRender(path);
      $.cache.build.hotSnippet = [];
    }

    return;

  }

  if ($.mode.hot === false && $.config.hot === false) {

    if ($.cache.build.hotSnippet.length > 0) {
      for (const path of $.cache.build.hotSnippet) await ejectRender(path);
      $.cache.build.hotSnippet = [];
    }

    return;

  }

  if ($.mode.hot === false && $.config.hot === true) {
    $.mode.hot = true;
  }

  const warn = warnOption('HOT Reloads');

  if ($.env.sync > 1) {
    warn('HOT Reloads can only be used on 1 store');
    return;
  } else if ($.sync.themes.length > 1) {
    warn('HOT Reloads can only be used on 1 theme');
    return;
  }

  if (allFalse(isObject($.config.hot), isBoolean($.config.hot), isNil($.config.hot))) {
    typeError({
      option: 'config',
      name: 'hot',
      provided: $.config.hot,
      expects: 'boolean | {}'
    });
  }

  if (isObject($.config.hot) && isEmpty($.config.hot) === false) {

    const has = hasProp($.hot);

    for (const prop in $.config.hot) {

      if (!has(prop as keyof HOTBundle)) {
        unknownError(`hot.${prop}`, $.config.hot[prop]);
      }

      if (prop === 'label') {

        if ($.config.hot[prop] === 'visible' || $.config.hot[prop] === 'hidden') {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError({
            option: 'hot',
            name: prop,
            value: $.config.hot[prop],
            expects: 'visible | hidden'
          });
        }

      } else if (prop === 'strategy') {

        if ($.config.hot[prop] === 'hydrate' || $.config.hot[prop] === 'replace') {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError({
            option: 'hot',
            name: prop,
            value: $.config.hot[prop],
            expects: 'hydrate | replace'
          });
        }

      } else if (prop === 'method') {

        if ($.config.hot[prop] === 'hot' || $.config.hot[prop] === 'refresh') {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError({
            option: 'hot',
            name: prop,
            value: $.config.hot[prop],
            expects: 'hot | refresh'
          });
        }

      } else if (prop === 'scroll') {

        if ($.config.hot[prop] === 'preserved' || $.config.hot[prop] === 'top') {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError({
            option: 'hot',
            name: prop,
            value: $.config.hot[prop],
            expects: 'preserved | top'
          });

        }

      } else if (typeof $.hot[prop] === typeof $.config.hot[prop]) {

        $.hot[prop] = $.config.hot[prop];

      } else {

        typeError({
          option: 'hot',
          name: prop,
          provided: $.config.hot[prop],
          expects: typeof $.hot[prop]
        });

      }

    }
  }

  $.hot.snippet = join($.cwd, 'node_modules', '@syncify/cli', 'hot.js.liquid');
  $.hot.output = join($.dirs.output, 'snippets', 'hot.js.liquid');

  const base = join($.dirs.output, 'layout');

  for (const layout of $.hot.layouts) {

    const path = join(base, layout);

    $.hot.alive[path] = false;

    if (!$.cache.build.hotSnippet.includes(base)) {
      $.cache.build.hotSnippet.push(base);
    }
  }

  $.hot.renderer = '{% render \'hot.js\'' + [
    ''
    , `server: ${$.hot.server}`
    , `socket: ${$.hot.socket}`
    , `strategy: "${$.hot.strategy}"`
    , `scroll: "${$.hot.scroll}"`
    , `label: "${$.hot.label}"`
    , `history: "${$.hot.history}`
    , `method: "${$.hot.method}"`

  ].join(', ') + ' %}';

  $.wss = await socket();

}
