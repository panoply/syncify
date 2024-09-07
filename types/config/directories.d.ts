/* -------------------------------------------- */
/* BASE DIRECTORIES                             */
/* -------------------------------------------- */

export interface Directories {
  /**
   * The resolved `input` directory path
   *
   * @default 'source'
   */
  input?: string;
  /**
   * The resolved `output` directory path
   *
   * @default 'theme/'
   */
  output?: string;
  /**
   * The resolved `import` directory path for downloaded themes
   *
   * @default 'import/'
   */
  import?: string;
  /**
   * The resolved `export` directory path for packaged `.zip` themes
   *
   * @default 'export'
   */
  export?: string;
  /**
   * The resolved `config` directory path for build tool files
   *
   * @default '/'
   */
  config?: string;
  /**
   * The resolved `cache` directory path for build tool files
   *
   * @default 'node_modules/.syncify/'
   */
  cache?: string;
}
