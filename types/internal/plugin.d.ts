import { File } from './file';
import { Transforms, Config } from '../config';
import { WebSocketServer } from 'ws';

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
  extensions?: string[];
  /**
   * Optionally infer the required transformer
   */
  transforms?: Array<keyof Transforms>
  /**
   * Executes at runtime in the final cycle
   * and before modes are invoked (like _watch_).
   */
  onInit?: (this: PluginScope, config: Config) => void;
  /**
   * Executes before a transform begins when running
   * _build_ mode. The function only fires in build mode.
   */
  onBuild?: (this: PluginScope, file: File) => void;
  /**
   * Executes before the chokidar watch process
   * has began. Allows you add additional files
   * to be watched and monitored for changes.
   */
  onWatch?:(this: PluginScope, wss: WebSocketServer) => void | string[];
  /**
   * Executes before transform begins and after file
   * context has been created.
   *
   * **NOTE**
   *
   * _File context might augment during transform._
   */
  onChange?: (this: PluginScope, file: File) => void;
  /**
   * Executes before hooks and after transform.
   * File content can be transformed and request
   * can be re-routed.
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
   * Executes on a HOT reload and before
   * the theme preview is updated. You can augment
   * the dom before reload.
   */
  onReload?: (dom: Document) => void | Document

}

/* -------------------------------------------- */
/* BUNDLE REFERENCE                             */
/* -------------------------------------------- */

export interface Plugins {
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
