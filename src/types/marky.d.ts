declare module 'marky' {

  export interface IMeasures<T extends string> {
    name: T;
    entryType: 'measure';
    startTime: number;
    duration: number;
  }

  /**
   * Begin Recording
   */
  export function mark(name: string): void;
  /**
   * Stop Recording
   */
  export function stop<T extends string>(name: T): IMeasures<T>;
  /**
   * Provides a list of all measures ordered by `startTime`
   */
  export function getEntries<T extends string>(): IMeasures<T>[];
  /**
   * Clears all entries
   */
  export function clear(): void;

}
