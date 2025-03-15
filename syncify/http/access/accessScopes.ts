import type { Graph } from 'types';

import { XiorError } from 'xior';

import { http } from '~http/client';

/**
 * Access Scopes
 *
 * Returns access scopes available
 */
export function accessScopeList (domain: string, token: string) {

  return new Promise((resolve, reject) => {

    http.request<Graph.AccessScopeListQuery>(domain, token)({
      data: gql`
        query AccessScopeList {
          currentAppInstallation {
            accessScopes {
              description
              handle
            }
          }
        }
      `
    }).then(({ data: { currentAppInstallation } }) => {

      resolve(currentAppInstallation.accessScopes);

    }).catch((failed: XiorError) => {

      accessScopeList.error = failed;

      return false;

    });

  });

};

accessScopeList.error = null;
