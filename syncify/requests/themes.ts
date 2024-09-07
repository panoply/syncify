/* eslint-disable no-unused-vars */

import type { AxiosError } from 'axios';
import type { Store, Resource, PUT, POST } from 'types';
import { delay } from 'rambdax';
import axios from 'axios';
import * as error from 'syncify:errors';

export const enum Events {
  /**
   * Transfer Successful
   */
  Success,
  /**
   * Transfer Retry Queue
   */
  Retry,
  /**
   * Transfer Failed
   */
  Failed,
  /**
   * Transfer file is empty
   */
  Empty,
}

/**
 * Has Theme
 *
 * Checks for the existence of theme using the provided id
 */
export async function has <T extends Resource.Theme> (id: number, { client }: Store): Promise<boolean> {

  return axios.get<{ theme: T }>(`themes/${id}.json`, client).then(() => {

    return true;

  }).catch((e: AxiosError) => {

    return false;

  });

};

/**
 * Updates Theme
 *
 * Applies an update to a specific theme in the store.
 */
export async function update <T extends Resource.Theme> (theme: PUT.ThemeData, store: Store): Promise<T> {

  return axios.put<{ theme: T }>('themes.json', { theme }, store.client).then(({ data }) => {

    return data.theme;

  }).catch((e: AxiosError) => {

    return error.request(store.store, e.response);

  });

};

/**
 * Get Theme
 *
 * Returns a theme with the provided id
 */
export async function get<T extends Resource.Theme> (id: number, store: Store): Promise<T> {

  return axios.get<{ theme: T }>(`themes/${id}.json`, store.client).then(({ data }) => {

    return data.theme;

  }).catch((e: AxiosError) => {

    return error.request(store.store, e.response);

  });

};

/**
 * List Themes
 *
 * Returns a list of all available themes
 */
export async function list <T extends Resource.Theme[]> (store: Store): Promise<T> {

  return axios.get<{ themes: T }>('themes.json', store.client).then(({ data }) => {

    return data.themes;

  }).catch((e: AxiosError) => {

    return error.request(store.store, e.response);

  });

};

/**
 * Remove Theme
 *
 * Delete a theme using the provided id from the store.
 */
export async function remove <T extends Resource.Theme> (id: number, store: Store): Promise<T> {

  return axios.delete<T>(`themes/${id}.json`, store.client).then(({ data }) => {

    return data;

  }).catch((e: AxiosError) => {

    return error.request(store.store, e.response);

  });

};

/**
 * Theme Processing
 *
 * Post handler for theme processing which will check the status of themes
 */
export async function processing (id: number, store: Store) {

  await delay(1000);

  const theme = await get(id, store);

  if (theme.processing) {

    return processing(id, store);

  }

};

/**
 * Publish Theme
 *
 * Creates a theme in a store and returns the response.
 */
export async function publish <T extends Resource.Theme> (store: Store, theme: POST.ThemeData): Promise<T> {

  return axios.post<{ theme: T }>('themes.json', { theme }, store.client).then(({ data }) => {

    return data.theme;

  }).catch((e: AxiosError) => {

    return error.request(store.store, e.response);

  });

};
