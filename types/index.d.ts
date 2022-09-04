import { Config } from './config';
import { Syncify as syncify } from './api';

export type { Tsconfig } from 'tsconfig-type';
export type { FileKeys } from './bundle/file';

export * from './api';
export * from './cli';
export * from './bundle';
export * from './bundle/plugin';
export * from './bundle/hot';
export * from './config';
export * from './config/views';
export * from './misc/markdown';
export * from './misc/requests';
export * from './misc/shared';
export * from './misc/errors';
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
 * import { defineConfig } from '@liquify/syncify';
 *
 * export default defineConfig({
 *   //...
 * });
 *
 */
export declare function defineConfig(config: Config): void
export default syncify;
