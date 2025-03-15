import type { HttpParams, OnlineStore, Target, Theme, UserErrors } from 'types';
import type { File } from '~file';
/* -------------------------------------------- */
/* PUBLIC                                       */
/* -------------------------------------------- */

import pMap from 'p-map';

import { error } from '~errors';
import { event } from '~events';
import { http } from '~http/client';
import { OnlineStoreThemeFileReadResult, OnlineStoreThemeFilesUserErrors } from '~http/enums';
import { graph, params, type RequestError } from '~http/utils';
import { forEach, forMap, has, isArray } from '~utils';

import { $, q } from '$';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

export declare namespace Pull {

  export interface Model {
    'templates':{ filename: string; checksumMd5: string }[]
    'templates/customers':{ filename: string; checksumMd5: string }[]
    'templates/metaobject':{ filename: string; checksumMd5: string }[]
    'assets':{ filename: string; checksumMd5: string }[]
    'blocks':{ filename: string; checksumMd5: string }[]
    'config':{ filename: string; checksumMd5: string }[]
    'layout':{ filename: string; checksumMd5: string }[]
    'locales':{ filename: string; checksumMd5: string }[]
    'sections':{ filename: string; checksumMd5: string }[]
    'snippets':{ filename: string; checksumMd5: string }[]
  }

  /**
   * Bulk parameter accept theme directory names only
   */
  export type Filter = [
    'templates'?,
    'templates/customers'?,
    'templates/metaobject'?,
    'assets'?,
    'blocks'?,
    'config'?,
    'layout'?,
    'locales'?,
    'sections'?,
    'snippets'?
  ]

  export type HttpParams<T extends Filter, E = any> = [
    filter?: T,
    target?: Theme
  ] | [
    {
      /**
       * Filter specific directories
       */
      filter?: T;
      /**
       * The HTTP Theme target
       */
      target?: Theme;
      /**
       * onError handler. When provided errors will be available as
       * arguments in the callback function. Promise will resolve to `false`,
       *
       * @default undefined
       */
      onError?: (errors: E) => void
    }
  ]
}

/* -------------------------------------------- */
/* PRIVATE                                      */
/* -------------------------------------------- */

function getErrors ({ filename, code }: UserErrors) {

  return {
    filename,
    code: code.replace(/_/g, WSP),
    graph: 'OnlineStoreThemeFile',
    message: OnlineStoreThemeFileReadResult(code)
  };

}

/* -------------------------------------------- */
/* PUBLIC                                       */
/* -------------------------------------------- */

/**
 * Theme Files Count
 *
 * Returns the total number of files contained in the provided Theme target.
 * This is a monkey-patch because Shopify GraphQL API does not provide such
 * a reference. The query itself is limited to a subset of data to ensure the
 * fastest possible request and resolve operation.
 */
export function themeFiles (target: Target, callback: (count: number) => void = null) {

  return new Promise<{ count: number; files: Pull.Model; }>((resolve, reject) => (async () => {

    let after = null;
    let hasNextPage = true;
    let count = 0;

    const files = <Pull.Model>{};

    while (hasNextPage) {
      await http(target.store.name).request<OnlineStore.ThemeFileConnection>({
        data: {
          query: gql`
            query ThemeFilesMap($gid: ID!, $after: String) {
              theme(id: $gid) {
                files(first: 180, after: $after) {
                  nodes {
                    filename
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }
            }
          `,
          variables: {
            gid: target.gid,
            after
          }
        }
      }).then(response => {

        const { nodes, pageInfo } = graph(response.data, 'theme.files', reject);

        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
        count += nodes.length;
        callback && callback(count);

        forEach(({ filename }) => {
          const directory = filename.slice(0, filename.lastIndexOf('/'));
          has(directory, files) ? files[directory].push(filename) : files[directory] = [ filename ];
        }, nodes);

      }).catch(e => {

        e.target = target;
        e.graph = 'OnlineStoreThemeFile';

        error.request(e);

        hasNextPage = false;

      });

    }

    resolve({ count, files });

  })());

}

export function themeFilesUpsert<T extends Upsert.Parameters> (...input: HttpParams<T>) {

  const { query, target, files, onError } = params<Upsert.ThemeFiles[]>(input);

  return new Promise<Upsert.Resolve>((resolve, reject) => {

    http(target.store.name).request<OnlineStore.ThemeFilesUpsertResponse>({
      data: {
        query: gql`
          mutation ThemeFilesUpsert($query: [OnlineStoreThemeFilesUpsertFileInput!]!, $gid: ID!) {
            themeFilesUpsert(files: $query, themeId: $gid) {
              upsertedThemeFiles {
                filename
              }
              userErrors {
                code,
                field,
                filename,
                message,

              }
            }
          }
        `,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then((response) => {

      const { upsertedThemeFiles, userErrors } = graph(response.data, 'themeFilesUpsert', reject);

      resolve(
        {
          target,
          synced: upsertedThemeFiles,
          errors: userErrors.length > 0 ? userErrors.map((userError) => ({
            message: userError.message,
            filename: userError.filename,
            code: userError.code.replace(/_/g, WSP),
            field: userError.field,
            graph: 'OnlineStoreThemeFilesUpsertFileInput',
            summary: OnlineStoreThemeFilesUserErrors(userError.code),
            file: files.find(file => file.key === userError.filename) || null
          })) : []
        }
      );

    })
    .catch((e: RequestError) => {

      e.target = target;
      e.files = files;
      e.graph = 'OnlineStoreThemeFilesUpsertFileInput';
      onError ? onError(e) : reject(e);

    });

  });

}

export function themeFilesList <T extends Files.Parameters> (...input: HttpParams<T, RequestError>) {

  const { query, target, onError, onNext } = params<string[], RequestError>(input);

  return new Promise<Files.Resolve>((resolve, reject) => (async () => {

    let after = null;
    let hasNextPage = true;
    let files: Files.Node[] = [];
    let errors: Files.Errors[] = [];

    while (hasNextPage) {
      await http(target.store.name).request<OnlineStore.ThemeFileConnection>({
        data: {
          query: gql`
            query ThemeFilesList($gid: ID!, $query: [String!]! $after: String) {
              theme(id: $gid) {
                files(first: 100, after: $after, filenames: $query) {
                  nodes {
                    filename,
                    size,
                    createdAt,
                    updatedAt,
                    checksumMd5,
                    body { ...on OnlineStoreThemeFileBodyText { content } }
                  }
                  userErrors {
                    code
                    filename
                  },
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }
            }
          `,
          variables: {
            gid: target.gid,
            query,
            after
          }
        }
      }).then(response => {

        const { nodes, pageInfo, userErrors } = graph(response.data, 'theme.files', reject);

        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
        files = files.concat(nodes);

        if (onNext) onNext(files.length);
        if (userErrors.length > 0) errors = errors.concat(userErrors.map(getErrors));

      }).catch(e => {

        e.target = target;
        e.files = files;
        e.graph = 'OnlineStoreThemeFile';
        onError ? onError(e) : error.request(e);
        hasNextPage = false;

      });

    }

    resolve(
      {
        get target () { return target; },
        get files () { return files; },
        get errors () { return errors; }
      }
    );

  })());

}

export function themeFilesHas <T extends Files.Parameters> (...input: HttpParams<T, Files.Errors>) {

  const { query, target, files, onError } = params<string[]>(input);

  return new Promise<string[]>((resolve, reject) => {

    http(target.store.name).request<OnlineStore.ThemeFileConnection>({
      data: {
        query: gql`
          query ThemeFilesHas($gid: ID!, $query: [String!]!) {
            theme(id: $gid) {
              files(filenames: $query) {
                nodes {
                  filename
                }
              }
            }
          }
        `,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then(response => {

      const { nodes } = graph(response.data, 'theme.files', reject);

      if (nodes.length === query.length) {
        resolve([]);
      } else {
        resolve(forMap(file => query.includes(file.filename) ? null : file.filename, nodes));
      }

    })
    .catch((e) => {

      e.target = target;
      e.files = files;
      e.graph = 'OnlineStoreThemeFile';
      onError ? onError(e) : error.request(e);

    });

  });

}

export function themeFilesGet <T extends Files.Parameters> (...input: HttpParams<T, Files.Errors>) {

  const { query, target, files, onError } = params<string[]>(input);

  return new Promise<{ file: Files.Node, target: Theme, errors: Files.Errors[] }>((resolve, reject) => {

    http(target.store.name).request<OnlineStore.ThemeFileConnection>({
      data: {
        query: gql`
          query ThemeFilesGet($gid: ID!, $query: [String!]!) {
            theme(id: $gid) {
              files(filenames: $query) {
                userErrors {
                  code
                  filename
                },
                nodes {
                  filename,
                  size,
                  createdAt,
                  updatedAt,
                  body { ...on OnlineStoreThemeFileBodyText { content } }
                },
              }
            }
          }
        `,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then(response => {

      const { nodes, userErrors } = graph(response.data, 'theme.files', reject);

      resolve(
        {
          get target () { return target; },
          get file () { return nodes.length === 1 ? nodes[0] : null; },
          get errors () { return userErrors.length > 0 ? userErrors.map(getErrors) : []; }
        }
      );

    })
    .catch(e => {

      e.target = target;
      e.files = files;
      e.graph = 'OnlineStoreThemeFile';
      onError ? onError(e) : error.request(e);

    });

  });
}

export function themeFilesDelete <T extends Files.Parameters> (...input: HttpParams<T, Files.Errors>) {

  const { query, target, files, onError } = params<Upsert.ThemeFiles[]>(input);

  return new Promise<Upsert.Resolve>((resolve, reject) => {

    http(target.store.name).request<OnlineStore.ThemeFilesDeleteResponse>({
      data: {
        query: gql`
          mutation ThemeFilesDelete($gid: ID!, $query: [String!]!) {
            themeFilesDelete(themeId: $gid, files: $query) {
              deletedThemeFiles {
                filename
              }
              userErrors {
                message,
                filename,
                code
              }
            }
          }
        `,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then(response => {

      const { deletedThemeFiles, userErrors } = graph(response.data, 'themeFilesDelete', reject);

      resolve(
        {
          target,
          synced: deletedThemeFiles,
          errors: userErrors.length > 0 ? userErrors.map((userError) => ({
            ...userError,
            code: userError.code.replace(/_/g, WSP),
            summary: OnlineStoreThemeFilesUserErrors(userError.code),
            graph: 'OnlineStoreThemeFileOperationResult',
            file: files.find(file => file.key === userError.filename) || null
          })) : []

        }
      );

    })
    .catch((e: RequestError) => {

      e.target = target;
      e.files = files;
      e.graph = 'OnlineStoreThemeFileOperationResult';
      onError ? onError(e) : reject(e);

    });

  });
}

/* -------------------------------------------- */
/* MAPS                                         */
/* -------------------------------------------- */

/**
 * The main theme files upsert handler that will iterate over all {@link $.target} entries ({@link Theme}).
 * The mapper accepts a {@link File} type parameter. The `file.value` will be used to
 * populate the request mutation and errors are automatically
 * handled.
 */
export async function themeFilesUpsertMap (file: File | File[], callback?: (target: Upsert.Resolve) => void) {

  const files = isArray(file) ? file : [ file ];

  await q.http.add(async () => {

    try {

      const targets = await pMap($.target, target => themeFilesUpsert(files, target));

      event.each(targets);

    } catch (e) {

      error.request(e);

    }

  });

};

/**
 * The main theme files delete handler. Files are mapped and queued. The request will use
 * the {@link $.target} entries and iterate over all theme targets. This function is used
 * mostly in watch mode, whereas {@link themeFilesDelete} can be used for direct upserts.
 */
export async function themeFilesDeleteMap (file: File | File[]) {

  const files = isArray(file) ? file : [ file ];

  await q.http.add(async () => {

    try {

      const targets = await pMap($.target, target => themeFilesDelete(files, target));

      event.each(targets);

    } catch (e) {

      error.request(e);

    }

  });

};
