import { LiteralUnion } from 'type-fest';

export interface Options {
  /**
   * Whether or not the label should render
   *
   * @default true
   */
  label?: boolean;
  /**
   * The Server URL
   */
  server?: number;
  /**
   * The Websocket url
   */
  socket?: number;
  /**
   * The reload strategy
   */
  strategy?: LiteralUnion<'hydrate' | 'replace', string>;
  /**
   * The Reload Mode
   */
  mode?: LiteralUnion<'hot' | 'live' | 'refresh', string>;
}
