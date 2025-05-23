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
   * The Reload Mode
   *
   * > `hot`
   * > Partial replacements, best option.
   *
   * > `live`
   * > Replaces the entire `<body>` element on each change
   *
   * > `refresh`
   * > Triggers full-page refresh on each change
   */
  method?: LiteralUnion<'hot' | 'live' | 'refresh', string>;
  /**
   * Rendering flags
   */
  flags?: {
    /**
     * Hides Preview Bar
     */
    'no-preview-bar': boolean;
    /**
     * Prevents CFH wpm from evaluating
     */
    'no-web-pixels-manager': boolean;
    /**
     * Prevents CFH checkout preloads from evaluating
     */
    'no-checkout-preloads': boolean;
    /**
     * Prevents CFH Shopify features from evaluating
     */
    'no-shopify-features': boolean;
    /**
     * Prevents CFH trekkie from evaluating
     */
    'no-trekkie': boolean;
    /**
     * Prevents CFH perfkit from evaluation
     */
    'no-perfkit': boolean;
  }
}

export type Hook = (instance: any) => void;

export interface Instance {
  /**
   * The HOT Module version number
   */
  version?: string;
  /**
   * Returns the current `template` name according to Liquid objects
   */
  get template(): string;
  /**
   * Connect Syncify
   */
  connect?: (options?: Options) => void;
    /**
   * Disconnect Syncify
   */
  disconnect?: () => void;
  /**
   * Sends a message to the server of websocket to informs upon the current template.
   * In most cases, this will be dispatched automatically, but in some cases you may
   * control the rendering cycle and need to issue this programmatically.
   */
  route?: (params?: { directory: string; template: string; }) => void;
  /**
   * a Set of events to be called during hot reload operations
   */
  hooks?: {
    /**
     * Hook listener events for morph operations
     */
    onMorph: Set<Hook>;
    /**
     * Hook listener events for asset operations
     */
    onAsset: Set<Hook>;
    /**
     * Hook listener events for reload operations
     */
    onReload: Set<Hook>;
  }
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
  WebC?: Map<string, string>;
  /**
   * The current options used
   */
  options?: Options;
  /**
   * List of errors encountered
   */
  errors?: Array<{
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
  sections?: {
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
     * of matches of `null` if no sections exist.
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
  refresh?: () => void;
  /**
   * HOT reloads the `<body>`
   */
  reload?: (callback?: (dom: Document) => void) => void;
  /**
   * List of event hooks to fire during HOT swaps
   */
  onReload?: (callback: (instance: Instance) => void) => void;
  /**
   * List of event hooks to fire during HOT swaps
   */
  onMorph?: (callback: (oldDom: HTMLElement, newDom: HTMLElement) => boolean) => void;
 /**
   * List of event hooks to fire during HOT swaps
   */
  onAsset?: (callback: (type: 'stylesheet' | 'script', url: string) => boolean) => void;
  /**
   * HOT Reloads all assets
   */
  assets?: () => void;
  /**
   * Change the label style
   */
  style?: {
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
