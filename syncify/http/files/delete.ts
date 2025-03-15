import type { Store } from 'types';

/**
 * Delete .zip File
 *
 * We no longer need to hold reference to the theme .zip file,
 * so it gets removed from files.
 */
export async function deleteStagedUpload (fileIds: string, store: Store) {

  await axios.post('graphql.json', {
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
  }, store);

}
