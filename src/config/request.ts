import { Queue } from './queue';
import { ITarget, IRequest } from '../index.d';

declare type file = {
  key: string,
  name: string,
  path: string
}

/**
 * Async forEach
 */
export async function asyncForEach (
  array: file[],
  callback: (
    file: file,
    index: number,
    array: file[]
  ) => Promise<unknown>
) {

  let i: number = 0;
  const len: number = array.length;

  for (; i < len; i++) await callback(array[i], i, array);

};

/**
 * Requests Handler
 */
export async function request (target: ITarget, request: IRequest) {

  const queue = Queue.queues[target.domain] = Queue.queues[target.domain] || new Queue();

  return queue.add(target, request);

}

/**
 * Delay promise (throttle)
 */
export function waitFor (ms: number) {

  return new Promise(resolve => setTimeout(resolve, ms));

};
