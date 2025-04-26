import type { Get, Paths } from 'type-fest';
import type { XiorInstance } from 'xior';

import xior from 'xior';

import { throws } from '~cli/throws';
import { o, pathOr } from '~utils';

type R = (reason: any) => void

/**
 * Passing a `domain` and `token` will create an xior
 * instance and assign it the `http.client` object store.
 *
 * Passing a `domain` parameter only will return the xior
 * instance that was created. Determination is made by existence
 * of a client instance.
 */
export function http (domain: string, token?: string): XiorInstance {

  if (domain in http.tokens) {

    return http.client[domain];

  } else if (domain && token) {

    http.tokens[domain] = token;
    http.client[domain] = xior.create({
      baseURL: `https://${domain}.myshopify.com/admin/api/${http.VERSION}`,
      url: 'graphql.json',
      responseType: 'json',
      // @ts-ignore
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': http.tokens[domain],
        'Content-Type': 'application/json'
      }
    });

    http.client[domain].interceptors.response.use(
      response => response.data && response.data.data ? response.data : response.data,
      error => Promise.reject(error)
    );

  } else {

    // INTERNAL ERROR
    //
    throws(domain ? [
      `Xior instance cannot be found for ${domain}`
    ] : [
      'Xior instance could not be created'
    ], []);

  }

};

/**
 * Returns an xior Graphql URL
 */
http.request = <T>(domain: string, token?: string) => {

  const client = xior.create({
    baseURL: `https://${domain}.myshopify.com/admin/api/${http.VERSION}`,
    url: 'graphql.json',
    responseType: 'json',
    // @ts-ignore
    method: 'POST',
    headers: token ? {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json'
    } : {
      'Content-Type': 'application/json'
    }
  });

  client.interceptors.response.use(
    response => response.data && response.data.data ? response.data : response.data,
    error => Promise.reject(error)
  );

  return (data: any) => client.request<T>(data);

};

/**
 * Thenable chains to ensure the correct deeply nested structures are accessible.
 * Ensure that the response data can be correctly obtained, if not rejection throws.
 */
http.chain = <T, P extends Paths<T, { maxRecursionDepth: 10, bracketNotation: true}>> (path: P, reject: R) => (
  object: T
): Get<T, P> => pathOr(
  object,
  path,
  reason => {
    // @ts-expect-error
    reason.isGraphError = true;
    reject(reason);
  }
);

/**
 * HTTP xior Instances which are assigned to an object. Each key is a Shopify store name,
 * with the value being an instance of xior with configured `X-Shopify-Access-Token` assigned
 * and `/graphql.json` url endpoint.
 */
http.client = o<Record<string, XiorInstance>>();

/**
 * API Access tokens references
 */
http.tokens = o<Record<string, string>>();

/**
 * The version to use in GraphQL queries.
 */
http.VERSION = '2025-01';
