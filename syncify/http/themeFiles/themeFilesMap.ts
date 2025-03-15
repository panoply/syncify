import type * as Type from 'types';

/* -------------------------------------------- */
/* PUBLIC                                       */
/* -------------------------------------------- */

import { error } from '~errors';
import { http } from '~http/client';
import { graph } from '~http/utils';
import { forEach, has } from '~utils';

/**
 * Theme Files Count
 *
 * Returns the total number of files contained in the provided Theme target.
 * This is a monkey-patch because Shopify GraphQL API does not provide such
 * a reference. The query itself is limited to a subset of data to ensure the
 * fastest possible request and resolve operation.
 */
export function themeFilesMap (target: Target, callback: (count: number) => void = null) {

  return new Promise<{ count: number; files: Pull.Model; }>((resolve, reject) => (async () => {

    let after = null;
    let hasNextPage = true;
    let count = 0;

    const files = <Pull.Model>{};

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

        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
        count += nodes.length;
        callback && callback(count);

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

    resolve({ count, files });

  })());

}
