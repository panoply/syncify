import type { BuildOptions, BuildFailure } from 'esbuild';

export type BundleResolve<T> = Promise<{
  /**
   * Module
   */
  mod: T;
  /**
   * Dependencies
   */
  dependencies: string[]
}>

export interface BundleRequire {
  /**
   * The current working directory
   */
  cwd: string
  /**
   * The filepath to bundle and require
   */
  filepath: string
  /**
   * The `require` function that is used to load the output file
   * Default to the global `require` function
   * This function can be asynchronous, i.e. returns a Promise
   */
  require?: (outfile: string, ctx: { format: 'cjs' | 'esm' }) => any
  /**
   * esbuild options
   */
  esbuildOptions?: BuildOptions
  /**
   * Get the path to the output file
   * By default we simply replace the extension with `.bundled_{randomId}.js`
   */
  getOutputFile?: (filepath: string, format: 'esm' | 'cjs') => string
  /**
   * Enable watching and call the callback after each rebuild
   */
  onRebuild?: (ctx: {
    err?: BuildFailure
    mod?: any
    dependencies?: string[]
  }) => void
  /**
   * External packages
   */
  external?: (string | RegExp)[]
  /**
   * A custom tsconfig path to read `paths` option
   */
  tsconfig?: string
  /**
   * Preserve compiled temporary file for debugging
   * Default to `process.env.BUNDLE_REQUIRE_PRESERVE`
   */
  preserveTemporaryFile?: boolean

  /**
   * Provide bundle format explicitly
   * to skip the default format inference
   */
  format?: 'cjs' | 'esm'
}
