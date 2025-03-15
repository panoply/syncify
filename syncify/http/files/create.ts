async function stageUploadCreate <T extends StagedUploads.Create> (store: Store): Promise<StagedUploads.Targets> {

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
    } = await axios.post<T, AxiosResponse<T>, StagedUploads.Arguments>('graphql.json', {
      query: gql`
        mutation StagedUploadsCreate($input: [StagedUploadInput!]!) {
          stagedUploadsCreate(input: $input) {
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
      `,
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
