import type { Get } from 'type-fest';
import type { DotPaths, Graph, GraphqlError, Theme } from 'types';
import type { XiorError } from 'xior';
import type { File } from '~file';

import pMap from 'p-map';

import { event } from '~events';
import { forEach, forMap, hasProp, isArray, isObject, isString } from '~utils';

import { $ } from '$';

export interface RequestError extends XiorError {
  /**
   * The graph query object
   */
  isGraphError: boolean;
  /**
   * The graph query object
   */
  graph: string;
  /**
   * Theme target
   */
  target: Theme;
  /**
   * The {@link File} files provided
   */
  files: File[];
  /**
   * Graphql Errors - A list of all errors returned
   */
  errors: GraphqlError[]
}

export function forFile <T extends any> (files: File[], from: T[], prop: keyof T, cb?: (file: File) => void) {

  if (from.length === 0) return;

  const map = forMap((item) => {

    const key = item[prop];
    const file = files.find(file => file.key === key);

    if (file) return file;

  }, from);

  return cb ? forEach(cb, map) : map;

}

export async function forTarget (files: any, callback: any) {

  await pMap($.target, target => callback(files, target)).then(event.each);

}

/**
 * **graph**
 *
 * Walks a response graph and obtains the value. Reject is graph response cannot be obtained.
 * The `object` will be augmented with `isGraphError` property and passed back to reject callback.
 *
 * @example
 * // Assume the following object
 * const o = { data: { a: b: { c: { d: { e: 'f' } } } } }
 *
 * // This is valid, return value will be 'f'
 * graph(o, 'a.b.c.d.e', (o) => 'xxx')
 *
 * // This is invalid, return value will be 'xxx'
 * graph(o, 'a.c', (o) => 'xxx')
 */
export function graph<
  T extends object,
  P extends DotPaths<T>,
  R extends (param: T) => any
> (object: T, path: P, reject?: R): Get<T, P> {

  if (!isObject(object)) return reject(Object.assign(object, { isGraphError: true }));

  const keys = <string[]>(isString(path) ? path.split('.').filter(Boolean) : path);

  if (keys.length === 0) {
    // @ts-expect-error
    object.isGraphError = true;
    return reject(object);
  }

  let result: any = object;

  for (const key of keys) {
    if ((result == null || !(key in result))) {
      reject(Object.assign(object, { isGraphError: true }));
    } else {
      result = result[key];
    }
  }

  return result;
}

/**
 * Params parser which will perform analysis on the query function parameters
 * spread and return an array list of relevent values that are to be used
 * on the Graph query and the response.
 */
export function params <T, E = RequestError> (parameters: any): {
  query: T,
  target: Theme,
  files: File[],
  onError: (errors: E) => void,
  onNext: (count: number) => void
} {

  let files = null;
  let query = parameters[0];
  let target: Theme;
  let onError: (errors: any) => void = null;
  let onNext: (count: number) => void = null;

  // Parameter is an object
  // The input property will either be a File, File[], string or string[]
  // It might also be the actual query variables.
  if (isObject<any>(query)) {

    const has = hasProp<any>(query);

    // if theme target was provided
    // otherwise use default store
    target = has('target') ? query.target : $.target.default;

    // if input has onError callback we will assign
    if (has('onError')) onError = query.onError;
    if (has('onNext')) onNext = query.onNext;

    // object has input property,
    // lets determine the the type of input passed
    if (has('input')) {

      // an array type was passed, eg: { input: [] }
      if (isArray(query.input)) {

        const [ first ] = query.input;

        // first entry is an object, lets check if its a File type
        // File will contain "key" property, this is how we know
        // it is a File type, lets construct the variables
        if (isObject(first) && 'key' in query.input) {

          // we will return the original "files" array
          files = query.input;

          // when we receive a File[] array, it is an upsert
          query = files.map(({ key, value }) => ({
            filename: key,
            body: {
              type: 'TEXT',
              value
            }
          }));

        } else {

          // for everything else, we have an expected variables input
          query = query.input;

        }

      } else if (isObject(query.input)) {

        // same as above, we will check to see if input is a File
        // if object contains "key" property, we will construct upsert
        if ('key' in query.input) {

          // we will return the original "files" array
          files = [ query.input ];

          // Lets now convert to an upsert variable
          query = [ { filename: query.input.key, body: { type: 'TEXT', value: query.input.value } } ];

        } else {

          // for everything else, we have an expected variables input
          // but we will need to convert to an array
          query = [ query.input ];

        }

      } else if (isString(query.input)) {

        // string is valid, let convert to array
        query = [ query.input ];

      }

    }

  } else {

    // when 2 parameters, we have a spread structure
    // if only 1 parameter, we use default theme target
    target = parameters.length === 2 ? parameters[1] : $.target.default;

    // we wil carry out the indentical checks as above but on parameter level
    //

    // an array type was passed, eg: { input: [] }
    if (isArray(query)) {

      const [ first ] = query as any;

      if (isObject(first) && 'key' in first) {

        // we will return the original "files" array
        files = query;

        // when we receive a File[] array, it is an upsert
        query = files.map(({ key, value }) => ({
          filename: key,
          body: {
            type: 'TEXT',
            value
          }
        }));

      }

    } else if (isObject(query)) {

      // same as above, we will check to see if input is a File
      // if object contains "key" property, we will construct upsert
      if ('key' in query) {

        // we will return the original "files" array
        files = [ query ];

        // Lets now convert to an upsert variable
        query = [
          {
            filename: (query as any).key,
            body: { type: 'TEXT', value: (query as any).value }
          }
        ];

      } else {

        // for everything else, we have an expected variables input
        // but we will need to convert to an array
        query = [ query ];

      }

    } else if (isString(query)) {

      // string is valid, let convert to array
      query = [ query ];

    }

  }

  return {
    query,
    target,
    files,
    onError,
    onNext
  };

}

/**
 * Params parser which will perform analysis on the query function parameters
 * spread and return an array list of relevent values that are to be used
 * on the Graph query and the response.
 */
params.upsert = function <T, E = RequestError> (parameters: any): {
  query: Graph.OnlineStoreThemeFilesUpsertFileInput[],
  target: Theme,
  files: File[],
  onError: (errors: E) => void,
  onNext: (count: number) => void
} {

  /**
   * The original {@link File} or {@link File[]} type
   */
  let files = null;
  /**
   * The graphql variables query
   */
  let query = parameters[0];
  /**
   * The theme/store target
   */
  let target: Theme;
  /**
   * An onError callback handler, otherwise null
   */
  let onError: (errors: any) => void = null;
  /**
   * An onNext callback handler for paginated queries, otherwise null
   */
  let onNext: (count: number) => void = null;

  // Parameter is an object
  // The input property will either be a File, File[], string or string[]
  // It might also be the actual query variables.
  if (isObject<any>(query)) {

    const has = hasProp<any>(query);

    // if input has onError callback we will assign
    if (has('onError')) onError = query.onError;
    if (has('onNext')) onNext = query.onNext;

    // if theme target was provided
    // otherwise use default store
    target = has('target') ? query.target : $.target.default;

    // object has input property,
    // lets determine the the type of input passed
    if (has('input')) {

      // an array type was passed, eg: { input: [] }
      if (isArray(query.input)) {

        if (query.input.length > 0) {

          const [ first ] = query.input;

          // first entry is an object, lets check if its a File type
          // File will contain "key" property, this is how we know
          // it is a File type, lets construct the variables
          if (isObject(first) && 'key' in query.input) {

            // we will return the original "files" array
            files = query.input;

            // when we receive a File[] array, it is an upsert
            query = forMap<File, OnlineStore.ThemeFilesUpsertFileInput>(({
              key,
              value
            }) => ({
              filename: key,
              body: {
                type: 'TEXT',
                value
              }
            }), files);

          } else {

            // for everything else, we have an expected variables input
            query = query.input;

          }

        }

      } else if (isObject(query.input)) {

        // same as above, we will check to see if input is a File
        // if object contains "key" property, we will construct upsert
        if ('key' in query.input) {

          // we will return the original "files" array
          files = [ query.input ];

          // Lets now convert to an upsert variable
          query = [
            {
              filename: query.input.key,
              body: {
                type: 'TEXT',
                value: query.input.value
              }
            }
          ];

        } else {

          // for everything else, we have an expected variables input
          // but we will need to convert to an array
          query = [ query.input ];

        }

      } else if (isString(query.input)) {

        // string is valid, lets convert to array
        query = [ query.input ];

      }

    }

  } else {

    // when 2 parameters, we have a spread structure
    // if only 1 parameter, we use default theme target
    target = parameters.length === 2 ? parameters[1] : $.target.default;

    // we will carry out the indentical checks as above but on parameter level

    // an array type was passed, eg: { input: [] }
    if (isArray(query)) {

      const [ first ] = query as any;

      if (isObject(first) && 'key' in first) {

        // we will return the original "files" array
        files = query;

        // when we receive a File[] array, it is an upsert
        query = forMap<File, Graph.OnlineStoreThemeFilesUpsertFileInput>(({ key, value }) => ({
          filename: key,
          body: {
            type: 'TEXT',
            value
          }
        }), files);

      }

    } else if (isObject(query)) {

      // same as above, we will check to see if input is a File
      // if object contains "key" property, we will construct upsert
      if ('key' in query) {

        // we will return the original "files" array
        files = [ query ];

        // Lets now convert to an upsert variable
        query = [
          {
            filename: (query as any).key,
            body: {
              type: 'TEXT',
              value: (query as any).value
            }
          }
        ];

      } else {

        // for everything else, we have an expected variables input
        // but we will need to convert to an array
        query = [ query ];

      }

    } else if (isString(query)) {

      // string is valid, let convert to array
      query = [ query ];

    }

  }

  return {
    query,
    target,
    files,
    onError,
    onNext
  };

};
