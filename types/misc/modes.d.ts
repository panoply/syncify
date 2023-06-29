import { File } from 'types/bundle';

export interface BuildModeReport {
  /**
   * The file name that was build (including extension)
   *
   * @example
   * 'index.liquid'
   */
  name: string;
  /**
   * The processing time it took to build
   *
   * @example
   * '1ms'
   */
  time: string;
  /**
   * The output directory the file written.
   *
   * @example
   * 'templates' // if file is something like index.json
   */
  output: string;
  /**
   * A readable error string inferring any issues which may have occured.
   *
   * @example
   * 'skipped file'
   *
   * @default
   * null
   */
  error: string;
  /**
   * Output size stack
   *
   * _Undefined if `error` exists._
   */
  size?: {
    /**
     * Before transformation, returns ansi string
     */
    before: string;
    /**
     * After transformation, returns ansi string
     */
    after: string;
    /**
     * The saving amount, returns ansi string
     */
    saved: string;
    /**
     * The gzipped size, returns ansi string
     */
    gzip: string;
  }
}

export interface BuildReport {
  /**
   * List of files in the transform group
   */
  files: File[]
  /**
   * The amount of time the transform group took to process.
   */
  time: string;
  /**
   * The build report of each file transform
   */
  report: BuildModeReport[]
}
