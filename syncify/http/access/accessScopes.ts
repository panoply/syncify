import type * as Type from 'types';
import type { XiorError, XiorResponse } from 'xior';

import { http } from '~http/client';

/**
 * Access Scopes
 *
 * Returns access scopes available
 */
export function accessScopeList (domain: string, token: string) {

  return new Promise<{ scopes: Type.AccessScope[]; error: XiorResponse<{ errors: string }> }>((resolve) => {

    http.request<Type.QueryCurrentAppInstallation>(domain, token)({
      data: {
        query: gql`
          query AccessScopeList {
            currentAppInstallation {
              accessScopes {
                description
                handle
              }
            }
          }
        `
      }

    }).then(({ data: { currentAppInstallation } }) => {

      resolve({ scopes: currentAppInstallation.accessScopes, error: null });

    }).catch((error: XiorError) => {

      resolve({ scopes: [], error: error.response });

    });

  });

};
