export interface Publishing {
  /**
   * The port address to publish on - In most cases, you can leave
   * this to the default, unless port `80` is occupied, in such
   * situation, use a different port.
   *
   * @default 80
   */
  tunnelPort?: number;
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
  publishRole?: 'main' | 'unpublished' | 'development';
  /**
   * **NOT YET AVAILABLE**
   *
   * Bind theme version with the `settings_schema.json` version.
   *
   * @default false
   */
  bindVersion?: boolean;
  /**
   * Limit the amount of new theme publishments.
   *
   * @default 3
   */
  themeLimit?: number;
}
