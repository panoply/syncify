import EventEmitter from 'node:events';

/**
 * Extended Events
 *
 * Emitter instance used for event listeners used across the codebase.
 * Allows for emits to be interchangable by setting the `id` when calling
 * `event.each` which will iterate over an array of arguments emitting for
 * each argument in the array
 */
export const event = new class Event extends EventEmitter {

  id: string;

  /**
   * Whether or not an event is listening with the provided name
   */
  has (name: string) {

    return this.listenerCount(name) > 0;

  }

  /**
   * Changes the current event listening mode. Used for specific run-modes
   * such a bulk operations or stdin debugs.
   */
  mode (name: string) {

    this.id = name;

    return this;

  }

  /**
   * Each Event
   *
   * Iterates over an array of arguments and emits to the provided event name.
   */
  each <T extends any> (args: T[]) {

    for (const arg of args) {

      this.emit(this.id, arg);

    }

  }

}();
