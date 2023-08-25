import { Config } from './config';
import { Syncify as syncify } from './api';

export type { Tsconfig } from 'tsconfig-type';
export type { FileKeys } from './bundle/file';

export * from './api';
export * from './cli';
export * from './config';
export * from './config/views';
export * from './config/terser';
export * from './bundle/cache';
export * from './bundle/filters';
export * from './bundle/requests';
export * from './bundle/shared';
export * from './bundle/errors';
export * from './bundle/reports';
export * from './bundle/file';
export * from './bundle';
export * from './bundle/plugin';
export * from './bundle/hot';
export * from './transforms/pages';
export * from './transforms/image';
export * from './transforms/json';
export * from './transforms/script';
export * from './transforms/style';
export * from './transforms/svg';

/**
 * **Define Config:**
 *
 * Provide to the default export in your `syncify.config.js` file.
 *
 * ---
 *
 * **Supported Files:**
 *
 * - syncify.config.ts
 * - syncify.config.js
 * - syncify.config.mjs
 * - syncify.config.cjs
 *
 * ---
 *
 * @example
 *
 * import { defineConfig } from '@syncify/cli';
 *
 * export default defineConfig({
 *   //...
 * });
 *
 */
export declare function defineConfig<T>(config: Config<T>): void;
export default syncify;
