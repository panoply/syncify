import type * as Type from 'types';

/* -------------------------------------------- */
/* PUBLIC                                       */
/* -------------------------------------------- */

import { error } from '~errors';
import { http } from '~http/client';
import { graph } from '~http/utils';
import { forEach, has } from '~utils';

export declare namespace Map {

   /**
   * Bulk parameter accept theme directory names only
   */
   export type Filter = [
    'templates'?,
    'templates/customers'?,
    'templates/metaobject'?,
    'assets'?,
    'blocks'?,
    'config'?,
    'layout'?,
    'locales'?,
    'sections'?,
    'snippets'?
  ]

  export type Arguments = [
    filter?: Filter,
    target?: Type.Theme
  ] | [
    {
      /**
       * Filter specific directories
       */
      filter?: Filter;
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

  export interface Node {
    /**
     * The filename
     */
    filename: string;
    /**
     * The file checksum hash
     */
    checksumMd5: string;
  }

  export interface Resolve {
    /**
     * The total number of files obtained during the map
     */
    total: number;
    /**
     * Directory mapped files in the theme
     */
    files: {
      'templates'?: Map.Node[]
      'templates/customers'?: Map.Node[]
      'templates/metaobject'?: Map.Node[]
      'assets'?: Map.Node[]
      'blocks'?: Map.Node[]
      'config'?: Map.Node[]
      'layout'?: Map.Node[]
      'locales'?: Map.Node[]
      'sections'?: Map.Node[]
      'snippets'?: Map.Node[]
    }
  }

}

/**
 * Theme Files Count
 *
 * Returns the total number of files contained in the provided Theme target.
 * This is a monkey-patch because Shopify GraphQL API does not provide such
 * a reference. The query itself is limited to a subset of data to ensure the
 * fastest possible request and resolve operation.
 */
export function themeFilesMap (target: Type.Target, callback: (count: number) => void = null) {

  return new Promise<Map.Resolve>((resolve, reject) => (async () => {

    let after = null;
    let hasNextPage = true;

    const files: Map.Resolve = { files: {}, total: 0 };

    while (hasNextPage) {
      await http(target.store.name).request<Type.QueryTheme>({
        data: {
          query: gql`
            query ThemeFilesMap($gid: ID!, $after: String) {
              theme(id: $gid) {
                files(first: 180, after: $after) {
                  nodes {
                    filename
                  }
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
            after
          }
        }
      }).then(response => {

        const { nodes, pageInfo } = graph(response.data, 'theme.files', reject);

        files.total += nodes.length;

        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
        callback && callback(files.total);

        forEach(({ filename }) => {

          const directory = filename.slice(0, filename.lastIndexOf('/'));

          has(directory, files)
            ? files[directory].push(filename)
            : files[directory] = [ filename ];

        }, nodes);

      }).catch(e => {

        e.target = target;
        e.graph = 'OnlineStoreThemeFile';

        error.request(e);

        hasNextPage = false;

      });

    }

    resolve(files);

  })());

}
