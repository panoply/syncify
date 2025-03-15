import type { Merge } from 'type-fest';
import type * as Type from 'types';

import { error } from '~errors';
import { http } from '~http/client';
import { OnlineStoreThemeFileReadResult } from '~http/enums';
import { graph, params } from '~http/utils';
import { forMap } from '~utils';

declare namespace Get {

  export type Node = Merge<Type.OnlineStoreThemeFile, {
    body: Type.OnlineStoreThemeFileBodyText
  }>

  export type Arguments = [
    /**
     * Input parameters accepts multiple different types
     */
    input: string | File,
    /**
     * Optional theme target to provide, defaults to `$.target.default`
     */
    target?: Type.Theme
  ] | [
    {
      /**
       * Input Variables
       */
      input: string | File
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
    onError: (errors: Get.Reject) => void;
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
     * The graphql `OnlineStoreThemeFile` response
     */
    file: Get.Node;
    /**
     * The graphql `userErrors`
     */
    errors: Get.Reject[];
    /**
     * The `$.target` theme entry
     */
    target: Type.Theme;
  }

}

export function themeFilesGet (...input: Get.Arguments) {

  const { query, target, files, onError } = params<string[]>(input);

  return new Promise<Get.Resolve>((resolve, reject) => {

    http(target.store.name).request<Type.QueryTheme>({
      data: {
        query: gql`
          query ThemeFilesGet($gid: ID!, $query: [String!]!) {
            theme(id: $gid) {
              files(filenames: $query) {
                userErrors {
                  code
                  filename
                },
                nodes {
                  filename,
                  size,
                  createdAt,
                  updatedAt,
                  body {
                    ...on OnlineStoreThemeFileBodyText {
                      content
                    }
                  }
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

      const { nodes, userErrors } = graph(response.data, 'theme.files', reject);

      resolve(
        {
          get target () { return target; },
          file: nodes.length === 1 ? nodes[0] as Get.Node : null,
          errors: forMap(({ filename, code }) => ({
            filename,
            code: code.replace(/_/g, WSP),
            graph: 'QueryOnlineStoreThemeFile',
            message: OnlineStoreThemeFileReadResult(code)
          }), userErrors)

        }
      );

    })
    .catch(e => {

      e.target = target;
      e.files = files;
      e.graph = 'QueryOnlineStoreThemeFile';
      onError ? onError(e) : error.request(e);

    });

  });
}
