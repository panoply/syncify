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
export * from './config/transforms';
export * from './config/processors';
export * from './misc/markdown';
export * from './misc/requests';
export * from './misc/shared';

export declare function defineConfig(config: Config): void
export default syncify;
