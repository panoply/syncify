import { has, isArray } from '~utils';

import { $ } from '$';

/**
 * Set Plugins
 *
 * Sets and constructs the Syncify plugin model of all plugins defined in the configuration.
 */
export function setPlugins () {

  if (!has('plugins', $.config)) return;
  if (!isArray($.config.plugins)) return; // TODO: Throw error if not array

  // @ts-ignore
  for (const plugin of $.config.plugins) {

    if (has('onInit', plugin)) plugin.onInit.call({ ...$ }, $.config);

    if (has('onChange', plugin)) {
      $.plugins.onChange.push([
        plugin.name,
        plugin.onChange
      ]);
    }

    if (has('onTransform', plugin)) {
      $.plugins.onTransform.push([
        plugin.name,
        plugin.onTransform
      ]);
    }

    if ($.mode.watch) {

      if (has('onWatch', plugin)) {
        $.plugins.onWatch.push([
          plugin.name,
          plugin.onWatch
        ]);
      }

      if (has('onReload', plugin)) {
        $.plugins.onReload.push([
          plugin.name,
          plugin.onReload
        ]);
      }
    }

    if ($.mode.build) {
      if (has('onBuild', plugin)) {
        $.plugins.onBuild.push([
          plugin.name,
          plugin.onBuild
        ]);
      }
    }

  }

};
