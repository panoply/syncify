import type { WSS } from './$';
import type { File } from '../../syncify/model/file';
import type { Config } from '@syncify/types';

/* -------------------------------------------- */
/* PLUGIN SCOPE                                 */
/* -------------------------------------------- */

export type PluginScope = {
  log: {
    info: (...message: string[]) => void;
    warn: (...message: string[]) => void;
    error: (...message: string[]) => void;
  }
}

/* -------------------------------------------- */
/* PLUGIN HOOKS                                 */
/* -------------------------------------------- */

export interface PluginHooks {
  /**
   * The plugin name
   */
  name: Lowercase<string>;
  /**
   * A list of file extension the plugin handles
   */
  filter?: string[];
  /**
   * Executes at runtime in the final define cycle. Changes to configuration
   * file will trigger this callback again.
   */
  onDefine?: (this: PluginScope, config: Config) => void;
  /**
   * Executes before a transform begins when running `build` mode.
   */
  onBuild?: (this: PluginScope, file: File) => void;
  /**
   * Executes before watcher begins
   */
  onWatch?:(this: PluginScope, wss: WSS) => void | string[];
  /**
   * Executes before transform begins and after file context has been created.
   */
  onChange?: (this: PluginScope, file: File) => void;
   /**
   * Executes before hooks and after transform.
   */
  onTransform?:(this: PluginScope, file: File) => void | {
    /**
     * Change the Shopify output key
     */
    key?: Pick<File, 'key'>;
    /**
     * Sourcemap (optional)
     */
    map?: Buffer | object | string;
    /**
     * Return the file content.
     */
    value: Buffer;
  };
  /**
   * Executes after transform completes and before store sync begins
   */
  onSync?:(this: PluginScope, file: File) => void | {
    /**
     * Change the Shopify output key
     */
    key?: Pick<File, 'key'>;
    /**
     * Sourcemap (optional)
     */
    map?: Buffer | object | string;
    /**
     * Return the file content.
     */
    value: Buffer;
  };
  /**
   * Executes on a HOT reload and before
   * the theme preview is updated. You can augment
   * the dom before reload.
   */
  onReload?: (dom: any) => void | any

}

/* -------------------------------------------- */
/* BUNDLE REFERENCE                             */
/* -------------------------------------------- */

export interface Plugins {
  /**
   * Plugins executing onBuild
   */
  onDefine: [
    pluginName: string,
    pluginHook: PluginHooks['onDefine']
  ][]
  /**
   * Plugins executing onBuild
   */
  onBuild: [
    pluginName: string,
    pluginHook: PluginHooks['onBuild']
  ][]
  /**
   * Plugins executing onWatch
   */
  onWatch: [
    pluginName: string,
    pluginHook: PluginHooks['onWatch']
  ][]
  /**
   * Plugins executing onChange
   */
  onChange: [
    pluginName: string,
    pluginHook: PluginHooks['onChange']
  ][]
  /**
   * Plugins executing onTransform
   */
  onTransform: [
    pluginName: string,
    pluginHook: PluginHooks['onTransform']
  ][]
  /**
   * Plugins executing onReload
   */
  onReload: [
    pluginName: string,
    pluginHook: PluginHooks['onReload']
  ][]
}
