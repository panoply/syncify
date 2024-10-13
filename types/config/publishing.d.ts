export interface Branches {
  /**
   * Specify a list of git branches which Syncify will publish to.
   *
   * @default 'production'
   */
  branches?: Record<string, string[]>;
  /**
   * Whether or not to bind `package.json` and `settings_schema.json`
   * versions. When set to `true` the `settings_schema.json` value will
   * be aligned with the `package.json` version.
   *
   * @default 'production'
   */
  binded?: string;
  /**
   * Glob list of theme files to track. Entries here will be synced
   * and aligned with source (`input`) files. Syncify will only
   * track data files by default.
   *
   * > If you wish to track all files then pass a single `*` asterisk.
   *
   * @default
   * [
   *   'config/*.json',
   *   'locales/*.json',
   *   'sections/*.json',
   *   'templates/*.json'
   * ]
   */
  track?: string[];
}

export interface Publishing {
  /**
   * Set the publishment role to use - This defaults to `unpublished`
   * which means theme publishes will not be made pushed live.
   *
   * `main`
   *
   * The theme is published. Customers see it when they visit the online store.
   *
   * `unpublished`
   *
   * The theme is unpublished. Customers can't see it.
   *
   * `development`
   *
   * The theme is used for development. The theme can't be published, and is temporary.
   *
   * @default 'unpublished'
   */
  role?: 'main' | 'unpublished' | 'development';
  /**
   * **NOT YET AVAILABLE**
   *
   * Bind theme version with the `settings_schema.json` version.
   *
   * @default false
   */
  branches?: string[]
  /**
   * Limit the amount of new theme publishments.
   *
   * @default 3
   */
  themeLimit?: number;
}
