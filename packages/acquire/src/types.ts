import type { BuildFailure, BuildResult, Message, TsconfigRaw } from 'esbuild';

export type GetOutputFile = (filepath: string, format: 'esm' | 'cjs') => string
export type RebuildCallback = (
  error: Pick<BuildFailure, 'errors' | 'warnings'> | null,
  result: BuildResult | null,
) => void

export type Loaded = {
  /** Path to the nearest config file */
  path: string
  /** Merged config data */
  data: any
  /** Discovered config files */
  files: string[]
}

export interface AcquireOptions {
  /**
   * The file uri path to acquire and bundle.
   */
  file: string;
  /**
   * The current working directory to resolve from.
   */
  cwd?: string;
  /**
   * The `package.json` type, assumes you have already parsed the file.
   */
  type?: string;
  /**
   * A named import to resolve on.
   */
  named?: string;
  /**
   * Callback when bundle error occurs, passes ESBuild errors as parameter.
   * The return `module` value will be `null` in such cases. Also fires for rebuild.
   *
   *  @default undefined
   */
  onError?: (errors: Message[]) => void;
  /**
   * Callback for bundle warnings, passes ESBuild warnings[] as parameter.
   * The return `module` value will resolve successfully. Also fires for rebuild.
   *
   *  @default undefined
   */
  onWarning?: (warnings: Message[]) => void;
  /**
   * Whether or not acquisition is executing with rebuild.
   * When running in watch mode, use this to trigger incremental
   * re-bundling.
   *
   * @default undefined
   */
  onRebuild?: <T = any>(module: T) => void
  /**
   * Specify the tsconfig (or jsconfig) file path or pre-parsed data.
   * This is used to obtain reference of entries contained on the `paths` option.
   *
   * > `false`
   * >
   * > Disables tsconfig referencing
   *
   * > `string`
   * >
   * > Provide a path to the tsconfig file and acquire will parse it
   *
   * > `object`
   * >
   * > Provide tsconfig raw object, used if you already have reference.
   */
  tsconfig?: string | TsconfigRaw | false;
  /**
   * Preserve compiled temporary file
   *
   * @default false
   */
  preserve?: boolean;
  /**
   * External packages
   */
  external?: (string | RegExp)[];
  /**
   * Not external packages
   */
  noExternal?: (string | RegExp)[];
  /**
   * Automatically mark node_modules as external
   *
   * - `false` when `file` is in node_modules
   * - `true` for all other use case situations
   *
   * @default true
   */
  externalNodeModules?: boolean;
}
