/* eslint-disable no-unused-vars */

import type { AxiosError, AxiosRequestConfig } from 'axios';
import type { Responses } from 'types';
import { axios } from 'syncify:requests/queue';

/**
 * Access Scopes
 *
 * Returns access scopes available
 */
export async function get (client: AxiosRequestConfig) {

  return axios.get<
  Responses.Access<'GET'>,
  Responses.Access<'GET'>>('/oauth/access_scopes.json', client).then(({ data }) => {

    return data;

  }).catch((e: AxiosError) => {

    return false;

  });
};
