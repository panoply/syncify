import { hasPath } from 'rambdax';
import { RequestError, File } from 'types';
import { c } from '.';
import { isArray, nl, log } from '../shared/native';

type AxiosResponse = {
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
}

export function message (file: string, e: RequestError) {

  let stderr: string = c.eline + nl;

  stderr += e.info.map(m => c.eline + c.red(m.trimStart())).join(nl) + nl + c.eline;
  stderr += nl + c.eline + c.red('File' + c.colon + '    ' + c.gray('~' + file));
  stderr += nl + c.eline + c.red('Status' + c.colon + '  ' + c.gray(e.message));
  stderr += nl + c.eline + c.red('Code' + c.colon + '    ' + c.gray(String(e.code)));

  return log(stderr);

};

export function print (file: string, e: RequestError) {

  let stderr: string = c.eline + nl;

  stderr += e.detail.split(nl).map(m => c.eline + c.red(m.trimStart())).join(nl) + nl + c.eline;
  stderr += nl + c.eline + c.red('File' + c.colon + '    ' + c.gray('~' + file));
  stderr += nl + c.eline + c.red('Status' + c.colon + '  ' + c.gray(e.message));
  stderr += nl + c.eline + c.red('Code' + c.colon + '    ' + c.gray(String(e.code)));
  stderr += nl + c.eline + c.red('Details' + c.colon + ' ' + c.gray(e.notes));

  return log(stderr);

};

function parse (file: string, e: AxiosResponse) {

  const message = hasPath('error.asset', e.data)
    ? e.data.error.asset
    : hasPath('errors.asset', e.data)
      ? e.data.errors.asset
      : null;

  return print(file, {
    code: e.status,
    message: e.statusText,
    detail: format(message),
    notes: 'Shopify has not accepted the request.'
  });
}

function format (message: string | string[]) {

  return isArray(message) ? message.map(format).join(nl) : c.red(message)
    .replace(/(\()(line\s[0-9]+)(\))(:)/g, c.gray('$1') + c.white('$2') + c.gray('$3') + c.white('$4') + nl + nl)
    .replace(/(['"][\w\s]+['"])/g, c.yellowBright.bold('$1'))
    .replace(/({{2}-?)([a-zA-Z0-9_\-.'"[\]]+)(-?}{2})/g, c.cyan('$1') + c.whiteBright('$2') + c.cyan('$3'))
    .replace(/((?:www|http:|https:)+[^\s]+[\w])/g, c.underline('$1'))
    .replace(/(\/)(.*?)(\/)/g, c.magenta('$1') + c.cyan('$2') + c.magenta('$3'));
}

/**
 * Error Handler
 *
 * Normalizes Shopify error codess. This function will gracefully
 * detect what error has occurred and print the relative
 * information.
 */
export function error (file: File, e: AxiosResponse) {

  switch (e.status) {
    case 422:
      log(parse(file.relative, e));
      break;
    case 404:

      message(file.relative, {
        code: e.status,
        message: e.statusText,
        notes: 'The requested resource was not found.'
      });

      break;
    case 400:
      message(file.relative, {
        code: e.status,
        message: e.statusText,
        info: [
          'The request was not understood by the server, generally due to bad syntax or',
          'because the Content-Type header was not correctly set to application / json.',
          'This status is also returned when the request provides an invalid code parameter',
          'during the OAuth token exchange process.'
        ]
      });
      break;
    case 303:

      message(file.relative, {
        code: e.status,
        message: e.statusText,
        info: [
          'The response to the request can be found under a different URL in the Location',
          'header and can be retrieved using a GET method on that resource.'
        ]
      });
      break;
    case 401:

      message(file.relative, {
        code: e.status,
        message: e.statusText,
        info: [
          'The necessary authentication credentials are not present in the request or are incorrect'
        ]
      });
      break;
    case 402:

      message(file.relative, {
        code: e.status,
        message: e.statusText,
        info: [
          'The requested shop is currently frozen. The shop owner needs to log in to the shop\'s admin',
          'and pay the outstanding balance to unfreeze the shop.'
        ]
      });
      break;
    case 406:

      message(file.relative, {
        code: e.status,
        message: e.statusText,
        info: [
          'The requested resource is only capable of generating content not acceptable according',
          'to the Accept headers sent in the request.'
        ]
      });
      break;

    case 423:
      message(file.relative, {
        code: e.status,
        message: e.statusText,
        info: [
          'The requested shop is currently locked. Shops are locked if they repeatedly exceed their',
          'API request limit. or if there is an issue with the account, such as a detected compromise or fraud risk.'
        ]
      });
      break;

    case 403:

      message(file.relative, {
        code: e.status,
        message: e.statusText,
        info: [
          'The server is refusing to respond to the request. This is generally because you have',
          'not requested the appropriate scope for this action.'
        ]
      });
      break;

    case 501:

      message(file.relative, {
        code: e.status,
        message: e.statusText,
        info: [
          'The requested endpoint is not available on that particular shop, e.g. requesting access to a',
          'Shopify Plus–only API on a non-Plus shop. This response may also indicate that this endpoint',
          'is reserved for future use.'
        ]
      });
      break;

    case 503:

      message(file.relative, {
        code: e.status,
        message: e.statusText,
        info: [
          'The server is currently unavailable. Check the Shopify status page for reported service outages.',
          'See https://www.shopifystatus.com'
        ]
      });
      break;

    default:
      message(file.relative, {
        code: e.status,
        message: e.statusText,
        info: [
          'An unknown error has occured. Please submit stack trace to the Syncify Github repository',
          'for help or support. Visit: https://github.com/panoply/syncify'
        ]
      });
      break;
  }

}
