interface Prompt {
  /**
   * Initialise prompt command: `sy init`
   */
  init: boolean;
  /**
   * Create project from strap, prompt command:
   *
   * ---
   *
   * Accepted:
   *
   * ```bash
   * $ sy create
   * $ sy create <strap>
   * ````
   *
   * ---
   */
  create: boolean;
  /**
   * Projects Inspector
   *
   * ---
   *
   * Accepted:
   *
   * ```bash
   * $ sy projects
   * ````
   *
   * ---
   */
  projects: boolean;
  /**
   * Trigger version control, `sy version`
   *
   * ---
   *
   * Interactive Prompt:
   *
   * ```bash
   * $ sy version
   * ```
   *
   * Accepted Flags:
   *
   * ```bash
   * --patch
   * --minor
   * --major
   * ```
   *
   * Command Order
   *
   * ```bash
   * $ sy version --flags
   * ````
   *
   * ---
   */
  version: boolean;
 /**
  * Theme Selection, prompt command: `sy link`
  *
  * ---
  *
  * Interactive Prompt:
  *
  * ```bash
  * $ sy link
  * ```
  *
  * ---
  */
  link: boolean;
  /**
   * Keychain Selection, prompt command: `sy keychain`
   *
   * ---
   *
   * Interactive Prompt:
   *
   * ```bash
   * $ sy keychain
   * ```
   *
   * ---
   */
  keychain: boolean;
  /**
   * Git Config, prompt command: `sy git`
   */
  git: boolean;
  /**
   * Prune Cache, mode command: `sy prune`
   */
  prune: boolean;
  /**
   * Execute Publishment, alias: `-p`
   */
  publish: boolean;
  /**
   * Push from local store: `sy push`
   */
  push: boolean;
  /**
   * Pull from remote store, `sy pull`
   */
  pull: boolean;
  /**
   * Stash from remote store, `sy stash`
   */
  stash: boolean;
  /**
   * Export and package a theme, `sy export`
   */
  pack: boolean;
}

export interface Modes extends Prompt {
  /**
   * Holds reference to the positional value if provided
   * otherwise this is `null`
   */
  _: string;
  /**
   * Whether or not a prompt command was invoked.
   * Will be `true` if **any** of the following are `true`
   *
   * - `themes`
   * - `setup`
   * - `create`
   * - `git`
   */
  prompt: boolean;
  /**
   * Whether or not syncify was ran in an unknown project - will perform init
   */
  setup: boolean;
  /**
   * Whether or not we are in debug mode. When true, certain loggers will be disabled.
   */
  debug: boolean;
  /**
   * Invoke help `sy help`
   */
  help: boolean;
  /**
   * Triggered during watch mode in post-init cycles, there is no command for bulk
   */
  bulk: boolean;
  /**
   * Invoke help `sy doctor`
   */
  doctor: boolean;
  /**
   * Executed when missing command argument, `sy`
   */
  suggest: boolean;
  /**
   * Executed inspect, `sy inspect`
   */
  inspect: boolean;
  /**
   * Executed remote align, `--align`
   */
  align: boolean;
  /**
   * Executed in dev mode, `--dev`
   */
  dev: boolean;
  /**
   * Executed in prod mode, `--prod`
   */
  prod: boolean;
  /**
   * Run minification, either `--prod`, `--terse`
   */
  terse: boolean;
  /**
   * Execute a build, alias: `-b`
   */
  build: boolean;
  /**
   * Execute watch, alias: `-w`
   */
  watch: boolean;
  /**
   * Execute Clean, alias: `-c`
   */
  clean: boolean;
  /**
   * Execute metafields action, `--metafields`
   */
  metafields: boolean
  /**
   * Execute redirects resource, `--redirects`
   */
  redirects: boolean;
  /**
   * Execute page action, `--pages`
   */
  pages: boolean
  /**
   * Force upload and overwrite, `--force`
   */
  force: boolean;
  /**
   * Invoke HOT reloads, `--hot`
   */
  hot: boolean;
  /**
   * Invoke remote bindings `--bind`
   */
  bind: boolean;
  /**
   * Used with `publish` to set role
   */
  main: boolean;
  /**
   * Used with `publish` to set role
   */
  unpublished: boolean;
  /**
   * Positional target used with `build`, `sy build script`
   *
   * > When mode is `build` and there is no positional arguments, this will default to `true`
   */
  script: boolean;
  /**
   * Positional target used with `build`, `sy build style`
   *
   * > When mode is `build` and there is no positional arguments, this will default to `true`
   * > otherwise when if in `build` mode and positional arguments provided, this is `false`
   */
  style: boolean;
  /**
   * Positional target used with `build`, `sy build svg`
   *
   * > When mode is `build` and there is no positional arguments, this will default to `true`
   * > otherwise when if in `build` mode and positional arguments provided, this is `false`
   */
  svg: boolean;
  /**
   * Positional target used with `build`, `sy build liquid`
   *
   * > When mode is `build` and there is no positional arguments, this will default to `true`
   * > otherwise when if in `build` mode and positional arguments provided, this is `false`
   */
  liquid: boolean;
  /**
   * Positional target used with `build`, `sy build json`
   *
   * > When mode is `build` and there is no positional arguments, this will default to `true`
   * > otherwise when if in `build` mode and positional arguments provided, this is `false`
   */
  json: boolean;
}
