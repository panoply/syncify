import type { StagedUploads, Store } from 'types';

import { PassThrough } from 'stream';

import { createReadStream } from 'fs-extra';
import xior, { type XiorResponse } from 'xior';

import { error } from '~errors';
import { event } from '~events';
import { uuid } from '~utils';
// import FormData from 'form-data';

import { $ } from '$';

declare namespace Theme {

  export interface Publish {
    id: string;
    name: string;
    createdAt: string;
    role: string;
  }

}

// Function to generate staged upload URL
async function stageUpload <T extends StagedUploads.Create> (store: Store): Promise<StagedUploads.Targets> {

  const interval = setInterval(() => {

    event.emit('publish:progress', { task: 'Staging Upload', step: 1 });

  }, 1000);

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
    } = await xior.post<T, xiorResponse<T>, StagedUploads.Arguments>('graphql.json', {
      query: '',

      //  gql`
      //   mutation StagedUploadsCreate($input: [StagedUploadInput!]!) {
      //     stagedUploadsCreate(input: $input) {
      //       userErrors {
      //         field
      //         message
      //       }
      //       stagedTargets {
      //         url
      //         resourceUrl
      //         parameters {
      //           name
      //           value
      //         }
      //       }
      //     }
      //   }
      // `,
      variables: {
        input: [
          {
            resource: 'FILE',
            httpMethod: 'POST',
            filename: `${$.vc.number}.zip`,
            mimeType: 'application/zip'
          }
        ]
      }
    }, store.client);

    if (userErrors && userErrors.length > 0) {

      error.throw(store.store, {
        field: userErrors[0].field,
        message: userErrors[0].message
      });

    }

    clearInterval(interval);

    return stagedTargets[0]; // Return the first target

  } catch (e) {

    clearInterval(interval);

    error.request(store.store, e.response);

  }
}

/**
 * Create .zip theme
 *
 * Publishes a theme to the stores files cloud. This is used as the
 * reference URL when publishing theme.
 */
async function uploadFile ({
  parameters,
  resourceUrl,
  url
}: StagedUploads.Targets, store: Store) {

  event.emit('publish:progress', { task: 'Uploading Theme', step: 10 });

  const boundary = '----FormBoundary' + uuid();
  const form = new PassThrough();

  // Using a promise to handle the stream completion
  const streamPromise = new Promise((resolve, reject) => {
    form.on('error', reject);
    form.on('end', resolve);
  });

  // Write all parameters first - Shopify expects these in order
  for (const param of parameters) {

    form.write(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="${param.name}"\r\n\r\n` +
      `${param.value}\r\n`
    );

  }

  // Write file header - file must be the last field
  form.write(
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="file"; filename="${$.vc.number}.zip"\r\n` +
    'Content-Type: application/zip\r\n\r\n'
  );

  // Create file read stream
  const fileStream = createReadStream($.vc.zip);

  // Handle file stream errors
  fileStream.on('error', (error) => form.destroy(error));

  // Pipe file content and write ending after file is complete
  fileStream.on('data', () => {

    event.emit('publish:progress', {
      task: 'Streaming Theme Content',
      step: 1
    });

  });

  fileStream.on('end', () => {
    form.write(`\r\n--${boundary}--\r\n`);
    form.end();
  });

  fileStream.pipe(form, { end: false });

  try {

    const response = await xior.post(url, form, {
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
      maxBodyLength: Infinity,
      maxContentLength: Infinity
    });

    await streamPromise; // Ensure stream is fully processed

    if (response.status >= 200 && response.status < 300) {

      return resourceUrl;

    }

    throw new Error(`Upload failed with status ${response.status}`);

  } catch (e) {
    console.error('Upload error:', e);
    error.request(store.store, e.response);
  }
}

/**
 * Publish Theme
 *
 * Using the generated CDN url, we publish the theme.
 */
async function publishTheme (source: string, store: Store): Promise<Theme.Publish> {

  event.emit('publish:progress', {
    task: 'Processing Publishment',
    step: 10
  });

  const {
    data: {
      data: {
        themeCreate: { theme }
      }
    }
  } = await xior.post('graphql.json', {
    query: gql`
      mutation CreateTheme($name: String!, $source: URL!) {
        themeCreate(name: $name, source: $source) {
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
    `,
    variables: {
      source,
      name: $.vc.number
    }
  }, store.client);

  return theme;

}

/**
 * Delete .zip File
 *
 * We no longer need to hold reference to the theme .zip file,
 * so it gets removed from files.
 */
async function deleteStagedUpload (fileIds: string, store: Store) {

  await xior.post('graphql.json', {
    query: gql`
      mutation DeleteStagedUpload($fileIds: [ID!]!) {
        fileDelete(fileIds: $fileIds ) {
          deletedFileIds
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      fileIds
    }
  }, store.client);

}

/* -------------------------------------------- */
/* PUBLIC                                       */
/* -------------------------------------------- */

async function progress (themeId: string, store: Store) {

  const query = {
    query: gql`
      query ThemeStatus($themeId: ID!) {
        theme(id: $themeId) {
          id
          name
          processing
          processingFailed
        }
      }
    `,
    variables: {
      themeId
    }
  };

  let isProcessing = true;

  while (isProcessing) {

    try {

      const {
        data: {
          data: {
            theme
          }
        }
      } = await xior.post('graphql.json', query, store.client);

      if (!theme.processing) {

        isProcessing = false;

        if (theme.processingFailed) {
          console.error('Theme processing failed.');

        } else {

          event.emit('publish:progress', { task: 'Completed Publishing', step: 300 });

        }

      } else {

        if (theme.processing) {

          event.emit('publish:progress', { task: 'Post Processing', step: 10 });

        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

      }
    } catch (error) {

      console.error('Error polling theme status:', error);
      break;
    }

  }

};

/**
 * Publish Theme
 *
 * Creates a theme in a store and returns the response.
 */
async function publish (store: Store): Promise<{
  id: number;
  name: string;
  createdAt: string;
  role: string;
}> {

  try {

    const stagedUrl = await stageUpload(store);
    const fileUrl = await uploadFile(stagedUrl, store);
    const theme = await publishTheme(fileUrl, store);

    await progress(theme.id, store);

    await deleteStagedUpload(fileUrl, store);

    return { ...theme, id: +theme.id.slice(theme.id.lastIndexOf('/') + 1) };

  } catch (e) {

    return error.request(store.store, e.response);

  }
}

/* -------------------------------------------- */
/* DEFAULT EXPORT                               */
/* -------------------------------------------- */

export default {
  publish,
  progress
};
