import type * as Type from 'types';
import type { File } from '~file';

import pMap from 'p-map';

import { error } from '~errors';
import { event } from '~events';
import { http } from '~http/client';
import { OnlineStoreThemeFilesUserErrors } from '~http/enums';
import { graph, params, type RequestError } from '~http/utils';
import { forMap, isArray } from '~utils';

import { $, q } from '$';

export declare namespace Upsert {

  export type Arguments = [
    /**
     * Input parameters accepts multiple different types
     */
    input: string | string[] | File | File[],
    /**
     * Optional theme target to provide, defaults to `$.target.default`
     */
    target?: Type.Theme
  ] | [
    {
      /**
       * Input Variables
       */
      input:
       | string
       | string[]
       | File
       | File[]
       | Type.OnlineStoreThemeFilesUpsertFileInput
       | Type.OnlineStoreThemeFilesUpsertFileInput[];
      /**
       * The HTTP Theme target
       */
      target?: Type.Theme;
      /**
       * onError handler. When provided errors will be available as
       * arguments in the callback function. Promise will resolve to `false`,
       *
       * @default undefined
       */
      onError?: <Error>(errors: Error) => void;
    }
  ]

  export interface Parameters {
    /**
     * The variables for the upsert operation
     */
    query: Type.OnlineStoreThemeFilesUpsertFileInput[];
    /**
     * Reference to the current theme/store target
     */
    target: Type.Theme;
    /**
     * List of the raw files ({@type File[]}) - Can be `null`
     */
    files: File[],
    /**
     * An onError callback which will be used on throws
     */
    onError: (errors: Upsert.Reject) => void;
  }

  export interface Reject {
    /**
     * The error code.
     */
    code: string;
    /**
     * The error message.
     */
    message: string;
    /**
     * The graph
     */
    graph: string;
    /**
     * The filename of the theme file.
     */
    filename: string | File;
    /**
     * The Error code enum description
     */
    summary: string;
    /**
     * The {@link File} reference - Possibly `null` dependening on parameters
     */
    get file(): File;
  }

  export interface Resolve {
    /**
     * The graphql `upsertedThemeFiles` response
     */
    synced: Type.OnlineStoreThemeFileOperationResult[];
    /**
     * The graphql `userErrors`
     */
    errors: Upsert.Reject[];
    /**
     * The `$.target` theme entry
     */
    target: Type.Theme;
  }

}

/**
 * **`themeFilesUpsert`**
 *
 * Upload theme file/s to a store. This is used by {@link themeFilesUpsertMap} function.
 * The function will throw if all file uploads fail or an actual error is encountered.
 * The resolution model is a {@link Files.UpsertResponse} structure, which includes
 * the {@link $.sync} ({@link Theme}) entry currently being processed.
 *
 * ---
 *
 * **Using Request Config**
 *
 * Passing a request configuration (object) will ensure a silent failure.
 * The `onError` callback will provide errors and the return value will
 * resolve to `null` - Successful upsert with request config
 * resolves the upsert model.
 *
 * ```js
 * const resolve = await themeFilesUpsert({
 *   input,    // input files
 *   target,   // target client
 *   onError(errors) {}
 * })
 *
 * if (!resolve) {
 *
 *  // request failed silently and onError is called
 *
 * }
 * ```
 *
 * **Using Spread Config**
 *
 * Spreads will throw and errors will be handled automatically. This
 * approach is used for map related upserts.
 *
 * ```js
 * // Spread Parameters
 * themeFilesUpsert([], target).then(resolve => {
 *
 *   resolve.target,     // The Theme target request model
 *   resolve.synced      // upsertedThemeFiles
 *   resolve.errors,     // Errors[]
 *
 *   // Errors
 *   const [
 *     {
 *       code,          // Error Graphql enum code
 *       message,       // Error Message (or null)
 *       summary,       // Error code enum description
 *       filename,      // Error filename
 *       file,          // File Model (or null)
 *       target         // Theme target
 *     }
 *   ] = resolve.errors
 *
 * }).catch(reject => {
 *
 *   reject.target  // The theme request model
 *   reject.message // the error that is thrown
 *   reject.isXiorError
 *
 * })
 * ```
 */
export function themeFilesUpsert (...input: Upsert.Arguments) {

  const { query, target, files, onError } = params.upsert(input);

  return new Promise<Upsert.Resolve>((resolve, reject) => {

    http(target.store.name).request<Type.MutationThemeFilesUpsert>({
      data: {
        query: gql`
          mutation ThemeFilesUpsert($query: [OnlineStoreThemeFilesUpsertFileInput!]!, $gid: ID!) {
            themeFilesUpsert(files: $query, themeId: $gid) {
              upsertedThemeFiles {
                filename
              }
              userErrors {
                code,
                field,
                filename,
                message,

              }
            }
          }
        `,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then((response) => {

      const { upsertedThemeFiles, userErrors } = graph(response, 'data.themeFilesUpsert', reject);

      resolve(
        {
          target,
          synced: upsertedThemeFiles,
          errors: forMap((userError) => ({
            message: userError.message,
            filename: userError.filename,
            code: userError.code.replace(/_/g, WSP),
            graph: 'OnlineStoreThemeFilesUpsertFileInput',
            summary: OnlineStoreThemeFilesUserErrors(userError.code),
            file: files.find(file => file.key === userError.filename) || null
          }), userErrors)
        }
      );

    })
    .catch((e: RequestError) => {

      e.target = target;
      e.files = files;
      e.graph = 'OnlineStoreThemeFilesUpsertFileInput';
      onError ? onError(e) : reject(e);

    });

  });

}

/**
 * The main theme files upsert handler that will iterate over all {@link $.target} entries ({@link Theme}).
 * The mapper accepts a {@link File} type parameter. The `file.value` will be used to
 * populate the request mutation and errors are automatically
 * handled.
 */
export async function themeFilesUpsertMap (file: File | File[]) {

  const files = isArray(file) ? file : [ file ];

  await q.http.add(async () => {

    try {

      const targets = await pMap($.target, target => themeFilesUpsert(files, target));

      event.each(targets);

    } catch (e) {

      error.request(e);

    }

  });

};
