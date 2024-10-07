export interface HOT {
  /**
   * Whether or not Syncify hot reloads UI labels should render.
   *
   * @default true
   */
  label?: 'visible' | 'hidden';
  /**
   * Whether or not Syncify should allow the preview bar iframe to be visible
   *
   * @default false
   */
  previewBar?: boolean;
 /**
   * Accepts a `string` JavaScript expression. This value will be passed to `Runtime.evaluate`
   * and injected for every `Page.loadEventFired` executed via DevTools.
   *
   * > This option is made available for developers seeking more advanced control over
   * > the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).
   *
   * @default ''
   */
  loadEventJS?:string;
  /**
   * Specify the server port for assets.
   *
   * @default 3000
   * @example 'http://localhost:3000/some-asset.js'
   */
  server?: number;
  /**
   * Specify the websocket port Syncify should use.
   *
   * @default 8089
   * @example 'ws://localhost:8089/ws'
   */
  socket?: number;
  /**
   * Chrome launcher flags to applied to devtools. See Chrome repo for exhaustive coverage of these
   * and [related flags](https://github.com/GoogleChrome/chrome-launcher/blob/main/docs/chrome-flags-for-tools.md).
   * Syncify uses a default set of flags which are best aligned with Shopify Theme Development.
   * Extending or adding flags will overwrite the defaults that Syncify applies.
   *
   * > This option is made available for developers seeking more advanced control over
   * > the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).
   *
   * @default
   * [
   *   '--no-first-run',
   *   '--no-default-browser-check',
   *   '--disable-extensions',
   *   '--disable-sync',
   *   '--disable-password-manager',
   *   '--disable-save-password-bubble',
   *   '--disable-translate',
   *   '--disable-features=TranslateUI',
   *   '--disable-infobars',
   *   '--disable-web-security',
   *   '--test-type'
   * ]
   */
  chromeFlags?: string[];
  /**
   * Which reload method should Syncify use?
   *
   * > `hot`
   * >
   * > Hot reloads assets and views with automatic refresh upon changes
   *
   * > `live`
   * >
   * > Live reloading will replace the document `<body>` for every change
   *
   * > `refresh`
   * >
   * > Invokes a full page refresh after changes have been applied
   *
   * @default 'hot'
   */
  method?: 'hot' | 'live' | 'refresh';
  /**
   * The HOT strategy to use. Syncify supports 2 different replacement strategies
   * and you will need choose which one to use depending on your project type.
   *
   * > `hydrate`
   * >
   * > The hydrate strategy will execute morph replacements. This is what Syncify
   * > will default to, however it is not always perfect and in cases where you leverage
   * > frameworks that use DOM Mutation observers, it probably better to use `replace`.
   *
   * > `replace`
   * >
   * > The replace strategy will execute fragment swaps use `replaceWith` instead of morphs
   * > when executing HOT reloads. It works almost identical to `hydrate` but respects DOM
   * > mutations. If you are leveraging a framework like Stimulus or Alpine, then choose this strategy.
   *
   * @default 'hydrate'
   */
  strategy?: 'hydrate' | 'replace';
}
