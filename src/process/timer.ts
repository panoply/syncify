import { performance } from 'perf_hooks';

/**
 * Timer Cache
 *
 * Holds reference to different running timers
 */
const mark = [];

/**
 * Start timer
 *
 * Captures the current timestamp and applies it
 * to the mark model, Returns the timestamp.
 */
export function start () {

  mark.push(performance.now());

};

let active: string;

/**
 * Clear timers
 *
 * Removes all the timing references from
 * the mark model.
 */
export function clear () {

  for (const id in mark) delete mark[id];

  active = undefined;

};

/**
 * Get Current measurement
 *
 * Returns the current timer without augmentation
 */
export function now () {

  const ms = (performance.now() - mark[mark.length - 1]);

  if (ms < 1000) return `${ms.toFixed(0)}ms`;

  const s = ms / 1000;

  if (s < 60) return `${s.toFixed(0)}s ${+ms.toFixed(0).slice(1)}ms`;

  const m = (s / 60).toFixed(0);

  return `${m}m ${(s - (60 * Number(m)))}s ${+ms.toFixed(0).slice(1)}ms`;

}

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
export function stop (id: string = active) {

  const ms = (performance.now() - mark.pop());

  delete mark[id];

  if (ms < 1000) return `${ms.toFixed(0)}ms`;

  const s = ms / 1000;

  if (s < 60) return `${s.toFixed(0)}s ${+ms.toFixed(0).slice(1)}ms`;

  const m = (s / 60).toFixed(0);

  return `${m}m ${(s - (60 * Number(m)))}s ${+ms.toFixed(0).slice(1)}ms`;

};
