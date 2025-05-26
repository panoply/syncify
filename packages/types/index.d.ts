/* -------------------------------------------- */
/* IMPORTS                                      */
/* -------------------------------------------- */

import type { Directories } from './config/directories';
import type { Git } from './config/git';
import type { HOT } from './config/hot';
import type { Logger } from './config/logger';
import type { Paths } from './config/paths';
import type { Processors } from './config/processor';
import type { Transforms } from './config/transform';
import type { VC } from './config/vc';
import type { LiteralUnion } from 'type-fest';

/* -------------------------------------------- */
/* LOGIC EXPORTS                                */
/* -------------------------------------------- */

export type * from './config/script';
export type * from './config/style';
export type * from './config/svg';
export type * from './config/liquid';
export type * from './config/json';

/* -------------------------------------------- */
/* CONFIG EXPORTS                               */
/* -------------------------------------------- */

export type { HOT } from './config/hot';
export type { VC } from './config/vc';
export type { Git } from './config/git';
export type { Directories } from './config/directories';
export type { Logger } from './config/logger';
export type { Paths, Rename } from './config/paths';
export type { Transforms } from './config/transform';
export type { Processors } from './config/processor';

/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */

/**
 * **Syncify Configuration**
 *
 * The `defineConfig` named export used within `syncify.config.js` (or `.ts`) configuration files.
 */
export type Config = Directories & {
  /**
   * Specify the text-editor you use for development. This is optional and when
   * left undefined, Syncify will attempt guess your preferred editor.
   */
  editor?: LiteralUnion<
    | 'vscode'
    | 'sublime'
    | 'cursor'
    | 'atom'
    | 'webstorm'
    | 'intellij'
    | 'textmate'
    | 'xcode'
    | 'nano'
    | 'notepad++'
    | 'gedit'
    | 'vim'
  , string>;
  /**
   * Define customize input structures. Paths will automatically resolve
   * the `input` directory you provide.
   */
  paths?: Paths;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * Syncify plugins are planned in future releases!
   */
  plugins?: never;
  /**
   * **Clean**
   *
   * Whether of not Syncify should clean output before building.
   */
  clean?: boolean;
  /**
   * **HOT**
   *
   * Hot reloading options. Pass the `--hot` flag to enable.
   *
   * > Passing `--hot` will enable **watch** mode. You do not need to pass `-w`
   * > or `--watch` when `--hot` is provided as it will be assumed.
   */
  hot?: HOT;
  /**
   * **Log**
   *
   * Console log options
   */
  log?: Logger;
  /**
   * **Git**
   *
   * Git automation and workflow configuration for controlling the integration pipline. Settings
   * defined here will be used to provide a streamlines tactic for theme publishing, version
   * control and source control.
   */
  git?: false | Git
  /**
   * **Version Control**
   *
   * Syncify introduces a strategic version control system based on the Modular Arithmetic Model (**MaM**),
   * a unique approach inspired by, but distinct from, [SemVer](https://semver.org/). The MaM tactic in
   * its appropriation by Syncify to Theme development is designed around the idea that progression should
   * be predictive and controlled. The [Version Control](https://syncify.sh/usage/version-control/) documentation
   * guide provides a strong overview for how Syncify applies versioning to themes.
   */
  vc?: false | VC
  /**
   * **Transform**
   *
   * The asset transform pipeline configurations
   */
  transform?: Transforms;
  /**
   * **Processor**
   *
   * Configurations for the `transform` processors. Define options for a transform to inherit.
   * You can override these on a per-transform basis. Optionally, you can use the default presets
   * which syncify has pre-configured for optimal output.
   */
  processor?: Processors;
}

declare global {

  export interface Window {
    /**
     * Syncify HOT Reloading
     */
    Syncify: {
      /**
       * The HOT Module version number
       */
      readonly version: string;
      /**
       * Returns the current `template` name according to Liquid objects
       */
      readonly template: string;
      /**
       * Sends a message to the server of websocket to informs upon the current template.
       * In most cases, this will be dispatched automatically, but in some cases you may
       * control the rendering cycle and need to issue this programmatically.
       */
      route: (params?: { directory: string; template: string; }) => void;
      /**
       * Check to see if Syncify is ready or not
       */
      isReady: boolean;
      /**
       * Whether or not the websocket is connected
       */
      isConnected: boolean;
      /**
       * A Map of web components registered in the DOM.
       */
      WebC: Map<string, string>;
      /**
       * List of errors encountered
       */
      errors: Array<{
        /**
         * Error title
         */
        title: string;
        /**
         * Description
         */
        description: string;
        /**
         * Group
         */
        group: string;
      }>
      /**
       * Page section maps
       */
      sections: {
        /**
         * Returns the object where section ids are properties
         * and the values are an array list of dynamic applied ids.
         * Returns `null` if no section exist.
         */
        list: () => {
          /**
           * Map holds the dynamic identifiers
           */
          map: {
            [id: string]: string[];
          },
          /**
           * Alias is template defined sections
           */
          alias: {
            [template: string]: {
              [section: string]: string[];
            }
          }
        }
        /**
         * Method for loading section id maps. Helpful when executing
         * OTW (Over the wire) page replacements like SPX. When invoked,
         * it will obtains all the section ids in the document body.
         *
         * This is called at runtime in HOT method. Returns the object map
         * of matches or `null` if no sections exist.
         */
        load: (dom?: HTMLElement) => { [id: string]: string[]; };
        /**
         * Returns all elements matching the provided `id` which is obtained
         * via the websocket `data` parameter. Query Selects all matches. If
         * no matches are found, returns null.
         */
        get: (id: string[]) => NodeListOf<HTMLElement>;
      };
      /**
       * Full page refresh
       */
      refresh: () => void;
      /**
       * HOT reloads the `<body>`
       */
      reload: (callback?: (dom: Document) => void) => void;
      /**
       * List of event hooks to fire during HOT swaps
       */
      onReload: (callback: (instance: Window['Syncify']) => void) => void;
      /**
       * List of event hooks to fire during HOT swaps
       */
      onMorph: (callback: (oldDom: HTMLElement, newDom: HTMLElement) => boolean) => void;
    /**
       * List of event hooks to fire during HOT swaps
       */
      onAsset: (callback: (type: 'stylesheet' | 'script', url: string) => boolean) => void;
      /**
       * HOT Reloads all assets
       */
      assets: () => void;
      /**
       * Change the label style
       */
      style: {
        /**
         * The dynamic parent node
         */
        parent: (style: Partial<CSSStyleDeclaration>) => void;
        /**
         * The inner node which contains the event text
         */
        label: (style: Partial<CSSStyleDeclaration>) => void;
      }
    }

  }

  export const Syncify: Window['Syncify'];
}

/**
 * ENV Utilities
 *
 * Helper utility for checking environment variables and returning some other data references
 */
export declare const env: {
  /**
   * Whether or not `--dev` mode is running
   */
  readonly dev: boolean;
  /**
   * Whether or not `--prod` mode is running
   */
  readonly prod: boolean;
  /**
   * Whether or not `--watch` mode is running
   */
  readonly watch: boolean;
};

/**
 * Syncify Define Config (named export)
 *
 * Used in `syncify.config.js` or `syncify.config.ts` files and provides type completions to the export.
 */
export declare const defineConfig: (config: Config) => Config;
