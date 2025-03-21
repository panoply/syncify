import type { Merge } from 'type-fest';
import type * as Type from 'types';

import { error } from '~errors';
import { http } from '~http/client';
import { OnlineStoreThemeFileReadResult } from '~http/enums';
import { graph, params, type RequestError } from '~http/utils';
import { forMap } from '~utils';

export declare namespace List {

  export type Node = Merge<Type.OnlineStoreThemeFile, { body: Type.OnlineStoreThemeFileBodyText }>

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
    onError: (errors: List.Reject) => void;
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
    filename: string;
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
     * The graphql `OnlineStoreThemeFile` response
     */
    files: List.Node[];
    /**
     * The graphql `userErrors`
     */
    errors: List.Reject[];
    /**
     * The `$.target` theme entry
     */
    target: Type.Theme;
  }

}

export function themeFilesList (...input: List.Arguments) {

  const { query, target, onError, onNext } = params<string[], RequestError>(input);

  return new Promise<List.Resolve>((resolve, reject) => (async () => {

    let after = null;
    let hasNextPage = true;
    let files: List.Node[] = [];
    let errors: List.Reject[] = [];

    while (hasNextPage) {
      await http(target.store.name).request<Type.QueryTheme>({
        data: {
          query: gql`
            query ThemeFilesList($gid: ID!, $query: [String!]! $after: String) {
              theme(id: $gid) {
                files(first: 100, after: $after, filenames: $query) {
                  nodes {
                    filename,
                    size,
                    createdAt,
                    updatedAt,
                    checksumMd5,
                    body {
                      ...on OnlineStoreThemeFileBodyText {
                        content
                      }
                    }
                  }
                  userErrors {
                    code
                    filename
                  },
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }
            }
          `,
          variables: {
            gid: target.gid,
            query,
            after
          }
        }
      }).then(response => {

        const { nodes, pageInfo, userErrors } = graph(response.data, 'theme.files', reject);

        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
        files = files.concat(nodes as List.Node[]);

        if (onNext) onNext(files.length);

        if (userErrors.length > 0) {

          errors = errors.concat(forMap(({ filename, code }) => ({
            filename,
            code: code.replace(/_/g, WSP),
            graph: 'QueryOnlineStoreThemeFile',
            message: OnlineStoreThemeFileReadResult(code)
          }), userErrors));

        }

      }).catch(e => {

        e.target = target;
        e.files = files;
        e.graph = 'OnlineStoreThemeFile';
        onError ? onError(e) : error.request(e);
        hasNextPage = false;

      });

    }

    resolve(
      {
        get target () { return target; },
        get files () { return files; },
        get errors () { return errors; }
      }
    );

  })());

}
