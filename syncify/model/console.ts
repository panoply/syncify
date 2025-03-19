import { Log } from '@syncify/ansi';

/**
 * Syncify `console`
 */
export const console = new Log();

/**
 * Syncify `stdout`
 */
export const { stdout, stderr } = Log;
