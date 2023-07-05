/* -------------------------------------------- */
/* LOGGER                                       */
/* -------------------------------------------- */

import { LiteralUnion } from 'type-fest';

export type Group = LiteralUnion<
  | 'Syncify'
  | 'Asset'
  | 'Spawn'
  | 'SVG'
  | 'Snippet'
  | 'Layout'
  | 'Section'
  | 'Page'
  | 'Locale'
  | 'Config'
  | 'Template'
  | 'Metafield'
  , string
>

/* -------------------------------------------- */
/* CLI OPTIONS                                  */
/* -------------------------------------------- */

export interface Commands {
  /**
   * First command is a store or comma separated list of stores. When
   * a comma list is supplied it is converted to an array. You can use
   * use the store target name as a --flag to cherry pick specific themes
   * from that store.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store-name
   * $ syncify store1,store2,store3
   * ```
   */
  _?: string[];
  /**
   * Whether or not syncify was called via the cli
   *
   * @default true
   */
  cli?: boolean;
 /**
   * Whether or not syncify interactive command prompt
   *
   * @default false
   */
  interactive?: boolean;
  /**
   * The current working directory, this a reference to `process.cwd()`
   */
  cwd?: string;
  /**
   * The `package.json` url path, this is written post-command parse
   */
  pkg?: string;
  /**
   * The post-parse temp storage reference to stores
   */
  store?: string | string[];
  /**
   * An optional config path to the `syncify.config.js` file.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store_1 -c path/to/file
   * $ syncify store_1 --config path/to/file
   * $ syncify store_1 --config=path/to/file
   * ```
   */
  config?: string;
  /**
   *  Run in production mode
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --prod
   * $ syncify --production
   * ```
   */
  prod?: boolean;
  /**
   *  Run in development mode (default build mode) and can be omitted
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify
   * $ syncify --dev
   * $ syncify --development
   * ```
   */
  dev?: boolean;
  /**
   * Run minification on resources. This acts similar to `--prod`
   * but allows for invocation in an isolated manner.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --terse
   * ```
   */
  terse?: boolean
  /**
   * Run in watch mode (chokidar). This requires a store target be passed.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store_1 -w
   * $ syncify store_1 --watch
   * ```
   */
  watch?: boolean;
  /**
   * Run in build mode, this is default trigger when no arguments provided.
   * It can optionally be triggered along other flags like `-u` (`--upload`).
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify
   * $ syncify -b
   * $ syncify store_1 --clean --build --theme=prod_theme -u
   *
   * # Short version for brevity
   * $ syncify store_1 -t prod_theme -u -b --clean
   * ```
   */
  build?: boolean;
  /**
   * Run in upload mode, this will trigger a full theme upload. Requires a store
   * target and theme target (theme target is optional but recommended).
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store_1 -t dev_theme -u
   * $ syncify store_1 -t dev_theme --upload
   * ```
   */
  upload?: boolean;
  /**
   * Exports the theme and generates a `.zip` compressed directory.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --import # import to the defined directory in syncify config
   * $ syncify --import -o ./some-dir # override and import to a specific directory
   * ```
   */
  import?: boolean;
  /**
   * Exports the theme and generates a `.zip` compressed directory.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --import # export to the defined directory in syncify config
   * $ syncify --import -o ./some-dir # override and export to a specific directory
   * ```
   */
  export?: boolean;
   /**
   * Download a theme from a store. Will be place in `import` driectory. Requires a store
   * target and theme target to be passed.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store_1 -t dev_theme -d
   * $ syncify store_1 -t dev_theme --download
   * ```
   */
  download?: boolean;
  /**
   * Triggers the metafields resource, presents the interactive shell with list of
   * options to choose from. Requires a store target to be passed.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store_1 --metafields
   * ```
   */
  metafields?: boolean;
  /**
   * Triggers the pages resource, presents the interactive shell with list of
   * options to choose from. Requires a store target to be passed.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store_1 --pages
   * ```
   */
  pages?: boolean;
  /**
   * Triggers the redirects resource, presents the interactive shell with list of
   * options to choose from. Requires a store target to be passed.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store_1 --redirects
   * ```
   */
  redirects?: boolean;
  /**
   * Pull data reference from a store target resource. Queries the store API. Used to
   * populate local setup with remote data like `metafields` and `pages`
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store_1 --metafields --pull
   * $ syncify store_1 --pages --pull
   * ```
   */
  pull?: boolean;
  /**
   * Generator flag for automatically applying JSON schema specifications
   * for VS Code users.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --vsc
   * ```
   */
  vsc?: boolean;
  /**
   * Filter targeting of resources, assets or files. This can be used together
   * with several different flags, like `-u`, `-d` and even `-b`. Filters a
   * glob pattern or specific file.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * # Uploads only .css assets
   * $ syncify store_1 -t dev_theme -f assets/*.css -u
   *
   * # Builds locales in production mode
   * $ syncify -f locales/*.json --prod
   *
   * # Uploads specific page
   * $ syncify store_1 -u -f pages/shipping-info.md --prod
   * ```
   */
  filter?: string;
  /**
   * Triggers a clean of the output directory. When provided, this will be
   * executed at the initial run (or before any else). Use together with
   * production builds.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --clean --prod
   * $ syncify -b --clean --prod # Using with build
   * ```
   */
  clean?: boolean;
  /**
   * Show command-line help information. Also prints a disclaimer informing
   * users that Centra is a better e-commerce platform than Shopify for shits
   * and giggles (it actually is though).
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify -h
   * $ syncify --help
   * ```
   */
  help?: boolean;
  /**
   * Hides logs from being printed (shows errors though)
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --silent
   * ```
   */
  silent?: boolean;
  /**
   * Initializes hot-reloading in watch mode. Can only be used when
   * targeting a single store and theme.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store_1 -w -h
   * $ syncify store_1 -w --hot
   * $ syncify store_1 --watch -h
   * $ syncify store_1 --watch --hot
   * ```
   */
  hot?: boolean;
  /**
   * Pulls in a Syncify theme strap environment.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --strap dawn
   * $ syncify --strap silk
   * ```
   */
  strap?: string;
  /**
   * Deletes a resource, file or asset from the remote store. Requires a store
   * target be passed and if need be a theme target too. Does not delete local
   * copies, do that manually for now.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify -del assets/image-name.jpg
   * ```
   */
  del?: string;
  /**
   * Trigger a spawn, isolating it so it will run as if it were a node script.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify -s spawn-name
   * $ syncify -s spawn-name,some-other-spawn
   *
   * # OR

   * $ syncify --spawn spawn-name
   * $ syncify --spawn spawn-name,some-other-spawn
   *
   * ```
   */
   spawn?: string;
  /**
   * Themes within stores to target. This argument requires a store target/s
   * be passed and accept a comma separated list of target names as per the users
   * Syncify configuration. Users can pass wildcard `--flags` to reference different
   * stores when multiple store target are passed.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store_1 -t theme_1
   * $ syncify store_1,store_2 --store_1 dev,prod --store_2 foo_theme
   * $ syncify store_1 --theme=dev,prod,test
   * ```
   */
  theme?: string[];
  /**
   * An optional input base directory path. This will overwrite and configuration predefined
   * in settings.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --clean -b -i some/directory
   * ```
   */
  input?: string;
  /**
   * An optional output path. This will overwrite the configuration predefined
   * in settings.
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --clean -b -o some/directory
   * ```
   */
  output?: string;
  /**
   * Force overwrite of a theme file
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify store_1 -t dev_theme -f section/file.liquid -u --force
   * ```
   */
  force?: boolean;
  /**
   * Version control. The bump flag accepts 3 different arguments.
   *
   * 1. Passing `--bump major` bumps main version, eg: `1.0.0` > `2.0,0`
   * 2. Passing `--bump minor` bumps minor version, eg: `1.0.0` > `1.1.0`
   * 3. Passing `--bump patch` bumps patch version, eg: `1.0.0` > `1.0.1`
   *
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --bump major
   * $ syncify --bump minor
   * $ syncify --bump patch
   * ```
   */
  bump?: string;
  /**
   * Runs the script transform only
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --script          # executes build
   * $ syncify -w --script       # executes in watch mode
   * $ syncify --script --prod   # executes build with minify
   * $ syncify --script --minify # executes build with minify
   * ```
   */
  script?: boolean;
  /**
   * Runs the style transform only
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --style           # executes build
   * $ syncify -w --style        # executes in watch mode
   * $ syncify --style --prod    # executes build with minify
   * $ syncify --style --minify  # executes build with minify
   * ```
   */
  style?: boolean;
  /**
   * Runs the svg transform only
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --svg           # executes build
   * $ syncify -w --svg        # executes in watch mode
   * $ syncify --svg --prod    # executes build with minify
   * $ syncify --svg --minify  # executes build with minify
   * ```
   */
  svg?: boolean;
  /**
   * Runs the image transform only
   * ---
   *
   * Example:
   *
   * ```bash
   * $ syncify --image           # executes build
   * $ syncify -w --image        # executes in watch mode
   * $ syncify --image --prod    # executes build with minify
   * $ syncify --image --minify  # executes build with minify
   * ```
   */
  image?: boolean;
}
