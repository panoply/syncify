import { File } from '../$/file';

export interface UploadModeReport {
  /**
   * The file name that was build (including extension)
   *
   * @example
   * 'index.liquid'
   */
  name: string;
  /**
   * The upload time for this specific file
   *
   * @example
   * '1ms'
   */
  time: string;
  /**
   * The upload error (if occurred)
   *
   * @default
   * null
   */
  error: any;
}

export interface UploadReport {
  /**
   * List of files in the upload group
   */
  files: File[];
  /**
   * The amount of time the group took to upload
   */
  time: string;
  /**
   * The upload report for each file handled
   */
  report: UploadModeReport[]
}

/* -------------------------------------------- */
/* BUILD MODE REPORTING                         */
/* -------------------------------------------- */

export interface BuildModeReport {
  /**
   * The file name that was build (including extension)
   *
   * @example
   * 'index.liquid'
   */
  name: string;
  /**
   * The relative input path of the file
   *
   * @example
   * 'src/template/index.liquid'
   */
  input: string;
  /**
   * The relative output directory path of the file
   *
   * @example
   * 'templates/index.liquid'
   */
  output: string;
  /**
   * The processing time it took to build
   *
   * @example
   * '1ms'
   */
  time: string;
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
   * The name of the transform group
   */
  group: string;
  /**
   * List of files in the transform group
   */
  files: File[]
  /**
   * The files count
   */
  size: number;
  /**
   * The amount of time the transform group took to process.
   */
  time: string;
  /**
   * The build report of each file transform
   */
  report: BuildModeReport[]
}
