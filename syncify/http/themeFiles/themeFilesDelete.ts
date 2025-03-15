import type * as Type from 'types';
import type { File } from '~file';

import pMap from 'p-map';

import { error } from '~errors';
import { event } from '~events';
import { http } from '~http/client';
import { OnlineStoreThemeFilesUserErrors } from '~http/enums';
import { graph, params } from '~http/utils';
import { forMap, isArray } from '~utils';

import { $, q } from '$';

declare namespace Delete {

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
      input: string | string[] | File | File[]
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
    query: string[];
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
    onError: (errors: Delete.Reject) => void;
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
    synced: Array<{ filename: string }>;
    /**
     * The graphql `userErrors`
     */
    errors: Delete.Reject[];
    /**
     * The `$.target` theme entry
     */
    target: Type.Theme;
  }

}

export function themeFilesDelete (...input: Delete.Arguments) {

  const { query, target, files, onError } = params<string[]>(input);

  return new Promise<Delete.Resolve>((resolve, reject) => {

    http(target.store.name).request<Type.MutationThemeFilesDelete>({
      data: {
        query: gql`
          mutation ThemeFilesDelete($gid: ID!, $query: [String!]!) {
            themeFilesDelete(themeId: $gid, files: $query) {
              deletedThemeFiles {
                filename
              }
              userErrors {
                message
                filename
                code
              }
            }
          }
        `,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then(response => {

      const { deletedThemeFiles, userErrors } = graph(response.data, 'themeFilesDelete', reject);

      resolve(
        {
          target,
          synced: deletedThemeFiles,
          errors: forMap((userError) => ({
            message: userError.message,
            filename: userError.filename,
            code: userError.code.replace(/_/g, WSP),
            summary: OnlineStoreThemeFilesUserErrors(userError.code),
            graph: 'MutationThemeFilesDelete',
            file: files.find(file => file.key === userError.filename) || null
          }), userErrors)

        }
      );

    })
    .catch(e => {

      e.target = target;
      e.files = files;
      e.graph = 'OnlineStoreThemeFileOperationResult';
      onError ? onError(e) : reject(e);

    });

  });
}

/**
 * The main theme files delete handler. Files are mapped and queued. The request will use
 * the {@link $.target} entries and iterate over all theme targets. This function is used
 * mostly in watch mode, whereas {@link themeFilesDelete} can be used for direct upserts.
 */
export async function themeFilesDeleteMap (file: File | File[]) {

  const files = isArray(file) ? file : [ file ];

  await q.http.add(async () => {

    try {

      const targets = await pMap($.target, target => themeFilesDelete(files, target));

      event.each(targets);

    } catch (e) {

      error.request(e);

    }

  });

};
