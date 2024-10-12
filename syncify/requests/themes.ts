/* eslint-disable no-unused-vars */

import type { AxiosError } from 'axios';
import type { Store, Resource, PUT, POST } from 'types';
import { delay } from 'rambdax';
import axios from 'axios';
import * as error from 'syncify:errors';
import { join } from 'node:path';
import { $ } from 'syncify:state';
import { createReadStream, readFile } from 'fs-extra';
import FormData from 'form-data';
import fs from 'fs';

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

  const fileData = await readFile($.vc.zip);
  const response = await axios.post('api/graphql.json', {
    query: `mutation {
      fileCreate(files: [{
        originalSource: "data:application/zip;base64,${fileData.toString('base64')}",
        contentType: "application/zip"
      }]) {
        files {
          url
        }
        userErrors {
          field
          message
        }
      }
    }`
  }, store.client);

  return response.data.data.fileCreate.files[0].url;

  async function publishTheme (fileUrl) {

    const createThemeResponse = await axios.post('api/graphql.json', {
      query: `
        mutation {
          themeCreate(source: "${fileUrl}") {
            theme {
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `
    }, store.client);

    const themeId = createThemeResponse.data.data.themeCreate.theme.id;

    await axios.post('api/graphql.json', {
      query: `
        mutation {
          themePublish(id: "${themeId}") {
            theme {
              id
              name
            }
            userErrors {
              field
              message
            }
          }
        }
      `
    }, store.client);
  }
  // GraphQL mutation to generate staged upload URL
  const query = `
    mutation {
      stagedUploadsCreate(input: {
        resource: FILE,
        filename: "example.zip",
        mimeType: "application/zip",
        httpMethod: POST
      }) {
        userErrors {
          field
          message
        }
        stagedTargets {
          url
          resourceUrl
          parameters {
            name
            value
          }
        }
      }
    }
  `;

  // Function to generate staged upload URL
  async function generateStagedUpload (): Promise<any> {

    try {

      const response = await axios.post('api/graphql.json', { query }, store.client);
      const { stagedTargets, userErrors } = response.data.data.stagedUploadsCreate;

      if (userErrors && userErrors.length > 0) {

        throw new Error(`Error creating staged upload: ${userErrors[0].message}`);

      }

      return stagedTargets[0]; // Return the first target

    } catch (error: any) {

      console.error('Error generating staged upload URL:', error.response?.data || error.message);

      throw error;

    }
  }

  // Function to upload file to the generated URL
  async function uploadFile (stage: any): Promise<void> {

    const form = new FormData();
    stage.parameters.forEach((param: { name: string, value: string }) => form.append(param.name, param.value));
    form.append('file', fs.createReadStream($.vc.zip));

    try {

      const response = await axios.post(stage.url, form, { headers: { ...form.getHeaders() } });
      console.log('File uploaded successfully:', response.data);

    } catch (error: any) {

      console.error('Error uploading file:', error.response?.data || error.message);
      throw error;
    }
  }

  // GraphQL mutation to create the file in Shopify
  const mutate = (originalSource: string) => `
    mutation {
      fileCreate(files: {
        alt: "${$.vc.number}",
        contentType: FILE,
        originalSource: "${originalSource}"
      }) {
        files {
          id
          fileStatus
          alt
          createdAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Function to create the file in Shopify
  async function createFile (resourceUrl: string): Promise<void> {

    try {

      const response = await axios.post('api/graphql.json', { query: mutate(resourceUrl) }, store.client);
      const { fileCreate } = response.data.data;
      const { files, userErrors } = fileCreate;

      if (userErrors && userErrors.length > 0) {
        throw new Error(`Error creating file in Shopify: ${userErrors[0].message}`);
      }

      return files.resourceUrl;
    } catch (error: any) {
      console.error('Error creating file in Shopify:', error.response?.data || error.message);
      throw error;
    }
  }

  try {
    // Step 1: Generate staged upload URL
    const staged = await generateStagedUpload();

    await uploadFile(staged);

    const uploaded = await createFile(staged.resourceUrl);

    return uploaded;

  } catch (error) {
    console.error('Error in the file upload process:', error);
  }

  // return axios.post('themes.json', { theme }, store.client).then(({ data }) => {

  //   return data.theme;

  // }).catch((e: AxiosError) => {

  //   console.log(e);

  //   return error.request(store.store, e.response);

  // });

};
