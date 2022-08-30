
/* -------------------------------------------- */
/* LIVE RELOADS                                 */
/* -------------------------------------------- */

export interface HOT {
  /**
   * Whether or not Syncify hot reloads UI labels should render.
   *
   * @default true
   */
  label?: 'visible' | 'hidden';
  /**
   * Whether or not Syncify should inject the required HOT snippet
   * at runtime layout/s. When `false` you will need to manually place
   * the `hot.js.liquid` snippet into your theme.
   *
   * _Please note that by default when running `--hot` Syncify will
   * check your layout/s for the hot snippet and if it's not present then
   * syncify will inject it and invoke an upload of the layouts._
   *
   * @default true
   */
  inject?: boolean;
  /**
   * A string list of Liquid template layout names used in your theme
   * which should have the hot snippet injected.
   *
   * @default ['theme.liquid']
   */
  layouts?: string[];
  /**
   * The static server for assets - This will be written in the HOT snippet
   *
   * @default 3000
   * @example 'http://localhost:3000/some-asset.js'
   */
  server?: number;
  /**
   * Websocket port - - This will be written in the HOT snippet
   *
   * @default 8089
   * @example 'ws://localhost:8089/ws'
   */
  socket?: number;
  /**
   * Which live reload method should Syncify use?
   *
   * **hot**
   *
   * _Hot reloads assets and views with automatic refresh upon changes_
   *
   * **refresh**
   *
   * _Invokes a full page refresh after changes have been applied_
   *
   *
   * @default 'hot'
   */
  method?: 'hot' | 'refresh';
  /**
   * Scroll position between reloads
   *
   * @default 'preserved'
   */
  scroll?: 'preserved' | 'top';
  /**
   * The liquid render tag written to Layouts.
   *
   * @default
   * {% render 'hot.js.liquid', server: 3000, socket: 8089 %}
   */
  renderer?: string;
  /**
   * The hot reload inline snippet script URI location
   *
   * @default
   * 'node_modules/@syncify/syncify/hot.js.liquid'
   */
  snippet?: string;
  /**
   * The resolved output uri the snippet will be written.
   *
   * @default
   * 'theme/snippets/hot.js.liquid'
   */
  output?: string;
  /**
   * Which templates contain the hot snippet. The `key` value
   * will hold the URI output path where to file.
   *
   * @default true
   */
  alive?: { [template: string]: boolean; };
}

export type HOTConfig = Pick<HOT,
  | 'inject'
  | 'label'
  | 'layouts'
  | 'method'
  | 'server'
  | 'socket'
  | 'scroll'
>
