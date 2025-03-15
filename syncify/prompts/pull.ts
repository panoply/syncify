import axios from 'axios';

import { http } from '~http/client';

import { $ } from '$';

export const pull = async () => {

  // Step 1: Start the bulk operation
  const startBulkOperation = async () => {
    const query = `
      mutation {
        bulkOperationRunQuery(
          query: """
          {
            theme(id: "${$.target.default.gid}") {
              files {
                edges {
                  node {
                    filename
                    body {
                      ... on OnlineStoreThemeFileBodyBase64 {
                        contentBase64
                      }
                      ... on OnlineStoreThemeFileBodyText {
                        content
                      }
                      ... on OnlineStoreThemeFileBodyUrl {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
          """
        ) {
          bulkOperation {
            id
            status
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const response = await http($.target.default.store.name).post('graphql.json', { query });

    return response.data.bulkOperationRunQuery.bulkOperation.id;
  };

  // Step 2: Monitor the bulk operation
  const monitorBulkOperation = async (operationId) => {
    let status = 'RUNNING';
    let url = null;

    while (status === 'RUNNING') {
      const query = `
        query {
          currentBulkOperation {
            id
            status
            url
          }
        }
      `;

      const response = await http($.target.default.target).post('graphql.json', { query });

      const operation = response.data.data.currentBulkOperation;
      status = operation.status;
      url = operation.url;

      if (status === 'RUNNING') {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      }
    }

    return url;
  };

  // Step 3: Download and parse the JSONL file
  const downloadAndParseFile = async (url) => {
    const response = await axios.get(url);
    const lines = response.data.split('\n');
    lines.forEach(line => {
      if (line) {
        const file = JSON.parse(line);
        console.log(file);
      }
    });
  };

  try {
    const operationId = await startBulkOperation();
    const fileUrl = await monitorBulkOperation(operationId);
    if (fileUrl) {
      await downloadAndParseFile(fileUrl);
    } else {
      console.error('Bulk operation failed or returned no data.');
    }
  } catch (error) {
    console.error(error);
  }
};
