import { performance } from 'perf_hooks';

/* -------------------------------------------- */
/* LOCAL SCOPES                                 */
/* -------------------------------------------- */

/**
 * Timer cache
 *
 * Holds reference to different running timers
 */
const mark = [];

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Current Time
 *
 * Sugar for the `stop` function.
 */
export const now = () => stop(true);

/**
 * Start timer
 *
 * Captures the current timestamp and applies it to the mark model.
 */
export const start = () => { mark.push(performance.now()); };

/**
 * Clear timers
 *
 * Removes all the timing references from the mark model.
 */
export const clear = () => {

  while (mark.length !== 0) mark.pop();

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
export function stop (now = false) {

  const ms = (performance.now() - (now ? mark[mark.length - 1] : mark.pop()));

  if (ms < 1000) return `${ms.toFixed(0)}ms`;

  const s = ms / 1000;

  if (s < 60) return `${s.toFixed(0)}s ${+ms.toFixed(0).slice(1)}ms`;

  const m = (s / 60).toFixed(0);

  return `${m}m ${(s - (60 * Number(m)))}s ${+ms.toFixed(0).slice(1)}ms`;

};
