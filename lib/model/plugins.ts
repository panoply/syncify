import { Plugins } from 'types';

/**
 * Plugin Store
 *
 * This model holds reference to plugins. Entries are populated at runtime and their hooks
 * stored in relative Map and invoked at different cycles.
 */
export const plugins = (): Plugins => ({
  onBuild: [],
  onChange: [],
  onReload: [],
  onTransform: [],
  onWatch: []
});
