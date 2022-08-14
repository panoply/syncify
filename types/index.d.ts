import { Config } from './config';
import { Syncify as syncify } from './api';

export * from './api';
export * from './cli';
export * from './bundle';
export * from './bundle/plugin';
export * from './config';
export * from './config/views';
export * from './config/transforms';
export * from './misc/markdown';
export * from './misc/requests';
export * from './misc/shared';

export declare function defineConfig(config: Config): void
export default syncify;
