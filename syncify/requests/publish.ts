import type { Store } from 'types';
import axios from 'axios';
import * as error from 'syncify:errors';
import { $ } from 'syncify:state';
import FormData from 'form-data';
import { createReadStream } from 'fs-extra';

// Function to generate staged upload URL
async function stageUpload (store: Store): Promise<any> {

  try {

    const {
      data: {
        data: {
          stagedUploadsCreate: {
            stagedTargets,
            userErrors
          }
        }
      }
    } = await axios.post('api/graphql.json', {
      query: `
        mutation {
          stagedUploadsCreate(input: {
            resource: FILE,
            filename: "${$.vc.number}.zip",
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
      `
    }, store.client);

    if (userErrors && userErrors.length > 0) {

      error.throws(store.store, userErrors[0].message);

    }

    return stagedTargets[0]; // Return the first target

  } catch (e) {

    error.request(store.store, e.response);

  }
}

/**
 * Create .zip theme
 *
 * Publishes a theme to the stores files cloud. This is used as the
 * reference URL when publishing theme.
 */
async function uploadFile ({ url, parameters, resourceUrl }: {
  url: string,
  resourceUrl: string;
  parameters: Array<{
    name: string;
    value: string
  }>
}, store: Store) {

  const form = new FormData();

  parameters.forEach(param => form.append(param.name, param.value));

  form.append('file', createReadStream($.vc.zip));

  try {

    await axios.post(url, form, { headers: form.getHeaders() });

    return resourceUrl;

  } catch (e) {

    error.request(store.store, e.response);

  }
}

/**
 * Publish Theme
 *
 * Using the generated CDN url, we publish the theme.
 */
async function publishTheme (fileUrl: string, store: Store): Promise<{
  id: number;
  name: string;
  createdAt: string;
  role: string;
}> {

  const {
    data: {
      data: {
        themeCreate: { theme }
      }
    }
  } = await axios.post('api/2024-10/graphql.json', {
    query: `
      mutation CreateTheme {
        themeCreate(
          name: "${$.vc.number}",
          source: "${fileUrl}"
        ) {
          theme {
            id
            name
            createdAt
            role
          }
          userErrors {
            field
            message
          }
        }
      }
    `
  }, store.client);

  return theme;

}

/**
 * Delete .zip File
 *
 * We no longer need to hold reference to the theme .zip file,
 * so it gets removed from files.
 */
async function deleteFile (fileUrl: string, store: Store) {

  await axios.post('api/graphql.json', {
    query: `
      mutation {
        fileDelete(input: { url: "${fileUrl}" }) {
          deletedId
          userErrors {
            field
            message
          }
        }
      }
    `
  }, store.client);

}

/**
 * Publish Theme
 *
 * Creates a theme in a store and returns the response.
 */
export async function publish (store: Store): Promise<{
  id: number;
  name: string;
  createdAt: string;
  role: string;
}> {

  try {

    const stagedUrl = await stageUpload(store);
    const fileUrl = await uploadFile(stagedUrl, store);

    const theme = await publishTheme(fileUrl, store);

    await deleteFile(fileUrl, store);

    return theme;

  } catch (e) {

    return error.request(store.store, e.response);

  }
}
