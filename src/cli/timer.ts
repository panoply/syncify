import { performance } from 'perf_hooks';

const mark: { [id: string]: number } = {};

/**
 * Start timer
 *
 * Captures the current timestamp and applies it
 * to the mark model, Returns the timestamp.
 */
export const start = (id: string) => {

  mark[id] = performance.now();

  return mark[id];

};

/**
 * Clear timers
 *
 * Removes all the timing references from
 * the mark model.
 */
export const clear = () => {

  for (const id in mark) delete mark[id];

};

/**
 * Stop timer
 *
 * Stops the timer and returns the execution
 * time as a string. Supports following formats:
 *
 * - Miliseconds: `10ms`
 * - Seconds and Miliseconds: `2s 45ms`
 * - Minutes, Seconds and Miliseconds: `2m 35sec 33ms`
 */
export const stop = (id: string) => {

  const ms = (performance.now() - mark[id]);

  delete mark[id];

  if (ms < 1000) return `${ms.toFixed(0)}ms`;

  const s = ms / 1000;

  if (s < 60) return `${s.toFixed(0)}s ${+ms.toFixed(0).slice(1)}ms`;

  const m = (s / 60).toFixed(0);

  return `${m}m ${(s - (60 * Number(m)))}s ${+ms.toFixed(0).slice(1)}ms`;

};
