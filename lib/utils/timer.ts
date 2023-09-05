import { performance } from 'node:perf_hooks';

/* -------------------------------------------- */
/* LOCAL SCOPES                                 */
/* -------------------------------------------- */

/**
 * Timer cache
 *
 * Holds reference to different running timers
 */
export const marks = [];

/**
 * Timer Reference
 *
 * Similar to `mark[]` but provides identifer timers.
 */
export const time: { [id: string]: number } = {};

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Current Time
 *
 * Sugar for the `stop` function.
 */
export const now = (id?: string) => stop(id || true);

/**
 * Start timer
 *
 * Captures the current timestamp and applies it to the mark model.
 */
export const start = (id?: string) => {

  if (id) {
    time[id] = performance.now();
  } else {
    marks.push(performance.now());
  }
};

/**
 * Clear timers
 *
 * Removes all the timing references from the mark model.
 */
export const clear = (id?: string) => {

  if (id) {
    if (id in time) delete time[id];
  } else {
    while (marks.length !== 0) marks.pop();
  }
};

/**
 * Stop timer
 *
 * Stops the timer and returns the execution time as a string.
 * The function will remove the mark from cache by default, unless
 * passing a `boolean` value `true` which will return the _current_
 * elapsed time of the last known mark in cache without removing it.
 *
 * Supports following formats:
 *
 * - Miliseconds: `10ms`
 * - Seconds and Miliseconds: `2s 45ms`
 * - Minutes, Seconds and Miliseconds: `2m 35sec 33ms`
 */
export function stop (now: boolean | string = false, end = false) {

  let gt: number;

  if (typeof now === 'boolean') {
    gt = now ? marks[marks.length - 1] : marks.pop();
  } else if (now) {
    if (end) {
      gt = time[now];
      delete time[now];
    } else {
      gt = time[now];
    }
  }

  const ms = performance.now() - gt;

  if (ms < 1000) return `${Math.abs(+ms.toFixed(0))}ms`;

  const s = ms / 1000;

  if (s < 60) return `${Math.abs(+s.toFixed(0))}s ${Math.abs(+ms.toFixed(0).slice(1, 4))}ms`;

  const m = Math.abs(+(s / 60).toFixed(0));

  return `${m}m ${Math.abs(+(s - (60 * Number(m))).toFixed(0))}s ${Math.abs(+ms.toFixed(0).slice(1, 4))}ms`;

};
