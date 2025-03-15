import type * as Type from 'types';

import { error } from '~errors';
import { http } from '~http/client';
import { graph, params } from '~http/utils';
import { forMap } from '~utils';

export function themeFilesHas <T extends Files.Parameters> (...input: HttpParams<T, Files.Errors>) {

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
