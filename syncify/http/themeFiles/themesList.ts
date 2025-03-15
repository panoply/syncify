import type * as Type from 'types';

import { basename } from 'node:path';

import { http } from '~http/client';

export function themesList (store: Type.Store) {

  return new Promise<Type.OnlineStoreTheme[]>((resolve, reject) => {

    http(store.name).request<Type.QueryThemes>({
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

      resolve(nodes.map(theme => ({ ...theme, id: basename(theme.id) })));

    }).catch(failed => {

      const e:any = {};

      e.failed = failed;
      e.store = store;
      reject(e);

    });

  });
}
