import type { LiteralUnion, Paths } from 'type-fest';

/**
 * Identity Type return
 */
export type Identity<T> = T;

/**
 * Union Type for strings
 */
export type LiteralString<T> = LiteralUnion<T, string>

export type PromiseString<T> = Promise<LiteralString<T>>

export type DotPaths<T> = Paths<T, { bracketNotation: true, maxRecursionDepth: 7 }>

/**
 * Processor Configuration
 */
export type GetProcessorConfigs<T> = {
  /**
   * Whether or not the processor is installed
   */
  installed: boolean;
  /**
   * Whether or not the module was loaded, ie: imported.
   * This will be `false` until the the import was loaded.
   */
  loaded: boolean;
  /**
   * Whether or not a config file exists for the processor,
   * When one exists the URI path location to the file will
   * be applied as the value.
   */
  file: boolean | string;
  /**
   * Configuration of the processor. Initialized with defaults.
   */
  config: T;
}

/**
 * Processor Configuration
 */
export type GetProcessorConfigFile<T> = {
  /**
   * Whether or not a config file exists for the processor,
   * When one exists the URI path location to the file will
   * be applied as the value.
   */
  file: boolean | string;
  /**
   * Configuration of the processor, Initialized with defaults
   */
  config: T;
}
