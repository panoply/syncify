import type { SharpOptions as SharpConfig } from 'sharp';
import type { GetProcessorConfigs } from '../shared';

export type { SharpConfig };

/* -------------------------------------------- */
/* INTERNAL USE                                 */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Processor Configuration
 */
export type SharpProcesser = GetProcessorConfigs<SharpConfig>
