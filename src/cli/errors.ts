import * as log from 'cli/logs';

/**
 * Error Handler
 *
 * Normalizes Shopify error codes because Shopify
 * is fucking horrible. This function will gracefully
 * detect what error has occurred and print the relative
 * information.
 */
export function error (file: string, e: {
  status?: number,
  statusText?: string,
  data?: {
    error?: {
      asset?: string | string[]
    },
    errors?: {
      asset?: string | string[]
    }
  }
}) {

  switch (e.status) {
    case 422:

      log.fileError(
        {
          file,
          message: e.statusText,
          data: e.data?.errors?.asset || e.data?.error?.asset
        }
      );

      break;
    case 404:

      log.fileError(
        {
          file,
          message: '404 ' + e.statusText,
          data: 'The requested resource was not found.'
        }
      );

      break;
    case 400:

      log.fileError(
        {
          file,
          message: e.statusText,
          data: 'The request was not understood by the server, generally due to bad syntax or because the Content-Type header was not correctly set to application/json. This status is also returned when the request provides an invalid code parameter during the OAuth token exchange process.'
        }
      );

      break;
    case 303:

      log.fileError(
        {
          file,
          message: '404 ' + e.statusText,
          data: 'The response to the request can be found under a different URL in the Location header and can be retrieved using a GET method on that resource.'
        }
      );
      break;

    case 401:

      log.fileError(
        {
          file,
          message: e.statusText,
          data: 'The necessary authentication credentials are not present in the request or are incorrect.\n'
        }
      );

      // return process.exit();

    case 402:

      log.fileError(
        {
          file,
          message: e.statusText,
          data: 'The requested shop is currently frozen. The shop owner needs to log in to the shop\'s admin and pay the outstanding balance to unfreeze the shop.'
        }
      );

      break;
    case 406:

      log.fileError(
        {
          file,
          message: e.statusText,
          data: 'The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.'
        }
      );

      break;
    case 423:

      log.fileError(
        {
          file,
          message: e.statusText,
          data: 'The requested shop is currently locked. Shops are locked if they repeatedly exceed their API request limit. or if there is an issue with the account, such as a detected compromise or fraud risk.'
        }
      );

      break;
    case 403:

      log.fileError(
        {
          file,
          message: e.statusText,
          data: 'The server is refusing to respond to the request. This is generally because you have not requested the appropriate scope for this action.'
        }
      );

      break;
    case 501:

      log.fileError(
        {
          file,
          message: e.statusText,
          data: 'The requested endpoint is not available on that particular shop, e.g. requesting access to a Shopify Plus–only API on a non-Plus shop. This response may also indicate that this endpoint is reserved for future use.'
        }
      );

      break;
    case 503:

      log.fileError(
        {
          file,
          message: e.statusText,
          data: 'The server is currently unavailable. Check the Shopify status page for reported service outages. See https://www.shopifystatus.com'
        }
      );

      break;
    default: log.fileError(
      {
        file,
        message: e.statusText,
        data: [
          'An unknown error has occured. Please submit stack trace to the Syncify Github repository for help or support. See https://github.com/panoply/syncify'
        ]
      }
    );
  }

}
