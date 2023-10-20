import type { Config } from './config';
import type { Syncify as syncify } from './api';
import type { Bundle } from '../syncify/model/$';

export type { Tsconfig } from 'tsconfig-type';
export type { FileKeys } from './$/file';

export type * from './api';
export type * from './cli';
export type * from './shared';

/* CONFIG ------------------------------------- */

export type * from './config';
export type * from './config/views';
export type * from './config/terser';

/* STATE -------------------------------------- */

export type * from './$/cache';
export type * from './$/filters';
export type * from './$/errors';
export type * from './$/requests';
export type * from './$/file';
export type * from './$';
export type * from './$/plugin';
export type * from './$/hot';

/* TRANSFORM ---------------------------------- */

export type * from './transform/pages';
export type * from './transform/image';
export type * from './transform/json';
export type * from './transform/script';
export type * from './transform/style';
export type * from './transform/svg';

/**
 * **State Bundle**
 *
 * Exposes the the execution bundle `$` model.
 *
 * ---
 *
 * @example
 *
 * import { $ } from '@syncify/cli';
 *
 * console.log($)
 *
 */
export declare const $: Bundle;

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
