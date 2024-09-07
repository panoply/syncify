/* -------------------------------------------- */
/* LIVE RELOADS                                 */
/* -------------------------------------------- */

// import type { Server, WebSocket } from 'ws';
// import type { IncomingMessage } from 'http';
import { TemplatedApp } from 'uWebSockets.js';

export interface WSS {
  /**
   * The `wss` instance
   */
  get http(): TemplatedApp; // Server<typeof WebSocket, typeof IncomingMessage>
  /**
   * Hot Socket for `<script>` tags,
   *
   * @param uuid The UUID of the file for HOT reload timers
   * @param src The script output base filename
   */
  script(uuid: string, src: string): boolean;
  /**
   * Hot Socket for `<link>` stylesheet tags
   *
   * @param uuid The UUID of the file for HOT reload timers
   * @param src The style output base filename
   */
  stylesheet(uuid: string, href: string): boolean;
  /**
   * Hot Socket for theme sections
   */
  section(id: string): boolean;
  /**
   * Hot Socket SVG tags or sprites
   */
  svg(id: string): boolean;
  /**
   * Hot Socket for other asset files
   */
  assets(): boolean;
  /**
   * Hot Socket for `refresh` mode
   */
  reload(): boolean;
  /**
   * Hot Socket for view replacement
   */
  replace(): boolean;
  /**
   * Connected message
   */
  connected(): boolean;
  /**
   * Disconnect message
   */
  disconnect(): boolean;
}

/**
 * **INTERNAL USE**
 */
export interface HOTBundle {
  /**
   * Whether or not Syncify hot reloads UI labels should render.
   *
   * @default true
   */
  label?: 'visible' | 'hidden';
  /**
   * **NOT YET AVAILABLE**
   *
   * Whether or not to record changes. When enabled, Syncify
   * will keep track of the last 25 changes applied and allow
   * you to walk through the stack.
   */
  history?: boolean;
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
   * The HOT strategy to use. Syncify supports 2 different
   * replacement strategies and you will need choose which one
   * to use depending on your project type.
   *
   *
   * **hydrate**
   *
   * _The hydrate strategy will execute morph replacements. This is what Syncify
   * will default to, however it is not always perfect and in cases where you leverage
   * frameworks that use DOM Mutation observers, it probably better to use `replace`_
   *
   * **replace**
   *
   * _The replace strategy will execute fragment swaps use `replaceWith` instead of morphs
   * when executing HOT reloads. It works almost identical to `hydrate` but respects DOM
   * mutations. If you are leveraging a framework like Stimulus or Alpine, then choose this
   * strategy._
   *
   *
   * @default 'hydrate'
   */
  strategy?: 'hydrate' | 'replace';
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
   * 'node_modules/@syncify/cli/hot.js.liquid'
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

export type HOTConfig = Pick<HOTBundle,
  | 'inject'
  | 'label'
  | 'layouts'
  | 'method'
  | 'strategy'
  | 'server'
  | 'socket'
  | 'scroll'
>
