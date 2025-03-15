import { performance } from 'node:perf_hooks';

const { floor } = Math;

const timer = new class Timer {

  /**
   * Timer cache
   *
   * Holds reference to different running timers
   */
  public marks: number[] = [];

  /**
   * Timer Reference
   *
   * Similar to `marks[]` but provides identifer timers.
   */
  public time: { [id: string]: number } = Object.create(null);

  /**
   * Timer Cache
   *
   * Used to stop a timer but maintain a reference.
   */
  public cache: { [id: string]: string } = Object.create(null);

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
  }

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
   * - Microseconds: `10ms`
   * - Miliseconds: `10ms`
   * - Seconds and Miliseconds: `2s 45ms`
   * - Minutes, Seconds and Miliseconds: `2m 35sec 33ms`
   */
  public stop (now: boolean | string = false, end = false, toJson = false) {

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

    const ms = performance.now() - gt; // Elapsed time in milliseconds

    if (isNaN(ms)) return '';

    if (ms < 1) return `${Math.round(ms * 1000)}μs`;
    if (ms < 1000) return `${Math.floor(ms)}ms`;

    const s = floor(ms / 1000); // Total seconds (integer)

    if (s < 60) {
      // When under 1 minute
      // Milliseconds within the current second
      return `${s}s ${floor(ms % 1000)}ms`;
    }

    const m = floor(s / 60); // Total minutes (integer)
    const sec = s % 60; // Remaining seconds after extracting minutes

    if (m < 60) {
      // When under 1 hour
      // Milliseconds within the current second
      return `${m}m ${sec}s ${floor(ms % 1000)}ms`;
    }

    // Optional Hour Support
    return `${floor(m / 60)}h ${m % 60}m ${s % 60}s ${floor(ms % 1000)}ms`;

  };

}();

export { timer };
