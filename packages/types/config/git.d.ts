export interface Git {
  /**
   * Specifies the default branch where your project exists. This branch will be be used to trigger
   * the auto-merging behaviour when running `git pull`. Your `output` (theme) directory will not
   * exist within this branch unless explicitly excluded from `.gitignore` file.
   *
   * > Please refer to the [Syncify Git Integration](https://syncify.sh/usage/git) for more information.
   *
   * @default 'master'
   */
  default?: string;
  /**
   * Specifies the production branch name, which is primary sync branch. This is the branch
   * that Syncify will auto-publish the flat **output** directory too, and is not to be confused
   * with the branch where your **input** (source) lives. Instead, this is the branch used by the
   * [Shopify Github Integration](https://shopify.dev/docs/storefronts/themes/tools/github).
   *
   * > **PLEASE NOTE**
   * >
   * > Syncify assumes that the default branch of your respository is named `master` (as per the original
   * > and correct naming convention for Git). The `main` branch is **NOT** considered the "main" branch
   * > but instead it is used as the distributed flat-structure point of your theme as per the `role` name
   * > used for live themes published in your store.
   * >
   * > Please refer to the [Syncify Git Integration](https://syncify.sh/usage/git) for more information.
   *
   * @default 'main'
   */
  branch?: string;
  /**
   * A glob pattern of files (or directories) which apply conflict-free merging. These entires force-merge
   * into **input** (source) upon `git pull` operations. You'd use the option for `.json` configuration
   * specific files such as templates that auto-write settings from the editor.
   *
   * ```js
   * {
   *   // all templates will overwrite source.
   *   force: ['templates/*.json' ]
   * }
   * ```
   *
   * @default []
   */
  force?: string[];
  /**
   * Defines branch relationships for mirroring. Each key is a branch name, and the value is an
   * array of branches that will mirror content changes published via the Shopify Github Integration.
   *
   * Mirrors allow developers to define dynamic branch reflections, for example:
   *
   * ```js
   * {
   *   stage: ['pre']        // ensures the stage branch mirrors the pre branch.
   *   dev: ['main','pre']  // ensures the dev branch mirrors both main and pre branches.
   * }
   * ```
   *
   * @default {}
   */
  mirror?: { [branch: string]: string[] }
}
