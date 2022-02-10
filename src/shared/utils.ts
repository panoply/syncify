import { isAsync } from 'shared/native';

/**
 * Pipe
 *
 * Modified Rambda Piped Async. This variation supports,
 * `this` scope bindings. The function accepts input as
 * first argument and series of functions as next arguments.
 */
export async function pipedScope (...input: Function[]) {

  let [ args, ...fns ] = input;

  while (fns.length !== 0) {

    const func = fns.shift();

    if (isAsync(func)) {
      args = await func.apply(this, args);
    } else {
      args = func.apply(this, args);
    }
  }

  return args;
}
