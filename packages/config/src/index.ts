import type { Config } from '@syncify/types';

/**
 * **Syncify** ~ ENV Utilities
 *
 * Helper utility for checking environment variables and returning some other data references
 */
export const env = {
  get dev () {
    return process.env.SYNCIFY_ENV === 'dev';
  },
  get prod () {
    return process.env.SYNCIFY_ENV === 'prod';
  },
  get watch () {
    return process.env.SYNCIFY_WATCH === 'true';
  }
};

/**
 * **Syncify** ~ Define Config
 *
 * Used in `syncify.config.js` or `syncify.config.ts` files and provides type completions to the export.
 *
 * ---
 *
 * @example
 *
 * export default defineConfig({
 *  input: 'source',
 *  output: 'theme',
 *  paths: {},
 *  transform: []
 *  // etc etc
 * })
 */
export const defineConfig = (config: Config) => config;
