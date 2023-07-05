import { Config } from './config';
import { Syncify as syncify } from './api';

export type { Tsconfig } from 'tsconfig-type';
export type { FileKeys } from './internal/file';

export * from './api';
export * from './cli';
export * from './config';
export * from './config/views';
export * from './config/terser';
export * from './internal/cache';
export * from './internal/filters';
export * from './internal/markdown';
export * from './internal/requests';
export * from './internal/shared';
export * from './internal/errors';
export * from './internal/reports';
export * from './internal/file';
export * from './internal';
export * from './internal/plugin';
export * from './internal/hot';
export * from './transforms/image';
export * from './transforms/json';
export * from './transforms/script';
export * from './transforms/style';
export * from './transforms/svg';

/**
 * ***Define Config:***
 *
 * Provide to the default export in your `syncify.config.js` file.
 *
 * ---
 *
 * ***Supported Files:***
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
export declare function defineConfig(config: Config): void
export default syncify;
