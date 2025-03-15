import type { Models } from './types/dts/codegen';

import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { CodegenConfig } from '@graphql-codegen/cli';
import { format } from 'prettier';
import ts from 'typescript';

import { Create, gray } from '@syncify/ansi';

const config = {
  version: '2025-01',
  schema: '.vscode/graph/schema.json',
  output: './types/dts/graph.d.ts',
  depths: 1,
  export: <Models[]>[

    // REQUIRED
    // 'QueryRoot',
    'DisplayableError',
    'Maybe',
    'Translation',

    // ONLINE STORE
    'OnlineStore',
    'OnlineStoreTheme',
    'OnlineStoreThemeConnection',
    'OnlineStoreThemeEdge',
    'OnlineStoreThemeFile',
    'OnlineStoreThemeFileBody',
    'OnlineStoreThemeFileBodyText',
    'OnlineStoreThemeFileConnection',
    'OnlineStoreThemeFileEdge',
    'OnlineStoreThemeFileOperationResult',
    'OnlineStoreThemeFileReadResult',
    'OnlineStoreThemeFilesUpsertFileInput',
    'OnlineStoreThemeFilesUserErrors',
    'OnlineStoreThemeInput',
    'MutationThemeFilesUpsertArgs',
    'ThemeFilesUpsertPayload',
    // 'ThemeFilesCopyPayload',

    // THEME
    'ThemeCreatePayload',
    'ThemeCreateUserError',
    'ThemeDeletePayload',
    'ThemeDeleteUserError',
    'ThemePublishPayload',
    'ThemePublishUserError',

    // PAGE
    // 'Page',
    // 'PageConnection',
    // 'PageCreateInput',
    // 'PageCreatePayload',
    // 'PageCreateUserError',
    // 'PageDeletePayload',
    // 'PageDeleteUserError',
    // 'PageUpdateInput',
    // 'PageUpdatePayload',
    // 'PageUpdateUserError',
    // 'PageEdge',

    // REDIRECTS
    // 'UrlRedirect',
    // 'UrlRedirectConnection',
    // 'UrlRedirectCreatePayload',
    // 'UrlRedirectDeletePayload',
    // 'UrlRedirectEdge',
    // 'UrlRedirectImportCreatePayload',
    // 'UrlRedirectImportPreview',
    // 'UrlRedirectImportSubmitPayload',
    // 'UrlRedirectImportUserError',
    // 'UrlRedirectInput',
    // 'UrlRedirectUpdatePayload',
    // 'UrlRedirectUserError',

    // // NAVIGATION
    // 'Menu',
    // 'MenuConnection',
    // 'MenuCreatePayload',
    // 'MenuCreateUserError',
    // 'MenuDeletePayload',
    // 'MenuDeleteUserError',
    // 'MenuEdge',
    // 'MenuItem',
    // 'MenuItemCreateInput',
    // 'MenuItemUpdateInput',
    // 'MenuUpdatePayload',
    // 'MenuUpdateUserError',

    // ACCESS SCOPES
    'AccessScope',
    'AppInstallation'
  ]

};
const shouldIntrospect = process.argv.includes('--introspect');

/**
 * Generates Types and Introspection
 *
 * The .vscode/graphql/schema.json hold the introspection and the
 * generates types are exposed in the types directory.
 *
 * The Syncify development store is used to obtain the introspection.
 */
export default <CodegenConfig>{
  schema: process.argv.includes('--introspect')
    ? `https://shopify.dev/admin-graphql-direct-proxy/${config.version}`
    : config.schema,
  generates: {
    [config.output]: {
      plugins: [
        '@graphql-codegen/typescript',
        '@graphql-codegen/typescript-operations'
      ],
      config: {
        onlyOperationTypes: false,
        skipTypename: true,
        commentDescriptions: true
      },
      hooks: {
        afterOneFileWrite: [
          (filePath: string) => transformEnumsAndScalars(filePath)
        ]
      }
    },
    ...(shouldIntrospect
      ? {
        [config.schema]: {
          plugins: [
            'introspection'
          ],
          config: {
            minify: true // Optional: minify the JSON output
          }
        }
      }
      : {}
    )
  }
};
