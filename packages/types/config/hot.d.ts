import type { LiteralUnion } from 'type-fest';

interface Shared {
 /**
   * Specify the static server port. By default, Syncify uses port `41001` to
   * avoid any conflicts with other running hosts of tools.
   *
   * @default 41001
   * @example 'http://localhost:41001/some-asset.js'
   */
  server?: number;
  /**
   * Specify the websocket port. By default, Syncify uses port `51001` to
   * avoid any conflicts with other running hosts of tools.
   *
   * @default w
   * @example 'ws://localhost:51001/ws'
   */
  socket?: number;
 /**
   * Determines the reload method Syncify should use. Syncify provides 3
   * reload tactics and defaults to using `hot`.
   *
   * > `hot`
   * >
   * > Performs real HMR and partial swaps (recommended)
   *
   * > `live`
   * >
   * > Similar to `hot` but each change will swap the entire `<body>`
   *
   * > `refresh`
   * >
   * > Replicates the Shopify CLI behaviour (fake reloading). Hard refreshes on every change.
   *
   * @default 'hot'
   */
  method?: LiteralUnion<'hot' | 'live' | 'refresh', string>;
  /**
   * Whether or not the Syncify UI status label should render.
   *
   * @default true
   */
  label?: boolean;
  /**
   * Controls whether ot the HOT Snippet injection is auto-removed from layout/s.
   * When set to `false`, the HOT render snippet is persisted on process exit whereas
   * the default behaviour is to remove it from layouts.
   *
   * Setting this `false` will improve start-up runtime in `--hot` mode by a few hundred ms.
   *
   * @default true
   */
  eject?: boolean
  /**
   * Accepts a string list of flags that enable Syncify to
   * wrangle CFH slop in development mode along with normalisation.
   *
   * > `--no-preview-bar`
   * >
   * > Automatically hides the preview bar
   *
   * > `--no-web-pixels-manager`
   * >
   * > Prevents the WPM evaluation from ocurring and blocks the CFH injection scripting
   *
   * > `--no-checkout-preloads`
   * >
   * > Prevents the checkout preload tags from injecting. In development, you don't need them.
   *
   * > `--no-shopify-features`
   * >
   * > Prevents the Shopify Features scripting from evaluating and blocks the CFH injections.
   *
   * > `--no-trekkie`
   * >
   * > Prevents Trekkie from evaluating, helping per-page navigation performance in development.
   *
   * > `--no-perfkit`
   * >
   * > Prevents Perfkit scripting from evaluating and the CFH injections.
   *
   * @default
   * [
   *   '--no-preview-bar',
   * ]
   */
  flags?: [
     '--no-preview-bar'?,
     '--no-web-pixels-manager'?,
     '--no-checkout-preloads'?,
     '--no-shopify-features'?,
     '--no-trekkie'?,
     '--no-perfkit'?
  ];
}

interface Extension extends Shared {
  /**
   * > **!! NOT YET AVAILABLE !!**
   * >
   * > **This feature is planned and not yet available for usage**
   *
   * The type of client-side scripting method being used. If you are using the Syncify browser
   * extension then set this value to `extension`, otherwise use `inject`.
   *
   * @default 'injection'
   */
  client?: 'extension'
}

interface Inject extends Shared {
  /**
   * The type of client-side scripting method being used. If you are using the Syncify browser
   * extension then set this value to `extension`, otherwise use `inject`.
   *
   * @default 'injection'
   */
  client?: 'inject'
  /**
   * Set a list of theme layout files for snippet injection. This option is only applicable
   * when `client` is set to `inject`.
   *
   * > **NOTE**
   * >
   * > Option does not accept path structures, only file names are to be provided
   * >
   * > ```js
   * > // 𐄂 DO NOT DO THIS
   * > ['source/layout/theme.liquid']
   * >
   * > // ✓ THIS IS GOOD
   * > ['theme.liquid']
   * > ```
   *
   * @default
   * [
   *   'theme.liquid'
   * ]
   */
  layouts?: string[];
}

export type HOT = Inject | Extension
