import type * as Type from 'types';

import { error } from '~errors';
import { http } from '~http/client';
import { graph, params } from '~http/utils';
import { forMap } from '~utils';

declare namespace Has {

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
     * The variables for the get operation
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
    onError: (errors: Has.Reject) => void;
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

}

export function themeFilesHas (...input: Has.Arguments) {

  const { query, target, files, onError } = params<string[]>(input);

  return new Promise<string[]>((resolve, reject) => {

    http(target.store.name).request<Type.QueryTheme>({
      data: {
        query: gql`
          query ThemeFilesHas($gid: ID!, $query: [String!]!) {
            theme(id: $gid) {
              files(filenames: $query) {
                nodes {
                  filename
                }
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

      const { nodes } = graph(response.data, 'theme.files', reject);

      if (nodes.length === query.length) {
        resolve([]);
      } else {
        resolve(forMap(file => query.includes(file.filename) ? null : file.filename, nodes));
      }

    })
    .catch((e) => {

      e.target = target;
      e.files = files;
      e.graph = 'OnlineStoreThemeFile';
      onError ? onError(e) : error.request(e);

    });

  });

}
