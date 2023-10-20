import { performance } from 'node:perf_hooks';
import { abs } from './native';

export const timer = new class Timer {

  /**
   * Timer cache
   *
   * Holds reference to different running timers
   */
  public marks = [];

  /**
   * Timer Reference
   *
   * Similar to `mark[]` but provides identifer timers.
   */
  public time: { [id: string]: number } = {};

  /**
   * Timer Cache
   *
   * Used to stop a timer but maintain a reference.
   */
  public cache: { [id: string]: string } = {};

  /**
   * Current Time
   *
   * Sugar for the `stop` function.
   */
  now (id?: string) {

    return this.stop(id || true);

  }

  /**
   * Current Time
   *
   * Sugar for the `stop` function.
   */
  sec (id?: string) {

    const t = this.stop(id || true);

    return t.slice(0, t.lastIndexOf(' '));

  }

  /**
   * Pause Timer
   *
   * Pauses a timer and sets it into `cache` -
   * Use `now()` to retreive and remove.
   */
  pause (id: string) {

    if (id in this.marks) {
      this.cache[id] = this.stop(id || true);
    }
  }

  /**
   * Start timer
   *
   * Captures the current timestamp and applies it to the mark model.
   */
  start (id?: string) {

    if (id) {
      this.time[id] = performance.now();
    } else {
      this.marks.push(performance.now());
    }

  };

  /**
   * Clear timers
   *
   * Removes all the timing references from the mark model.
   */
  clear (id?: string) {

    if (id) {
      if (id in this.time) {
        delete this.time[id];
        return;
      }

      if (id in this.cache) {
        delete this.cache[id];
        return;
      }
    }

    while (this.marks.length !== 0) this.marks.pop();

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
  stop (now: boolean | string = false, end = false) {

    let gt: number;

    if (typeof now === 'boolean') {
      gt = now ? this.marks[this.marks.length - 1] : this.marks.pop();
    } else if (now) {

      if (now in this.cache) {
        const s = this.cache[now];
        delete this.cache[now];
        return s;
      }

      if (end) {
        gt = this.time[now];
        delete this.time[now];
      } else {
        gt = this.time[now];
      }
    }

    const ms = performance.now() - gt;

    if (ms < 1000) return `${abs(+ms.toFixed(0))}ms`;

    const s = ms / 1000;

    if (s < 60) return `${abs(+s.toFixed(0))}s ${abs(+ms.toFixed(0).slice(1, 4))}ms`;

    const m = abs(+(s / 60).toFixed(0));

    return `${m}m ${abs(+(s - (60 * Number(m))).toFixed(0))}s ${abs(+ms.toFixed(0).slice(1, 4))}ms`;

  };

}();
