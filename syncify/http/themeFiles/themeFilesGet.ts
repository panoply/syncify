import type * as Type from 'types';

import { error } from '~errors';
import { http } from '~http/client';
import { OnlineStoreThemeFilesUserErrors } from '~http/enums';
import { graph, params } from '~http/utils';
import { forMap } from '~utils';

export function themeFilesGet <T extends Files.Parameters> (...input: HttpParams<T, Files.Errors>) {

  const { query, target, files, onError } = params<string[]>(input);

  return new Promise<{ file: Files.Node, target: Theme, errors: Files.Errors[] }>((resolve, reject) => {

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
                  body { ...on OnlineStoreThemeFileBodyText { content } }
                },
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
          get file () { return nodes.length === 1 ? nodes[0] : null; },
          get errors () { return userErrors.length > 0 ? userErrors.map(getErrors) : []; }
        }
      );

    })
    .catch(e => {

      e.target = target;
      e.files = files;
      e.graph = 'OnlineStoreThemeFile';
      onError ? onError(e) : error.request(e);

    });

  });
}
