import { Events, Resource, IAsset, IFile } from 'types';
import { has } from 'rambdax';

/**
 * Event Emitter
 *
 * The emitted events for the accordion.
 */
export function events (events: Events) {

  function emit <
    Name extends Resource,
    Scope extends Name extends 'build' ? { asset: IAsset; output: string; } : IFile,
    Returns extends Name extends 'build'
    ?
    | string
    | Buffer
    | boolean
    | void
    | object
    | { output: string; asset?: string | Buffer | object }
    :
    | string
    | Buffer
    | boolean
    | void
    | object
  > (name: Name, scope: Scope, content: Buffer): Returns {

    return events[name].apply(scope, content);

  }

  function on <Name extends Resource, Callback extends Events[Name]> (name: Name, callback: Callback) {

    if (has(name, events)) {
      throw new Error('Event listener already exists');
    }

    events[name] = callback;

  };

  function off <Name extends Resource> (name: Name) {

    if (has(name, events)) delete events[name];

  };

  return { on, off, emit };

};
