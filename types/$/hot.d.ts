/* -------------------------------------------- */
/* LIVE RELOADS                                 */
/* -------------------------------------------- */
import type { TemplatedApp } from 'uWebSockets.js';
import type { HOT } from '../config/hot';

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
export interface HOTBundle extends HOT {
  /**
   * The resolved location of the hot injection source
   *
   * @default
   * 'node_modules/@syncify/cli/hot.min.js'
   */
  source?: string;
  /**
   * Which templates contain the hot snippet. The `key` value
   * will hold the URI output path where to file.
   *
   * @default true
   */
  alive?: { [template: string]: boolean; };
}
