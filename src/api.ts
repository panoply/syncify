import { IConfig, Resources, Resource, Syncify } from 'types';
import { cli } from './cli';
import { vsc } from 'modes/vsc';

const syncify: Syncify = function syncify (resource: Resource, options?: IConfig) {

  return async function (callback: (content?: Buffer) => void) {

    const state = (await promise);

    callback(state);

    log(Errors.INFO, 'Connection Established ⚡');
  };

};
