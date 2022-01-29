import { white } from 'kleur';
import { has } from 'rambdax';
import { ICLIOptions, IRequest } from 'types';
import importcwd from 'import-cwd';

export const {
  assign,
  is,
  defineProperty,
  defineProperties,
  keys,
  values,
  create
} = Object;
export const { isArray, from } = Array;
export const redirects = /^(\/[\w-]+)\s*:\s*((?:https?:\/\/(?:w{3})?)?\/?[/\w_.-]*)$/gm;

export function env (value: 'prod' | 'dev') {

  return process.env.SYNCIFY_ENV === value;
}

export function lastPath (path: string) {

  return path.match(/[^/]+(?:\/$|$)/)[0];
}

/**
 * Load module
 */
export function loadModule (moduleId: string) {

  try {
    return require(moduleId);
  } catch {
    // Ignore error
  }

  return importcwd.silent(moduleId);
}

/**
 * Get the asset key reference (used for logs)
 */
export function getAssetKey (config: IRequest) {

  switch (config.method) {
    case 'put':
    case 'post':

      if (has('metafield', config.data)) {
        return (config.data as { metafield: any }).metafield.key;
      } else if (has('asset', config.data)) {
        return (config.data as { asset: any }).asset.key;
      }

      break;

    case 'delete':

      return config.params['asset[key]'];

  }

}

/**
 * Upcase first letter of a string
 */
export function toUpcase <T extends string> (value: T) {

  return value.charAt(0).toUpperCase() + value.slice(1);

}

/**
 * Ignored files and/or directories
 */
export function ignore (settings: ICLIOptions, ignored = {
  count: 0,
  files: null,
  log: null,
  base: /[/\\]\./
}) {

  if (settings.ignore && settings.forceIgnore) {

    ignored.count = settings.ignore.length;
    ignored.log = settings.ignore.join(white('\n\t - '));

    // @ts-ignore
    settings.ignore.push(ignored.base);

    ignored.files = settings.ignore;
  }

  return { settings, ignored };

}
