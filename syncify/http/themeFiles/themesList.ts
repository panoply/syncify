import type { Graph, Store } from 'types';

import { basename } from 'node:path';

import { http } from '~http/client';

export function themesList (store: Store) {

  return new Promise<StoreThemes.Nodes[]>((resolve, reject) => {

    http(store.name).request<Graph.ThemeListQuery>({
      data: gql`
        query ThemeList {
          themes(first: 100) {
            nodes {
              id
              createdAt
              name
              prefix
              role
              themeStoreId
              updatedAt
            }
          }
        }
      `
    }).then(({
      data: {
        themes: {
          nodes
        }
      }
    }) => {

      resolve(nodes.map(theme => ({ ...theme, id: +basename(theme.id) })));

    }).catch(failed => {

      const e:any = {};

      e.failed = failed;
      e.store = store;
      reject(e);

    });

  });
}
