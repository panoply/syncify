import type { GetProcessorConfigFile, GetProcessorConfigs } from './utilities';
import type { PostCSSConfig, SASSConfig, StyleTransform, TailwindConfig } from '@syncify/types';
import type { Tester } from 'anymatch';
import type { Merge } from 'type-fest';

/**
 * PostCSS Processor Configuration
 */
export type PostCSSProcesser = GetProcessorConfigFile<PostCSSConfig[]>;

/**
 * **INTERNAL USE**
 *
 * Tailwind Processor Configuration
 */
export type TailwindCSSProcesser = Merge<GetProcessorConfigs<TailwindConfig>, {
  /**
   * Bundle References
   *
   * Holds the index of each style bundle that uses tailwind.
   *
   * @example
   * {
   *   0: Set<'./User/sissel/webshop/source/assets/file-1.css'>,
   *   1: Set<'./User/sissel/webshop/source/assets/file-2.css'>
   * }
   */
  map: Record<number, Set<string>>
}>

/**
 * SASS Processor Configuration
 */
export type SASSProcesser = {
  /**
   * Whether or not the dynamic import of sass-embedded has concluded.
   */
  loaded: boolean;
  config: SASSConfig
}

/**
 * Bundling Configuration
 */
export type StyleBundle = Merge<StyleTransform, {
  /**
   * A UUID reference for this $.
   */
  uuid: string;
  /**
   * Resolved input path
   */
  input: string;
  /**
   * Attributes to apply
   */
  attrs: string[];
  /**
   * Anymatch function
   */
  watch: Tester;
  /**
   * PostCSS
   */
  postcss: PostCSSConfig[];
  /**
   * Tailwind
   */
  tailwind: Partial<TailwindConfig>;
}>;
