import { liquidPretty } from './parse';
import * as log from './console';

/**
 * Error Handler
 *
 * Normalizes Shopify error codess. This function will gracefully
 * detect what error has occurred and print the relative
 * information.
 */
export function error (e: {
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

      log.error(
        e.statusText,
        liquidPretty(e.data.errors?.asset || e.data.error.asset)
      );

      break;
    case 404:

      log.error(
        e.statusText,
        'The requested resource was not found.'
      );

      break;
    case 400:

      log.error(
        e.statusText,
        'The request was not understood by the server, generally due to bad syntax or because the Content-Type header was not correctly set to application/json. This status is also returned when the request provides an invalid code parameter during the OAuth token exchange process.'

      );

      break;
    case 303:

      log.error(
        e.statusText,
        'The response to the request can be found under a different URL in the Location header and can be retrieved using a GET method on that resource.'

      );
      break;

    case 401:

      log.error(
        e.statusText,
        'The necessary authentication credentials are not present in the request or are incorrect.\n'
      );

      return process.exit();

    case 402:

      log.error(
        e.statusText,
        'The requested shop is currently frozen. The shop owner needs to log in to the shop\'s admin and pay the outstanding balance to unfreeze the shop.'
      );

      break;
    case 406:

      log.error(
        e.statusText,
        'The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.'
      );

      break;
    case 423:

      log.error(
        e.statusText,
        'The requested shop is currently locked. Shops are locked if they repeatedly exceed their API request limit. or if there is an issue with the account, such as a detected compromise or fraud risk.'

      );

      break;
    case 403:

      log.error(
        e.statusText,
        'The server is refusing to respond to the request. This is generally because you have not requested the appropriate scope for this action.'

      );

      break;
    case 501:

      log.error(
        e.statusText,
        'The requested endpoint is not available on that particular shop, e.g. requesting access to a Shopify Plus–only API on a non-Plus shop. This response may also indicate that this endpoint is reserved for future use.'
      );

      break;
    case 503:

      log.error(
        e.statusText,
        'The server is currently unavailable. Check the Shopify status page for reported service outages. See https://www.shopifystatus.com'
      );

      break;
    default: log.error(
      e.statusText,
      'An unknown error has occured. Please submit stack trace to the Syncify Github repository for help or support. See https://github.com/panoply/syncify'
    );
  }

}
