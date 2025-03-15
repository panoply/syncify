import { isArray } from '~utils';

import { q } from '$';

type Task = () => any[] | any | Promise<any>;

/**
 * Interface for the chainable object returned by the `pipe` function.
 * It provides methods to control the execution flow of tasks, including
 * stopping the chain based on conditions, handling conditional task execution,
 * and supporting Promise-like behavior for asynchronous operations.
 */
export interface PipeChain {
  /**
   * Stops the pipe chain if the provided condition is `true`.
   *
   * When the condition resolves to `true`, the execution of subsequent tasks
   * in the chain is cancelled, and no further operations will run.
   *
   * > Passing an array will result in `q.tasks[]` being populated
   *
   * @param condition - A boolean value that determines whether to stop the chain.
   * @returns A function that accepts additional tasks to execute if the chain continues.
   *
   * @example
   * pipe(
   *   () => console.log("Step 1"),
   *   () => console.log("Step 2")
   * ).stop(true)(
   *   // This task will not execute because the condition is true
   *   () => console.log("Step 3")
   * );
   * // Output: "Step 1", "Step 2"
   */
  stop(condition: boolean): (...tasks: [ Task[] ] | Task[]) => PipeChain;

  /**
   * Executes tasks conditionally based on the provided condition.
   *
   * If the condition is `true`, the tasks in the first argument (`ifTrue`) will run.
   * If the condition is `false`, the tasks in the optional second argument (`ifFalse`)
   * will run instead. If no `ifFalse` tasks are provided, the chain continues without
   * executing any tasks for the false case.
   *
   * > Passing an array will result in `q.tasks[]` being populated
   *
   * @param condition - A boolean value that determines which branch to execute.
   * @returns A function that accepts tasks for the `true` case, returning a `PipeChain`
   *          with an optional second call for the `false` case.
   *
   * @example
   * pipe(
   *   () => console.log("Start")
   * ).next(true)(
   *   // Runs when condition is true
   *   () => console.log("Condition was true")
   * )(
   *   // Runs when condition is false (not executed in this case)
   *   () => console.log("Condition was false")
   * );
   * // Output: "Start", "Condition was true"
   *
   * pipe(
   *   () => console.log("Start")
   * ).next(false)(
   *   () => console.log("Condition was true")
   * )(
   *   () => console.log("Condition was false")
   * );
   * // Output: "Start", "Condition was false"
   */
  next(condition: boolean): (ifTrue: Task | Task[]) => PipeChain & { (ifFalse: Task | Task[]): PipeChain };

  /**
   * Attaches callbacks for handling the resolution or rejection of the pipe chain.
   *
   * This method makes the `PipeChain` Promise-like, allowing you to handle the
   * result of asynchronous tasks once they complete.
   *
   * @param onfulfilled - The callback to execute when the chain resolves successfully.
   * @param onrejected - The callback to execute if the chain encounters an error.
   * @returns A Promise that resolves with the result of the callback.
   *
   * @example
   * pipe(
   *   () => Promise.resolve("Success")
   * ).then(
   *   (value) => console.log(value), // Outputs: "Success"
   *   (error) => console.error(error)
   * );
   */
  then: <TResult = void, TError = never>(
    onfulfilled?: ((value: void) => TResult | PromiseLike<TResult>) | undefined | null,
    onrejected?: ((reason: any) => TError | PromiseLike<TError>) | undefined | null
  ) => PromiseLike<TResult>;

  /**
   * Attaches a callback to handle errors in the pipe chain.
   *
   * This method catches any rejections or errors that occur during the execution
   * of the chain, similar to a Promise's `catch`.
   *
   * @param onrejected - The callback to execute if the chain rejects or encounters an error.
   * @returns A Promise that resolves with the result of the error handler or the original value.
   *
   * @example
   * pipe(
   *   () => Promise.reject("Error occurred")
   * ).catch(
   *   (error) => console.log(error) // Outputs: "Error occurred"
   * );
   */
  catch: <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null) => PromiseLike<void | TResult>;

  /**
   * Attaches a callback that runs when the pipe chain settles (either resolves or rejects).
   *
   * This method is useful for cleanup or final actions, similar to a Promise's `finally`.
   *
   * @param onfinally - The callback to execute when the chain settles.
   * @returns A Promise that resolves once the callback completes.
   *
   * @example
   * pipe(
   *   () => console.log("Running")
   * ).finally(
   *   () => console.log("Done") // Outputs: "Running", "Done"
   * );
   */
  finally: (onfinally?: (() => void) | undefined | null) => PromiseLike<void>;
}

export function piper (...initialTasks: Task[]): PipeChain {

  const stages: {
    type: 'tasks' | 'true';
    condition?: boolean;
    queue?: boolean;
    tasks?: Task[];
    truthy?: Task[];
    falsy?: Task[];
  }[] = [
    {
      type: 'tasks',
      tasks: initialTasks
    }
  ];

  let isCancelled = false;

  async function executeTasks (tasks: Task[]) {

    for (const task of tasks) {
      if (isCancelled) break;
      try {
        const result = task();
        await Promise.resolve(result);
      } catch (e) {}

    }

  }

  const chain: PipeChain = {
    stop (condition: boolean) {

      return (...nextTasks: Task[] | [Task[]]) => {

        if (!isCancelled) {
          const queue = isArray(nextTasks[0]) && nextTasks.length === 1;
          const tasks = queue ? nextTasks[0] as Task[] : nextTasks as Task[];
          stages.push({ type: 'tasks', condition, tasks, queue });
        }

        return chain;

      };

    },
    next (condition: boolean) {

      const trueHandler = (ifTrue: [Task[]] | Task | Task[]) => {

        if (!isCancelled) {
          const queue = isArray(ifTrue[0] as Task[]) && ifTrue.length === 1;
          const truthy = queue ? ifTrue[0] : isArray(ifTrue) ? ifTrue : [ ifTrue ];
          stages.push({
            type: 'true',
            condition,
            queue,
            truthy
          });
        }

        const chainWithOptionalFalse: PipeChain & {
          (isFlase: Task | Task[]): PipeChain
        } = Object.assign(function (ifFalse: Task | Task[]) {
          if (!isCancelled) {
            const last = stages[stages.length - 1];
            if (last.type === 'true') {
              last.queue = isArray(ifFalse[0] as Task[]) && ifFalse.length === 1;
              last.falsy = last.queue ? ifFalse[0] : isArray(ifFalse) ? ifFalse : [ ifFalse ];
            }
          }
          return chain;
        }, chain);

        return chainWithOptionalFalse;

      };

      return trueHandler;

    },
    then: null as any,
    catch: null as any,
    finally: null as any
  };

  const promise = (async () => {

    for (const stage of stages) {
      if (isCancelled) break;
      switch (stage.type) {
        case 'tasks':
          if (stage.condition) {
            isCancelled = true;
            break;
          }
          if (stage.queue) {
            q.tasks.addAll(stage.tasks);
          } else {
            await executeTasks(stage.tasks);
          }
          break;
        case 'true':
          if (stage.condition && stage.truthy) {
            if (stage.queue) {
              q.tasks.addAll(stage.truthy);
            } else {
              await executeTasks(stage.truthy);
            }
          } else if (!stage.condition && stage.falsy) {
            if (stage.queue) {
              q.tasks.addAll(stage.falsy);
            } else {
              await executeTasks(stage.falsy);
            }
          }
          break;
      }
    }

    return q.tasks.size > 0 ? q.tasks.onIdle() : undefined;

  })();

  chain.then = promise.then.bind(promise);
  chain.catch = promise.catch.bind(promise);
  chain.finally = promise.finally.bind(promise);

  return chain;
}
